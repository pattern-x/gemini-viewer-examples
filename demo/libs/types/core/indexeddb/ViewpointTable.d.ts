import { BaseTable } from "./BaseTable";
/**
 * ViewpointTable in IndexedDb
 * Table is known as ObjectStore in IndexedDb
 */
export declare class ViewpointTable extends BaseTable {
    tableName(): string;
    /**
     * Singleton design pattern
     */
    private static _instance;
    static instance(): ViewpointTable;
    query(projectId: string, successCallback?: any, errorCallback?: any): void;
}
