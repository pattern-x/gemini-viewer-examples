import * as THREE from "three";
import { ViewerName } from "./Constants";
import { Hotpoint, ModelConfig, Panorama, VRViewerConfig, VRViewpoint } from "../../core/Configs";
import { BaseViewer } from "../../core/viewers/BaseViewer";
export declare class VRViewer extends BaseViewer {
    name: ViewerName;
    private viewpoints;
    private imageManager;
    private activeViewpointId;
    private activePanoramaId;
    private enableCache;
    private autoRotateSpeed;
    private autoRotate;
    private enableAutoRotate;
    private delayAutoRotateTimeout?;
    constructor(vrViewerCfg: VRViewerConfig);
    private setDefaultBackground;
    private setupDefaultEvents;
    private setupAutoRotateEvents;
    private delayAutoRotate;
    /**
     * Creates box by 1, 6 or 24 images.
     * For 6/24 images, caller must make sure the order is correct. The reason is that,
     * the url can be really complex that we cannot order them here!
     * 6 images must be in order of: right, left, top, bottom, front, back
     * 24 images must be in order of: 4 for right(1_1, 1_2, 2_1, 2_2), 4 for left, top, bottom, front, back...
     */
    private createBoxByImageOrImages;
    private setVrMeshDefault;
    /**
     * Creates a box with proper size and texture from an image.
     */
    private createBoxByImage;
    /**
     * Creates a box with proper size and texture from 6 images.
     */
    private createBoxBy6Images;
    private createBoxBy24Images;
    private adjustCamera;
    private setCss2dObjectsVisible;
    private relocateAnchorIfTooCloseToCamera;
    loadModel(modelCfg: ModelConfig, onProgress?: ((event: ProgressEvent<EventTarget>) => void) | undefined): Promise<void>;
    /**
     * Gets a group of viewpoints
     */
    getViewpoint(id: string): VRViewpoint | undefined;
    /**
     * Sets a group of viewpoints
     */
    setViewpoints(viewpoints: VRViewpoint[]): void;
    /**
     * Activates a panorama by viewpointId and panoramaId
     */
    activatePanoramaById(viewpointId: string, panoramaId: string, setCameraToInitialDirection?: boolean): Promise<void>;
    private activatePanorama;
    /**
     * Adds a panorama to a viewpoint
     */
    addPanorama(viewpointId: string, panorama: Panorama): void;
    /**
     * Checks if a panorama exists in a viewpoint
     */
    findPanorama(viewpointId: string, panoramaId: string): Panorama | undefined;
    addHotpoints(hotpoints: Hotpoint[]): void;
    removeHotpoints(hotpointIds: string[]): void;
    setHotpointsVisibility(visible: boolean, viewpointId?: string, hotpointIds?: string[]): void;
    clearImageCache(): Promise<void>;
    removeImageCache(urls: string[] | string): Promise<void>;
    /**
     * Sets camera position and direction.
     */
    setCameraPositionAndDirection(position: number[], direction?: number[]): void;
    /**
     * Gets camera position and direction.
     */
    getCameraPositionAndDirection(): {
        position: number[];
        direction: number[];
    };
    /**
     * Unlimits controls and show all assets. This is useful for debugging.
     * @internal
     */
    unlimitControlsAndShowPanorama(showAllHotpoints?: boolean): void;
    getHitResult(event: {
        x: number;
        y: number;
    }): THREE.Vector3 | undefined;
    lookToPosition(position: number[]): void;
    setMinAndMaxZoom(minZoom: number, maxZoom: number): void;
    setZoom(zoom: number): void;
    getZoom(): number;
    setAutoRotateEnabled(enable: boolean): void;
    setAutoRotateSpeed(speed: number): void;
    destroy(): void;
}
