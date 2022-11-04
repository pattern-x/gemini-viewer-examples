import "./NavMenu.css";
import { Menu, Select } from 'antd';
import type { MenuProps } from 'antd';
import React, { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { titleState, urlState, collapsedState } from "../../../../store/store";

type MenuItem = Required<MenuProps>['items'][number];

interface MenuProp {
    title: string;
    url: string;
}

export interface MenusProp {
    title: string;
    subMenus: MenuProp[];
}

interface NavMenuProps {
    menus: MenusProp[]
}

function getItem(
    label: React.ReactNode,
    key: React.Key,
    url?: string,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
        url,
    } as MenuItem;
}

function NavMenu(props: NavMenuProps) {
    let { menus } = props;
    const defaultOpenKeys: string[] = [];
    const [selectedKey, setSelectedKey] = useState<string>("");
    const [options, setOptions] = useState<{ value: string, label: string }[]>([]);
    const setUrl = useSetRecoilState<string>(urlState);
    const setTitle = useSetRecoilState<string>(titleState);
    const collapsed = useRecoilValue<boolean>(collapsedState);

    const items: MenuProps['items'] = menus.map((menu, index) => {
        defaultOpenKeys.push(`menu${index}`);
        return getItem(menu.title, `menu${index}`, undefined, undefined, menu.subMenus.map((subMenu, subIndex) => {
            return getItem(subMenu.title, `menu${index}-${subIndex}`, subMenu.url);
        }));
    });

    useEffect(() => {
        menus.forEach((menu, index) => {
            menu.subMenus.forEach((subMenu, subIndex) => {
                if (index === 0 && subIndex === 0) {
                    setSelectedKey(`menu${index}-${subIndex}`);
                    setTitle(subMenu.title);
                    setUrl(subMenu.url);
                }
            });
        });
    }, [menus])

    const onMenuSelect = (item: any) => {
        setSelectedKey(item.key as string);
        menus.forEach((menu, index) => {
            menu.subMenus.forEach((subMenu, subIndex) => {
                if (`menu${index}-${subIndex}` === item.key) {
                    setTitle(subMenu.title);
                    setUrl(subMenu.url);
                }
            });
        });
    };

    const onSelect = (value: string) => {
        menus.forEach((menu, index) => {
            menu.subMenus.forEach((subMenu, subIndex) => {
                if (subMenu.title === value) {
                    setTitle(subMenu.title);
                    setUrl(subMenu.url);
                }
            });
        });
    }

    const handleFilter = (value: string) => {
        setOptions([]);
        const filter: { value: string, label: string }[] = [];
        menus.forEach((menu, index) => {
            menu.subMenus.forEach((subMenu, subIndex) => {
                if (subMenu.title.indexOf(value) > -1) {
                    filter.push({"label": subMenu.title, "value": subMenu.title});
                }
            });
        })
        setOptions(filter);
    }

    return (
        <div className={`NavMenu${!collapsed? ' active': ''}`}>
            <Select
                showSearch
                placeholder="请输入要搜索内容"
                size="large"
                style={{ width: "100%", height: 40 }}
                showArrow={false}
                filterOption={false}
                onSearch={handleFilter}
                onSelect={onSelect}
                options={options}
            />
            <Menu
                style={{ width: "100%"}}
                openKeys={defaultOpenKeys}
                selectedKeys={[selectedKey]}
                mode="inline"
                items={items}
                onSelect={onMenuSelect}
            />
        </div>
    );
}

export default NavMenu;