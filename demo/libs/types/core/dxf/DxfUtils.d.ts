import { DxfObject } from "../../core/dxf/DxfObject";
/**
 * MergeHelper class is used to merge child objects for a given object
 * @internal
 */
export declare class DxfUtils {
    static mergeInfo: {
        removedObjects: number;
        mergedMeshes: number;
        mergedLines: number;
        mergedPoints: number;
        mergedUnknownTypeObjects: number;
        elapsedTime: number;
    };
    static resetMergeInfo(): void;
    /**
     * Merges child objects for given object.
     * it tries to merge objects in the same level and with the same parent;
     * @param saveBatchInfo caller can set saveBatchInfo to true, so that s/he can
     * get the object's original data before merged.
     * While this takes some extra space, so, we'd like to add a flag here.
     */
    static merge(object: DxfObject, saveBatchInfo?: boolean): void;
    /**
     * Merges child objects of given object.
     * If objects' material are the same, they can be merged.
     */
    private static mergeInner;
    /**
     * @param object parent object or THREE.Object3D[]
     * @param i index of for object.children[]
     * @param k index of for object.children[]
     * @param dict to store merge-able object
     * @param nonMergeIndexes used in order to improve performance
     */
    private static tryHandleMergeableObjects;
    /**
     * TODO: Filters XC etc.
     * there are cases where entities with xc and without xc are merged together
     */
    private static isFilteredByOtherFactors;
    /**
     * Merges all objects of given object, just leaf children.
     * If objects' material are the same, they can be merged.
     * Better to call mergeInner first then deepMerge for a better performance.
     * return \{ "added": THREE.Object3D[], "removed": THREE.Object3D[] \}
     */
    static deepMerge(objects: DxfObject[], levelObject?: DxfObject | undefined, bRemovedAndAddedAfterMerge?: boolean, bRemoveEmptyObjectsAfterMerge?: boolean, saveBatchInfo?: boolean): {
        added: DxfObject[];
        removed: DxfObject[];
    };
    /**
     * since we'll move geometry to another merged mesh under a group, below is the structure:
        - root object
          - merged objects group
            - merged object 1
     * need to consider a geometry's matrix for each level of ancestor
    */
    private static applyMatrix;
    /**
     * Merges geometries for lines
     */
    /**
     * Removes a number from array
     */
    private static removeFromArray;
    /**
     * Checks if two geometries are mergable.
     * It requires they have the same type and the same attributes.
     */
    /**
     * Checks if two objects are mergable.
     * It requires
     * - They are with the same masks.
     * - Their userData.layerName must be the same if there is. This is useful for Dxf.
     * - They have the same type or the same draw type( Mesh or Line or Point).
     */
    private static areObjectsMergeable;
}
