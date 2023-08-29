import * as THREE from "three";
export declare class GeminiStandardMaterial extends THREE.MeshStandardMaterial {
    isGeminiStandardMaterial: boolean;
    useBCOutline: boolean;
    borderLineVisible: boolean;
    outLineColor: THREE.Color;
    uniforms: Record<any, any>;
    vertexShader: string;
    fragmentShader: string;
    useForCap: boolean;
    constructor(parameters?: any);
    refreshUniforms(): void;
    setBorderLineVisible(bVisible: boolean): void;
    setOutLineColor(color?: THREE.Color): void;
    copy(source: any): this;
}
