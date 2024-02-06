import { TFunction } from "i18next";
import * as THREE from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { Box2 } from "../Constants";
import { ProgressBar, Spinner } from "../components";
import { ViewerName } from "./Constants";
import { Plugin } from "./Plugin";
import { ViewerEvent } from "./ViewerEvent";
import { BaseViewerConfig, CameraConfig, ModelConfig } from "../../core/Configs";
import { CameraInfo, CameraManager, CameraProjections } from "../../core/camera";
import { CanvasRender } from "../../core/canvas";
import { Container } from "../../core/components/Container";
import { FontManager } from "../../core/font";
import { ZoomToRectHelper } from "../../core/helpers";
import { LoadingHelper } from "../../core/helpers/LoadingHelper";
import { InputManager } from "../../core/input";
import { Model } from "../../core/model";
import { PickManager } from "../../core/pick";
import { SceneManager } from "../../core/scene/SceneManager";
import { UndoRedoManager } from "../../core/undo-redo";
import { Event } from "../../core/utils";
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
declare type ViewerEvents = {
    [K in ViewerEvent]: any;
};
export declare abstract class BaseViewer extends Event<ViewerEvents> {
    name: ViewerName;
    protected viewerCfg: BaseViewerConfig;
    /**
     * @internal
     */
    translate: TFunction;
    private clock;
    protected fps: number;
    protected timeStamp: number;
    private renderEnabled;
    /**
     * @internal
     */
    protected requestAnimationFrameHandle?: number;
    container: Container;
    protected plugins: Plugin[];
    loadedModels: Model[];
    private raf?;
    private timeoutSymbol?;
    protected homeView?: CameraConfig;
    protected inputManager: InputManager;
    protected cameraManager: CameraManager;
    protected sceneManager: SceneManager;
    protected fontManager?: FontManager;
    protected pickManager: PickManager;
    protected undoRedoManager: UndoRedoManager;
    protected overlayRender: CanvasRender;
    protected css2dRenderer: CSS2DRenderer;
    protected spinner: Spinner;
    protected progressBar?: ProgressBar;
    protected loaderHelper: LoadingHelper;
    protected zoomToRectHelper?: ZoomToRectHelper;
    constructor(viewerCfg: BaseViewerConfig);
    private initLogLevel;
    private initLocalization;
    get viewerContainer(): HTMLElement;
    get widgetContainer(): HTMLElement;
    getUndoRedoManager(): UndoRedoManager;
    getInputManager(): InputManager;
    getCameraManager(): CameraManager;
    getOverlayRender(): CanvasRender;
    get renderer(): THREE.WebGLRenderer;
    get camera(): THREE.PerspectiveCamera | THREE.OrthographicCamera;
    get scene(): THREE.Scene;
    getRaycaster(): THREE.Raycaster;
    getViewConfig(): BaseViewerConfig;
    getSpinner(): Spinner;
    getFontManager(): FontManager | undefined;
    private initCSS2DRenderer;
    /**
     * In order to have a better performance, it should only render when necessary.
     * Usually, we should enable render for these cases:
     *  - Anything added to, removed from scene, or objects' position, scale, rotation, opacity, material, etc. changed
     *  - Anything selected/unselected
     *  - Camera changed
     *  - Render area resized
     * @internal
     */
    enableRender: (time?: number) => void;
    protected animate(): void;
    resize(): void;
    /**
     * Sets decoder path for draco loader.
     * Draco decoder will be used if a model is draco encoded.
     * @param decoderPath e.g., "libs/draco/gltf/"
     * @internal
     */
    setDracoDecoderPath(path: string): void;
    abstract loadModel(modelCfg: ModelConfig, onProgress?: (event: ProgressEvent) => void): Promise<void>;
    addModel(model: Model): void;
    setFont(urls: string[]): Promise<void>;
    /**
     *
     * @description 2d ignore position z.
     */
    is3d(): boolean;
    /**
     * Gets how long a pixel represents in world coordinate.
     * This works fine for OrthographicCamera.
     * As for PerspectiveCamera, a pixel represents different size for different position,
     * depends on how far the camera is and its fov, etc. We'll simply take the camera target as the position to calculate.
     * @internal
     */
    getPixelSizeInWorldCoord(): number;
    /**
     * @description {en} Asks user to select a box area, and zooms to it.
     * @description {zh} 询问用户选择一个框选区域，然后缩放到该区域。
     * @example
     * ``` typescript
     * viewer.zoomToRect();
     * ```
     */
    zoomToRect(): void;
    /**
     * @internal
     */
    deactivateZoomRect(): void;
    /**
     * Gets an unique modelId in case the expected id is duplicated.
     */
    protected getUniqueModelId(expectedModelId: string): string;
    /**
     * @description get all model box
     */
    getBBox(): THREE.Box3;
    flyToObject(object: THREE.Object3D): void;
    flyToObjects(objects: THREE.Object3D[]): void;
    /**
     * Make camera fly to target position with given lookAt position
     * @param position camera's target position
     * @param lookAt camera's new lookAt position
     */
    flyTo(position: THREE.Vector3, lookAt: THREE.Vector3): void;
    flyToDirection(direction: THREE.Vector3): void;
    /**
     * Goes to home view
     */
    goToHomeView(): void;
    /**
     * Fits the camera to view all objects in scene
     */
    viewFitAll(): void;
    /**
     *
     * @param bbox
     */
    zoomToBBox(bbox: THREE.Box3): void;
    pickModel(mousePosition: {
        x: number;
        y: number;
    }): import("../../core/pick").CpuIntersection | undefined;
    pickObjectsByMouse(mousePosition: {
        x: number;
        y: number;
    }): THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[];
    getRaycastableObjects(): THREE.Object3D<THREE.Object3DEventMap>[];
    /**
     * @description {en} Sets background color.
     * @description {zh} 设置背景颜色。
     * @param r
     * - {en} Red channel value between 0 and 1.
     * - {zh} 红色通道值，介于 0 和 1 之间。
     * @param g
     * - {en} Green channel value between 0 and 1.
     * - {zh} 绿色通道值，介于 0 和 1 之间。
     * @param b
     * - {en} Blue channel value between 0 and 1.
     * -{zh} 蓝色通道值，介于 0 和 1 之间。
     * @example
     * ``` typescript
     * // {en} Sets background to gray
     * // {zh} 设置背景为灰色
     * viewer.setBackgroundColor(0.5, 0.5, 0.5);
     * ```
     */
    setBackgroundColor(r: number, g: number, b: number): void;
    setCameraProjection(projection: CameraProjections): void;
    enableControl(enable: boolean): void;
    enableRotate(enable: boolean): void;
    enableZoom(enable: boolean): void;
    enablePan(enable: boolean): void;
    getCameraInfo(): {
        /**
         * @description {en} Sets background color.
         * @description {zh} 设置背景颜色。
         * @param r
         * - {en} Red channel value between 0 and 1.
         * - {zh} 红色通道值，介于 0 和 1 之间。
         * @param g
         * - {en} Green channel value between 0 and 1.
         * - {zh} 绿色通道值，介于 0 和 1 之间。
         * @param b
         * - {en} Blue channel value between 0 and 1.
         * -{zh} 蓝色通道值，介于 0 和 1 之间。
         * @example
         * ``` typescript
         * // {en} Sets background to gray
         * // {zh} 设置背景为灰色
         * viewer.setBackgroundColor(0.5, 0.5, 0.5);
         * ```
         */
        near: number;
        far: number;
        zoom: number;
        eye: THREE.Vector3Tuple;
        up: THREE.Vector3Tuple;
        look: THREE.Vector3Tuple;
    };
    setCameraInfo(cameraInfo: CameraInfo): void;
    getCameraDirection(): THREE.Vector3;
    getRenderInfo(): {
        drawCalls: number;
        lines: number;
        points: number;
        triangles: number;
        geometries: number;
        textures: number;
        materials: number;
    };
    /**
     *
     */
    destroy(): void;
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
