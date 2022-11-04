import * as THREE from "three";
import { Font } from "three/examples/jsm/loaders/FontLoader";
import { FontFile } from "./files/FontFile";
import { TextShape } from "./TextShape";
export interface FontFileData {
    url: string;
    arrayBuffer: ArrayBuffer;
}
export declare class ShxFont extends Font {
    static DEFAULT_SIZE: number;
    files: FontFile[];
    private filesMap;
    unsupportedChars: Record<string, number>;
    private textShapesCache;
    constructor(datas?: FontFileData[]);
    loadFiles(datas: FontFileData[]): Promise<void>;
    loadFile(fontFileData: FontFileData): FontFile | null;
    getGraphicDataByChar(c: string, size: number): TextShape | undefined;
    getGraphicDataByCode(code: number, size: number): TextShape | undefined;
    getGraphicTextShape(code: number, size: number, translate: THREE.Vector2): TextShape | undefined;
    /**
     *
     * @param str
     * @param size
     * @param lineHeight
     * @param lineSpace
     * @param wordSpace
     * @returns [TextShape]
     * @describe get char shape
     */
    getGraphicData(str: string, size?: number, lineHeight?: number, lineSpace?: number, wordSpace?: number, maxWidth?: number, isVertical?: boolean): TextShape[];
    getNotFoundTextShape(size: number): TextShape | undefined;
    /**
     *
     * @param str
     * @param size
     * @param lineHeight
     * @param lineSpace
     * @param wordSpace
     * @returns
     * @describe override methods
     */
    generateShapes(str: string, size?: number, lineHeight?: number, lineSpace?: number, wordSpace?: number): TextShape[];
    /**
     * Just for log usage
     */
    private addUnsupportedChar;
    static checkFontIsLoaded(fontUrls: string[]): Promise<boolean>;
    saveFontDataToIndexdb(): Promise<void>;
    getFontData(): Promise<void>;
    releaseFontData(): void;
    destroy(): void;
}
