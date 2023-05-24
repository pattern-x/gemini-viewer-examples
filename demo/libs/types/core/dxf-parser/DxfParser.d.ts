/// <reference types="node" />
import { Readable } from "stream";
import IGeometry, { IEntity, IPoint } from "./entities/geomtry";
import { IObject, IObjectParser } from "./objects/common";
/**
 * @internal
 */
export declare enum BlockTypeFlags {
    None = 0,
    AnonymousBlock = 1,
    NonConstantAttributeDefinitions = 2,
    XRef = 4,
    XRefOverlay = 8,
    ExternallyDependent = 16,
    ResolvedExternalReference = 32,
    DefinitionExternalReference = 64
}
/**
 * Definition of a block. Which contains entities, name, handle, etc.
 * @internal
 */
export interface IBlock {
    entities: IEntity[];
    ownerHandle: string;
    xrefPath: string;
    name: string;
    name2: string;
    handle: string;
    layer: string;
    position: IPoint;
    paperSpace: boolean;
    blockType: BlockTypeFlags;
    description?: string;
}
/**
 * Definition of a viewport.
 * @internal
 */
export interface IViewport {
    name: string;
    lowerLeftCorner: IPoint;
    upperRightCorner: IPoint;
    center: IPoint;
    snapBasePoint: IPoint;
    snapSpacing: IPoint;
    gridSpacing: IPoint;
    viewDirectionFromTarget: IPoint;
    viewTarget: IPoint;
    aspectRatio: number;
    lensLength: number;
    frontClippingPlane: string | number | boolean;
    backClippingPlane: string | number | boolean;
    viewHeight: number;
    snapRotationAngle: number;
    viewTwistAngle: number;
    orthographicType: string;
    ucsOrigin: IPoint;
    ucsXAxis: IPoint;
    ucsYAxis: IPoint;
    renderMode: string;
    defaultLightingType: string;
    defaultLightingOn: string;
    ownerHandle: string;
    ambientColor: number;
}
/**
 * Viewport table definition.
 * @internal
 */
export interface IViewportTableDefinition {
    tableRecordsProperty: "viewports";
    tableName: "viewport";
    dxfSymbolName: "VPORT";
    parseTableRecords(): IViewport[];
}
/**
 * Line type.
 * @internal
 */
export interface ILineType {
    name: string;
    description: string;
    pattern: number[];
    patternLength: number;
}
/**
 * Line type table definition.
 * @internal
 */
export interface ILineTypeTableDefinition {
    tableRecordsProperty: "lineTypes";
    tableName: "lineType";
    dxfSymbolName: "LTYPE";
    parseTableRecords(): Record<string, ILineType>;
}
/**
 * Definition of a layer.
 */
export interface ILayer {
    /**
     * Unique layer name with the dxf/dwg file.
     */
    name: string;
    /**
     * @internal
     */
    handle: string;
    visible: boolean;
    /**
     * @internal
     */
    colorIndex: number;
    /**
     * color in decimal
     */
    color: number;
    /**
     * @internal
     */
    frozen: boolean;
    /**
     * @internal
     */
    flag: number;
    /**
     * @internal
     */
    lineType: string;
    /**
     * @internal
     */
    lineweight: 0 | 5 | 9 | 13 | 15 | 18 | 20 | 25 | 30 | 35 | 40 | 50 | 53 | 60 | 70 | 80 | 90 | 100 | 106 | 120 | 140 | 158 | 200 | 211 | -3 | -2 | -1;
}
/**
 * Layer table definition.
 * @internal
 */
export interface ILayerTableDefinition {
    tableRecordsProperty: "layers";
    tableName: "layer";
    dxfSymbolName: "LAYER";
    parseTableRecords(): Record<string, ILayer>;
}
/**
 * BlockRecord
 * @internal
 */
export interface IBlockRecord {
    handle: string;
    ownerHandle: string;
    blockName: string;
    layoutHandle: string;
    blockInsertUnits: number;
    blockExplodability: number;
    blockScalability: number;
    bitmap?: string;
}
/**
 * @internal
 */
export interface IBlockRecordTableDefinition {
    tableRecordsProperty: "blockRecords";
    tableName: "blockRecord";
    dxfSymbolName: "BLOCK_RECORD";
    parseTableRecords(): Record<string, IBlockRecord>;
}
/**
 * Definition of a style.
 * @internal
 */
