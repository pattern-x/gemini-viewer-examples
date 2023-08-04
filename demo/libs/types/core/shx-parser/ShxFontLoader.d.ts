import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { FontFileData, ShxFont } from "./ShxFont";
export declare class ShxFontLoader extends FontLoader {
    constructor(manager?: THREE.LoadingManager);
    load(url: string | string[], onLoad?: ((responseFont: ShxFont) => void) | undefined, onProgress?: ((event: ProgressEvent<EventTarget>) => void) | undefined, onError?: ((event: ErrorEvent) => void) | undefined): void;
    private loadFile;
    loadAsync(url: string | string[], onProgress?: ((event: ProgressEvent<EventTarget>) => void) | undefined): Promise<ShxFont>;
    parse(dataArray: FontFileData[]): ShxFont;
    static isShxFile(url: string): boolean;
}
