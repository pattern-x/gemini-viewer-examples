import { BimViewer, DxfViewer, VRViewer } from "./viewers";
import { ToolbarMenuConfig, ToolbarMenuId } from "./toolbar";
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
     * A float array of length 16, definds model's position, rotation and scale
     */
    matrix?: number[];
    /**
     * @internal
     * @deprecated Uses matrix instead
     */
    position?: number[];
    /**
     * @internal
     * @deprecated Uses matrix instead
     */
    rotation?: number[];
    /**
     * @internal
     * @deprecated Uses matrix instead
     */
    scale?: number[];
    /**
     * If we want to do instantiate to the model
     * @internal
     */
    instantiate?: boolean;
    /**
     * If we want to merge meshes/lines/points with the same material
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
}
/**
 * Context for ContextMenu
 * @internal
 */
export interface Context {
    bimViewer: BimViewer;
    hit?: any;
    instanceId?: number;
    batchId?: number;
}
/**
 * @internal
 */
export interface ContextMenuConfig {
    context: Context;
    id?: string;
    container?: HTMLElement;
    items?: ContextMenuItem[][];
    hideOnMouseDown?: boolean;
}
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
/**
 * This wrappers most config for BimViewer
 */
export interface BimViewerConfig {
    /**
     * Shows the NavCube.
     * @internal
     */
    enableNavCube?: boolean;
    /**
     * Shows the AxisGizmo.
     * @internal
     */
    enableAxisGizmo?: boolean;
    /**
     * Shows the stats output.
     * @internal
     */
    enableStats?: boolean;
    /**
     * Shows the toolbar.
     * @description Default is `true`.
     */
    enableToolbar?: boolean;
    /**
     * shows the bottom-bar.
     * @internal
     */
    enableBottomBar?: boolean;
    /**
     * Shows the context-menu.
     */
    enableContextMenu?: boolean;
    /**
     * Enables spinner
     * @internal
     */
    enableSpinner?: boolean;
    /**
     * @description canvas id to contain the Viewer.
     */
    containerId: string;
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
    /**
     * @internal
     */
    toolbarMenuConfig?: {
        [key in ToolbarMenuId]?: ToolbarMenuConfig<BimViewer>;
    };
}
/**
 * This wrappers most config for DxfViewer
 */
export interface DxfViewerConfig {
    /**
     * @description Container id to contain the viewer
     */
    containerId: string;
    enableAxisGizmo?: boolean;
    enableLayoutBar?: boolean;
    enableStats?: boolean;
    enableToolbar?: boolean;
    enableSpinner?: boolean;
    enableProgressBar?: boolean;
    enableBottomBar?: boolean;
    /**
     * If user can select an entity by mouse click
     */
    enableSelection?: boolean;
    /**
     * @internal
     */
    toolbarMenuConfig?: {
        [key in ToolbarMenuId]?: ToolbarMenuConfig<DxfViewer>;
    };
}
/**
 * This wrappers most config for VRViewer
 */
export interface VRViewerConfig {
    /**
     * @description container id to contain the viewer
     */
    containerId: string;
    autoRotateSpeed?: number;
    enableAxisGizmo?: boolean;
    enableToolbar?: boolean;
    enableBottomBar?: boolean;
    /**
     * @internal
     */
    toolbarMenuConfig?: {
        [key in ToolbarMenuId]?: ToolbarMenuConfig<VRViewer>;
    };
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
 * A simple BimViewerConfig as a template, which disables most plugins.
 * @internal
 */
export declare const SIMPLE_BIM_VIEWER_CONFIG: BimViewerConfig;
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
