import * as THREE from "three";
import { BaseMarkup } from "./BaseMarkup";
import { DrawableData } from "../../core/canvas";
import { MarkupType } from "../../core/markup/Constants";
export interface TextShape extends DrawableData {
    text: string;
    fontSize: number;
}
export declare class TextMarkup extends BaseMarkup {
    text: string;
    fontSize: number;
    type: MarkupType;
    private padding;
    constructor(id: string, points: THREE.Vector3[], text: string);
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    private drawText;
    private drawTextBorder;
    setFontSize(fontSize: number): void;
    update(points: THREE.Vector3[]): this;
    setData(data: TextShape): void;
    updateText(text: string): void;
    getData(): TextShape;
    getClassType(): string;
}
