import * as THREE from "three";
import { MeasurementData, MeasurementType } from "./BaseMeasurement";
import { Drawable } from "../canvas/Drawable";
export declare abstract class BaseMeasureDrawable extends Drawable {
    type: MeasurementType;
    static readonly MAJOR_COLOR = "rgba(249, 157, 11, 0.9)";
    static readonly MINOR_COLOR = "rgb(255, 255, 255)";
    static readonly AREA_FILL_COLOR = "rgba(249, 157, 11, 0.3)";
    static readonly LINE_WIDTH = 2;
    static readonly POINT_RADIUS = 5;
    static readonly LABEL_FONT_SIZE = 14;
    label?: string;
    labelPositon?: THREE.Vector2;
    labelBounds: THREE.Box2;
    drawing: boolean;
    constructor(id: string, points: THREE.Vector3[]);
    setDrawingState(isDrawing: boolean): void;
    drawSelect(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    drawPoints(ctx: CanvasRenderingContext2D, camera: THREE.Camera, points: THREE.Vector3[]): void;
    drawText(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    drawRoundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number): void;
    getVertexs(): THREE.Vector3[];
    update(points: THREE.Vector3[]): this;
    getBounds(): THREE.Box3;
    getData(): MeasurementData;
    setData(data: MeasurementData): void;
    isPointInPath(p: THREE.Vector3, raycaster?: THREE.Raycaster): boolean;
    getUnitString(): string;
}
