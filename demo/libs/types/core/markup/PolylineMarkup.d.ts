import * as THREE from "three";
import { BaseMarkup } from "./BaseMarkup";
import { MarkupType } from "./Constants";
export declare class PolylineMarkup extends BaseMarkup {
    points: THREE.Vector2[];
    type: MarkupType;
    constructor(id: string, points: THREE.Vector2[]);
    translate(tx: number, ty: number): this;
    rotate(): this;
    scale(): this;
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    isPointInPath(p: THREE.Vector2): boolean;
    getVertexs(): THREE.Vector2[];
    update(points: THREE.Vector2[]): this;
    getBounds(): THREE.Box2;
}
