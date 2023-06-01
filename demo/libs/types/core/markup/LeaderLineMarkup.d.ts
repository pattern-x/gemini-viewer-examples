import * as THREE from "three";
import { BaseMarkup } from "./BaseMarkup";
import { MarkupType } from "./Constants";
import { TextShape } from "./TextMarkup";
export declare class LeaderLineMarkup extends BaseMarkup {
    type: MarkupType;
    text: string;
    fontSize: number;
    private textBounds;
    constructor(id: string, points: THREE.Vector3[]);
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    private drawArrowHead;
    private drawArrowLine;
    private drawText;
    setFontSize(fontSize: number): void;
    getVertexes(): THREE.Vector3[];
    setData(data: TextShape): void;
    getData(): TextShape;
    isPointInPath(p: THREE.Vector3): boolean;
    updateText(text: string): void;
    getClassType(): string;
}
