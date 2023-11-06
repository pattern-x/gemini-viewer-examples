import * as THREE from "three";
/**
 * @internal
 */
export declare enum Views {
    Top = "Top",
    Bottom = "Bottom",
    Front = "Front",
    Back = "Back",
    Left = "Left",
    Right = "Right"
}
/**
 * Util methods about Viewer3D
 * @internal
 */
export declare class Viewer3DUtils {
    /**
     * Gets camera's new position and target(lookAt) by given bbox and view
     */
    /**
     * Gets camera's new position and target(lookAt) by given bbox and expected camera direction
     */
    static getCameraPositionByBBoxAndDirection(bbox: THREE.Box3, eye: THREE.Vector3, look: THREE.Vector3, cameraProjectionMatrix?: THREE.Matrix4, targetDir?: THREE.Vector3): void;
    static getCameraDirectionByView(view: Views | string): THREE.Vector3;
}
