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
    static getCameraPositionByBboxAndView(bbox: THREE.Box3, view: Views | string, eye: THREE.Vector3, look: THREE.Vector3, cameraProjectionMatrix?: THREE.Matrix4): void;
    /**
     * Gets camera's new position and target(lookAt) by given bbox and expected camera direction
     */
    static getCameraPositionByBboxAndDirection(bbox: THREE.Box3, eye: THREE.Vector3, look: THREE.Vector3, cameraProjectionMatrix?: THREE.Matrix4, targetDir?: THREE.Vector3): void;
    static getCameraDirectionByView(view: Views | string): THREE.Vector3;
    /**
     * Sleep a while
     */
    static sleep(ms: number): Promise<void>;
    private static twinklingObjectIds;
    /**
     * Twinkle the object several times
     */
    static twinkle(obj: THREE.Object3D, ms?: number): Promise<void>;
}
