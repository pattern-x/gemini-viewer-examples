import { BaseMarkup } from "./BaseMarkup";
import * as THREE from "three";
import { MarkupType } from "./Constants";
export declare class CloudLineMarkup extends BaseMarkup {
    points: THREE.Vector2[];
    type: MarkupType;
    constructor(id: string, points: THREE.Vector2[]);
    translate(tx: number, ty: number): this;
    rotate(): this;
    scale(): this;
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    static getControlPointByTwoPoints(p1: THREE.Vector2, p2: THREE.Vector2): THREE.Vector2;
    private calculateWidthAndHeight;
    update(points: THREE.Vector2[]): this;
    getBounds(): THREE.Box2;
}
