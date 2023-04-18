/**
 * To improve performance, we can set object.matrixAutoUpdate = false for static or rarely moving objects and
 * manually call object.updateMatrix() whenever their position/rotation/quaternion/scale are updated.
 * Add a constrant here, so developer can change it here easily for debugging.
 * @internal
 */
export declare const matrixAutoUpdate = false;
/**
 * @internal
 */
export declare const sceneAutoUpdate = false;
/**
 * These concept can be complex: hitable, snapable, selectable, visible
 * Mesh                            Y        Y         Y           Y
 * text in DxfViewer               Y        N         Y           Y
 * ground plan                     Y        N         N           Y
 * outline                         N        N         N           Y
 *
 * So, we must handle them properly. We'll try to put them into different layers.
 */
/**
 * In some scenarios, we don't want some objects to be snap-able.
 * E.g. texts in DxfViewer.
 * We'll put them into this layer, so they are visible but not snap-able.
 * @internal
 */
export declare const layerForNonSnapableObjects = 10;
/**
 * In some scenarios, we don't want some objects to be select-able.
 * E.g. outlines in BimViewer
 * We'll put them into this layer, so they are visible but not select-able.
 * @internal
 */
export declare const layerForUnselectableObjects = 11;
/**
 * @internal
 */
export declare const ICON_FONT_CLASS = "gemini-viewer-icon";
/**
 * @internal
 */
export declare const KEYDOWN_EVENT = "keydown";
/**
 * @internal
 */
export declare const KEYUP_EVENT = "keyup";
/**
 * @internal
 */
export declare const MOUSEMOVE_EVENT = "mousemove";
/**
 * @internal
 */
export declare const MOUSEUP_EVENT = "mouseup";
/**
 * @internal
 */
export declare const MOUSEDOWN_EVENT = "mousedown";
/**
 * @internal
 */
export declare const ESC_KEY = "Escape";
/**
 * @internal
 */
export declare const ENTER_KEY = "Enter";
/**
 * @internal
 */
export declare const AXIS_SECTION_PLANE_ID = "axis-section-plane";
/**
 * @internal
 */
export declare const AXIS_SECTION_PLANE_CONTROL_ID = "axis-section-plane-control";
/**
 * @internal
 */
export declare const SECTION_PLANE_ID = "section-plane";
/**
 * @internal
 */
export declare const SECTION_PLANE_CONTROL_ID = "section-plane-control";
/**
 * @internal
 */
export declare const SECTION_BOX_ID = "section-box";
/**
 * @internal
 */
export declare const SECTION_PLANE_NAME = "plane-section-boxface";
/**
 * @internal
 */
export declare const GROUND_PLANE_RENDER_ORDER = -1000;
/**
 * Section type
 */
export declare enum SectionType {
    ObjectsBoxSection = "ObjectsBoxSection",
    PickPlaneSection = "PickPlaneSection",
    AxisPlaneSection = "AxisPlaneSection"
}
export interface Vector2 {
    x: number;
    y: number;
}
export interface Vector3 {
    x: number;
    y: number;
    z: number;
}
export interface Box2 {
    min: Vector2;
    max: Vector2;
}
