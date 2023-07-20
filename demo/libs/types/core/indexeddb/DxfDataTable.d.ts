import { BaseTable } from "./BaseTable";
export interface DxfDataTableRecord {
    dxfDataId: string;
    dxf: object;
}
/**
 * DxfDataTable in IndexedDb
 * Table is known as ObjectStore in IndexedDb
 */
export declare class DxfDataTable extends BaseTable {
    tableName(): string;
    /**
     * Singleton design pattern
     */
    private static _instance;
    static instance(): DxfDataTable;
    /**
     * Queires a dxf data
     * @param dxfDataId should be a unique id to identify different dxf files
     */
    query(dxfDataId: string, successCallback?: any, errorCallback?: any): void;
}
