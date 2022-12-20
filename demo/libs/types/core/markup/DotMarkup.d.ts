import { BaseMarkup } from "./BaseMarkup";
import * as THREE from "three";
import { MarkupType } from "./Constants";
export declare class DotMarkup extends BaseMarkup {
    radius: number;
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
