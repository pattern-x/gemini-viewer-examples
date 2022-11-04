import * as THREE from "three";
import { DxfData } from "../dxf";
import { ShxFont } from "../shx-parser/ShxFont";
import { Font } from "three/examples/jsm/loaders/FontLoader";
export declare class LoadingHelper {
    private gltfLoader?;
    private font?;
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
    loadIfc(url: string, onProgress?: (event: ProgressEvent) => void): Promise<THREE.Object3D>;
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
    loadDxfDataAsync(url: string, onProgress?: (event: ProgressEvent) => void, onLoad?: () => void, ignorePaperSpace?: boolean): Promise<DxfData>;
    /**
     * Sets font.
     * Font is required for DxfViewer to view Chinese, etc.
     */
    setFont(font: Font | ShxFont): void;
    private getGltfLoader;
}
