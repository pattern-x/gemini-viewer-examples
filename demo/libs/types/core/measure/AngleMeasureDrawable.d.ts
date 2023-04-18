import * as THREE from "three";
import { BaseMeasureDrawable } from "../../core/measure/BaseMeasureDrawable";
import { MeasurementType } from "../../core/measure/BaseMeasurement";
export declare class AngleMeasureDrawable extends BaseMeasureDrawable {
    type: MeasurementType;
    constructor(id: string, points: THREE.Vector3[]);
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    drawText(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    getAngleBisector(startPoint: THREE.Vector3, middlePoint: THREE.Vector3, endPoint: THREE.Vector3): THREE.Vector3;
    calculateAngle(startPoint: THREE.Vector3, middlePoint: THREE.Vector3, endPoint: THREE.Vector3): number;
    getClassType(): string;
}
