import * as THREE from "three";
import { ModelData3d } from "./Constants";
import { Model } from "./Model";
/**
 * Loaded 3d model info for BimViewer.
 */
export declare class Model3d extends Model {
    modelId: string;
    modelData: ModelData3d;
    _bbox?: THREE.Box3;
    tilesRenderer?: any;
    modelGroup: THREE.Group;
    modelObject: THREE.Object3D;
    highlighGroup: THREE.Group;
    transparentGroup: THREE.Group;
    edges?: THREE.Object3D[];
    highlighObject?: THREE.Object3D;
    constructor(modelData: ModelData3d);
    /**
     * Gets the THREE.Object3D of this model.
     */
    getModelObject(): THREE.Object3D;
    /**
     * Gets the bounding box of this model.
     */
    getBBox(): THREE.Box3;
    /**
     * Enables/disables edges.
     */
    enableEdges(enable: boolean, onProgress?: (event: ProgressEvent) => void): Promise<void>;
    /**
     * Sets object's color.
     */
    setObjectColor(object: THREE.Object3D, color: number): void;
    /**
     * Sets object's opacity.
     */
    setObjectOpacity(object: THREE.Object3D, opacity?: number, batchId?: number, instanceId?: number): void;
    /**
     * Clears object's opacity.
     */
    clearObjectOpacity(object: THREE.Object3D, batchId?: number, instanceId?: number): void;
    /**
     * Is object transparent.
     */
    isObjectTransparent(object: THREE.Object3D): boolean;
    /**
     * Sets model's opacity.
     */
    setOpacity(opacity?: number): void;
    /**
     * Clears model's opacity.
     */
    clearOpacity(): void;
    /**
     * Highlights an object.
     */
    highlightObjectById(objectId: number, batchId?: number, instanceId?: number): void;
    /**
     * Highlights an object.
     */
    highlightObject(object: THREE.Object3D, batchId?: number, instanceId?: number): void;
    /**
     * Clears highlight for object(s) if any.
     */
    clearHighlight(): void;
    /**
     * Sets an object's visibility.
     */
    setObjectVisible(object: THREE.Object3D, visible: boolean): void;
    /**
     * Sets model's visibility.
     */
    setVisible(visible: boolean): void;
    private createBatchMeshById;
    private createInstanceMeshById;
    /**
     * @internal
     */
    getObjectTree(): void;
    private hasObject;
    private hasObjectWithId;
}
