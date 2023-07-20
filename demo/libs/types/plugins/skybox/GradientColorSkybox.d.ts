import * as THREE from "three";
export declare class GradientColorSkybox extends THREE.Mesh {
    static NAME: string;
    static MIN_SKY_RADIUS: number;
    static MAX_SKY_RADIUS: number;
    static vertexShader: string;
    static fragmentShader: string;
    constructor(topColor: THREE.Color, skylineColor: THREE.Color, bottomColor: THREE.Color, radius?: number, widthSegments?: number, heightSegments?: number, skyCenter?: THREE.Vector3, sunDirection?: THREE.Vector3);
}
