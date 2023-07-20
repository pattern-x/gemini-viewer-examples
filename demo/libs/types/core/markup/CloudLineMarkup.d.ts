import * as THREE from "three";
import { BaseMarkup } from "../../core/markup/BaseMarkup";
import { MarkupType } from "../../core/markup/Constants";
export declare class CloudLineMarkup extends BaseMarkup {
    type: MarkupType;
    constructor(id: string, points: THREE.Vector3[]);
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    static getControlPointByTwoPoints(p1: THREE.Vector2, p2: THREE.Vector2): THREE.Vector2;
    getClassType(): string;
}
