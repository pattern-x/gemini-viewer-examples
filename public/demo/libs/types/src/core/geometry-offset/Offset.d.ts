import type { MultiPolygon, Pair, Polygon, Ring } from "polygon-clipping";
import { Edge } from "./Edge";
/**
 * Offset builder
 * @internal
 */
export declare class Offset {
    vertices: Pair | Ring | Polygon;
    edges: Edge[] | Edge[][];
    private arcSegments;
    private distance;
    constructor(vertices: Pair | Ring | Polygon, arcSegments?: number);
    /**
     * Recursively process contour to create normals
     */
    private processContour;
    setArcSegments(arcSegments: number): this;
    /**
     * Creates arch between two edges
     *
     * @param  {Array.<Object>} vertices
     * @param  {Object}         center
     * @param  {Number}         radius
     * @param  {Object}         startVertex
     * @param  {Object}         endVertex
     * @param  {Number}         segments
     * @param  {Boolean}        bOutwards
     */
    private createArc;
    setDistance(dist: number): this;
    private ensureLastPoint;
    /**
     * Decides by the sign if it's a padding or a margin
     */
    offset(dist: number): Pair | Ring | Polygon | MultiPolygon;
    private offsetSegment;
    private margin;
    private padding;
    offsetLine(dist: number): Pair | Ring | Polygon | MultiPolygon;
    /**
     * Just offsets lines, no fill
     */
    private offsetLines;
    private offsetContour;
    offsetPoint(distance: number): MultiPolygon;
}
