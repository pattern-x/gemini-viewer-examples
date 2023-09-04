import type { TFunction } from "i18next";
import * as THREE from "three";
import { Box2 } from "../Constants";
import { ViewerEvent } from "./ViewerEvent";
import type { BaseViewerConfig, CameraConfig } from "../../core/Configs";
import type { CanvasRender } from "../../core/canvas";
import type { CameraControlsEx, VRControls } from "../../core/controls";
import { EventInfo, InputManager } from "../../core/input/InputManager";
import type { MarkupManager } from "../../core/markup";
import { UndoRedoManager } from "../../core/undo-redo/UndoRedoManager";
import { Event } from "../../core/utils";
import { Plugin } from "../../core/viewers/Plugin";
import type { MeasurementPlugin } from "../../plugins";
import type { BaseSection } from "../../plugins/sections";
/**
 * Screenshot result, which contains a result image and,
 * for DxfViewer, it also contains the view extent when the screenshot is taken,
 * for BimViewer, it contains the camera's position and target.
 */
export interface ScreenshotResult {
    /**
     * The view extent when the screenshot is taken.
     * Note that, it is not the image's extent.
     * And, this is for DxfViewer only.
     */
    viewExtent?: Box2;
    /**
     * Used for BimViewer
     * @internal
     */
    /**
     * Used for BimViewer
     * @internal
     */
    /**
     * Image type, which is "image/png" by default
     * @internal
     */
    imageType: string;
    /**
     * The image, in base 64 format.
     */
    base64Image: string;
}
/**
 * @internal
 */
export declare enum ViewerName {
    BaseViewer = "BaseViewer",
    BimViewer = "BimViewer",
    DxfViewer = "DxfViewer",
    VRViewer = "VRViewer"
}
declare type ViewerEvents = {
    [K in ViewerEvent]: any;
};
/**
 * Abstract base class for DxfViewer, BimViewer, etc.
 */
export declare abstract class BaseViewer extends Event<ViewerEvents> {
    /**
     * @internal
     */
    name: ViewerName;
    /**
     * @internal
     */
    translate: TFunction;
    /**
     * @internal
     */
    parentContainer?: HTMLElement;
    /**
     * @internal
     */
    viewerContainer?: HTMLElement;
    container?: HTMLElement;
    protected inputManager?: InputManager;
    /**
     * @internal
     */
    scene?: THREE.Scene;
    /**
     * @internal
     */
    renderer?: THREE.WebGLRenderer;
    /**
     * @internal
     */
    camera?: THREE.PerspectiveCamera | THREE.OrthographicCamera;
    /**
     * @internal
     */
    controls?: CameraControlsEx | VRControls;
    protected height: number;
    protected width: number;
    /**
     * @internal
     */
    widgetContainer?: HTMLElement;
    private spinner?;
    protected jobCount: number;
    protected viewerCfg: BaseViewerConfig;
    /**
     * @internal
     */
    cameraCfg?: CameraConfig;
    /**
     * @internal
     */
    groundPlane?: THREE.Mesh;
    /**
     * @describe overlay canvas
     * @internal
     */
    overlayRender?: CanvasRender;
    /**
     * @internal
     */
    loadedModels?: any;
    /**
     * @internal
     */
    undoRedoManager?: UndoRedoManager;
    protected enableOverlayRenderer: boolean;
    /**
     * @internal
     */
    protected requestAnimationFrameHandle?: number;
    /**
     * @internal
     */
    protected frustumSize: number;
    /**
     * @internal
     */
    protected loadingProgressBar?: any;
    protected lastFrameExecuteTime: number;
    protected minFrameInterval: number;
    protected plugins: Plugin[];
    constructor(viewerCfg: BaseViewerConfig);
    private initLogLevel;
    private initLocalization;
    private initContainer;
    /**
     * Creates a viewerContainer under the container that user passed in.
     * There are some benifits to create a new one. e.g., its style won't affect
     * the container div user passed in.
     */
    private initViewerContainer;
    /**
     *
     * @description Create a div for ui widget, if widget need position, just reletive container, maybe remove later.
     */
    private initWidgetContainer;
    protected initSpinner(): void;
    /**
     * Sets spinner visibility
     */
    protected setSpinnerVisibility(visible: boolean): void;
    /**
     * Increases job count, and show spinner accordingly
     */
    protected increaseJobCount(): void;
    /**
     * Decreases job count, and hide spinner accordingly
     */
    protected decreaseJobCount(): void;
    protected resize(width: number, height: number): void;
    destroy(): void;
    /**
     * @internal
     * @description Global event input manager.eg:mousedown, mouseup, keydown.
     */
    getInputManager(): InputManager | undefined;
    /**
     * @internal
     */
    getViewConfig(): BaseViewerConfig;
    /**
     * @internal
     */
    enableRender(): void;
    /**
     * @internal
     */
    getRaycaster(): THREE.Raycaster | undefined;
    /**
     * @internal
     */
    getRaycastableObjectsByMouse(event?: EventInfo): THREE.Object3D[];
    /**
     * Gets all objects' bounding box in viewer.
     * @internal
     */
    getBBox(): THREE.Box3 | undefined;
    /**
     * @internal
     */
    getActiveSection(): BaseSection | undefined;
    flyTo(position: THREE.Vector3, lookAt: THREE.Vector3): void;
    /**
     * If it is a 3d viewer.
     * DxfViewer is 2d, thus returns false.
     * @default true
     * @internal
     */
    is3d(): boolean;
    /**
     * @description Compatible with older versions, use MeasurePlugin instead
     * @internal
     */
    get measurePlugin(): MeasurementPlugin | undefined;
    /**
     * @internal
     */
    getMarkupManager(): MarkupManager | undefined;
    /**
     * @deprecated
     */
    deactivateMeasurement(): void;
    /**
     * @deprecated
     */
    setMeasurementVisibility(id: string, visible: boolean): boolean;
    /**
     * @internal
     */
    screenshot(config: any): Promise<undefined | string>;
    /**
     * Gets how long a pixel represents in world coordinate.
     * This works fine for OrthographicCamera.
     * As for PerspectiveCamera, a pixel represents different size for different position,
     * depends on how far the camera is and its fov, etc. We'll simply take the camera target as the position to calculate.
     * @internal
     */
    getPixelSizeInWorldCoord(): number;
    /**
     * Gets an unique modelId in case the expected id is duplicated.
     */
    protected getUniqueModelId(expectedModelId: string): string;
    /**
     * Installs a Plugin.
     */
    addPlugin(plugin: Plugin): void;
    /**
     * Uninstalls a Plugin, clearing content from it first.
     */
    removePlugin(plugin: Plugin): void;
    /**
     * Clears all plugins.
     * A plugin is not created by viewer, thus, won't be destroyed by viewer.
     */
    clearPlugins(): void;
    /**
     * Finds a Plugin.
     */
    findPlugin(id: string): Plugin | undefined;
}
export {};