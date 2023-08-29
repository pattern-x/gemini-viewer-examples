import * as THREE from "three";
export declare class EdgeUtils {
    /**
     * reference to buildEdgeIndices from xeokit
     */
    static buildEdge(positions: Float32Array, indices: Uint32Array | Uint16Array | Uint8Array, edgeThreshold?: number): Uint32Array | Uint16Array;
    /**
     * Calculate the barycentric coordinates of each vertex of the geometry
     * TODO: Temporarily do not handle the following cases.
     * - When there is no solution, it is necessary to expand the vertices
     * The algorithm also has performance issues !
     */
    static buildBarycentrics(geometry: THREE.BufferGeometry): boolean;
}
