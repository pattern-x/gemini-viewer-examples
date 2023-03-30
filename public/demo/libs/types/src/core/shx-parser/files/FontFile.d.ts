import * as THREE from "three";
import { FontDataTableRecord } from "../../../core/indexeddb/FontDataTable";
import { BinaryReader } from "../../helpers/BinaryReader";
import { Orientation, ShxFontType } from "../Shx.constants";
import { TextShape } from "../TextShape";
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
