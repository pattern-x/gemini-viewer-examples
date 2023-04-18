import * as THREE from "three";
/**
 * Exploder class is used to explode an object
 * @internal
 */
export declare class Exploder {
    static DEFAULT_SCALE: number;
    private scene;
    private objectId;
    position: THREE.Vector3;
    private scale;
    private isExplodeUp;
    /**
     * Constructor of Explode
     * @param objectId target object id, that is going to be exploded
     * @param position if undefined, will explode object by its center
     * @param scale scale factor, 1 means 1 time farer away from exploder's position
     */
    constructor(scene: THREE.Scene, objectId: number, position?: THREE.Vector3 | undefined, scale?: number);
    /**
     * Explode the object
     */
    explode(): void;
    /**
     * Explodes a parent or leaf object
     */
    private explodeObject;
    /**
     * Explodes a leaf object (that has geometry, and ususally no children)
     */
    private explodeLeafObject;
    /**
     * Unexplode the object
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
    setOnlyExplodeUp(onlyExplodeUp: boolean): void;
    private getObjectCenter;
}
