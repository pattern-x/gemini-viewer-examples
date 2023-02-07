import { Toolbar } from "./Toolbar";
import { ToolbarConfig, ToolbarMenuId } from "./Toolbar.constants";
import { BimViewer, DxfViewer, VRViewer } from "../../core/viewers";
/**
 * @internal
 */
export declare const DEFAULT_MARKUP_TOOLBAR_CONFIG: ToolbarConfig<DxfViewer>;
/**
 * @internal
 */
export declare class MarkupToolbar<T extends BimViewer | DxfViewer | VRViewer> extends Toolbar<T> {
    constructor(bimViewer: T, menuConfig: ToolbarConfig<T>, groupConfig?: ToolbarMenuId[][] | string[][]);
}
