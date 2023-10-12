import * as THREE from "three";
export interface PatternLine {
    origin: THREE.Vector2;
    delta: THREE.Vector2;
    angle: number;
    pattern: number[];
    patternSum: number[];
    patternLength: number;
}
export declare function createHatchPatternShaderMaterial(patternLines: PatternLine[], patternAngle: number, cameraZoomUniform: {
    value: number;
}, color: THREE.Color, fixedThicknessInWorldCoord?: number): THREE.Material;
