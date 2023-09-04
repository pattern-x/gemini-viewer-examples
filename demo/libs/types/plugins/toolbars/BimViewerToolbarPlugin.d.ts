import { Toolbar } from "./Toolbar";
import { ToolbarConfig, ToolbarMenuId } from "./Toolbar.constants";
import { Plugin, type BaseViewer, PluginConfig } from "../../core/viewers";
/**
 * BimViewer toolbar plugin config.
 */
export interface BimViewerToolbarPluginConfig extends PluginConfig {
    menuConfig: ToolbarConfig;
    groupConfig?: ToolbarMenuId[][] | string[][];
}
/**
 * BimViewer toolbar plugin.
 */
export declare class BimViewerToolbarPlugin extends Plugin {
    protected cfg: BimViewerToolbarPluginConfig;
    protected toolbar: Toolbar;
    constructor(viewer: BaseViewer, cfg?: BimViewerToolbarPluginConfig);
    /**
     * Sets a menu item to be active or inactive.
     */
    setActive(menuId: string, active: boolean): void;
    destroy(): void;
}
