import * as THREE from "three";
/**
 * Text shape, to describe a specific character.
 */
export declare class TextShape extends THREE.Shape {
    width: number;
    lastPoint: THREE.Vector2;
    polylines: Array<Array<THREE.Vector2>>;
    private bounds;
    constructor(lastPoint: THREE.Vector2, polylines: Array<Array<THREE.Vector2>>);
    /**
     * Gets an offsetted new TextShape
     */
    offset(vector: THREE.Vector2): TextShape;
    /**
     * Gets an transformed new TextShape
     */
    transform(matrix: THREE.Matrix3): TextShape;
    protected calcWidth(polylines: THREE.Vector2[][]): number;
    /**
     * Converts a TextShape to THREE.BufferGeometry
     */
    toThreeGeometry(): THREE.BufferGeometry<THREE.NormalBufferAttributes>;
}
