import * as THREE from "three";
/**
 * Util methods about Scene
 * @internal
 */
export declare class SceneUtils {
    /**
     * Get all visible objects' bounding box in a scene.
     * @param scene
     */
    static getVisibleObjectBoundingBox(scene: THREE.Scene): THREE.Box3;
    static getObjectsBoundingBox(scene: THREE.Scene, objectIds: number[], sampling?: boolean): THREE.Box3;
    /**
     * Box3.expandByObject() doesn't work well in some case.
     * E.g. when object's position is far away from object's center?
     * When objects are instanced?
     * That's why we need a method to find bounding box by object's children!
     * And, better to do sampling in case there are too many children.
     */
    static getBoundingBox(object: THREE.Object3D, sampling?: boolean): THREE.Box3;
    /**
     * InstancedMesh is different, we need to get its child meshes in order to get the bounding box
     */
    static getInstancedMeshBoundingBox(mesh: THREE.InstancedMesh): THREE.Box3;
    static getObjectCenter(object: THREE.Object3D, center: THREE.Vector3): void;
}
