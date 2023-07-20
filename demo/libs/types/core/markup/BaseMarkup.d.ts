import * as THREE from "three";
import { DrawableData } from "../../core/canvas/Constants";
import { Drawable } from "../../core/canvas/Drawable";
import type { TextMarkup } from "../../core/markup/TextMarkup";
export declare abstract class BaseMarkup extends Drawable {
    protected editPointSize: number;
    protected editPointColor: string;
    protected ctx?: CanvasRenderingContext2D;
    leaderText?: TextMarkup;
    parent?: BaseMarkup;
    constructor(id: string);
    isSelected(): boolean;
    drawSelect(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    private drawPoints;
    setEditPointSize(size: number): void;
    setEditPointColor(color: string): void;
    getCenter(): THREE.Vector3;
    isPointInPath(p: THREE.Vector3): boolean;
    setData(data: DrawableData): void;
    setParent(parent: BaseMarkup): void;
    setLeaderText(textMarkup: TextMarkup): void;
    update(points: THREE.Vector3[]): this;
    translate(tx: number, ty: number): this;
    rotate(): this;
    scale(): this;
}
