import * as THREE from "three";
import { Box3, Group, LineSegments, Matrix4, Mesh, Plane, Raycaster, Scene, Vector2, Vector3, WebGLRenderer } from "three";
import { CameraControlsEx } from "../controls/CameraControlsEx";
import { ObjectPixelSizeHelper } from "../helpers/ObjectPixelSizeHelper";
declare enum ActionType {
    None = "",
    TranslateX = "TranslateX",
    TranslateY = "TranslateY",
    TranslateZ = "TranslateZ",
    RotateX = "RotateX",
    RotateY = "RotateY",
    RotateZ = "RotateZ"
}
/**
 * Object's plane section
 */
export declare class BasePlaneSection {
    isOpen: boolean;
    protected scene: Scene;
    protected camera: THREE.Camera;
    protected renderer: WebGLRenderer;
    protected controls: CameraControlsEx;
    protected isSectionObjectVisible: boolean;
    protected gizmo: THREE.Group;
    protected objectPixelSizeHelper?: ObjectPixelSizeHelper;
    canvasHeight: number;
    /**
     * Constructor
     */
    constructor(scene: Scene, camera: THREE.Camera, renderer: WebGLRenderer, controls: CameraControlsEx);
    /**
     * If plane is not assigned in constructor, then set it here.
     * For now, we only support it to be set once. Otherwise, need to check isOpen status, and initSectionPlane properly.
     */
    setSectionPlane(box: Box3): void;
    rotatePlane(axis: Vector3, angle: number): void;
    movePlaneToCenter(center: Vector3): void;
    /**
     * Sets section object's visibility, in case caller don't want to see it
     */
    setSectionObjectVisible(visible: boolean): void;
    /**
     * Starts to section
     */
    open(): void;
    /**
     * Close section
     */
    close(): void;
    /**
     * reset section
     */
    reset(): void;
    /**
     * Sets a matrix for section planes, which constains rotation on x, y, z, scale, etc.
     * Should call this after initSectionPlane() is called.
     * The rotation can be any value, but the editor (drag tool) doesn't work well when rotation is too big!
     * So, we'd better to limmit user from applying a big value.
     */
    setMatrix(matrix: Matrix4): void;
    protected boxMin: Vector3;
    protected boxMax: Vector3;
    protected group: Group;
    protected hoverGroup: Group;
    planes: Plane[];
    protected vertices: THREE.Vector3[];
    protected pointMarkers: Mesh[];
    protected face?: BoxFace;
    protected lines: BoxLine[];
    /**
     * Initialize section plane
     */
    protected initSectionPlane(): void;
    /**
     * Initialize section planes
     */
    protected initPlanes(): void;
    /**
     * Updates planes for section plane
     */
    protected updatePlanes(): void;
    /**
     * Initialize or update 4 vertices of section plane
     */
    protected initOrUpdateVertices(): void;
    protected initControllerMarkers(): void;
    protected updateControllerMarkers(): void;
    /**
     * Initialize 1 face of section plane
     */
    protected initOrUpdateFace(): void;
    protected updateHoverVisibles(): void;
    protected initGizmo(): void;
    /**
     * Initialize 4 lines of section plane
     */
    protected initOrUpdateLines(): void;
    /**
     * Clears section plane
     */
    protected clearSectionPlane(): void;
    protected raycaster: Raycaster;
    protected mousePosition: Vector2;
    protected activeFace: BoxFace | undefined;
    protected activeMarker: Mesh | undefined;
    protected isMouseDown: boolean;
    protected activeActionType: ActionType;
    protected lastCanvasPos?: number[];
    /**
     * Adds mouse event listener
     */
    private addMouseListener;
    /**
     * Removes mouse event listener
     */
    private removeMouseListener;
    /**
     * Converts mouse coordinates, and updates raycaster
     */
    protected updateMouseAndRay(event: MouseEvent): void;
    protected getCanvasPos(event: MouseEvent): number[];
    protected localToWorldVec(localVec: Vector3, normalize?: boolean): THREE.Vector3;
    protected getTranslationPlane(worldAxis: Vector3): THREE.Vector3;
    protected getPointerPlaneIntersect(mouse: number[], axis: Vector3, offset?: number): THREE.Vector3 | undefined;
    protected dragTranslateSectionPlane(baseAxis: Vector3, from: number[], to: number[]): void;
    protected dragRotateSectionPlane(baseAxis: Vector3, from: number[], to: number[]): void;
    protected updatePosition(): void;
    /**
     * Handles mouse move event, highlights corresponding face/lines properly
     */
    protected onMouseMove: (event: MouseEvent) => void;
    /**
     * Handles mouse down event, starts to drag a face using left button
     */
    protected onMouseDown: (event: MouseEvent) => void;
    protected dragStart(): void;
    protected dragMove: (event: MouseEvent) => void;
    protected dragUp: () => void;
}
/**
 * BoxLine of a section plane
 */
declare class BoxLine extends LineSegments {
    private normalMaterial;
    private activeMaterial;
    /**
     * @param vertices two points of a line
     * @param faces two faces relative to a line
     */
    constructor(vertices: Vector3[], faces: BoxFace[]);
    /**
     * Updates geometry
     */
    setFromPoints(vertices: Vector3[]): void;
    /**
     * Sets to active or inactive
     * @param isActive
     */
    setActive(isActive: boolean): void;
}
/**
 * BoxFace of a section plane
 */
declare class BoxFace extends Mesh {
    axis: string;
    lines: BoxLine[];
    /**
     * @param axis axis of a face
     * @param vertices 4 points of a face
     */
    constructor(axis: string, vertices: Vector3[]);
    /**
     * Updates geometry
     */
    setFromPoints(vertices: Vector3[]): void;
    /**
     * Sets to active or inactive
     * @param isActive
     */
    setActive(isActive: boolean): void;
}
export {};
