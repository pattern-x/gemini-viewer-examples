import * as THREE from "three";
import { CameraConfig } from "../../core/Configs";
import CameraControls from "../../core/camera-controls";
import { Control, NavigationModes } from "../../core/controls/Control";
import { type BaseViewer } from "../../core/viewers/BaseViewer";
export declare enum CameraProjections {
    Perspective = 0,
    Orthographic = 1
}
export declare type CameraInfo = CameraConfig;
export declare class CameraManager {
    viewer: BaseViewer;
    readonly perspectiveCamera: THREE.PerspectiveCamera;
    readonly orthographicCamera: THREE.OrthographicCamera;
    activeCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
    readonly cameraControls: CameraControls;
    private previousDistance;
    private previousAzimuthRotateSpeed;
    private previousPolarRotateSpeed;
    private previousDollySpeed;
    private previousTruckSpeed;
    private previousMouseLeft;
    protected enableKeyDown: boolean;
    navMode: Record<string, Control>;
    currentNavMode: Control;
    currentProjection: CameraProjections;
    protected anchor: HTMLElement;
    constructor(viewer: BaseViewer);
    get viewerContainer(): HTMLElement;
    get inputManager(): import("../../core/input/InputManager").InputManager;
    private createAnchor;
    protected setAnchorPosition(x: number, y: number): void;
    setOrbitPointVisible(visible: boolean): void;
    private setOrthoCameraAspect;
    private setupCameras;
    private setCameraPositionAndTarget;
    private setupControls;
    private onKeyDown;
    private onChange;
    setOrthoCamera(): void;
    private getDims;
    private setupOrthoCamera;
    private setPerspectiveCamera;
    update(delta: number): boolean;
    updateAspect(): void;
    get camera(): THREE.PerspectiveCamera | THREE.OrthographicCamera;
    enableKeyControl(enable: boolean): void;
    getTarget(): THREE.Vector3;
    getPosition(): THREE.Vector3;
    adjustCameraByBbox(bbox: THREE.Box3): void;
    enableControl(active: boolean): void;
    enableRotate(enable: boolean): void;
    enableZoom(enable: boolean): void;
    enablePan(enable: boolean): void;
    enableMouseLeft(enable: boolean): void;
    setCameraPosition(position: THREE.Vector3): void;
    setCameraTarget(target: THREE.Vector3): void;
    flyTo(position: THREE.Vector3, lookAt: THREE.Vector3): void;
    flyToPosition(x: number, y: number, z: number): void;
    flyToBox(box: THREE.Box3): void;
    fitToSphere(box: THREE.Object3D | THREE.Sphere): void;
    flyToObject(object: THREE.Object3D): void;
    getDistanceToFitSphere(radius: number): number;
    setNavigationMode(mode: NavigationModes): void;
    setProjection(projection: CameraProjections): void;
    setOrbitPoint(point: THREE.Vector3): void;
    getCameraDirection(): THREE.Vector3;
    getCameraInfo(): {
        near: number;
        far: number;
        zoom: number;
        eye: THREE.Vector3Tuple;
        up: THREE.Vector3Tuple;
        look: THREE.Vector3Tuple;
    };
    setCameraInfo(cameraInfo: CameraInfo): void;
    destroy(): void;
}
