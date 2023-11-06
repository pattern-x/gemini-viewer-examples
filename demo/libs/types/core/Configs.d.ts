/**
 * Camera config
 */
export interface CameraConfig {
    /**
     * The camera location
     */
    eye: number[];
    /**
     * The location that the camera looks to
     */
    look: number[];
    /**
     * @internal
     */
    up?: number[];
    /**
     * The camera zoom
     */
    zoom?: number;
    /**
     * The camera's near clip plane
     */
    near?: number;
    /**
     * The camera's far clip plane
     */
    far?: number;
}
/**
 * Model config
 */
export interface ModelConfig {
    /**
     * Unique id of the model
     */
    modelId?: string;
    /**
     * Model name
     */
    name?: string;
    /**
     * Source url of the model
     */
    src: string;
    /**
     * Used to distinguish format, because it may be hard to know the format by src!
     * @internal
     */
    fileFormat?: string;
    /**
     * File encoding, can be used by dxf. Common encoding include "UTF-8", "gb2312", etc.
     * @internal
     */
    encoding?: string;
    /**
     * A float array of length 16, definds model's position, rotation and scale
     */
    matrix?: number[];
    /**
     * If we want to merge meshes/lines/points with the same material
     * @internal
     * @default false
     */
    merge?: boolean;
    /**
     * If we want to generate and show edges/outlines to the modle.
     * It is useful for BimViewer.
     * @internal
     */
    edges?: boolean;
    /**
     * If this model is visible by default.
     * @internal
     */
    visible?: boolean;
}
/**
 * Dxf model config
 */
export interface DxfModelConfig extends ModelConfig {
    /**
     * If to ignore anything of paper space.
     * There are some scenarios to ignore paper space by default, includes:
     * - Dxf overlay, aka, loading more than one dxf files into a viewer. We'll only load model space for the first file.
     * - Dxf compare. Since we'll only compare model space, it won't load paper space at all.
     *
     * This option is useful when user want to explicitly ignore paper space.
     * @default false
     */
    ignorePaperSpace?: boolean;
    /**
     * Applies this color to everything in this model.
     * This allows user to show a drawing with a pure color (black, white, etc.).
     * Color value is between 0 and 1, e.g., [1, 0, 0] means 'red'.
     */
    overrideColor?: number[];
}
/**
 * Common viewer config
 */
export interface BaseViewerConfig {
    /**
     * @description canvas id to contain the viewer.
     */
    containerId: string;
    /**
     * @internal
     */
    language?: "cn" | "en";
    /**
     * @internal
     */
    logLevel?: "debug" | "info" | "warn" | "error" | "silent";
    /**
     * @internal
     */
    enableSpinner?: boolean;
    /**
     * @internal
     */
    enableProgressBar?: boolean;
    /**
     * @description just for react native
     * @internal
     */
    context?: WebGLRenderingContext | WebGL2RenderingContext;
    /**
     * @description just for react native
     * @internal
     */
    context2d?: CanvasRenderingContext2D;
}
/**
 * This wrappers most config for BimViewer
 */
export interface BimViewerConfig extends BaseViewerConfig {
    /**
     * If user can select an entity by mouse click
     * @internal
     * @default true
     */
    enableSelection?: boolean;
    /**
     * Default is `meters`
     * @internal
     */
    units?: string;
    /**
     * Sets the default locale
     * @internal
     */
    locale?: "cn" | "en";
}
/**
 * This wrappers most config for DxfViewer
 */
export interface DxfViewerConfig extends BaseViewerConfig {
    /**
     * Enables layout bar so we can switch to other layouts.
     * The default layout bar is an example UI of the viewer, since plenty of APIs are exposed,
     * you are recommended to create your own layout bar with customized style, location, etc.
     */
    enableLayoutBar?: boolean;
    /**
     * If to cache model into indexeddb (or maybe local storage in future).
     * If enabled, it will get model data from cache the next time model is loaded.
     * @internal
     * @default true
     */
    enableLocalCache?: boolean;
    /**
     * If user can select an entity by mouse click
     * @internal
     * @default false
     */
    enableSelection?: boolean;
}
/**
 * Dxf compare config.
 */
export interface DxfCompareConfig {
    /**
     * Enables to compare properties (color, linetype, line width, etc.)
     */
    enableDetailComparision: boolean;
}
/**
 * This wrappers most config for VRViewer
 */
export interface VRViewerConfig extends BaseViewerConfig {
    autoRotateSpeed?: number;
    enableCache?: boolean;
}
/**
 * VR Viewpoint's hotpoint, which can be a user defined html element.
 * A hotpoint can be clicked, then caller can do their own operation,
 * e.g. open a description panel, jump to another viewpoint, etc.
 */
export interface Hotpoint {
    hotpointId: string;
    anchorPosition: number[];
    visible?: boolean;
    html: string;
}
/**
 * A VRViewpointPlan contains 1 or more panor
 * A viewpoint may contain more than one plans
 */
export interface Panorama {
    id: string;
    /**
     * 1, 6 or 24 image urls in order of right, left, up, down, front, back.
     * When there is 1 image, caller should also put it into array!
     */
    images: string[];
    /**
     * 6 image urls in order of right, left, up, down, front, back
     */
    thumbnails?: string[];
}
export interface VRViewpoint {
    /**
     * @deprecated moved to VRViewpointPlan
     */
    imageOrImages?: string | string[];
    /**
     * @deprecated moved to VRViewpointPlan
     */
    thumbnailImages?: string[];
    panoramas: Panorama[];
    id: string;
    name?: string;
    position?: number[];
    initialDirection?: number[];
    hotpoints?: Hotpoint[];
}
/**
 * A default BimViewerConfig as a template, which enables most plugins.
 * @internal
 */
export declare const DEFAULT_BIM_VIEWER_CONFIG: BimViewerConfig;
/**
 * @internal
 */
export interface IsolateObjectsParam {
    id: string;
    modelId: string;
}
/**
 * @internal
 */
export interface IsolateObjectsParams {
    familyInstanceIds: IsolateObjectsParam[];
}
/**
 * @internal
 */
export interface ScreenshotConfig {
    type: string;
    quality: number;
    includeOverlay: boolean;
}
/**
 * Icon class.
 * Used by toolbar and bottom bar icons, etc.
 */
export interface IconClass {
    /**
     * The default icon.
     */
    default: string;
    /**
     * The icon when item is actived.
     */
    active?: string;
    /**
     * The icon font class name.
     */
    iconFont?: string;
}
