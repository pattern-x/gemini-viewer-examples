import * as THREE from "three";
import { IBlock, IDxf, IEntity, ILayer, IPoint, IViewPort, IViewportEntity } from "../dxf-parser";
import { DxfChangeType, DxfChange } from "./DxfCompare";
import { Units } from "../Units";
import { ShxFont } from "../shx-parser/ShxFont";
import { Font } from "three/examples/jsm/loaders/FontLoader";
import { ISpatialFilterObject } from "../dxf-parser/objects/spatialfilter";
import { IMLeaderContextData } from "../dxf-parser/entities/mleader";
export interface DxfData extends IDxf {
    threejsObject: THREE.Group;
    layersAndThreejsObjects: Record<string, THREE.Object3D[]>;
    loadedEntityCount: number;
    layoutViewportsMap: Record<string, IViewportEntity[]>;
}
export interface DxfLayer extends ILayer {
}
export interface DxfEntity extends IEntity {
    threejsObject?: THREE.Object3D;
    dimStyleName: string;
    dimensionType?: number;
    anchorPoint?: THREE.Vector3;
    block?: string;
    majorAxisEndPoint?: THREE.Vector2 | THREE.Vector3;
    axisRatio?: number;
    center?: THREE.Vector3;
    startAngle?: number;
    endAngle?: number;
    style?: number;
    text?: string;
    height?: number;
    width?: number;
    position?: THREE.Vector3;
    blockPosition?: IPoint;
    rotation?: number;
    directionVector?: THREE.Vector3;
    attachmentPoint?: number;
    drawingDirection?: number;
    controlPoints?: THREE.Vector3[];
    degreeOfSplineCurve?: number;
    knotValues?: number[];
    vertices?: IPoint[];
    shape: boolean;
    isPolyfaceMesh: boolean;
    pathType: number;
    direction: number;
    hasHookline: boolean;
    textWidth: number;
    dimensionStyle: string;
    arrowFlag: number;
    arrowHeight: number;
    arrowHeadScale: number;
    arrowHeadBlockHandle: string;
    contextData?: IMLeaderContextData;
    enableDogLeg: boolean;
    leaderLineType: number;
    arrowHeadId: string;
    arrowHeadSize: number;
    radius?: number;
    points?: THREE.Vector3[];
    startPoint?: THREE.Vector3;
    endPoint?: THREE.Vector3;
    textHeight: number;
    halign?: number;
    valign?: number;
    mirrored?: number;
    textStyle?: string;
    lineSpaceFactor?: number;
    name?: string;
    xScale?: number;
    yScale?: number;
    zScale?: number;
    elevation?: number;
    extrusionDirectionX?: number;
    extrusionDirectionY?: number;
    extrusionDirectionZ?: number;
    extrusionDirection?: {
        z: number;
    };
    entities?: IEntity[];
    tag?: string;
    prompt?: string;
    scale?: number;
    preset: boolean;
    invisible: boolean;
    documentType?: string;
    version?: number;
    leftUpX?: number;
    leftUpY?: number;
    leftUpZ?: number;
    rightDownX?: number;
    rightDownY?: number;
    rightDownZ?: number;
    tileModeDescriptor?: number;
    binaryData?: string;
    lengthOfBinaryData?: number;
    image: string;
    psBBox?: THREE.Box3;
    msToPsMatrix?: THREE.Matrix4;
    viewportThreejsObject?: THREE.Object3D;
    associatedSpatialFilter?: DxfSpatialFilter;
    compareChangeType?: DxfChangeType;
}
export interface DxfBlock extends IBlock {
    threejsObject?: THREE.Object3D;
}
export interface DxfSpatialFilterClipPolyline {
    polyline: THREE.Vector3[];
    bConcave: boolean;
    bReversed: boolean;
}
export interface DxfSpatialFilter extends ISpatialFilterObject {
    threejsObject?: THREE.Object3D;
    localMatrix?: THREE.Matrix4;
    clipPolylines: DxfSpatialFilterClipPolyline[];
}
/**
 * THREE.Loader implementation for DXF files
 *
 * @param {*} manager THREE.LoadingManager
 *
 * @see https://threejs.org/docs/#api/en/loaders/Loader
 * @author Sourabh Soni / https://www.prolincur.com
 */
