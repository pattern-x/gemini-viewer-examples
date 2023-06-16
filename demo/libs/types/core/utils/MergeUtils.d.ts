import * as THREE from "three";
/**
 * Used for merged mesh
 * @internal
 */
export interface Batch {
    batchId: number;
    name?: string;
    id?: string;
    positionStart: number;
    positionCount: number;
    indexStart: number;
    indexCount: number;
    boundingSphere?: THREE.Sphere;
    userData?: object;
}
/**
 * MergeHelper class is used to merge child objects for a given object
 * @internal
 */
export declare class MergeUtils {
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
    static merge(object: THREE.Object3D, saveBatchInfo?: boolean): void;
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
    /**
     * Merges all objects of given object, just leaf children.
     * If objects' material are the same, they can be merged.
     * Better to call mergeInner first then deepMerge for a better performance.
     * return \{ "added": THREE.Object3D[], "removed": THREE.Object3D[] \}
     */
    static deepMerge(objects: THREE.Object3D[], levelObject?: THREE.Object3D | undefined, bRemovedAndAddedAfterMerge?: boolean, bRemoveEmptyObjectsAfterMerge?: boolean, saveBatchInfo?: boolean): {
        added: THREE.Object3D[];
        removed: THREE.Object3D[];
    };
    /**
     * since we'll move geometry to another merged mesh under a group, below is the structure:
        - root object
          - merged objects group
            - merged object 1
     * need to consider a geomery's matrix for each level of ancestor
    */
    private static applyMatrix;
    /**
     * Merges geometries for lines
     */
    static mergeLineGeometries(geometries: THREE.BufferGeometry[], saveBatchInfo: boolean, isDashedMaterial: boolean, batches?: Batch[]): THREE.BufferGeometry | undefined;
    private static mergeBufferGeometriesWithLinesToLineSegments;
    private static mergeBufferAttributesWithLinesToLineSegments;
    /**
     * Removes a number from array
     */
    private static removeFromArray;
    /**
     * Removes object from objects
     */
    static removeObjectFromArray(arr: THREE.Object3D[], toBeDeleted: THREE.Object3D): void;
    /**
     * Checks if two geometries are mergable.
     * It requires they have the same type and the same attributes.
     */
    static areGeometriesMergeable(g1: THREE.BufferGeometry, g2: THREE.BufferGeometry): boolean;
    /**
     * Checks if two objects are mergable.
     * It requires
     * - They are with the same masks.
     * - Their userData.layerName must be the same if there is. This is useful for Dxf.
     * - They have the same type or the same draw type( Mesh or Line or Point).
     */
    static areObjectsMergeable(o1: THREE.Object3D, o2: THREE.Object3D): any;
    /**
     * Checks if it is a merged object
     */
    static isMergedMesh(mesh: THREE.Mesh): boolean;
    static isFaceIndexInBatch(geometry: THREE.BufferGeometry, batch: Batch, faceIndex: number): boolean;
    static getBatchByFaceIndex(mesh: THREE.Mesh, faceIndex: number): Batch | undefined;
    /**
     * Gets batchId by faceIndex for a merged mesh
     */
    static getBatchIdByFaceIndex(mesh: THREE.Mesh, faceIndex: number): number;
    static getBatchByBatchId(mesh: THREE.Mesh, batchId: number): Batch | undefined;
    /**
     * Clones corresponding geometry for given batch.
     * To do this, we'll clone the geometry so the matrix, material, normal, uv, etc.
     * will be correct, and we'll remove extra index and position.
     */
    static cloneGeometryForBatch(mesh: THREE.Mesh, batch: Batch): THREE.BufferGeometry | undefined;
}
