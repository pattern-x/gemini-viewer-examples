import * as THREE from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { Toolbar } from "../../components/toolbar";
import { CameraConfig, Hotpoint, ModelConfig, Panorama, VRViewerConfig, VRViewpoint } from "../../core/Configs";
import { Vector3 } from "../../core/Constants";
import { BaseViewer, ViewerName } from "../../core/viewers/BaseViewer";
export declare class VRViewer extends BaseViewer {
    /**
     * @internal
     */
    name: ViewerName;
    private timer;
    /**
     * @internal
     */
    loadedModels: {
        [src: string]: {
            id: number;
            bbox?: THREE.Box3;
        };
    };
    /**
     * @internal
     */
    css2dRenderer?: CSS2DRenderer;
    /**
     * @internal
     */
    css3dRenderer?: CSS3DRenderer;
    /**
     * @internal
     */
    minFov: number;
    /**
     * @internal
     */
    maxFov: number;
    private raycaster;
    private autoRotate;
    private events;
    private lastFrameExecuteTime;
    private maxFps;
    private isMousePressing;
    private settings;
    private viewpoints;
    private previousViewpointId;
    private previousPanoramaId;
    private activeViewpointId;
    private activePanoramaId;
    private viewpointAssetsMap;
    private controlsHelper?;
    private cameraUpdateInterval?;
    private fianlCameraPosition?;
    private finalCameraTarget?;
    private loadingPanos;
    private axes?;
    /**
     * @internal
     */
    toolbar?: Toolbar<VRViewer>;
    private bottomBar?;
    onHotpointClicked?: (hotpoint: Hotpoint) => void;
    handleDragEnd?: () => void;
    constructor(vrViewerCfg: VRViewerConfig, cameraCfg?: CameraConfig);
    /**
     * Initialize everything it needs
     */
    private init;
    private initScene;
    private initRenderer;
    private initCamera;
    private initControls;
    private onKeyDown;
    private initLights;
    private initEvents;
    private initOthers;
    private initAxes;
    private initToolbar;
    private initBottomBar;
    protected animate(): void;
    clearAllCachedPanoramas(): void;
    destroy(): void;
    private onResize;
    private onMouseWheel;
    private updateFov;
    setMinAndMaxFov(minFov: number, maxFov: number): void;
    private resize;
    /**
     * Enables/Disables orbit controls to automatically rotate.
     */
    enableAutoRotate(enable: boolean): void;
    /**
     * Sets orbit controls' rotate speed.
     * It requires (3600 / speed / fps) seconds for a around
     * When speed is 1, 60fps, it requires 60s;
     * When speed is 2, 60fps, it requires 30s;
     */
    setAutoRotateSpeed(speed?: number): void;
    /**
     * Sets camera fov. Usually 45 - 90.
     */
    setCameraFov(fov?: number): void;
    /**
     * Calls addEventListener of a node.
     * This makes sure to removeEventListener properly
     * @param node window, dom element, etc.
     * @param type 'change', 'keydown', etc.
     * @param func event callback
     */
    private addEvent;
    /**
     * Sets camera position and direction.
     */
    setCameraPositionAndDirection(position: Vector3 | number[], direction?: Vector3 | number[], animate?: boolean): void;
    /**
     * Gets camera position and direction.
     */
    getCameraPositionAndDirection(): {
        position: Vector3;
        direction: Vector3;
    } | undefined;
    /**
     * Gets camera's fov value.
     */
    getCameraFov(): number | undefined;
    /**
     * Sets a group of viewpoints
     */
    setViewpoints(viewpoints: VRViewpoint[]): void;
    /**
     * Loads a 3d model.
     * @internal
     */
    loadModel(modelCfg: ModelConfig, onProgress?: (event: ProgressEvent) => void): Promise<void>;
    /**
     * Sets a model's visibility.
     * @throws Throws exception if modelId doesn't exist.
     * @internal
     */
    setModelVisibility(modelId: string, visible: boolean): void;
    /**
     * Applies options and add object to scene.
     */
    private applyOptionsAndAddToScene;
    /**
     * Add newly added object to scene.
     * Also, usually(but not always) we should regenerate sky and go to home view
     * @param object
     */
    private addLoadedModelToScene;
    /**
     * Adds a panorama to a viewpoint
     */
    addPanorama(viewpointId: string, panorama: Panorama): void;
    /**
     * Checks if a panorama exists in a viewpoint
     */
    findPanorama(viewpointId: string, panoramaId: string): Panorama | undefined;
    /**
     * Sets hotpoints visibility for one or all viewpoints
     * @param visible true or false
     * @param viewpointId target viewpointId. Will apply to all if no viewpointId is specified
     * @param hotpointIds target hotpointIds. Will apply to all if no hotpointIds is specified
     */
    setHotpointsVisibility(visible: boolean, viewpointId?: string, hotpointIds?: string[]): void;
    /**
     * Adds hotpoint to active viewpoint
     */
    addHotpoints(hotpoints: Hotpoint[]): void;
    /**
     * Removes hotpoint of active viewpoint
     */
    removeHotpoints(hotpointIds: string[]): void;
    /**
     * @deprecated use activatePanoramaById() instead
     */
    activeViewpointById(viewpointId: string, animate?: boolean, onSuccess?: (viewpoint: VRViewpoint) => void, onError?: (event: ErrorEvent) => void): void;
    /**
     * Activates a panorama by viewpointId and panoramaId
     */
    activatePanoramaById(viewpointId: string, panoramaId: string, setCameraToInitialDirection?: boolean, animate?: boolean, onSuccess?: (viewpoint: VRViewpoint) => void, onError?: (event: ErrorEvent) => void): void;
    removeCachedPanoramas(): void;
    /**
     * Unlimits controls and show all assets. This is useful for debugging.
     * @internal
     */
    unlimitControlsAndShowAssets(showAllHotpoints?: boolean): void;
    private relocateAnchorIfTooCloseToCamera;
    /**
     * Activates a viewpoint
     */
    private activatePanorama;
    /**
     * Creates box by 1, 6 or 24 images.
     * For 6/24 images, caller must make sure the order is correct. The reason is that,
     * the url can be really complex that we cannot order them here!
     * 6 images must be in order of: right, left, top, bottom, front, back
     * 24 images must be in order of: 4 for right(1_1, 1_2, 2_1, 2_2), 4 for left, top, bottom, front, back...
     */
    private createBoxByImageOrImages;
    /**
     * Creates a box with proper size and texture from an image.
     */
    private createBoxByImage;
    /**
     * Creates a box with proper size and texture from 6 images.
     */
    private createBoxBy6Images;
    private createBoxBy24Images;
    /**
     * Gets intersection by given mouse location.
     * If no MouseEvent is passed in, use (0, 0) as the raycaster's origin.
     */
    private getIntersection;
    private fadeIn;
    private fadeOut;
    private handleCameraUpdateInterval;
    /**
     * Gets mouse hit result
     */
    getHitResult(event: MouseEvent): {
        location: Vector3 | null;
    };
    /**
     * Makes camera look to specific position
     * @param position target position to look to
     */
    lookToPosition(position: [number, number, number]): void;
    /**
     * Instatiates leaf nodes of given object.
     * If objects' geometry and material are the same, they can be instanced.
     * @param object
     */
    private instantiate;
    /**
     * Merges leaf nodes of given object.
     * If objects' materials are the same, they can be merged.
     * @param object
     */
    private merge;
}
