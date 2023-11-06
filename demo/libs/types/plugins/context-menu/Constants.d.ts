import type { AxisPlaneSection, ObjectsBoxSection, PickPlaneSection } from "../sections";
import type { Toolbar } from "../toolbars";
import type { BaseViewer } from "../../core";
/**
 * @internal
 */
/**
 * Context for ContextMenu
 * @internal
 */
export interface Context {
    viewer: BaseViewer;
    hit?: any;
    instanceId?: number;
    batchId?: number;
    /**
     * For BimViewer
     * @internal
     */
    section?: ObjectsBoxSection | PickPlaneSection | AxisPlaneSection;
    toolbar?: Toolbar;
}
/**
 * @internal
 */
/**
 * @internal
 */
export interface ContextMenuItem {
    title?: string;
    enabled?: boolean;
    shown?: boolean;
    getTitle?: (context: Context) => string;
    getEnabled?: (context: Context) => boolean;
    getShown?: (context: Context) => boolean;
    doAction?: (context: Context) => void;
}
