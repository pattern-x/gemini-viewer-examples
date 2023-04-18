import type { Pair } from "polygon-clipping";
/**
 * Offset edge
 * @internal
 */
export declare class Edge {
    current: Pair;
    next: Pair;
    inNormal: Pair;
    outNormal: Pair;
    constructor(current: Pair, next: Pair);
    /**
     * Creates outwards normal
     */
    private outwardsNormal;
    /**
     * Creates inwards normal
     */
    private inwardsNormal;
    /**
     * Offsets the edge by dx, dy
     */
    offset(dx: number, dy: number): Edge;
    inverseOffset(dx: number, dy: number): Edge;
    inverse(): Edge;
    static offsetEdge(current: Pair, next: Pair, dx: number, dy: number): Edge;
}
