import { BimViewer } from "../viewers";
import { Context as ContextFromConfigs, ContextMenuConfig as ContextMenuConfigFromConfigs, ContextMenuItem } from "../Configs";
import { ObjectsBoxSection, ObjectsPlaneSection, AxisPlaneSection, PickPlaneSection } from "../section";
import { Toolbar } from "../toolbar";
export interface Context extends ContextFromConfigs {
    section?: ObjectsBoxSection | ObjectsPlaneSection | PickPlaneSection | AxisPlaneSection;
    toolbar?: Toolbar<BimViewer>;
}
export interface ContextMenuConfig extends ContextMenuConfigFromConfigs {
    context: Context;
}
export declare class ContextMenu {
    private id;
    private container;
    private element;
    private handleClick;
    context: Context;
    itemList: [ContextMenuItem, HTMLElement][];
    constructor(cfg: ContextMenuConfig);
    private isEnable;
    private isShown;
    private getTitle;
    private createMenuUI;
    private createMenuGroup;
    private createMenuItem;
    private updateMenuItems;
    private showMenuElement;
    show(pageX: number, pageY: number): void;
    hide(): void;
    destroy(): void;
}
