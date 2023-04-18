import * as THREE from "three";
import { BaseMeasureDrawable } from "../../core/measure/BaseMeasureDrawable";
import { MeasurementType } from "../../core/measure/BaseMeasurement";
export declare class AreaMeasureDrawable extends BaseMeasureDrawable {
    type: MeasurementType;
    constructor(id: string, points: THREE.Vector3[]);
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    drawText(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    calculateArea(points: THREE.Vector3[]): number;
    getBarycenter(points: THREE.Vector3[]): THREE.Vector3;
    isPointInPath(p: THREE.Vector3, raycaster?: THREE.Raycaster): boolean;
    getClassType(): string;
}
