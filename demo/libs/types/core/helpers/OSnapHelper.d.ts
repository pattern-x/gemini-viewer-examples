import * as THREE from "three";
import { CanvasRender, Drawable, DrawableList } from "../../core/canvas";
import { ILine, OSnapMarkerType } from "../../core/utils";
export declare class SnapDrawable extends Drawable {
    static lineColor: string;
    static readonly FILL_COLOR_NONE = "rgba(0, 0, 0, 0)";
    static readonly SNAP_LINE_COLOR = "rgba(255, 240, 0, 0.3)";
    static lineWidth: number;
    static iconSize: number;
    needsFrustumCulled: boolean;
    renderOrder: number;
    snapType: OSnapMarkerType;
    private osnapInfo?;
    private drawSnapFunctions;
    private snapLineVisible;
    constructor(type: OSnapMarkerType);
    setSnapLineVisible(visible: boolean): void;
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    drawDebug(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    drawSelect(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    isPointInPath(p: THREE.Vector3): boolean;
    drawSnapLine(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    /**
     *      p1
     *      |
     *      | point (origin)
     *     / \
     *   /     \
     *  p2      p3
     */
    drawTripleCorss(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    drawSquare(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    drawTriangle(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    /**
     * Snap marker for circle center.
     */
    drawCircleWithCross(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    drawCross(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    /**
     * p4|\
     *   |  \
     * p2|____\ p1 (origin)
     *   |    | \
     *   |____|___\
     * P5     p3   P6
     */
    drawPerpendicular(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    update(osnapInfo: OSnapInfo): void;
    getClassType(): string;
}
export declare enum OSnapType {
    None = 0,
    PointOnLine = 1,
    StartPoint = 2,
    EndPoint = 4,
    MiddlePoint = 8,
    FootOfPerpendicular = 16,
    Intersection = 32,
    CircleCenter = 64
}
interface OSnapInfo {
    point: THREE.Vector3;
    distance: number;
    type: OSnapType;
    line?: ILine;
}
export declare class OSnapHelper {
    protected drawableList: DrawableList;
    protected overlayRender?: CanvasRender;
    protected markers: Record<number, SnapDrawable>;
    protected activeOSnapType: OSnapType;
    protected snapToleranceInWorldCoord: number;
    protected intersectionLimit: number;
    /**
     * OSnapType priority. Lower value has a higher priority.
     */
    osnapTypePriorities: Record<OSnapType, number>;
    constructor(overlayRender: CanvasRender);
    private initOSnapMarkers;
    /**
     * Sets snap tolerance in world coordinate.
     */
    setSnapTolerance(toleranceInWorldCoord: number): void;
    /**
     * Gets snap tolerance in world coordinate.
     */
    getSnapTolerance(): number;
    setIntersectionLimit(val: number): void;
    getIntersectionLimit(): number;
    /**
     * Gets osnap marker line color.
     * @returns rgb/rgba number array, each value is between 0 and 1. e.g. [0.92, 0.95, 0.96].
     */
    getMarkerLineColor(): number[];
    /**
     * Sets osnap marker line color.
     * @param color rgb/rgba number array, each value is between 0 and 1. e.g. [0.92, 0.95, 0.96].
     */
    setMarkerLineColor(color: number[]): void;
    /**
     * Gets osnap marker line width.
     */
    getMarkerLineWidth(): number;
    /**
     * Sets osnap marker line width.
     */
    setMarkerLineWidth(width: number): void;
    /**
     * Gets osnap marker icon size in pixel.
     */
    getMarkerIconSize(): number;
    /**
     * Sets osnap marker icon size in pixel.
     */
    setMarkerIconSize(size: number): void;
    getMarker(type: OSnapType): SnapDrawable;
    setAllSnapLinesVisible(visible: boolean): void;
    deactivate(): void;
    destroy(): void;
    /**
     * Tries to find a proper snap point and display corresponding marker.
     * @param intersections The raycaster intersections.
     * @param is3d If it is a 3d or 2d viewer.
     * @param lastMouseDownPosition Used in order to to get foot of perpendicular.
     * @returns Target snap point if any
     */
    handleSnap(intersections: THREE.Intersection[], is3d: boolean, raycaster?: THREE.Raycaster, lastMouseDownPosition?: THREE.Vector3): THREE.Vector3 | undefined;
    /**
     * Tries to find a proper snap point and display corresponding marker.
     * @param mousePosition Mouse position in world coordinate.
     * @param intersections
     * @param is3d If it is a 3d or 2d viewer.
     * @param lastMouseDownPosition Used in order to to get foot of perpendicular.
     * @returns Target snap point if any
     */
    protected getSnapPointAndUpdateMarker(mousePosition: THREE.Vector3, intersections: THREE.Intersection[], is3d: boolean, lastMouseDownPosition?: THREE.Vector3): THREE.Vector3 | undefined;
    activateMarker(type: OSnapType, osnapInfo?: OSnapInfo): void;
    private getFootOfPerpendicular;
    private getIntersectionPointsAndLines;
    private getSnapInfo;
    /**
     * Used for 3d scene to get outline info by faces.
     */
    private getIntersectsIncludeOutline;
}
export {};
