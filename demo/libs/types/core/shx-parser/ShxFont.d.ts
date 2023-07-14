import { Font } from "three/examples/jsm/loaders/FontLoader.js";
import { TextShape } from "./TextShape";
import { BaseFontFile } from "./files/BaseFontFile";
export interface FontFileData {
    url: string;
    arrayBuffer: ArrayBuffer;
}
export declare class ShxFont extends Font {
    static DEFAULT_SIZE: number;
    files: BaseFontFile[];
    private filesMap;
    unsupportedChars: Record<string, number>;
    private textShapesCache;
    constructor(dataArray?: FontFileData[]);
    loadFiles(dataArray: FontFileData[]): Promise<void>;
    loadFile(fontFileData: FontFileData): BaseFontFile | null;
    /**
     * Gets TextShape by a char
     */
    getGraphicDataByChar(char: string, size: number): TextShape | undefined;
    /**
     * Gets TextShape by a char code
     */
    getGraphicDataByCode(code: number, size: number): TextShape | undefined;
    /**
     * Gets TextShapes of given string
     * @param str
     * @param size
     * @param lineHeight
     * @param lineSpace
     * @param wordSpace
     * @returns [TextShape]
     * @describe get char shape
     */
    getGraphicData(str: string, size?: number, lineHeight?: number, lineSpace?: number, wordSpace?: number, maxWidth?: number, isVertical?: boolean): TextShape[];
    /**
     * For an unsupported char, use "？" as a replacement.
     */
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
    /**
     * Just for log usage
     */
    private addUnsupportedChar;
    /**
     * Checks if all fonts are loaded.
     */
    static checkFontsAreLoaded(fontUrls: string[]): Promise<boolean>;
    private saveFontDataToIndexdb;
    getFontData(): Promise<void>;
    releaseFontData(): void;
    destroy(): void;
}
