import * as THREE from "three";
/**
 * InstantiateHelper class is used to instantiate child objects for a given object
 * @internal
 */
export declare class InstantiateHelper {
    object: THREE.Object3D;
    constructor(object: THREE.Object3D);
    /**
     * Instatiates child objects for given object.
     */
    instantiate(): void;
    /**
     * Instatiates child objects of given object.
     * If objects' geometry and material are the same, they can be instanced.
     */
    private instantiateInner;
    /**
     * Removes a number from array
     */
    removeFromArray(arr: number[], toBeRemoved: number): void;
    /**
     * Checks if two geometries equal
     */
    private geometryEquals;
}
