import * as THREE from "three";
import { EventInfo, InputManager } from "../../core/input/InputManager";
import type { BaseViewer } from "../../core/viewers";
/**
 * Abstract base class for AxisPlaneSection, ObjectsBoxSection, etc.
 */
export declare abstract class BaseSection {
    protected viewer: BaseViewer;
    protected inputManager: InputManager;
    protected scene: THREE.Scene;
    protected renderer: THREE.WebGLRenderer;
    protected raycaster: THREE.Raycaster;
    protected sectionBox: THREE.Box3;
    protected lastWorldPos: THREE.Vector3;
    protected mouseMoved: boolean;
    protected dragStarted: boolean;
    protected clipPlanes?: THREE.Plane[];
    protected vertices?: THREE.Vector3[];
    protected selectedObject?: THREE.Object3D;
    protected refrencePlane: THREE.Plane;
    protected active: boolean;
    /**
     * If to show section plane and gizmo or not.
     */
    showSectionPlane: boolean;
    /**
     * @internal
     */
    clippingObjetIds?: number[];
    constructor(viewer: BaseViewer, input: InputManager);
    protected get canvas(): HTMLCanvasElement;
    get isActive(): boolean;
    protected get camera(): THREE.Camera;
    private setGlobalClippingEnabled;
    private setObjectClippingEnabled;
    clearClippingObjectIds(): void;
    setClippingEnabled(enable: boolean): void;
    activate(): void;
    deactivate(keepSectionState?: boolean): void;
    protected setControlsEnabled(enable: boolean): void;
    protected mousedown: (e: EventInfo) => void;
    protected mousemove: (e: EventInfo) => void;
    protected mouseup: (e: EventInfo) => void;
    protected keydown: (e: EventInfo) => void;
    protected getIntersections(e: EventInfo): THREE.Intersection | undefined;
    protected updateRaycasterByMouse(e: EventInfo): void;
    destroy(): void;
    protected abstract onDragStart(e: EventInfo): void;
    protected abstract onDragMove(e: EventInfo): void;
    protected abstract onDragEnd(e: EventInfo): void;
    protected abstract getIntersectObjects(): THREE.Object3D[];
    protected abstract activateSelectedObject(active: boolean): void;
    protected abstract initOrUpdateSectionPlaneMeshes(): void;
    protected abstract initOrUpdateClipPlanes(): void;
    abstract reset(): void;
    abstract setSectionPlaneVisible(visible: boolean): void;
}
