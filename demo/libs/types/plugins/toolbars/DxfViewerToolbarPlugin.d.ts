import { Toolbar } from "./Toolbar";
import { ToolbarConfig, ToolbarMenuId } from "./Toolbar.constants";
import { Plugin, type BaseViewer, PluginConfig } from "../../core/viewers";
/**
 * DxfViewer toolbar plugin config.
 */
export interface DxfViewerToolbarPluginConfig extends PluginConfig {
    menuConfig: ToolbarConfig;
    groupConfig?: ToolbarMenuId[][] | string[][];
    markupMenuCfg?: ToolbarConfig;
    markupGroupCfg?: ToolbarMenuId[][] | string[][];
}
/**
 * DxfViewer toolbar plugin.
 */
export declare class DxfViewerToolbarPlugin extends Plugin {
    protected cfg: DxfViewerToolbarPluginConfig;
    protected toolbar: Toolbar;
    protected markupToolbar?: Toolbar;
    constructor(viewer: BaseViewer, cfg?: DxfViewerToolbarPluginConfig);
    /**
     * Sets a menu item to be active or inactive.
     */
    setActive(menuId: string, active: boolean): void;
    protected onMarkupActivated: () => void;
    protected onMarkupDeactivated: () => void;
    destroy(): void;
}
