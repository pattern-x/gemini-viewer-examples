import * as THREE from "three";
import { DrawableData } from "../../core/canvas";
import { BaseMarkup } from "../../core/markup/BaseMarkup";
import { MarkupType } from "../../core/markup/Constants";
export interface TextShape extends DrawableData {
    text: string;
    fontSize: number;
}
export declare class TextMarkup extends BaseMarkup {
    text: string;
    fontSize: number;
    private textWidth;
    private textRow;
    type: MarkupType;
    constructor(id: string, points: THREE.Vector3[], text: string);
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    private drawText;
    private formatText;
    setFontSize(fontSize: number): void;
    update(points: THREE.Vector3[]): this;
    setData(data: TextShape): void;
    updateText(text: string): void;
    getData(): TextShape;
    getClassType(): string;
}
