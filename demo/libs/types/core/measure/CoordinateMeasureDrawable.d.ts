import * as THREE from "three";
import { BaseMeasureDrawable } from "../../core/measure/BaseMeasureDrawable";
import { MeasurementType } from "../../core/measure/BaseMeasurement";
export declare class CoordinateMeasureDrawable extends BaseMeasureDrawable {
    type: MeasurementType;
    constructor(id: string, points: THREE.Vector3[]);
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    drawText(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    getClassType(): string;
}
