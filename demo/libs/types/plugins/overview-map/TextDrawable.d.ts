import * as THREE from "three";
import { Vector3, Vector2 } from "../../core/Constants";
import { Drawable } from "../../core/canvas/Drawable";
export interface TextStyle {
    fontSize?: number;
    fontWeight?: string;
    fontFamily?: string;
    fontColor?: string;
    outlineColor?: string;
    outlineWidth?: number;
    backgroundColor?: string;
    borderRadius?: number;
    borderWidth?: number;
    borderColor?: string;
}
export interface TextDrawableConfig {
    text: string;
    position: Vector3;
    radius?: number;
    offset?: Vector2;
    textStyle?: TextStyle;
}
export declare class TextDrawable extends Drawable {
    text: string;
    position: Vector3;
    offset: Vector2;
    textStyle: TextStyle;
    radius?: number;
    needsFrustumCulled: boolean;
    constructor(id: string, cfg: TextDrawableConfig);
    private getFont;
    drawRoundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void;
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    getBounds(): THREE.Box3;
    drawSelect(): void;
    getClassType(): string;
    isPointInPath(): boolean;
    getBBox(): THREE.Box3;
}
