import * as THREE from "three";
import { Drawable, DrawableData } from "../canvas";
export declare abstract class BaseMarkup extends Drawable {
    protected editPointSize: number;
    protected editPointColor: string;
    protected ctx?: CanvasRenderingContext2D;
    constructor(id: string);
    isSelected(): boolean;
    drawSelect(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    private drawPoints;
    setEditPointSize(size: number): void;
    setEditPointColor(color: string): void;
    getCenter(): THREE.Vector3;
    isPointInPath(p: THREE.Vector3): boolean;
    setData(data: DrawableData): void;
    translate(tx: number, ty: number): this;
    rotate(): this;
    scale(): this;
    abstract update(points: THREE.Vector3[]): this;
}
