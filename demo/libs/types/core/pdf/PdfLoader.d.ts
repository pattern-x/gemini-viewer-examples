import * as pdfjsLib from "pdfjs-dist";
import type { PDFOperatorList } from "pdfjs-dist/types/src/display/api";
import * as THREE from "three";
import { Font } from "three/examples/jsm/loaders/FontLoader.js";
import { ShxFont } from "../../core/shx-parser";
/**
 * PdfLoader
 * @description The pdf coordinate origin is in the lower left corner.
 * @link https://zxyle.github.io/PDF-Explained/
 * @link https://github.com/mozilla/pdf.js/
 */
export declare class PdfLoader extends THREE.Loader {
    pdf?: pdfjsLib.PDFDocumentProxy;
    pdfPage?: pdfjsLib.PDFPageProxy;
    commonObjs?: any;
    objs?: any;
    operatorList?: PDFOperatorList;
    operatorListIdx?: number;
    contentVisible: boolean;
    stateStack: CanvasExtraState[];
    current: CanvasExtraState;
    tempSMask: null;
    viewportScale: number;
    baseTransform: number[];
    pdfGroup: THREE.Group;
    currentTransform: THREE.Matrix4;
    currentPath?: THREE.Shape;
    font?: ShxFont | Font;
    constructor(cfg: any);
    load(url: string, onLoad: (data: any) => void, onProgress: (event: ProgressEvent) => void, onError: (error: any) => void): void;
    loadAsync(url: string, onProgress: (event: ProgressEvent) => void): Promise<THREE.Group>;
    private createTextMeshByText;
    getObject(data: any, fallback?: null): any;
    beginDrawing(viewport: pdfjsLib.PageViewport): void;
    executeOperatorList(operatorList: any, executionStartIdx?: number, continueCallback?: any, stepper?: any): number;
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
    showText(glyphs: any[]): void;
    showType3Text(glyphs: any): void;
    showSpacedText(): void;
    nextLineShowText(): void;
    nextLineSetSpacingShowText(): void;
    setCharWidth(xWidth: any, yWidth: any): void;
    setCharWidthAndBounds(): void;
    setStrokeColorSpace(): void;
    setFillColorSpace(): void;
    setStrokeColor(): void;
    setStrokeColorN(): void;
    setFillColor(): void;
    setFillColorN(): void;
    setStrokeGray(): void;
    setFillGray(): void;
    setStrokeRGBColor(r: number, g: number, b: number): void;
    setFillRGBColor(r: number, g: number, b: number): void;
    setStrokeCMYKColor(): void;
    setFillCMYKColor(): void;
    shadingFill(): void;
    beginInlineImage(): void;
    beginImageData(): void;
    endInlineImage(): void;
    paintXObject(): void;
    markPoint(): void;
    markPointProps(): void;
    beginMarkedContent(tag: any): void;
    beginMarkedContentProps(tag: any, properties: any): void;
    endMarkedContent(): void;
    beginCompat(): void;
    endCompat(): void;
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
    constructPath(ops: number[], args: number[], minMax: any): void;
}
declare class CanvasExtraState {
    alphaIsShape: boolean;
    fontSize: number;
    fontSizeScale: number;
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
    fillColor: THREE.Color;
    strokeColor: THREE.Color;
    patternFill: boolean;
    fillAlpha: number;
    strokeAlpha: number;
    lineWidth: number;
    activeSMask: null;
    transferMaps: string;
    ctxMatrix: THREE.Matrix3;
    fontDirection?: number;
    font?: any;
    constructor(width?: number, height?: number);
    clone(): any;
    setCurrentPoint(x: number, y: number): void;
}
export {};
