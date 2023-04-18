import * as THREE from "three";
/**
 * @internal
 */
export declare class GroundUtils {
    static GROUND_GRID_NAME: string;
    static GRASS_GROUND_NAME: string;
    static DEFAULT_WIDTH: number;
    static DEFAULT_HEIGHT: number;
    static DEFAULT_WIDTH_SEGS: number;
    static DEFAULT_HEIGHT_SETS: number;
    static DEFAULT_MAT_PARAMS: {
        color: number;
        transparent: boolean;
        opacity: number;
        wireframeLinewidth: number;
    };
    /**
     * Creates ground grid
     */
    static createGroundGrid(size?: number, divisions?: number, groundCenter?: THREE.Vector3): THREE.GridHelper;
    static createGrassGround(texture?: string, width?: number, height?: number, repeatX?: number, repeatY?: number): Promise<THREE.Mesh>;
}
