import * as THREE from "three";
/**
 * Base model class.
 */
export declare abstract class Model {
    /**
     * The model id, it should be unique in the lifecycle of a viewer.
     */
    abstract modelId: string;
    /**
     * Gets the THREE.Object3D of this model.
     */
    abstract getModelObject(): THREE.Object3D;
    /**
     * Gets the bounding box of this model.
     */
    abstract getBBox(): THREE.Box3;
}
