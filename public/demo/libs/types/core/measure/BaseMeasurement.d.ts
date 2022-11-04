import * as THREE from "three";
import { BimViewer, DxfViewer } from "..";
import { Event } from "../utils";
import { OSnapHelper } from "../helpers/OSnapHelper";
import { SVGObject } from "three/examples/jsm/renderers/SVGRenderer";
import { Tooltip } from "../../components/tool-tip/Tooltip";
export declare enum MeasurementType {
    Distance = "Distance",
    Area = "Area",
    Angle = "Angle"
}
/**
 * Serializable measurement data
 */
export interface MeasurementData {
    type: MeasurementType;
    /**
     * 36 byte guid used by business logic to manage(find, delete, etc.) measurements
     */
    id?: string;
    /**
     * Two dimension float array stores 2d or 3d points.
     * e.g. [[1, 1], [2.5, 3]]
     */
    points: number[][];
}
/**
 * Stores measurement data and drawable assets in canvas
 */
export interface MeasurementAssets {
    measurementsData: MeasurementData;
    markers: THREE.Group;
}
/**
 * BaseMeasurement class
 */
export declare abstract class BaseMeasurement extends Event {
    static MAX_DISTANCE: number;
    static OBJ_NAME: string;
    static LABEL_NAME: string;
    static LINE_MATERIAL: THREE.LineBasicMaterial;
    static MESH_MATERIAL: THREE.MeshBasicMaterial;
    protected type: MeasurementType;
    protected viewer: BimViewer | DxfViewer;
    protected scene: THREE.Scene;
    protected osnapHelper: OSnapHelper;
    protected raycaster?: THREE.Raycaster;
    protected mouseMoved: boolean;
    protected mouseDowned: boolean;
    protected lastMoveEvent?: MouseEvent;
    protected mouseDownPositionX: number;
    protected mouseDownPositionY: number;
    protected measurementAssets?: MeasurementAssets;
    protected lastClickTime?: number;
    protected tooltip?: Tooltip;
    protected snapPoint?: THREE.Vector3 | undefined;
    protected completed: boolean;
    private snapObjectMap;
    constructor(type: MeasurementType, viewer: BimViewer | DxfViewer, scene: THREE.Scene, osnapHelper: OSnapHelper);
    get canvas(): HTMLCanvasElement;
    get camera(): THREE.Camera;
    /**
     * If measurement is active.
     * Here let's use raycaster to identify whether this measurement is active.
     */
    get isActive(): boolean;
    /**
     * If it started to measure, but a measruement action is not completed yet.
     */
    get isMeasuring(): boolean;
    activate(): void;
    deactivate(): void;
    protected toVecArr(points: number[][]): THREE.Vector3[];
    protected createMeasurementAssets(data?: MeasurementData): MeasurementAssets;
    /**
     * Creates point marker
     */
    protected createPointMarker(position?: THREE.Vector3): SVGObject;
    /**
     * Creates THREE.Line
     */
    protected createLine(material?: THREE.LineBasicMaterial, points?: THREE.Vector3[]): THREE.Line;
    /**
     * Creates THREE.Mesh
     */
    protected createFaces(points?: THREE.Vector3[]): THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>;
    protected getLabelColor(): string;
    mousedown: (e: MouseEvent) => void;
    mousemove: (e: MouseEvent) => void;
    mouseup: (e: MouseEvent) => void;
    dblclick: () => void;
    protected onMouseClick(e: MouseEvent): void;
    keydown: (e: KeyboardEvent) => void;
    abstract select(assets: MeasurementAssets): void;
    abstract unselect(assets: MeasurementAssets): void;
    abstract createMeasurementAssetsByData(data: MeasurementData): MeasurementAssets;
    protected abstract complete(): void;
    abstract cancel(): void;
    protected abstract setTooltipContent(): void;
    protected abstract onMouseMove(position: THREE.Vector3): void;
    /**
     * The closest intersection
     * @param e
     */
    getIntersections: (e: MouseEvent) => THREE.Intersection[];
    /**
     * Creates the arc curve to indicate the angle in degree
     */
    createCurve(p0: THREE.Vector3, p1: THREE.Vector3, p2: THREE.Vector3): THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>;
    /**
     * Calculates area in BimViewer
     * @param points
     */
    calculateArea(points: THREE.Vector3[]): number;
    /**
     * Gets included angle of two lines in degree
     */
    calculateAngle(startPoint: THREE.Vector3, middlePoint: THREE.Vector3, endPoint: THREE.Vector3): number;
    /**
     * Gets angle bisector of two lines
     */
    getAngleBisector(startPoint: THREE.Vector3, middlePoint: THREE.Vector3, endPoint: THREE.Vector3): THREE.Vector3;
    /**
     * Get the barycenter of points
     */
    getBarycenter(points: THREE.Vector3[]): THREE.Vector3;
    /**
     * Gets unit string for distance, area or angle
     * TODO: make units configurable
     */
    getUnitString(): string;
    private handleSnap;
    private transToWorldCoord;
}
