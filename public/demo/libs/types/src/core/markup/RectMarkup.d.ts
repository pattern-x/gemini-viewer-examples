import * as THREE from "three";
import { BaseMarkup } from "./BaseMarkup";
import { MarkupType } from "./Constants";
export declare class RectMarkup extends BaseMarkup {
    type: MarkupType;
    constructor(id: string, points: THREE.Vector3[]);
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    update(points: THREE.Vector3[]): this;
    isPointInPath(p: THREE.Vector3): boolean;
    getClassType(): string;
}
