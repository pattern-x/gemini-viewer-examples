import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
/**
 * Helper class to adjust object visual size
 */
export declare class ObjectPixelSizeHelper {
    private object;
    private camera;
    targetPixelHeight: number;
    canvasHeight: number;
    constructor(camera: THREE.Camera, controls: OrbitControls, object: THREE.Object3D, targetPixelHeight: number, canvasHeight: number);
    adjustSize(): void;
}
