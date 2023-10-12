import * as pdfjsLib from "pdfjs-dist";
import type { PDFOperatorList } from "pdfjs-dist/types/src/display/api";
import * as THREE from "three";
import type { PdfLoaderPluginConfig } from "./PdfLoaderPlugin";
import { DxfModelConfig } from "../../core/Configs";
import { FontManager } from "../../core/font";
import { ModelData2d } from "../../core/model/Constants";
import { PdfLayer } from "../../core/viewers";
/**
 * PdfLoader
 * @description The pdf coordinate origin is in the lower left corner.
 * @link https://zxyle.github.io/PDF-Explained/
 * @link https://github.com/mozilla/pdf.js/
 */
export declare class PdfLoader extends THREE.Loader {
    static readonly MODEL_LAYOUT_NAME = "Model";
    pdf?: pdfjsLib.PDFDocumentProxy;
    pdfPage?: pdfjsLib.PDFPageProxy;
    commonObjs?: any;
    objs?: any;
    operatorList?: PDFOperatorList;
    contentVisible: boolean;
    optionalContentConfig?: any;
    markedContentStack: any[];
    stateStack: CanvasExtraState[];
    current: CanvasExtraState;
    tempSMask: null;
    pendingTextPaths?: any[];
    pendingClip?: any;
    pendingEOFill: boolean;
    activeLayoutName: string;
    defaultLayerId: string;
    currentLayerId: string;
    layers: Record<string, PdfLayer>;
    loadedEntityCount: number;
    layersAndThreejsObjects?: Record<string, THREE.Object3D[]>;
    viewportScale: number;
    baseTransform: THREE.Matrix4;
    pdfDocumentGroup?: THREE.Group;
    pdfPageGroup?: THREE.Group;
    currentTransform: THREE.Matrix4;
    transformStack: THREE.Matrix4[];
    currentPath?: THREE.Shape;
    clipPaths?: THREE.Shape[];
    clipType: any;
    paths: THREE.Shape[];
    private pointsMaterials;
    private lineBasicMaterials;
    private meshBasicMaterials;
    fontManager?: FontManager;
    modelCfg?: DxfModelConfig;
    private lineWithWidthCount;
    /**
     * Uses progressive load if this is defined.
     * @param done Indicates if progressive load is done.
     */
    progressiveLoadCallback?: (zOrder: number, done: boolean) => void;
    constructor(cfg: PdfLoaderPluginConfig);
    load(modelCfg: DxfModelConfig, onLoad: (data: ModelData2d) => void, onProgress: (event: ProgressEvent) => void, onError: (error: any) => void): void;
    /**
     *
     * @param modelCfg
     * @param onProgress
     * @returns
     */
    loadAsync(modelCfg: DxfModelConfig, onProgress: (event: ProgressEvent) => void): Promise<ModelData2d>;
    private getOperatorList;
    private _pumpOperatorList;
    private tryCleanup;
    private mergePdfObjects;
    private getPointsMaterial;
    private getLineBasicMaterial;
    private getMeshBasicMaterial;
    getTransformByMatrix4(matrix: THREE.Matrix4): number[];
    getObject(data: any, fallback?: null): any;
    beginDrawing(viewport: pdfjsLib.PageViewport): void;
    endDrawing(): void;
    private releaseData;
    buildLayers(page: pdfjsLib.PDFPageProxy): Promise<{
        layerCount: number;
        layersMap: Record<string, PdfLayer>;
        layers: any;
    } | undefined>;
    private addObjectToModel;
    executeOperatorList(operatorList: any, onProgress?: (event: ProgressEvent) => void): Promise<void>;
    setLineWidth(width: number): void;
    setLineCap(style: number): void;
    setLineJoin(style: number): void;
    setMiterLimit(limit: number): void;
    setDash(dashArray: number[], dashPhase: number): void;
    setRenderingIntent(intent: any): void;
    setFlatness(flatness: any): void;
    setGState(states: any): void;
    save(): void;
    restore(): void;
    /**
     *
     * a c e
     * b d f
     * 0 0 1
     */
    /**
     *
     * @param a is scale x.
     * @param b is skew y.
     * @param c is skew x.
     * @param d is scale y
     * @param e is translate x.
     * @param f is translate y.
     * @example
     * a c e
     * b d f
     * 0 0 1
     */
    transform(a: number, b: number, c: number, d: number, e: number, f: number): void;
    moveTo(): void;
    lineTo(): void;
    curveTo(): void;
    curveTo2(): void;
    curveTo3(): void;
    closePath(): void;
    rectangle(): void;
    stroke(consumePath?: boolean): void;
    closeStroke(): void;
    fill(consumePath?: boolean): void;
    eoFill(): void;
    fillStroke(): void;
    eoFillStroke(): void;
    closeFillStroke(): void;
    closeEOFillStroke(): void;
    endPath(): void;
    clip(): void;
    eoClip(): void;
    beginText(): void;
    endText(): void;
    setCharSpacing(spacing: number): void;
    setWordSpacing(spacing: number): void;
    setHScale(scale: number): void;
    setLeading(leading: number): void;
    setFont(fontRefName: string, size: number): void;
    setTextRenderingMode(mode: number): void;
    setTextRise(rise: number): void;
    moveText(x: number, y: number): void;
    setLeadingMoveText(): void;
    setTextMatrix(a: number, b: number, c: number, d: number, e: number, f: number): void;
    nextLine(): void;
    paintChar(character: string, x: number, y: number): THREE.BufferGeometry<THREE.NormalBufferAttributes> | import("three/examples/jsm/geometries/TextGeometry").TextGeometry | undefined;
    showText(glyphs: any[]): void;
    showType3Text(glyphs: any): void;
    setCharWidth(xWidth: any, yWidth: any): void;
    setCharWidthAndBounds(xWidth: number, yWidth: number, llx: number, lly: number, urx: number, ury: number): void;
    setStrokeColor(): void;
    setStrokeColorN(): void;
    setFillColorN(): void;
    setStrokeRGBColor(r: number, g: number, b: number): void;
    setFillRGBColor(r: number, g: number, b: number): void;
    shadingFill(): void;
    beginInlineImage(): void;
    beginImageData(): void;
    markPoint(tag: any): void;
    markPointProps(tag: any, properties: any): void;
    beginMarkedContent(tag: any): void;
    beginMarkedContentProps(tag: any, properties: any): void;
    endMarkedContent(): void;
    beginCompat(): void;
    endCompat(): void;
    consumePath(clipBox?: number[]): void;
    paintFormXObjectBegin(matrix: any, bbox: any): void;
    paintFormXObjectEnd(): void;
    beginGroup(): void;
    endGroup(): void;
    beginAnnotation(): void;
    endAnnotation(): void;
    paintImageMaskXObject(): void;
    paintImageMaskXObjectGroup(): void;
    paintImageXObject(objId: any): void;
    paintInlineImageXObject(imgData: any): void;
    paintInlineImageXObjectGroup(): void;
    paintImageXObjectRepeat(): void;
    paintImageMaskXObjectRepeat(): void;
    paintSolidColorImageMask(): void;
    _scaleImage(img: any, inverseTransform: THREE.Matrix4): {
        paintWidth: any;
        paintHeight: any;
    };
    constructPath(ops: number[], args: number[], minMax: any): void;
    isContentVisible(): boolean;
}
declare class CanvasExtraState {
    alphaIsShape: boolean;
    fontSize: number;
    fontSizeScale: number;
    browserFontSize: number;
    textMatrix: number[];
    textMatrixScale: number;
    fontMatrix: number[];
    leading: number;
    x: number;
    y: number;
    lineX: number;
    lineY: number;
    charSpacing: number;
    wordSpacing: number;
    textHScale: number;
    textRenderingMode: number;
    textRise: number;
    fillColor: number;
    strokeColor: number;
    patternFill: boolean;
    fillAlpha: number;
    strokeAlpha: number;
    lineWidth: number;
    activeSMask: null;
    transferMaps: string;
    ctxMatrix: THREE.Matrix3;
    fontDirection?: number;
    font?: any;
    clipBox: number[];
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    lineCap: number;
    lineJoin: number;
    miterLimit: number;
    constructor(width: number, height: number);
    clone(): any;
    setCurrentPoint(x: number, y: number): void;
    startNewPathAndClipBox(box: number[]): void;
    updatePathMinMax(transform: number[], x: number, y: number): void;
    getPathBoundingBox(pathType?: string, transform?: null): number[];
    updateRectMinMax(transform: number[], rect: any): void;
    updateScalingPathMinMax(transform: number[], minMax: number[]): void;
    updateCurvePathMinMax(transform: number[], x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, minMax: number[]): void;
    updateClipFromPath(): void;
    isEmptyClip(): boolean;
    getClippedPathBoundingBox(pathType?: string, transform?: null): number[];
}
export {};
