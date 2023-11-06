import { BaseTable } from "./BaseTable";
export interface ImageDataTableRecord {
    fileName: string;
    data: Blob;
}
/**
 * DxfDataTable in IndexedDb
 * Table is known as ObjectStore in IndexedDb
 */
export declare class ImageDataTable extends BaseTable {
    tableName(): string;
    /**
     * Singleton design pattern
     */
    private static _instance;
    static instance(): ImageDataTable;
    /**
     * Queires a dxf data
     * @param fileId should be a unique id to identify different dxf files
     */
    query(fileName: string): Promise<ImageDataTableRecord>;
    queryAll(): Promise<ImageDataTableRecord[]>;
}
