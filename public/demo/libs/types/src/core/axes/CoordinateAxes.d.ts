import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
export declare class CoordinateAxes extends THREE.Object3D {
    name: string;
    private readonly AXIS_LENGTH;
    private readonly AXIS_COLOR_X;
    private readonly AXIS_COLOR_Y;
    private readonly AXIS_COLOR_Z;
    constructor(addTexts?: boolean, ignoreZAxis?: boolean);
    addTexts(ignoreZAxis?: boolean): void;
    createText(text: string, color: string, size?: number): CSS2DObject;
}
