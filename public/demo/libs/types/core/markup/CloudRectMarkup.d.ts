import { BaseMarkup } from "./BaseMarkup";
import * as THREE from "three";
import { MarkupType } from "./Constants";
export declare class CloudRectMarkup extends BaseMarkup {
    type: MarkupType;
    constructor(id: string, points: THREE.Vector2[]);
    translate(tx: number, ty: number): this;
    rotate(angle: number): this;
    scale(sx: number, sy: number): this;
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    update(points: THREE.Vector2[]): this;
    isPointInPath(p: THREE.Vector2): boolean;
    getBounds(): THREE.Box2;
}
