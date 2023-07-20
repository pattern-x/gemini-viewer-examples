import * as THREE from "three";
export declare class LinePatternShaders {
    /**
     * Creates line shader by given pattern.
     * Note: remember to call line.computeLineDistances() in order to make it work!
     */
    static createLineShaderMaterial(pattern: number[], color: number, scale: number, viewportScaleUniform: {
        value: number;
    }, cameraZoomUniform: {
        value: number;
    }): THREE.Material;
}
