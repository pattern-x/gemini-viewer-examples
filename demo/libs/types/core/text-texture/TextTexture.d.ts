import * as THREE from "three";
export interface TextTextureConfig {
    text?: string;
    color?: string;
    alignment?: string;
    backgroundColor?: number;
    fontFamily?: string;
    /**
     * With fontSize 18 it generates a 64x64 image, 20 generates 128x128 one.
     */
    fontSize?: number;
    fontStyle?: string;
    fontVariant?: string;
    fontWeight?: string;
    lineGap?: number;
    padding?: number;
    strokeColor?: string;
    strokeWidth?: number;
}
export declare function toCSSFont(family: string, size: number, style: string, variant: string, weight: string): string;
export declare class TextTexture extends THREE.Texture {
    private readonly canvas;
    readonly isTextTexture = true;
    private needsRedraw;
    private contentOffset;
    private lineOffset;
    private width;
    private height;
    private lines;
    private font;
    private pixelRatio;
    cfg: Required<TextTextureConfig>;
    constructor(config: TextTextureConfig, canvas?: HTMLCanvasElement);
    private getContentWidth;
    private initDraw;
    private getDrawPosition;
    private draw;
    private getDrawingBufferWidth;
    private getDrawingBufferHeight;
    private computeOptimalPixelRatio;
    redrew(): void;
    setPixelRatio(value: number): void;
    setOptimalPixelRatio(object: THREE.Object3D, renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera | THREE.OrthographicCamera): void;
    updateConfig(config: TextTextureConfig): void;
}
