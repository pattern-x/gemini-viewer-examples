import * as THREE from "three";
import CameraControls from "../../core/camera-controls";
/**
 * Helper class to adjust object visual size
 */
export declare class ObjectPixelSizeHelper {
    private object;
    private camera;
    targetPixelHeight: number;
    canvasHeight: number;
    constructor(camera: THREE.Camera, controls: CameraControls, object: THREE.Object3D, targetPixelHeight: number, canvasHeight: number);
    adjustSize(): void;
}
