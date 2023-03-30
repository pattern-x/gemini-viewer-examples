import * as THREE from "three";
import { SVGObject } from "src/core/patches/SVGRenderer";
/**
 * @internal
 */
export declare class CommonUtils {
    /**
     * Checks full screen mode
     */
    static isFullScreen(): boolean;
    /**
     * Enters full screen mode
     */
    static fullScreen(element?: HTMLElement): void;
    /**
     * Exits full screen mode
     */
    static exitFullscreen(): void;
    /**
     * Displays a pointer marker in a period of time.
     * @param duration display time in ms. 0/null/undefined means always display.
     */
    static displayPointMarker(scene: THREE.Scene, position: THREE.Vector3, duration?: number, radius?: number): SVGObject;
    /**
     * Join strings
     * @param args
     * @returns
     */
    static joinStrings(...args: string[]): string;
    /**
     * Converts a number to a string with proper fraction digits
     */
    static numberToString(num: number): string;
    static hexToBase64(hexstring: string): string;
    /**
     * Converts vector to a string with proper fraction digits
     */
    static vectorToString(vec: THREE.Vector2 | THREE.Vector3): string;
    /**
     * Converts number array to THREE.Vector2
     */
    static arrayToVector2(arr: number[] | THREE.Vector2 | undefined): THREE.Vector2 | undefined;
    /**
     * Converts number array to THREE.Vector3
     * If length of arr is 2, will assign z value to 0
     */
    static arrayToVector3(arr: number[] | THREE.Vector3 | undefined): THREE.Vector3 | undefined;
    /**
     * Converts number array to THREE.Euler
     */
    static arrayToEuler(arr: number[] | THREE.Euler | undefined): THREE.Euler | undefined;
    /**
     * Converts number array to THREE.Vector3
     */
    static arrayOrObjectToVector3(arrOrObj: number[] | THREE.Vector3 | undefined): THREE.Vector3 | undefined;
    static isVectorValid(vec: THREE.Vector2 | THREE.Vector3): boolean;
    static isBoxValid(box: THREE.Box2 | THREE.Box3): boolean;
    static isMatrixValid(matrix: THREE.Matrix4): boolean;
    static guid(): string;
    /**
     * Expands given box by a scale factor
     */
    static expandBoxByScale(box: THREE.Box3, scale: number): void;
    /**
     * Expands given box by a min size
     */
    static expandBoxByMinSize(box: THREE.Box3, minSize: number): void;
    /**
     * Generate random integers in the range [min, max]
     */
    static generateRandomInt(min: number, max: number): number;
    /**
     * Round to N decimal places
     */
    static roundNumber(value: number, n: number): number;
    static convertDecimalToHex(decimal: number | string): string;
    static canvasToImage(canvas: HTMLCanvasElement): Promise<HTMLImageElement>;
    /**
     * Takes screenshot to given rendering context and return base64 string in png/jpeg format.
     * @param bbox If valid, takes screenshot of a sub image with given bounding box in screen coordinate.
     */
    static renderingContextToImage(context: CanvasRenderingContext2D, bbox?: THREE.Box2, type?: string, quality?: number): string;
    /**
     * Prints memory usage
     */
    static printMemory(title: string): void;
    static printGpuInfo(webgl: WebGLRenderingContext): void;
}
/**
 * @internal
 */
export declare const setIcon: (classList: DOMTokenList, iconClass: IconClass, active: boolean) => void;
/**
 * @internal
 */
export interface IconClass {
    default: string;
    active?: string;
    iconFont?: string;
}
