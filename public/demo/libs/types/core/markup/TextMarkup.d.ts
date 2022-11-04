import * as THREE from "three";
import { BaseMarkup } from "./BaseMarkup";
import { MarkupData, MarkupType } from "./Constants";
export interface TextShape extends MarkupData {
    text: string;
    fontSize: number;
}
export declare class TextMarkup extends BaseMarkup {
    text: string;
    fontSize: number;
    private textWidth;
    private textRow;
    type: MarkupType;
    constructor(id: string, points: THREE.Vector2[], text: string);
    translate(tx: number, ty: number): this;
    rotate(): this;
    scale(): this;
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    private drawText;
    private formatText;
    setFontSize(fontSize: number): void;
    update(points: THREE.Vector2[]): this;
    updateText(text: string): void;
    getBounds(): THREE.Box2;
    getData(): TextShape;
}
