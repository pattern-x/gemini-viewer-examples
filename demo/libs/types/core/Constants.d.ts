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
 * ground plan                     Y        Y         N           Y
 * outline                         N        Y         N           Y
 * OSnap auxiliary object          N        Y         N           N
 *
 * So, we must handle them properly. We'll try to put them into different layers.
 *
 * For each created object with geometry and material, the default layer is set to enableAll.
 * If the object is only displayed, it is not necessary to call enableAll. For example, some auxiliary display objects.
 * For objects that cannot be hitable, snapable, selectable, etc., call ObjectUtils.disableLayerChannels to exclude the corresponding channel.
 * @example
 * ``` typescript
 *   this.groundPlane.layers.enableAll();
 *   ObjectUtils.disableLayerChannels(this.groundPlane, [layerForSelectableObjects]);
 * ```
 */
/**
 * @internal
 */
export declare const layerForHitableObjects = 10;
/**
 * @internal
 */
export declare const layerForSnapableObjects = 11;
/**
 * @internal
 */
export declare const layerForSelectableObjects = 12;
/**
 * @internal
 */
export declare const ICON_FONT_CLASS = "gemini-viewer-iconfont";
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
/**
 * Screenshot mode.
 */
export declare enum ScreenshotMode {
    /**
     * Take screenshot of the whole canvas.
     */
    Default = "Default",
    /**
     * Take screenshot by box selecting an area.
     */
    BoxSelection = "BoxSelection",
    /**
     * Take screenshot by picking a markup.
     */
    PickMarkup = "PickMarkup"
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
export declare type Box = [number, number, number, number, number, number];
export declare type Mat4 = [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
] | Float32Array;
export interface Box2 {
    min: Vector2;
    max: Vector2;
}
