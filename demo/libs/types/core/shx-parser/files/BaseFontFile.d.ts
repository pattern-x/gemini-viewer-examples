import * as THREE from "three";
import { BinaryReader } from "../../helpers/BinaryReader";
import { FontDataTableRecord } from "../../indexeddb/FontDataTable";
import { Orientation, ShxFontType } from "../Shx.constants";
import { TextShape } from "../TextShape";
export declare abstract class BaseFontFile {
    type: ShxFontType;
    info: string;
    orientation: Orientation;
    baseUp: number;
    baseDown: number;
    fileHeader: string;
    fileVersion: string;
    url: string;
    codes: Record<number, Uint8Array>;
    private graphicData;
    constructor(url: string);
    abstract init(reader: BinaryReader): void;
    /**
     * Gets TextShape by char's code and font size
     */
    getGraphicDataByCode(code: number, size: number): TextShape | undefined;
    /**
     * Gets TextShape by char's code, font size and offset
     */
    getGraphicDataByCodeWithOffset(code: number, size: number, translate: THREE.Vector2): TextShape | undefined;
    private getFontFile;
    setFontFile(data: FontDataTableRecord): void;
    releaseFontData(): void;
    /**
     * Catches dxf data into indexedDb
     */
    setFontDataToIndexedDb(): Promise<void>;
    getFontDataByIndexedDb(): Promise<FontDataTableRecord>;
}
