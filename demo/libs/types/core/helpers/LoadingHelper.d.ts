import * as THREE from "three";
import { Font } from "three/examples/jsm/loaders/FontLoader.js";
import type { DxfData, DxfLoaderConfig } from "../../core/dxf";
import type { ShxFont } from "../../core/shx-parser";
export declare class LoadingHelper {
    private static decoderPath;
    private gltfLoader?;
    private font?;
    private manager?;
    constructor(manager?: THREE.LoadingManager);
    /**
     * Loads a model from local
     * @param url Created by URL.createObjectURL(file)
     * @param src Source filename, used to find out format
     * @param onProgress On progress callback
     * @returns Loaded object
     */
    loadLocalModel(url: string, src: string, onProgress?: (event: ProgressEvent) => void): Promise<THREE.Object3D>;
    loadModel(src: string, fileFormat?: string, onProgress?: (event: ProgressEvent) => void): Promise<THREE.Object3D | void>;
    loadGltf(url: string, onProgress?: (event: ProgressEvent) => void): Promise<THREE.Object3D>;
    parseGltf(data: ArrayBuffer | string, path: string, onLoad: (object: THREE.Object3D) => void, onError?: (event: ErrorEvent) => void): void;
    loadFbx(url: string, onProgress?: (event: ProgressEvent) => void): Promise<THREE.Object3D>;
    loadObj(url: string, onProgress?: (event: ProgressEvent) => void): Promise<THREE.Object3D>;
    loadStl(url: string, onProgress?: (event: ProgressEvent) => void): Promise<THREE.Object3D>;
    loadShp(url: string, onProgress?: (event: ProgressEvent) => void): Promise<THREE.Object3D>;
    loadDae(url: string, onProgress?: (event: ProgressEvent) => void): Promise<THREE.Object3D>;
    loadDxf(url: string, onProgress?: (event: ProgressEvent) => void): Promise<THREE.Object3D>;
    loadPly(url: string, onProgress?: (event: ProgressEvent) => void): Promise<THREE.Object3D>;
    /**
     * It is kind of tricky to load image into scene, but we'll do this by creating a sprite.
     */
    loadImage(url: string, onProgress?: (event: ProgressEvent) => void): Promise<THREE.Object3D>;
    /**
     * Loads dxf data, including entities, tables(layers, blocks), etc.
     */
    loadDxfData(url: string, dxfDataId?: string, onProgress?: (event: ProgressEvent) => void, onLoad?: () => void, cfg?: DxfLoaderConfig): Promise<DxfData>;
    /**
     * Sets font.
     * Font is required for DxfViewer to view Chinese, etc.
     */
    setFont(font: Font | ShxFont): void;
    /**
     * Sets decoder path for draco loader.
     * @param decoderPath e.g., "libs/draco/gltf/"
     */
    static setDracoDecoderPath(path: string): void;
    private getGltfLoader;
}
