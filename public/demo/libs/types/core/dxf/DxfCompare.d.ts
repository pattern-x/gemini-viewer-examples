import { DxfEntity } from "./DXFLoader";
import { IDxf } from "../dxf-parser";
export declare enum DxfChangeType {
    Added = "Added",
    Removed = "Removed",
    Modified = "Modified",
    NoChange = "NoChange"
}
export interface DxfChange {
    type: DxfChangeType;
    handle: string;
    addedObject?: THREE.Object3D;
    removedObject?: THREE.Object3D;
    markup?: THREE.Object3D;
}
/**
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
    constructor(dxf1: IDxf, dxf2: IDxf);
    /**
     * Compares model spaces of two dxf files.
     * Returns DxfChange map, the key is entity handle.
     */
    compare(): Record<string, DxfChange>;
    compareInsertOrDemensionEntities(a: DxfEntity, b: DxfEntity): void;
    private compareEntities;
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
