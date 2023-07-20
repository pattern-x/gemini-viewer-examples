import * as THREE from "three";
import type { DxfEntity } from "./DxfLoader";
import type { DxfCompareConfig } from "../../core/Configs";
import { IDxf } from "../../core/dxf-parser";
/**
 * Dxf change type, which can be "Added", "Removed" or "Modified".
 *
 * Note that a "Modified" change can be represented as a "Removed" and an "Added" types.
 *
 * The system can display "Added" object in a specific color (green, etc.),
 * and "Removed" in another color (red, etc.).
 */
export declare enum DxfChangeType {
    Added = "Added",
    Removed = "Removed",
    Modified = "Modified",
    NoChange = "NoChange"
}
/**
 * Dxf compare detail changes.
 * It supports:
 * - color
 * - lineType
 * - constantWidth (polyline width)
 */
export declare type DxfDetailChanges = {
    [propName: string]: {
        /**
         * The old value.
         */
        old: unknown;
        /**
         * The new value.
         */
        new: unknown;
    };
};
/**
 * Describes a dxf change
 */
export interface DxfChange {
    /**
     * An integer type id. It is unique in the lifecycle of a DxfViewer.
     */
    id: number;
    /**
     * Change type, which can be "Added", "Removed", "Modified" or "NoChange".
     */
    type: DxfChangeType;
    /**
     * AutoCAD entity handle
     */
    handle: string;
    /**
     * @internal
     */
    parentHandles?: string[];
    /**
     * @internal
     */
    box?: THREE.Box3;
    detailChanges?: DxfDetailChanges;
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
 * - For color, it compares color setting rather than the actual color. E.g.
 *   - If a color setting is "ByLayer", but the layer's color is changed. We take this case as unchanged.
 *   - If a color setting is "ByLayer", the setting is changed to "ByBlock", while the layer and block actually have the same color. We take this case as changed.
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
    private enableDetailComparision;
    static readonly ignoreEntityTypes: string[];
    constructor(dxf1: IDxf, dxf2: IDxf, compareCfg?: DxfCompareConfig);
    private getLayerFrozen;
    /**
     * Compares model spaces of two dxf files.
     * Returns DxfChange map, the key is incremental integer starts from 1.
     * It is unique in the lifecycle of a DxfViewer.
     */
    compare(onProgress?: (event: ProgressEvent) => void): Promise<Record<number, DxfChange>>;
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
    private getColor;
    private getLineType;
    private addModificationItem;
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
