import * as THREE from "three";
import { Tooltip } from "../../components/tool-tip";
import { DrawableData } from "../../core/canvas/Constants";
import { DrawableList } from "../../core/canvas/DrawableList";
import type { MobileTouchHelperDrawable, OSnapHelper } from "../../core/helpers";
import { EventInfo, InputManager } from "../../core/input/InputManager";
import type { BaseMeasureDrawable } from "../../core/measure/BaseMeasureDrawable";
import { Event } from "../../core/utils";
import type { BaseViewer } from "../../core/viewers";
/**
 * Measurement type. e.g. distance measurement, area measurement, etc.
 */
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
     * e.g., You can use "[[1, 1], [2.5, 3]]" to represent a distance measurement result
     * "[1, 1]" is the first point, and "[2.5, 3]" is the second point.
     */
    points: number[][];
}
type MeasureHandler = {
    /**
     * Triggered when clicked measure
     */
    ClickedOnMeasurement: BaseMeasureDrawable;
    /**
     * Triggered when draw measure completed
     */
    Completed: BaseMeasureDrawable;
    /**
     * Triggered when deactivate measure
     */
    Deactivate: MeasurementType;
    /**
     * Triggered when draw first point
     */
    FirstPointPicked: BaseMeasureDrawable;
};
/**
 * BaseMeasurement class
 */
export declare abstract class BaseMeasurement extends Event<MeasureHandler> {
    protected type: MeasurementType;
    protected viewer: BaseViewer;
    private inputManager;
    protected drawList: DrawableList;
    protected osnapHelper: OSnapHelper;
    protected raycaster?: THREE.Raycaster;
    protected mouseMoved: boolean;
    protected mouseDowned: boolean;
    protected touchDowned: boolean;
    protected lastMoveEvent?: EventInfo;
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
    protected mobileTouchHelper?: MobileTouchHelperDrawable;
    protected exitButton?: HTMLButtonElement;
    protected firstPickedListerner?: () => void;
    protected completedListerner?: () => void;
    constructor(type: MeasurementType, viewer: BaseViewer, input: InputManager, drawList: DrawableList, osnapHelper: OSnapHelper);
    get canvas(): HTMLCanvasElement;
    get camera(): THREE.Camera;
    get renderer(): THREE.WebGLRenderer;
    /**
     * If measurement is active.
     * Here let's use raycaster to identify whether this measurement is active.
     */
    get isActive(): boolean;
    /**
     * If it started to measure, but a measruement action is not completed yet.
     */
    get isMeasuring(): boolean;
    setTouchHelper(mobileTouchHelper: MobileTouchHelperDrawable): void;
    protected createMobileExitButton(): HTMLButtonElement;
    activate(): void;
    deactivate(): void;
    protected removeDrawable(drawable: BaseMeasureDrawable): void;
    clearClickedDrawable(): void;
    touchstart: (e: EventInfo) => void;
    touchmove: (e: EventInfo) => void;
    touchend: (e: EventInfo) => void;
    mousedown: (e: EventInfo) => void;
    mousemove: (e: EventInfo) => void;
    mouseup: (e: EventInfo) => void;
    dblclick: () => void;
    protected onMouseClick(e: EventInfo): void;
    protected selectMeasurementByEvent(e: EventInfo): void;
    keydown: (e: EventInfo) => void;
    abstract exitDrawing(): void;
    abstract cancel(): void;
    protected abstract complete(): void;
    protected abstract setTooltipContent(): void;
    protected abstract onMouseMove(position: THREE.Vector3): void;
    /**
     * The closest intersection
     * @param e
     */
    getIntersections: (e: EventInfo) => THREE.Intersection[];
    private getIntersectsIncludeOutline;
    lastMouseDownPosition?: THREE.Vector3;
    private handleSnap;
}
export {};
