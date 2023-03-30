import * as THREE from "three";
import { BaseMarkup } from "../../core/markup/BaseMarkup";
import { MarkupType } from "../../core/markup/Constants";
export declare class PolylineMarkup extends BaseMarkup {
    type: MarkupType;
    constructor(id: string, points: THREE.Vector3[]);
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    isPointInPath(p: THREE.Vector3): boolean;
    getVertexs(): THREE.Vector3[];
    update(points: THREE.Vector3[]): this;
    getClassType(): string;
}
