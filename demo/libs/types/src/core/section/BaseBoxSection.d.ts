import { Box3, Group, LineSegments, Mesh, OrthographicCamera, PerspectiveCamera, Plane, Raycaster, Scene, Vector2, Vector3, WebGLRenderer } from "three";
import { CameraControlsEx } from "../controls/CameraControlsEx";
import { Views } from "../utils/Viewer3DUtils";
/**
 * Object's box section
 */
export declare class BaseBoxSection {
    isOpen: boolean;
    protected sectionBox?: Box3;
    protected scene: Scene;
    protected camera: PerspectiveCamera | OrthographicCamera;
    protected renderer: WebGLRenderer;
    protected controls: CameraControlsEx;
    protected draggableArrowView: Views | string;
    protected visibleArrowView: Views | string;
    /**
     * Constructor
     */
    constructor(scene: Scene, camera: PerspectiveCamera | OrthographicCamera, renderer: WebGLRenderer, controls: CameraControlsEx);
    /**
     * If sectionBox is not assigned in constructor, then set it here.
     * For now, we only support it to be set once. Otherwise, need to check isOpen status, and initSectionBox properly.
     * @param sectionBox
     */
    protected setSectionBox(sectionBox: Box3): void;
    /**
     * Starts to clip
     */
    open(): void;
    /**
     * Close clipper
     */
    close(): void;
    /**
     * reset clipper
     */
    reset(): void;
    protected sectionBoxBoundary: Box3;
    protected group: Group;
    protected arrows: Map<Views, Group>;
    protected planes: Array<Plane>;
    protected vertices: Vector3[];
    protected faces: Array<BoxFace>;
    protected lines: Array<BoxLine>;
    protected sectionPlaneMap: Map<Views, Plane>;
    /**
     * Initialize clip box
     */
    protected initSectionBox(): void;
    /**
     * Initialize 6 section plane
     */
    protected initPlanes(): void;
    protected updatePlanes(): void;
    /**
     * Initialize or update 8 vertices of section box
     */
    protected initOrUpdateVertices(): void;
    /**
     * Initialize 6 faces of section box
     */
    protected initOrUpdateFaces(): void;
    /**
     * Initialize 12 lines of section box
     */
    protected initOrUpdateLines(): void;
    initArrowGizmos(): void;
    protected setArrowPosition(setArrowDirection?: boolean): void;
    protected localToWorldVec(localVec: Vector3, normalize?: boolean): Vector3;
    protected worldToLocalVec(worldVec: Vector3): Vector3;
    protected getTranslationPlane(worldAxis: Vector3): Vector3;
    protected getPointerPlaneIntersect(mouse: number[], axis: Vector3, offset?: number): false | Vector3;
    protected dragTranslateSectionPlane(baseAxis: Vector3, from: number[], to: number[]): void;
    protected dragRotateSectionPlane(baseAxis: Vector3, from: number[], to: number[]): void;
    protected getBoxFaceVerties(view: Views): Vector3[];
    /**
     * Clears clip box
     */
    protected clearSectionBox(): void;
    protected raycaster: Raycaster;
    protected mousePosition: Vector2;
    protected activeFace: BoxFace | null;
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
    /**
     * Handles mouse move event, highlights corresponding face/lines properly
     */
    protected onMouseMove: (event: MouseEvent) => void;
    protected isMouseDown: boolean;
    /**
     * Handles mouse down event, starts to drag a face using left button
     */
    protected onMouseDown: (event: MouseEvent) => void;
    protected lastCanvasPos?: number[];
    protected dragStart: () => void;
    protected dragEnd: () => void;
    protected dragMove: (event: MouseEvent) => void;
}
/**
 * BoxLine of a section box
 */
export declare class BoxLine extends LineSegments {
    private normalMaterial;
    private activeMaterial;
    /**
     * @param vertices two points of a line
     * @param faces two faces relative to a line
     */
    constructor(vertices: Array<Vector3>, faces: Array<BoxFace>);
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
 * BoxFace of a section box
 */
export declare class BoxFace extends Mesh {
    axis: string;
    lines: Array<BoxLine>;
    backFace: Mesh;
    vertices: Vector3[];
    /**
     * @param axis axis of a face
     * @param vertices 4 points of a face
     */
    constructor(axis: string, vertices: Array<Vector3>);
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
