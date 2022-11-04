import type { Orientation, ShxFontType } from "../shx-parser/files/FontFile";
import { BaseTable } from "./BaseTable";
export interface FontDataTableRecord {
    url: string;
    type: ShxFontType;
    datas: Record<number, Uint8Array>;
    info: string;
    orientation: Orientation;
    baseUp: number;
    baseDown: number;
    fileHeader: string;
    fileVersion: string;
}
/**
 * DxfDataTable in IndexedDb
 * Table is known as ObjectStore in IndexedDb
 */
export declare class FontDataTable extends BaseTable {
    tableName(): string;
    /**
     * Singleton design pattern
     */
    private static _instance;
    static instance(): FontDataTable;
    /**
     * Queires a dxf data
     * @param fileId should be a unique id to identify different dxf files
     */
    query(url: string, successCallback?: any, errorCallback?: any): void;
    queryAll(): Promise<FontDataTableRecord[]>;
}
