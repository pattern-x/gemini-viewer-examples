import * as THREE from "three";
import { DrawableData } from "./Constants";
import { Drawable } from "./Drawable";
import { DrawableList } from "./DrawableList";
import { Event } from "../utils";
import type { BimViewer, DxfViewer } from "../viewers";
export type constructorReturnType<T> = new (...arg: any) => T;
export declare class CanvasRender extends Event {
    private viewer;
    private drawableLists;
    private canvas?;
    context?: CanvasRenderingContext2D;
    private frustum;
    private projScreenMatrix;
    static _registerDrawableClass(drawable: constructorReturnType<Drawable>): void;
    static createDrawable(data: DrawableData): Drawable;
    constructor(viewer: BimViewer | DxfViewer);
    get container(): HTMLElement;
    get camera(): THREE.Camera;
    get raycaster(): THREE.Raycaster;
    getPixelSize(scale: number, camera: THREE.Camera): number;
    private init;
    private initCanvas;
    private toHighDpr;
    clearCanvas(): void;
    addDrawableList(drawableList: DrawableList): void;
    render(): void;
    setSize(width: number, height: number): void;
    getSortedDrawables(): Drawable[];
    getDrawablesByPosition(p: THREE.Vector3, raycaster?: THREE.Raycaster): Drawable[];
    measureTextLength(text: string, font: string): number;
    screenshot(option?: {
        type: string;
        quality: number;
    }): Promise<string | undefined>;
    destroy(): void;
}