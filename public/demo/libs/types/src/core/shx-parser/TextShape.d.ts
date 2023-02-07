import * as THREE from "three";
export declare class TextShape extends THREE.Shape {
    width: number;
    lastPoint: THREE.Vector2;
    polyLines: Array<Array<THREE.Vector2>>;
    constructor(lastPoint: THREE.Vector2, polyLines: Array<Array<THREE.Vector2>>);
    offset(vector: THREE.Vector2): TextShape;
    transform(matrix: THREE.Matrix3): TextShape;
    calcWidth(polyLines: THREE.Vector2[][]): number;
    toThreeGeometry(): THREE.BufferGeometry;
}
