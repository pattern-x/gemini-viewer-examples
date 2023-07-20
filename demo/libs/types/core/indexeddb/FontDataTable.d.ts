import { BaseTable } from "./BaseTable";
import type { Orientation, ShxFontType } from "../../core/shx-parser";
export interface FontDataTableRecord {
    url: string;
    type: ShxFontType;
    codes: Record<number, Uint8Array>;
    info: string;
    orientation: Orientation;
    baseUp: number;
    baseDown: number;
    fileName: string;
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
