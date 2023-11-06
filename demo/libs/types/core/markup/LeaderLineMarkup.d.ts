import * as THREE from "three";
import { MarkupType } from "./Constants";
import type { MarkupManager } from "./MarkupManager";
import { TextShape, TextMarkup } from "./TextMarkup";
export declare class LeaderLineMarkup extends TextMarkup {
    type: MarkupType;
    text: string;
    fontSize: number;
    private textBounds;
    constructor(id: string, points: THREE.Vector3[], text: string);
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    private drawArrowHead;
    private drawArrowLine;
    protected drawText(ctx: CanvasRenderingContext2D, camera: THREE.Camera, text: string): void;
    getVertexes(): THREE.Vector3[];
    update(points: THREE.Vector3[]): this;
    getData(): TextShape;
    isPointInPath(p: THREE.Vector3): boolean;
    updateText(text: string): void;
    getClassType(): string;
    addInput(manager: MarkupManager, x: number, y: number): void;
    handleInput: () => void;
    handleCompositionEnd: () => void;
    private calcuTextInputPositionByText;
}
