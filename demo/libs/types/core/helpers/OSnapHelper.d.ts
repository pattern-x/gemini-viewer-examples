import * as THREE from "three";
import { CanvasRender, Drawable } from "../../core/canvas";
import { ILine, OSnapMarkerType } from "../../core/utils";
export declare class SnapDrawable extends Drawable {
    static readonly LINE_COLOR = "rgba(255, 240, 0, 0.8)";
    static readonly FILL_COLOR = "rgba(135, 206, 250, 0.5)";
    static readonly FILL_COLOR_NONE = "rgba(0, 0, 0, 0)";
    static readonly SNAP_LINE_COLOR = "rgba(255, 240, 0, 0.3)";
    static readonly LINE_WIDTH_1 = 0.8;
    static readonly LINE_WIDTH = 2.5;
    static readonly SNAP_ICON_SIZE = 10;
    needsFrustumCulled: boolean;
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
    drawDot(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    drawSquare(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    drawTriangle(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    drawCircleWithCross(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    drawCross(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
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
    private drawableList;
    private overlayRender?;
    private markers;
    private activeOSnapType;
    private snapTolerance;
    constructor(overlayRender: CanvasRender);
    private initOSnapMarkers;
    /**
     * Updates snap tolerance in world coordinate
     */
    updateSnapTolerance(tolerance: number): void;
    getSnapTolerance(): number;
    getMarker(type: OSnapType): SnapDrawable;
    deactivate(): void;
    destroy(): void;
    /**
     * Tries to find a proper snap point and display corresponding marker.
     * @param intersections
     * @returns Target snap point if any
     */
    handleSnap(mousePosition: THREE.Vector3, intersections: THREE.Intersection[], is3d: boolean, lastMouseDownPosition?: THREE.Vector3): THREE.Vector3 | undefined;
    private activateMarker;
    private getFootOfPerpendicular;
    private getIntersectionPointsAndLines;
    private getSnapInfo;
}
export {};
