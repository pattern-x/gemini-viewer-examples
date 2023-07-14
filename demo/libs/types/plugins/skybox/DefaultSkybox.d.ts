import * as THREE from "three";
export declare class DefaultSkybox extends THREE.Mesh {
    static NAME: string;
    static MIN_SKY_RADIUS: number;
    static MAX_SKY_RADIUS: number;
    static vertexShader: string;
    static fragmentShader: string;
    static COLOR_TEMPLATES: {
        [name: string]: number[];
    };
    constructor(radius?: number, widthSegments?: number, heightSegments?: number, skyCenter?: THREE.Vector3, sunDirection?: THREE.Vector3);
}
