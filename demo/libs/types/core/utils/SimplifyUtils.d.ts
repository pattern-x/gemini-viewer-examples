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
    static simplifiedInfo: {
        total: number;
        removed: number;
    };
    /**
     * Simplifies points of a line/pline/polygon, etc.
     * @param points point array
     * @param tolerance If tolerance is bigger, more points are simpified. Default is 1.
     */
    static simplifyPoints(points: any, tolerance?: number): THREE.Vector3[];
    /**
     * Gets number of vertices to remove
     */
    private static getNumberOfVerticesToRemove;
}
