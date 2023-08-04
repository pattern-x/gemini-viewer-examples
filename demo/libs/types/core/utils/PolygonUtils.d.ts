/**
 * @internal
 */
export declare class PolygonUtils {
    static getFaces(points: THREE.Vector3[]): number[];
    static arePointsCoplanar(points: THREE.Vector3[]): boolean;
    static isSelfIntersecting(points: THREE.Vector3[]): boolean;
}
