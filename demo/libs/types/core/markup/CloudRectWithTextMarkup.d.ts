import * as THREE from "three";
import { DrawableData } from "../../core/canvas";
import { BaseMarkup } from "../../core/markup/BaseMarkup";
import { MarkupType } from "../../core/markup/Constants";
export interface CloudRectWithTextShape extends DrawableData {
    text: string;
    fontSize: number;
    textPosition: number[];
}
export declare class CloudRectWithTextMarkup extends BaseMarkup {
    type: MarkupType;
    private textPosition;
    private controlPoints?;
    private vertexes?;
    private textBounds;
    private showLeaderLine;
    text: string;
    fontSize: number;
    private padding;
    constructor(id: string, points: THREE.Vector3[]);
    enableLeaderLine(enable: boolean): void;
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    private drawCloudRect;
    private drawLeaderLine;
    private drawText;
    translate(tx: number, ty: number): this;
    update(points: THREE.Vector3[]): this;
    getCloudPoints(): THREE.Vector3[];
    getBounds(): THREE.Box3;
    getVertexes(): THREE.Vector3[];
    updateTextPosition(p: THREE.Vector3): void;
    isLeaderTextSelected(p: THREE.Vector3): boolean;
    translateLeaderText(tx: number, ty: number): this;
    isPointInPath(p: THREE.Vector3): boolean;
    setFontSize(fontSize: number): void;
    setData(data: CloudRectWithTextShape): void;
    updateText(text: string): void;
    getData(): CloudRectWithTextShape;
    getClassType(): string;
}