export declare class DXFLoader extends THREE.Loader {
    private readonly MODEL_LAYOUT_NAME;
    private timer;
    private ignorePaperSpace;
    font?: Font | ShxFont;
    angBase: number | IPoint;
    angDir: number | IPoint;
    private header;
    private pointsMaterials;
    private lineBasicMaterials;
    private lineShaderMaterials;
    private meshBasicMaterials;
    private hatchShaderMaterials;
    private entityCount;
    private curveCount;
    private averageCurveSize;
    private enableRenderOrder;
    private enableLocalCache;
    private enableReleaseData;
    private enableMerge;
    private enableSimplify;
    private enableRTC;
    private dxfDataId;
    /**
     * Use a context in order to easily know if it is compare mode,
     * and, get compare result from it.
     */
    private compareContext?;
    private statsInfo;
    private blockReferenceCache;
    /**
     * Adds this data member just in order to improve the performence of getLayoutName.
     * Its key is blockrecord's handle, value is its layoutHandle.
     */
    private blockRecordsCache;
    /**
     * Adds this data member just in order to improve the performence of getLayoutName.
     * Its key is entity's handle, value is itself.
     */
    private entitiesCache;
    /**
     * Adds this in order to improve performance of findSpatialFilterByHandle.
     * Key is dictionaryObject's ownerHandle(entity's handle), value is spatial filter's ownerHandle
     */
    private dictionaryOwnerHandleAndSpatialFilterHandlesCache;
    /**
     * Adds this in order to improve performance of findSpatialFilterByHandle.
     * Key is ISpatialFilterObject's ownerHandle, value is ISpatialFilterObject
     */
    private spatialFiltersCache;
    /**
     * Adds this in order to improve performance of creating threejs object
     * Key is entity's handle, value is threejs object.
     */
    private entityThreejsCache;
    static cameraZoomUniform: {
        value: number;
    };
    static viewportScaleUniform: {
        value: number;
    };
    static transformMatrixUniform: {
        value: THREE.Matrix4;
    };
    static resolutionUniform: {
        value: THREE.Vector2;
    };
    static maxFragmentUniforms: number;
    /**
     * @param ignorePaperSpace if true, only load model space
     */
    constructor(ignorePaperSpace?: boolean);
    setFont(font: Font | ShxFont): this;
    /**
     * Downloads dxf file content
     */
    private download;
    /**
     * Loads dxf asynchronously. It mainly contains 2 steps:
     * 1. parses file content
     * 2. generates/load threejs objects
     * @param url url of the dxf file
     * @param onProgress on progress callback
     */
    loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<DxfData>;
    /**
     * Parses dxf contents
     */
    parse(url: string, onProgress?: (event: ProgressEvent) => void): Promise<IDxf>;
    parseHeader(header: Record<string, IPoint | number>): void;
    /**
     * Generates/load threejs objects according to dxf data.
     * @param data
     * @param onProgress
     * @returns
     * @describe load dxf entities
     */
    loadEntities(data: IDxf, onProgress?: (event: ProgressEvent) => void): DxfData;
    /**
     * Loads entities from two dxf data for comparing.
     * It also creates markup for each change.
     */
    loadEntitiesForCompare(data1: IDxf, data2: IDxf, changes: Record<string, DxfChange>, onProgress?: (event: ProgressEvent) => void): void;
    private setEntityCompareChangeType;
    private setBlockEntityCompareChangeType;
    private addObjectToChange;
    private createOrUpdateCompareMarkup;
    private releaseCachedData;
    /**
     * Releases memory-costy elements of an entity
     */
    private releaseEntity;
    /**
     * Releases memory-costy elements of dxf data
     */
    private releaseDxfData;
    /**
     * We'll need to pass in the blockEntity when drawEntity is called from a block.
     * So that, when an entity's color is ByLayer, and its layer is "0", it should use block's layer,
     * rather than the layer of the entity itself!
     * We don't know if there is other similar case in future, so pass in blockEntity here.
     */
    drawEntity(entity: DxfEntity, data: IDxf, blockEntity?: IEntity): THREE.Object3D | undefined;
    drawEllipse(entity: DxfEntity, data: IDxf, blockEntity?: IEntity): THREE.Line | undefined;
    drawMText(entity: DxfEntity, data: IDxf, blockEntity?: IEntity): THREE.Object3D | undefined;
    private getMTextGroup;
    mtextContentAndFormattingToTextAndStyle(textAndControlChars: any, // eslint-disable-line
    entity: DxfEntity): {
        text: any[];
        lineLength: number;
        style: {
            horizontalAlignment: string;
            textHeight: number | undefined;
        };
    };
    private getTextLineNum;
    drawSpline(entity: DxfEntity, data: IDxf, blockEntity?: IEntity): THREE.Line | undefined;
    /**
     * Interpolate a b-spline. The algorithm examins the knot vector
     * to create segments for interpolation. The parameterisation value
     * is re-normalised back to [0,1] as that is what the lib expects (
     * and t i de-normalised in the b-spline library)
     *
     * @param controlPoints the control points
     * @param degree the b-spline degree
     * @param knots the knot vector
     * @returns the polyline
     */
    getBSplinePolyline(controlPoints: THREE.Vector3[], degree: number, knots: number[], interpolationsPerSplineSegment?: number, weights?: number[]): THREE.Vector2[];
    drawXLine(entity: DxfEntity): THREE.Line | undefined;
    drawRay(entity: DxfEntity): THREE.Line | undefined;
    drawLine(entity: DxfEntity): THREE.Line | undefined;
    drawLWPolyline(entity: DxfEntity, data: IDxf, blockEntity?: IEntity): THREE.Object3D | undefined;
    drawMLeader(entity: DxfEntity, data: IDxf, blockEntity?: IEntity): THREE.Object3D | undefined;
    drawLeader(entity: DxfEntity, data: IDxf, blockEntity?: IEntity): THREE.Object3D | undefined;
    private drawDefaultLeadArrow;
    private getBlockNameByHandle;
    static transformAngleByOcsMatrix(ocsMatrix: THREE.Matrix4, angle: number): number;
    static getArcAnglesByOcsMatrix(ocsMatrix: THREE.Matrix4, startAngle: number, endAngle: number): number[];
    drawArc(entity: DxfEntity, data: IDxf, blockEntity?: IEntity): THREE.Line | undefined;
    addTriangleFacingCamera(verts: THREE.Vector3[], p0: THREE.Vector3, p1: THREE.Vector3, p2: THREE.Vector3): void;
    drawSolid(entity: DxfEntity, data: IDxf, blockEntity?: IEntity): THREE.Mesh | undefined;
    private getDefaultTextStyle;
    private getDefaultDimensionStyle;
    private getTextEncoding;
    private getTextMesh;
    private transformTextMesh;
    drawText(entity: DxfEntity, data: IDxf, blockEntity?: IEntity): THREE.LineSegments | THREE.Mesh | undefined;
    drawAttDef(entity: DxfEntity, data: IDxf, blockEntity?: IEntity): THREE.LineSegments | THREE.Mesh | undefined;
    drawAttrib(entity: DxfEntity, data: IDxf, blockEntity?: IEntity): THREE.LineSegments | THREE.Mesh | undefined;
    drawPoint(entity: DxfEntity, data: IDxf, blockEntity?: IEntity): THREE.Points | undefined;
    drawDimension(entity: DxfEntity, data: IDxf): THREE.Object3D | undefined;
    drawInsert(entity: DxfEntity, data: IDxf): THREE.Object3D | undefined;
    drawSpatialFilter(sfObject: ISpatialFilterObject): THREE.Object3D | undefined;
    drawLayout(block: IBlock, data: IDxf, layoutName: string, threejsObject: THREE.Object3D, layersAndThreejsObjects: Record<string, THREE.Object3D[]>, // the key is layer name
    layoutViewportsMap: Record<string, IViewportEntity[]>): void;
    private convertEdgeToPoints;
    drawHatch(entity: DxfEntity, data: IDxf, blockEntity?: IEntity): THREE.Group | undefined;
    drawOle2frame(entity: DxfEntity, data: IDxf): THREE.Object3D | undefined;
    static getOcsMatrix(extrusion: THREE.Vector3): THREE.Matrix4;
    static getDcs2WcsMatrix(viewportEntity: IViewportEntity | IViewPort, angDir: number): THREE.Matrix4;
    private getViewportMsToPsMatrix;
    drawViewport(entity: DxfEntity, data: IDxf, blockEntity?: IEntity): THREE.Object3D | undefined;
    private getColor;
    private getLineType;
    /**
     * Gets entity's layer name.
     * Note that, when entity is in layer "0", it tries to get its parent blockEntity's layer name.
     */
    private getLayerName;
    private setMaterial;
    private setHatchMaterial;
    private setRenderOrderByObjectType;
    private getPointsMaterial;
    private getLineBasicMaterial;
    private getLineShaderMaterial;
    private getMeshBasicMaterial;
    /**
     * Gets shader material for drawing a hatch with pattern
     */
    private getHatchShaderMaterial;
    /**
     * Gets a proper division for curve by entity count, entity size and theta angle, etc.
     * @param size may not be accurate, can be the radius, long size of bbox, etc.
     */
    getDivision(startAngle: number, endAngle: number, size: number): number;
    /**
     * Gets proper simplify tolerance.
     * If tolerance is bigger, more points are simpified.
     */
    getSimplifyTolerance(blockEntity?: IEntity): number;
    /**
     * Catches dxf data into indexedDb
     */
    setDxfDataToIndexedDb(dxfDataId: string, dxf: IDxf): Promise<void>;
    /**
     * Gets dxf data into indexedDb
     */
    getDxfDataFromIndexedDb(modelId: string): Promise<IDxf | undefined>;
    private buildContainHierarchyTree;
    private buildHatchGeometry;
    private findIntersectHole;
    /**
     * Checks if we should rebase points in case their values are big, and do rebase if necessary
     */
    private checkAndRebasePolygonsOnRTC;
    /**
     * Adds "relativeToCenter" flag to indicate an object has been rebased
     */
    private setRTCUserData;
    private IsfilteredByPathTypeFlag;
    /**
     * Finds spatial filter by entity handle.
     */
    private findSpatialFilterByHandle;
    private entityHandlesWithRenderOrder;
    /**
     * Find out render order info from SortEntsTable.
     */
    private initRenderOrderInfo;
    private findMatchedHatchShaderMaterial;
    private addViewport;
    /**
     * Gets the layout that entity belongs to.
     * Entities resident in two places:
     * 1) IDxf.entities
     * 2) IDxf.blocks[<blockName>].entities
     */
    private getLayoutName;
    private getLayerVisible;
    private getLayerFrozen;
    private cloneMaterialsForSpatialFilter;
    private getLineTypeScales;
    static getDxfUnits(unitValue: number): Units;
    static computeLineDistance(line: THREE.Line): void;
    static computeLineDistances(object: THREE.Object3D): void;
}
