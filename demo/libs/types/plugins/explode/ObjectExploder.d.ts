import * as THREE from "three";
/**
 * ObjectExploder class is used to explode an object
 * @internal
 */
export declare class ObjectExploder {
    private scene;
    objectId: number;
    explodeCenter: THREE.Vector3;
    private scale;
    private explodeUp;
    /**
     * Constructor of Explode
     * @param objectId target object id, that is going to be exploded
     * @param explodeCenter if undefined, will explode object by its center
     * @param scale scale factor, 1 means 1 time farer away from exploder's position
     */
    constructor(scene: THREE.Scene, objectId: number, explodeCenter?: THREE.Vector3 | undefined);
    /**
     * Explodes the object
     */
    explode(scale: number): void;
    /**
     * Explodes a parent or leaf object.
     * If an object has both geometry and children, we'll move itself
     * and we shouldn't move its children again.
     */
    private explodeObject;
    /**
     * Explodes a leaf object (that has geometry, and ususally no children).
     * It doesn't support THREE.InstancedMesh.
     */
    private explodeLeafObject;
    /**
     * Unexplodes the object
     */
    unexplode(): void;
    /**
     * Unexplodes a parent or leaf object
     */
    private unexplodeObject;
    /**
     * Unexplodes a leaf object
     */
    private unexplodeLeafObject;
    setExplodeUp(explodeUp: boolean): void;
    private getObjectCenter;
}
