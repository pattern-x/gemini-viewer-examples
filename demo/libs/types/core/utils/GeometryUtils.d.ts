import * as THREE from "three";
/**
 * @internal
 */
export interface ILine2 {
    start: THREE.Vector2;
    end: THREE.Vector2;
}
/**
 * GeometryUtils class
 * @internal
 */
export declare class GeometryUtils {
    /**
     * Compares two materials
     */
    static geometryEquals(g1: THREE.BufferGeometry, g2: THREE.BufferGeometry): boolean;
    /**
     * Checks if two types equal each other.
     * This method requires type T defined 'equals' method.
     */
    private static equals;
    private static attributesEqual;
    private static bufferAttributeEqual;
    /**
     * Converts InterleavedBufferAttribute to BufferAttribute, because mergeBufferGeometries doesn't support InterleavedBufferAttribute.
     * If it is supported by Three.js one day, we should remove this method.
     */
    static tryConvertInterleavedBufferAttributes(geometry: THREE.BufferGeometry): void;
    /**
     * Determines if the 2d point is inside the polygon
     */
    static isPointInPolygon(point: THREE.Vector2, polygon: THREE.Vector2[], includeOnSide?: boolean): boolean;
    static caculateGeometryCenter(geometry: THREE.BufferGeometry): THREE.Vector3 | null;
    static isConvex(polygon: THREE.Vector2[]): boolean;
    static areLineSegmentsIntersecting(line1: ILine2, line2: ILine2): boolean;
    /**
     * Tries to get intersection point of two line segments.
     * Returns undefined in case two line segments don't intersect with each other.
     */
    static getLineSegmentsIntersectingPoint(line1: ILine2, line2: ILine2): THREE.Vector2 | null;
    static isPointOnLineSegment(point: THREE.Vector2, line: ILine2, epsilon?: number): boolean;
    static isPointOnLineSegments(point: THREE.Vector2, lines: THREE.Vector2[], epsilon?: number): boolean;
    /**
     * Checks if we should rebase points in case their values are big, and do rebase if necessary
     */
    static checkAndRebasePositionsOnRTC(positions: THREE.Vector3[] | THREE.Vector2[], offset: THREE.Vector3): boolean;
    /**
     * Checks if we should rebase a point in case its value is too large
     */
    static shouldRebasePositionOnRTC(vector: THREE.Vector3 | THREE.Vector2): boolean;
    /**
     * Convert an indexed geometry to a non-indexed geometry. Can be used for dashed line style.
     */
    static convertGeometryWithIndexedToNonIndexed(geometry: THREE.BufferGeometry): THREE.BufferGeometry;
    static createGeometryAttributeByIndex(attribute: THREE.BufferAttribute, indexBuffer: THREE.BufferAttribute): THREE.BufferAttribute;
    static arePolygonsIntersect(polygon1: THREE.Vector2[], polygon2: THREE.Vector2[]): boolean;
    static getLineLineIntersectionPoint(a: THREE.Vector2, b: THREE.Vector2, c: THREE.Vector2, d: THREE.Vector2, epsilon?: number): THREE.Vector2 | undefined;
    static getOffsetPoint(a: THREE.Vector2, b: THREE.Vector2, offset: number): THREE.Vector2;
    static convertWidthLineToMeshGeometry(points: THREE.Vector2[], width: number): THREE.BufferGeometry | undefined;
    static releaseGeometryManually(geometry: THREE.BufferGeometry): void;
    static getAdjacentNonRepeatPoints(points: THREE.Vector3[], epsilon?: number): THREE.Vector3[];
}
