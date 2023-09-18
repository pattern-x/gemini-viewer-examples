import { BaseTable } from "./BaseTable";
import type { Orientation, ShxFontType } from "../../core/font/shx";
export interface FontDataTableRecord {
    fontType?: ShxFontType;
    order: number;
    data: Record<number, Uint8Array>;
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
    query(fileName: string): Promise<FontDataTableRecord>;
    queryAll(): Promise<FontDataTableRecord[]>;
}
