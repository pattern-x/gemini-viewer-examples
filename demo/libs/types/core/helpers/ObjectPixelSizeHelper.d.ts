import * as THREE from "three";
import { CameraControlsEx } from "../../core/controls";
/**
 * Helper class to adjust object visual size
 */
export declare class ObjectPixelSizeHelper {
    private object;
    private camera;
    targetPixelHeight: number;
    canvasHeight: number;
    constructor(camera: THREE.Camera, controls: CameraControlsEx, object: THREE.Object3D, targetPixelHeight: number, canvasHeight: number);
    adjustSize(): void;
}
