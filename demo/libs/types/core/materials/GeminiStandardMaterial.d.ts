import * as THREE from "three";
export declare class GeminiStandardMaterial extends THREE.MeshStandardMaterial {
    isGeminiStandardMaterial: boolean;
    useBCOutline: boolean;
    outlineVisible: boolean;
    outlineColor: THREE.Color;
    uniforms: Record<string, any>;
    vertexShader: string;
    fragmentShader: string;
    useForCap: boolean;
    constructor(params?: any);
    refreshUniforms(): void;
    setOutlineVisible(visible: boolean): void;
    setOutLineColor(color?: THREE.Color): void;
    copy(source: any): this;
}
