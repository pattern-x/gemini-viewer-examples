import * as THREE from "three";
/**
 * SimplifyUtils class is used to simplify objects' geomery for a given object
 * @internal
 */
export declare class SimplifyUtils {
    /**
     * Gets simplified object.
     */
    static simplifyGeometry(geometry: THREE.BufferGeometry, simplifyRate: number): THREE.BufferGeometry;
    /**
     * Gets number of vertices to remove
     */
    private static getNumberOfVerticesToRemove;
}
