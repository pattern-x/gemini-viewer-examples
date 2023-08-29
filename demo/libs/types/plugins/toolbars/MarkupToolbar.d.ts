import { Toolbar } from "./Toolbar";
import { ToolbarConfig, ToolbarMenuId } from "./Toolbar.constants";
import { type BaseViewer } from "../../core/viewers";
/**
 * @internal
 */
export declare const DEFAULT_MARKUP_TOOLBAR_CONFIG: ToolbarConfig;
/**
 * @internal
 */
export declare const MARKUP_GROUP_CONFIG: ToolbarMenuId[][];
/**
 * @internal
 */
export declare class MarkupToolbar extends Toolbar {
    constructor(viewer: BaseViewer, menuCfg: ToolbarConfig, groupCfg?: ToolbarMenuId[][] | string[][]);
    keydown: () => void;
}
