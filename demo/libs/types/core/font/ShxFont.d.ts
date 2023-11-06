import * as THREE from "three";
import { BaseFont } from "./BaseFont";
import { ShxFontType } from "./shx/Shx.constants";
import { TextShape } from "./shx/TextShape";
import { FontDataTableRecord } from "../../core/indexeddb";
export declare class ShxFont extends BaseFont {
    isExtend: boolean;
    isUniCode: boolean;
    isEmbedded: boolean;
    static DEFAULT_SIZE: number;
    fontType: ShxFontType;
    private textShapesCache;
    private graphicData;
    constructor(fileName: string, fileData: ArrayBuffer | FontDataTableRecord);
    generateShapes(text: string, size: number): TextShape[];
    /**
     * Gets TextShape by a char
     */
    getCharShape(char: string, size: number): TextShape | undefined;
    /**
     * Gets TextShape by a char code
     */
    getGraphicDataByCode(code: number, size: number): TextShape | undefined;
    /**
     * Gets TextShape by char's code, font size and offset
     */
    getGraphicDataByCodeWithOffset(code: number, size: number, translate: THREE.Vector2): TextShape | undefined;
    private parseBigFont;
    private parseUniFont;
    private parseShapeFont;
    /**
     * For an unsupported char, use "？" as a replacement.
     */
    getNotFoundTextShape(size: number): TextShape | undefined;
    protected getFontFile(): {
        fontType: ShxFontType;
        order: number;
        data: any;
        info: string;
        orientation: import("./shx/Shx.constants").Orientation;
        baseUp: number;
        baseDown: number;
        fileName: string;
        fileHeader: string;
        fileVersion: string;
    };
    setFontFile(data: FontDataTableRecord): void;
    releaseFontData(): void;
}
