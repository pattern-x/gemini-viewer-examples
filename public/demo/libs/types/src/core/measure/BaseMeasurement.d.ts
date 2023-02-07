import * as THREE from "three";
import { BaseMeasureDrawable } from "./BaseMeasureDrawable";
import { Tooltip } from "../../components/tool-tip/Tooltip";
import { DrawableData } from "../canvas";
import { DrawableList } from "../canvas/DrawableList";
import { OSnapHelper } from "../helpers/OSnapHelper";
import { Event } from "../utils";
import type { BaseViewer } from "../viewers/BaseViewer";
export declare enum MeasurementType {
    Distance = "Distance",
    Area = "Area",
    Angle = "Angle",
    /**
     * @internal
     */
    Coordinate = "Coordinate"
}
/**
 * Serializable measurement data
 */
export interface MeasurementData extends DrawableData {
    type: MeasurementType;
    /**
     * 36 byte guid used by business logic to manage(find, delete, etc.) measurements
     */
    id: string;
    /**
     * Two dimension float array stores 2d or 3d points.
     * e.g. [[1, 1, 1], [2.5, 3, 5]]
     */
    points: number[][];
}
/**
 * BaseMeasurement class
 */
export declare abstract class BaseMeasurement extends Event {
    static MAX_DISTANCE: number;
    protected type: MeasurementType;
    protected viewer: BaseViewer;
    protected drawList: DrawableList;
    protected osnapHelper: OSnapHelper;
    protected raycaster?: THREE.Raycaster;
    protected mouseMoved: boolean;
    protected mouseDowned: boolean;
    protected lastMoveEvent?: MouseEvent;
    protected mouseDownPositionX: number;
    protected mouseDownPositionY: number;
    protected currentMeasureDrawable?: BaseMeasureDrawable;
    protected drawingPoints?: THREE.Vector3[];
    protected lastClickTime?: number;
    protected tooltip?: Tooltip;
    protected tempEdgeMaterial: THREE.LineBasicMaterial;
    protected snapPoint?: THREE.Vector3 | undefined;
    protected completed?: boolean;
    protected clickedOnMeasurementDrawable?: BaseMeasureDrawable;
    constructor(type: MeasurementType, viewer: BaseViewer, drawList: DrawableList, osnapHelper: OSnapHelper);
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
    protected removeDrawable(drawable: BaseMeasureDrawable): void;
    clearClickedDrawable(): void;
    mousedown: (e: MouseEvent) => void;
    mousemove: (e: MouseEvent) => void;
    mouseup: (e: MouseEvent) => void;
    dblclick: () => void;
    protected onMouseClick(e: MouseEvent): void;
    keydown: (e: KeyboardEvent) => void;
    protected abstract complete(): void;
    abstract cancel(): void;
    protected abstract setTooltipContent(): void;
    protected abstract onMouseMove(position: THREE.Vector3): void;
    /**
     * The closest intersection
     * @param e
     */
    getIntersections: (e: MouseEvent) => THREE.Intersection[];
    private getIntersectsOutline;
    lastMouseDownPosition?: THREE.Vector3;
    private handleSnap;
}
