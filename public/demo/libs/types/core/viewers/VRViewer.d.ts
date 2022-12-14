import * as THREE from "three";
import { CameraConfig, Hotpoint, Panorama, VRViewerConfig, VRViewpoint } from "../Configs";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import { Toolbar } from "../toolbar";
import { VRControls } from "../controls/VRControls";
export declare class VRViewer {
    container: HTMLElement;
    /**
     * @internal
     */
    vrViewerCfg: VRViewerConfig;
    /**
     * @internal
     */
    camera?: THREE.PerspectiveCamera;
    /**
     * @internal
     */
    scene: THREE.Scene;
    /**
     * @internal
     */
    renderer?: THREE.WebGLRenderer;
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
    controls?: VRControls;
    /**
     * @internal
     */
    minFov: number;
    /**
     * @internal
     */
    maxFov: number;
    private height;
    private width;
    private raycaster;
    private datGui?;
    private cameraConfig?;
    private autoRotate;
    private events;
    private lastFrameExecuteTime;
    private maxFps;
    private isMousePressing;
    private settings;
    private spinner?;
    private jobCount;
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
    /**
     * @internal
     */
    rootHtmlElement: HTMLElement;
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
    private initContainer;
    private initScene;
    private initRenderer;
    private initCamera;
    private initControls;
    private onKeyDown;
    private initLights;
    private initEvents;
    private initSpinner;
    private initOthers;
    private initRootHtmlElement;
    private initAxes;
    private initToolbar;
    private initBottomBar;
    protected animate(): void;
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
     * Sets spinner visibility
     */
    setSpinnerVisibility(visible: boolean): void;
    /**
     * Calls addEventListener of a node.
     * This makes sure to removeEventListener properly
     * @param node window, dom element, etc.
     * @param type 'change', 'keydown', etc.
     * @param func event callback
     */
    private addEvent;
    setCameraPositionAndDirection(position: THREE.Vector3 | number[], direction?: THREE.Vector3 | number[], animate?: boolean): void;
    getCameraPositionAndDirection(): {
        position: THREE.Vector3;
        direction: THREE.Vector3;
    } | undefined;
    getCameraFov(): number | undefined;
    /**
     * Sets a group of viewpoints
     */
    setViewpoints(viewpoints: VRViewpoint[]): void;
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
        location: THREE.Vector3 | null;
    };
    /**
     * Makes camera look to specific position
     * @param position target position to look to
     */
    lookToPosition(position: [number, number, number]): void;
}
