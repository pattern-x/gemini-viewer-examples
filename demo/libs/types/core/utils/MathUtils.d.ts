import * as THREE from "three";
import { Vector3, Box, Mat4 } from "../../core/Constants";
/**
 * @internal
 */
export declare class MathUtils {
    static roundNumber(value: number, n: number): number;
    static floorNumber(value: number, n: number): number;
    static areNumbersEqual(a: number, b: number, epsilon?: number): boolean;
    static areVector2sEqual(a: THREE.Vector2, b: THREE.Vector2, epsilon?: number): boolean;
    static areVector3sEqual(a: THREE.Vector3, b: THREE.Vector3, epsilon?: number): boolean;
    static areNumbersClose(a: number, b: number, ref_tol?: number, abs_tol?: number): boolean;
    static areVector2sClose(point1: THREE.Vector2, point2: THREE.Vector2, ref_tol?: number, abs_tol?: number): boolean;
    static areVectorsClose(point1: THREE.Vector3, point2: THREE.Vector3, ref_tol?: number, abs_tol?: number): boolean;
    static getArcAngleSpanInRadian(startAngle: number, endAngle: number): number;
    static getIntegerPartLength(num: number): number;
    static getRelativeEps(num: number, epsilon?: number): number;
    static getVector2RelativeEps(vec: THREE.Vector2, epsilon?: number): number;
    static getControlPointByTwoPoints(p1: THREE.Vector2, p2: THREE.Vector2): THREE.Vector2;
    static convertPointFromUEToGltf(point: Vector3): {
        x: number;
        y: number;
        z: number;
    };
    static convertPointFromGltfToUE(point: Vector3): {
        x: number;
        y: number;
        z: number;
    };
    static convertPointFromUEToRevit(point: Vector3): {
        x: number;
        y: number;
        z: number;
    };
    static convertPointFromRevitToUE(point: Vector3): {
        x: number;
        y: number;
        z: number;
    };
    static getBox(point1: Vector3, point2: Vector3): number[];
    static getCenter(box: Box): {
        x: number;
        y: number;
        z: number;
    };
    static convertBoxFromGltfToUE(box: Box): number[];
    static convertBoxFromUEToGltf(box: Box): number[];
    static convertBoxFromRevitToUE(box: Box): number[];
    static convertBoxFromUEToRevit(box: Box): number[];
    static clamp(value: number, min: number, max: number): number;
    static getLookAtMatrix(eye: Vector3, target: Vector3, up: Vector3): number[];
    static getLocationFromMatrix(matrix: Mat4): {
        x: number;
        y: number;
        z: number;
    };
    static toDegrees(radians: number): number;
    static toRadians(degrees: number): number;
}
