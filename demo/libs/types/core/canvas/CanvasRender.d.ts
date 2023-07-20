import * as THREE from "three";
import { DrawableData } from "./Constants";
import { Drawable } from "./Drawable";
import type { DrawableList } from "./DrawableList";
import { Event } from "../../core/utils";
import type { BimViewer, DxfViewer } from "../../core/viewers";
/**
 * @internal
 */
export declare type constructorReturnType<T> = new (...arg: any) => T;
/**
 * @internal
 */
export declare class CanvasRender extends Event {
    private viewer;
    private drawableLists;
    private canvas?;
    context?: CanvasRenderingContext2D;
    private frustum;
    private projScreenMatrix;
    static _registerDrawableClass(drawable: constructorReturnType<Drawable>): void;
    static createDrawable(data: DrawableData): Drawable<Record<string, unknown>>;
    constructor(viewer: BimViewer | DxfViewer);
    get container(): HTMLElement;
    get camera(): THREE.Camera;
    get raycaster(): THREE.Raycaster;
    private init;
    private initCanvas;
    private toHighDpr;
    clearCanvas(): void;
    addDrawableList(drawableList: DrawableList): void;
    render(): void;
    setSize(width: number, height: number): void;
    getSortedDrawables(onlyVisible?: boolean): Drawable<Record<string, unknown>>[];
    getDrawablesByPosition(p: THREE.Vector3, raycaster?: THREE.Raycaster): Drawable[];
    getDrawableById(id: string): Drawable<Record<string, unknown>> | undefined;
    measureTextLength(text: string, font: string): number;
    /**
     *
     * @param option
     * @returns
     * @deprecated
     */
    screenshot(option?: {
        type: string;
        quality: number;
    }): Promise<string | undefined>;
    getImage(filter: (drawabkle: Drawable) => boolean): Promise<HTMLImageElement>;
    getCanvas(): HTMLCanvasElement | undefined;
    destroy(): void;
}
