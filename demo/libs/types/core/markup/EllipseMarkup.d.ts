import * as THREE from "three";
import { BaseMarkup } from "./BaseMarkup";
import { MarkupType } from "./Constants";
export declare class EllipseMarkup extends BaseMarkup {
    radiusX: number;
    radiusY: number;
    points: THREE.Vector2[];
    type: MarkupType;
    constructor(id: string, points: THREE.Vector2[]);
    translate(tx: number, ty: number): this;
    rotate(): this;
    scale(): this;
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    update(points: THREE.Vector2[]): this;
    isPointInPath(p: THREE.Vector2): boolean;
    getBounds(): THREE.Box2;
}
