import { Font } from "three/examples/jsm/loaders/FontLoader.js";
import { FontDataTableRecord } from "../indexeddb";
import { Orientation } from "./shx";
export declare abstract class BaseFont extends Font {
    info: string;
    orientation: Orientation;
    baseUp: number;
    baseDown: number;
    fileHeader: string;
    fileVersion: string;
    fileName: string;
    data: any;
    order: number;
    unsupportedChars: Record<string, number>;
    constructor(fileName: string, fileData: any);
    abstract getCharShape(char: string, size: number): THREE.Shape | undefined;
    abstract getNotFoundTextShape(size: number): THREE.Shape | undefined;
    /**
     * Just for log usage
     */
    protected addUnsupportedChar(char: string): void;
    protected getFontFile(): {
        order: number;
        data: any;
        info: string;
        orientation: Orientation;
        baseUp: number;
        baseDown: number;
        fileName: string;
        fileHeader: string;
        fileVersion: string;
    };
    setFontFile(data: FontDataTableRecord): void;
    /**
     * Catches dxf data into indexedDb
     */
    setFontDataToIndexedDb(): Promise<void>;
    getFontDataByIndexedDb(): Promise<FontDataTableRecord>;
    releaseFontData(): void;
}
