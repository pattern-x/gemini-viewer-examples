import * as THREE from "three";
import type { BaseViewer } from "../../core/viewers";
export interface CpuIntersection {
    distance: number;
    /** The intersected object */
    object: THREE.Object3D;
    /** Point of intersection, in world coordinates */
    point: THREE.Vector3;
    face?: THREE.Face;
    instanceId?: number;
}
export interface GpuIntersection {
    bimTilesId: number;
    userId: number;
}
export declare class PickManager {
    private readonly CLEAR_COLOR;
    private readonly CLEAR_COLOR_ALPHA;
    private readonly EMPTY_MODEL_ID;
    private viewer;
    private raycaster;
    private pickingTexture;
    constructor(viewer: BaseViewer);
    get scene(): THREE.Scene;
    get camera(): THREE.OrthographicCamera;
    get renderer(): THREE.WebGLRenderer;
    get overlayRender(): import("..").CanvasRender;
    get viewerContainer(): HTMLElement;
    getRaycaster(): THREE.Raycaster;
    pickObjectByNdc(ndcCoord: THREE.Vector2, modelObject: THREE.Object3D | THREE.Object3D[]): {
        object: THREE.Object3D<THREE.Event>;
        point: THREE.Vector3;
        distance: number;
        face: THREE.Face | undefined;
        instanceId: number | undefined;
    } | undefined;
    pickObject(mousePosition: THREE.Vector2, modelObject: THREE.Object3D | THREE.Object3D[]): CpuIntersection | undefined;
    pickObjects(mousePosition: THREE.Vector2, modelObject: THREE.Object3D | THREE.Object3D[]): THREE.Intersection[];
    pickDrawable(worldPosition: THREE.Vector3): import("..").Drawable<Record<string, unknown>>[];
    /**
     *
     * @param mousePosition
     * @param width
     * @param height
     * @param pickScene
     * @returns
     * @description pick rect area buffer
     */
    private pickBuffer;
}
