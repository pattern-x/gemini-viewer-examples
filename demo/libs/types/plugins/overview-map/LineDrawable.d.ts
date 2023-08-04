import * as THREE from "three";
import { Vector3 } from "../../core/Constants";
import { Drawable } from "../../core/canvas/Drawable";
export interface LineDrawableConfig {
    positions: Vector3[];
    lineWidth?: number;
    lineColor?: [number, number, number, number];
}
export declare class LineDrawable extends Drawable {
    positions: Vector3[];
    needsFrustumCulled: boolean;
    constructor(id: string, cfg: LineDrawableConfig);
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    getBounds(): THREE.Box3;
    drawSelect(): void;
    getClassType(): string;
    isPointInPath(): boolean;
    getBBox(): THREE.Box3;
}
