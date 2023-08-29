import { Context, ContextMenuItem } from "./Constants";
import { type BaseViewer, Plugin } from "../../core";
/**
 * Context menu plugin.
 * Can be used by BimViewer.
 */
export declare class ContextMenuPlugin extends Plugin {
    protected container: HTMLElement;
    protected element: HTMLDivElement;
    protected context: Context;
    protected itemList: [ContextMenuItem, HTMLElement][];
    constructor(viewer: BaseViewer);
    private initEvents;
    protected handleClick: () => void;
    private showContextMenu;
    private isEnabled;
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
