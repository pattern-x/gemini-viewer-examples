import * as THREE from "three";
import { Drawable } from "../../core/canvas";
/**
 * @internal
 */
export declare class CompareDrawable extends Drawable {
    boxes: THREE.Box3[];
    lineSegments: THREE.Vector3[][];
    constructor(id: string, boxes: THREE.Box3[]);
    private calculateCloudLineSegments;
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    private drawBox;
    drawSelect(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    isPointInPath(p: THREE.Vector3): boolean;
    getBounds(): THREE.Box3;
    getClassType(): string;
}
