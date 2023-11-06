import * as THREE from "three";
import type { BaseMeasureDrawable } from "./BaseMeasureDrawable";
import { Tooltip } from "../../components/tool-tip";
import { DrawableData } from "../../core/canvas/Constants";
import { DrawableList } from "../../core/canvas/DrawableList";
import type { MobileTouchHelperDrawable, OSnapHelper } from "../../core/helpers";
import { EventInfo, InputManager } from "../../core/input/InputManager";
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
export declare type MeasurementData = DrawableData;
declare type MeasurementEvents = {
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
    /**
     * Triggered when draw measure will be added
     */
    WillBeAdded: BaseMeasureDrawable;
    /**
     * Triggered when draw measure was updated
     */
    Updated: BaseMeasureDrawable;
    /**
     * Triggered when draw measure will be removed
     */
    WillBeRemoved: BaseMeasureDrawable;
};
/**
 * BaseMeasurement class
 */
export declare abstract class BaseMeasurement extends Event<MeasurementEvents> {
    protected type: MeasurementType;
    protected viewer: BaseViewer;
    private inputManager;
    protected drawList: DrawableList;
    protected osnapHelper: OSnapHelper;
    protected actived: boolean;
    protected mouseMoved: boolean;
    protected mouseDowned: boolean;
    protected touchDowned: boolean;
    protected lastMoveEvent?: EventInfo;
    protected lastMouseDownPosition?: THREE.Vector3;
    protected mouseDownPositionX: number;
    protected mouseDownPositionY: number;
    protected currentMeasureDrawable?: BaseMeasureDrawable;
    protected drawingPoints?: THREE.Vector3[];
    protected lastClickTime?: number;
    protected tooltip?: Tooltip;
    protected snapPoint?: THREE.Vector3 | undefined;
    protected completed?: boolean;
    protected clickedOnMeasurementDrawable?: BaseMeasureDrawable;
    protected mobileTouchHelper?: MobileTouchHelperDrawable;
    protected exitButton?: HTMLButtonElement;
    protected firstPickedListener?: () => void;
    protected completedListener?: () => void;
    constructor(type: MeasurementType, viewer: BaseViewer, input: InputManager, drawList: DrawableList, osnapHelper: OSnapHelper);
    get overlayRender(): import("../..").CanvasRender;
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
    protected abstract createMeasureDrawable(): BaseMeasureDrawable | undefined;
    protected onMouseMove(position: THREE.Vector3): void;
    protected createOrUpdateMeasureDrawable(position?: THREE.Vector3): void;
    /**
     * The closest intersection
     * @param e
     */
    getIntersections: (e: EventInfo) => THREE.Intersection[];
}
export {};
