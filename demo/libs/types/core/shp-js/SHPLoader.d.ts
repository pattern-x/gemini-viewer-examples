import * as THREE from "three";
/**
 * ArcGIS SHP file loader
 */
export declare class SHPLoader {
    load(url: string, onLoad: (object: THREE.Object3D) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): Promise<void>;
    /**
     *
     * @param percent a number between [0, 100]
     */
    private updateProgress;
}