export interface IStyle {
    handle: string;
    ownerHandle: string;
    styleName: string;
    priorTextHeight: number;
    textHeight: number;
    xScale: number;
    rotation: number;
    mirrorType: number;
    fontFile: string;
    bigFontFile: string;
}
/**
 * Style table definition.
 * @internal
 */
export interface IStyleTableDefinition {
    tableRecordsProperty: "styles";
    tableName: "style";
    dxfSymbolName: "STYLE";
    parseTableRecords(): Record<string, IStyle>;
}
/**
 * Dim style.
 * @internal
 */
export interface IDimStyle {
    styleName: string;
    DIMSCALE: number;
    DIMASZ: number;
    DIMEXO: string;
    DIMEXE: string;
    DIMSE1: string;
    DIMSE2: string;
    DIMTAD: string;
    DIMTXT: string;
    DIMGAP: number;
    DIMCLRD: number;
    DIMCLRT: number;
    DIMLFAC: number;
    DIMDEC: string;
    DIMLDRBLK: string;
}
/**
 * Dim style table definition
 * @internal
 */
export interface IDimStyleTableDefinition {
    tableRecordsProperty: "dimStyles";
    tableName: "dimStyle";
    dxfSymbolName: "DIMSTYLE";
    parseTableRecords(): Record<string, IDimStyle>;
}
/**
 * Table definitions.
 * @internal
 */
export interface ITableDefinitions {
    VPORT: IViewportTableDefinition;
    LTYPE: ILineTypeTableDefinition;
    LAYER: ILayerTableDefinition;
    BLOCK_RECORD: IBlockRecordTableDefinition;
    STYLE: IStyleTableDefinition;
    DIMSTYLE: IDimStyleTableDefinition;
}
/**
 * Base table
 * @internal
 */
export interface IBaseTable {
    handle: string;
    ownerHandle: string;
}
/**
 * Viewport table
 * @internal
 */
export interface IViewportTable extends IBaseTable {
    viewports: IViewport[];
}
/**
 * @internal
 */
export interface ILayerTypesTable extends IBaseTable {
    lineTypes: Record<string, ILineType>;
}
/**
 * @internal
 */
export interface ILayersTable extends IBaseTable {
    layers: Record<string, ILayer>;
}
/**
 * @internal
 */
export interface IStylesTable extends IBaseTable {
    styles: Record<string, IStyle>;
}
/**
 * @internal
 */
export interface IDimStyleTable extends IBaseTable {
    dimStyles: Record<string, IDimStyle>;
}
/**
 * @internal
 */
export interface IBlockRecordsTable extends IBaseTable {
    blockRecords: Record<string, IBlockRecord>;
}
/**
 * @internal
 */
export interface ITables {
    viewport: IViewportTable;
    lineType: ILayerTypesTable;
    layer: ILayersTable;
    blockRecord: IBlockRecordsTable;
    style: IStylesTable;
    dimStyle: IDimStyleTable;
}
/**
 * @internal
 */
export type ITable = IViewportTable | ILayerTypesTable | ILayersTable | IBlockRecordsTable | IStylesTable | IDimStyleTable;
/**
 * @internal
 */
export interface IDxf {
    header: Record<string, IPoint | number>;
    entities: IEntity[];
    blocks: Record<string, IBlock>;
    tables: ITables;
    objects: Record<string, IObject[]>;
}
export default class DxfParser {
    private _entityHandlers;
    private _objectHandlers;
    private _layoutBlocks;
    private unhandledSections;
    private unhandledObjects;
    private unhandledEntities;
    private unsupportedLineTypes;
    constructor();
    parse(source: string | ArrayBuffer): IDxf;
    registerEntityHandler(handlerType: new () => IGeometry): void;
    registerObjectHandler(handlerType: new () => IObjectParser): void;
    parseSync(source: string | ArrayBuffer): IDxf;
    parseStream(stream: Readable): Promise<IDxf>;
    private _parse;
    /**
     * Splits a string to string array by line separator, "\r\n", "\r", "\n", etc.
     * We do this instead of using "String.prototype.split(/\r\n|\r|\n/g)", because it is extreamly slow!
     */
    private splitByLineSeparator;
}
