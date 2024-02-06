import * as THREE from "three";
/**
 * @internal
 */
export interface ILine {
    start: THREE.Vector3;
    end: THREE.Vector3;
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
     * Converts InterleavedBufferAttribute to BufferAttribute, because mergeGeometries doesn't support InterleavedBufferAttribute.
     * If it is supported by Three.js one day, we should remove this method.
     */
    static tryConvertInterleavedBufferAttributes(geometry: THREE.BufferGeometry): void;
    /**
     * Determines if the 2d point is inside the polygon
     */
    static isPointInPolygon(point: THREE.Vector2, polygon: THREE.Vector2[], includeOnSide?: boolean): boolean;
    static caculateGeometryCenter(geometry: THREE.BufferGeometry): THREE.Vector3 | null;
    static isConvex(polygon: THREE.Vector2[]): boolean;
    static areLineSegmentsIntersecting(line1: ILine, line2: ILine): boolean;
    /**
     * Tries to get intersection point of two line segments.
     * Returns undefined in case two line segments don't intersect with each other.
     */
    static getLineSegmentsIntersectingPoint(line1: ILine, line2: ILine): THREE.Vector3 | null | undefined;
    static isPointOnLineSegment(point: THREE.Vector3, line: ILine, epsilon?: number): boolean;
    static isPointOnLineSegments(point: THREE.Vector3, lines: THREE.Vector3[], epsilon?: number): boolean;
    /**
     * Calculates surface area
     */
    static calculateSurfaceArea(geometry: THREE.BufferGeometry): number;
    /**
     * Converts indexes of type line_strip to line
     * for merge
     */
    static convertLineStripToLine(geometry: THREE.BufferGeometry, bLoop?: boolean): void;
    /**
     * Convert an indexed geometry to a non-indexed geometry. Can be used for dashed line style.
     */
    static convertGeometryWithIndexedToNonIndexed(geometry: THREE.BufferGeometry): THREE.BufferGeometry;
    static createGeometryAttributeByIndex(attribute: THREE.BufferAttribute, indexBuffer: THREE.BufferAttribute): THREE.BufferAttribute;
    /**
     * Gets start/end point of a line segment by given index
     */
    static getLineEndPointsByIndex(line: THREE.Line, index: number): THREE.Vector3[];
    static arePolygonsIntersect(polygon1: THREE.Vector2[], polygon2: THREE.Vector2[]): boolean;
    static getLineLineIntersectionPoint(a: THREE.Vector2, b: THREE.Vector2, c: THREE.Vector2, d: THREE.Vector2, epsilon?: number): THREE.Vector2 | undefined;
    static getOffsetPoint(a: THREE.Vector2, b: THREE.Vector2, offset: number): THREE.Vector2;
    static convertSimpleWidthLineToMeshGeometry(points: THREE.Vector2[], width: number): THREE.BufferGeometry<THREE.NormalBufferAttributes> | undefined;
    static convertWidthLineToMeshGeometry(points: THREE.Vector2[], width: number): THREE.BufferGeometry<THREE.NormalBufferAttributes> | undefined;
    static releaseGeometryManually(geometry: THREE.BufferGeometry): void;
    static getAdjacentNonRepeatPoints(points: THREE.Vector3[], epsilon?: number): THREE.Vector3[];
    static mergeBBoxes(bboxes: THREE.Box3[]): THREE.Box3[];
}
