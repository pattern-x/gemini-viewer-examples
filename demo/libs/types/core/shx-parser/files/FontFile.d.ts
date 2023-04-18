import * as THREE from "three";
import { TextShape } from "../TextShape";
import { BinaryReader } from "../../helpers/BinaryReader";
import { FontDataTableRecord } from "../../../core/indexeddb/FontDataTable";
export declare enum Orientation {
    Horizontal = 0,
    Vertical = 1,
    All = 2
}
export declare enum ShxFontType {
    Shapes = 0,
    Bigfont = 1,
    Unifont = 2
}
export declare abstract class FontFile {
    type: ShxFontType;
    info: string;
    orientation: Orientation;
    baseUp: number;
    baseDown: number;
    fileHeader: string;
    fileVersion: string;
    url: string;
    datas: Record<number, Uint8Array>;
    private graphicData;
    constructor(url: string);
    abstract init(reader: BinaryReader): void;
    getGraphicDataByCode(code: number, size: number): TextShape | undefined;
    getGraphicTextShape(code: number, size: number, translate: THREE.Vector2): TextShape | undefined;
    getFontFile(): {
        url: string;
        type: ShxFontType;
        datas: Record<number, Uint8Array>;
        info: string;
        orientation: Orientation;
        baseUp: number;
        baseDown: number;
        fileHeader: string;
        fileVersion: string;
    };
    setFontFile(data: FontDataTableRecord): void;
    releaseFontData(): void;
    /**
     * Catches dxf data into indexedDb
     */
    setFontDataToIndexedDb(): Promise<void>;
    getFontDataByIndexedDb(): Promise<FontDataTableRecord>;
}
