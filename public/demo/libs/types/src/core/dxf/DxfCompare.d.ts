import * as THREE from "three";
import { DxfEntity } from "./DXFLoader";
import { IDxf } from "../dxf-parser";
/**
 * Dxf change type
 */
export declare enum DxfChangeType {
    Added = "Added",
    Removed = "Removed",
    Modified = "Modified",
    NoChange = "NoChange"
}
/**
 * Dxf change
 */
export interface DxfChange {
    id: number;
    type: DxfChangeType;
    handle: string;
    parentHandles?: string[];
    /**
     * @internal
     */
    box?: THREE.Box3;
}
/**
 * Used to compare two drawings/dxfs.
 * - Consider model space only.
 * - Consider entity's geometry, position, scale, etc.
 * - Ignore layer's visibility, freeze settings.
 * - Ignore entity's properties like linetype, fill pattern, font, color, etc.
 * - Ignore spatial filter (xclip) of block reference.
 * - We compare entities with the same handle and type. e.g.
 *   - if line A from dxf1 has the same handle with arc A from dxf2, then line A is "Removed", arc A is "Added".
 * @internal
 */
export declare class DxfCompare {
    static readonly ENTITY_COLOR_ADDED = 65280;
    static readonly ENTITY_COLOR_REMOVED = 16711680;
    static readonly ENTITY_COLOR_NO_CHANGE = 10066329;
    static readonly ENTITY_COLOR_MARKUP = 16744231;
    private dxf1;
    private dxf2;
    private changes;
    private comparedBlocks;
    private isComparingBlock;
    private isComparingDimension;
    static readonly ignoreEntityTypes: string[];
    constructor(dxf1: IDxf, dxf2: IDxf);
    private getLayerFrozen;
    /**
     * Compares model spaces of two dxf files.
     * Returns DxfChange map, the key is entity handle.
     */
    compare(onProgress?: (event: ProgressEvent) => void): Promise<Record<string, DxfChange>>;
    private isDimensionBlock;
    compareInsertOrDemensionEntities(a: DxfEntity, b: DxfEntity, parentHandle1?: string, parentHandle2?: string): {
        type: DxfChangeType;
        handle: string;
        parentHandles?: string[] | undefined;
    }[] | undefined;
    private compareBlock;
    private compareEntities;
    private bIgnoreChildEntitiesOriginalType;
    private entitiesEqual;
    private baseEntitiesEqual;
    private arcsEqual;
    private linesEqual;
    private polylinesEqual;
    private textsEqual;
    private solidsEqual;
    private pointEntitiesEqual;
    private splinesEqual;
    private mtextsEqual;
    private ellipsesEqual;
    private attDefsEqual;
    private attribsEqual;
    private hatchesEqual;
    private viewportsEqual;
    private leadersEqual;
    private mleadersEqual;
    private ole2framesEqual;
    private insertsEqual;
    private dimensionsEqual;
    private regionsEqual;
    private vectorsEqual;
    private pointsEqual;
    private vertexEntityEqual;
    private numbersEqual;
    private numberEqual;
    private vectorArraysEqual;
    private verticesEqual;
    private verticesArrayEqual;
    private vertexEntitiesEqual;
    private hatchEdgesEqual;
    private hatchEdgeArraysEqual;
    private hatchBoundaryPathsEqual;
    private hatchBoundaryPathArraysEqual;
    private mleaderLineEqual;
    private mleaderLinesEqual;
    private mleaderLeaderEqual;
    private mleaderLeadersEqual;
    private mleaderContextEqual;
    private compareHexStrings;
}
