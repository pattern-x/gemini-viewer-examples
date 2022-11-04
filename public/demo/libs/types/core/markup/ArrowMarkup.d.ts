import { BaseMarkup } from "./BaseMarkup";
import * as THREE from "three";
import { MarkupType } from "./Constants";
export declare class ArrowMarkup extends BaseMarkup {
    type: MarkupType;
    constructor(id: string, points: THREE.Vector2[]);
    translate(tx: number, ty: number): this;
    rotate(): this;
    scale(): this;
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    private drawArrowLine;
    private drawArrowHead;
    isPointInPath(p: THREE.Vector2): boolean;
    getVertexs(): THREE.Vector2[];
    update(points: THREE.Vector2[]): this;
    getBounds(): THREE.Box2;
}
