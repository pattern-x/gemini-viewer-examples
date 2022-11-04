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
     * Calculates camera position and look at point by given scene
     * @param scene
     * @param view
     * @param eye this method pass out it to caller
     * @param look this method pass out it to caller
     */
    static getCameraPositionByView(scene: THREE.Scene, view: Views | string, eye: THREE.Vector3, look: THREE.Vector3, cameraProjectionMatrix?: THREE.Matrix4): void;
    /**
     * Calculates camera position and look at point by given object uuids
     * @param scene
     * @param objectUuids
     * @param view
     * @param eye
     * @param look
     */
    static getCameraPositionByObjectUuids(scene: THREE.Scene, objectUuids: string[], view: Views | string, eye: THREE.Vector3, look: THREE.Vector3, cameraProjectionMatrix?: THREE.Matrix4): void;
    /**
     * Gets camera's new position and target(lookAt) by given bbox and camera's current position
     */
    static getCameraPositionByObjects(objects: THREE.Object3D[], camera: THREE.Camera, eye: THREE.Vector3, look: THREE.Vector3): void;
    static getCameraPositionByVisibleObject(scene: THREE.Scene, camera: THREE.Camera, eye: THREE.Vector3, look: THREE.Vector3): void;
    /**
     * Gets camera's new position and target(lookAt) by given bbox and view
     */
    static getCameraPositionByBboxAndView(bbox: THREE.Box3, view: Views | string, eye: THREE.Vector3, look: THREE.Vector3, cameraProjectionMatrix?: THREE.Matrix4): void;
    /**
     * Gets camera's new position and target(lookAt) by given bbox and expected camera direction
     */
    static getCameraPositionByBboxAndDirection(bbox: THREE.Box3, eye: THREE.Vector3, look: THREE.Vector3, cameraProjectionMatrix?: THREE.Matrix4, targetDir?: THREE.Vector3): void;
    private static getCameraDirectionByView;
    /**
     * Sleep a while
     */
    static sleep(ms: number): Promise<unknown>;
    private static twinklingObjectUuids;
    /**
     * Twinkle the object several times
     */
    static twinkle(obj: THREE.Object3D, ms?: number): Promise<void>;
}
