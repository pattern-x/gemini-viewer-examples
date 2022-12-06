import "./index.css";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import {useEffect, useRef, useState} from "react";
import { Link, useParams } from 'react-router-dom';

interface MenuProp {
    title: string;
    url: string;
}

interface MenusProp {
    title: string;
    subMenus: MenuProp[];
}

function Examples() {
    const [collapsed, setCollapsed] = useState<boolean>(true);
    const [title, setTitle] = useState<string>("");
    const [indexData, setIndexData] = useState<string[]>([]);
    const [data, setData] = useState<MenusProp[]>([]);
    const iframeRef = useRef<HTMLIFrameElement>();
    const { id } = useParams();

    const run = (code: string) => {
        const preview = document.querySelector("#preview") as HTMLElement;
        preview.innerHTML = "";
        iframeRef.current = document.createElement("iframe") as HTMLIFrameElement;
        preview.appendChild(iframeRef.current);
        if(code) {
            const doc = iframeRef.current.contentWindow?.document;
            if (doc) {
                doc.open();
                doc.write(code);
                doc.close();
            }
        }
    }

    const getCode = (url: string) => {
        if (!url) return;
        fetch(url, {mode: 'cors'}).then(data => data.text()).then((data) => {
            run(data);
        })
    }

    useEffect(() => {
        fetch("./config.json").then(data => data.json()).then((data) => {
            const indexMenus:string[]  = [];
            data.forEach((menu: MenusProp) => {
                indexMenus.push(menu.title);
            });
            setIndexData(indexMenus);
            setData(data);
        });
    }, [])

    useEffect(() => {
        if (!id) {
            return;
        }
        const subTitle = id.split("_").join(" ");
        data.forEach((menu: MenusProp) => {
            menu.subMenus.forEach((subMenu: MenuProp) => {
                if (subMenu.title === subTitle) {
                    getCode(subMenu.url);
                    setTitle(subMenu.title);
                }
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, data])


    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    }

    const scrollToTarget = (target: string) => {
        const element = document.getElementById(target.split(" ").join("_"));
        element?.scrollIntoView();
    };

    return (
        <div className="examples">
            <button className={`index-button${collapsed ? " open" : ""}`} onClick={toggleCollapsed}>
                {!collapsed ?  <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </button>
            <div className={`page-title${collapsed ? " open" : ""}`}>{title}</div>
            {/* <div className={`content-overlay${collapsed? " open" : ""}`} onClick={toggleCollapsed}></div> */}
            <div className={`content-container${collapsed ? " open" : ""}`} id="preview"></div>
            <div className={`menu${collapsed ? " open" : ""}`}>
                <div id="index">
                    <h1>Examples</h1>
                    <div>
                        <h2>Index</h2>
                        <hr/>
                        {
                            indexData.map((title: string, index: number) => {
                                return (
                                    <div className="link" key={`${title}-${index}`} onClick={() => scrollToTarget(title)}>
                                        {`${index}....${title}`}
                                    </div>
                                );
                            })
                        }
                        <hr/>
                        {
                            data.map((menu: MenusProp, index: number) => {
                                return (
                                    <div key={`${menu.title}_${index}`}>
                                        <h2 id={menu.title.split(" ").join("_")}>{`${index}.${menu.title}`}</h2>
                                        <hr/>
                                        {
                                            menu.subMenus.map((subMenu: MenuProp, subIndex: number) => {
                                                return (
                                                    <div className="link" key={`${subMenu.title}_${subIndex}`}>
                                                        <Link to={`${subMenu.title.split(" ").join("_")}`}>{subMenu.title}</Link>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Examples;