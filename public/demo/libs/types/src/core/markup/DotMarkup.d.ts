import * as THREE from "three";
import { BaseMarkup } from "./BaseMarkup";
export declare class DotMarkup extends BaseMarkup {
    radius: number;
    constructor(id: string, points: THREE.Vector3[]);
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    update(points: THREE.Vector3[]): this;
    getClassType(): string;
}
