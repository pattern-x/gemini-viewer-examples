import * as THREE from "three";
import type { CameraControlsEx } from "../../core/controls/CameraControlsEx";
import { EventInfo, InputManager } from "../../core/input/InputManager";
import type { BaseViewer } from "../../core/viewers";
export declare abstract class BaseSection {
    protected viewer: BaseViewer;
    protected inputManager: InputManager;
    protected scene: THREE.Scene;
    protected renderer: THREE.WebGLRenderer;
    protected raycaster: THREE.Raycaster;
    protected sectionBox: THREE.Box3;
    protected mouseDown: boolean;
    protected lastWorldPos: THREE.Vector3;
    protected mouseMoved: boolean;
    protected dragStarted: boolean;
    protected clipPlanes?: THREE.Plane[];
    protected vertices?: THREE.Vector3[];
    protected selectedObject?: THREE.Object3D;
    protected refrencePlane: THREE.Plane;
    protected active: boolean;
    isShowSectionPlane: boolean;
    /**
     * @internal
     */
    clippingObjetIds?: number[];
    constructor(viewer: BaseViewer, input: InputManager);
    protected get canvas(): HTMLCanvasElement;
    get isActive(): boolean;
    protected get camera(): THREE.Camera;
    protected get controls(): CameraControlsEx;
    private setGlobalClippingEnable;
    private setObjectClippingEnable;
    clearClippingObjectIds(): void;
    setClippingEnable(enable: boolean): void;
    activate(): void;
    deactivate(): void;
    protected enableDefaultControl(enable: boolean): void;
    mousedown: (e: EventInfo) => void;
    mousemove: (e: EventInfo) => void;
    mouseup: (e: EventInfo) => void;
    keydown: (e: EventInfo) => void;
    protected getIntersections(e: EventInfo): THREE.Intersection | undefined;
    updateRaycasterByMouse(e: EventInfo): void;
    destroy(): void;
    abstract onDragStart(e: EventInfo): void;
    abstract onDragMove(e: EventInfo): void;
    abstract onDragEnd(e: EventInfo): void;
    abstract getIntersectObjects(): THREE.Object3D[];
    abstract activateSelectedObject(active: boolean): void;
    abstract initOrUpdateSectionPlane(): void;
    abstract initOrUpdateClipPlane(): void;
    abstract resetSection(): void;
    abstract setSectionVisible(visible: boolean): void;
}
