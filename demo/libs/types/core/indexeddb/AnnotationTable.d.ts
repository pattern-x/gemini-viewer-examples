import { BaseTable } from "./BaseTable";
/**
 * Table is known as ObjectStore in IndexedDb
 * AnnotationTable in IndexedDb
 */
export declare class AnnotationTable extends BaseTable {
    tableName(): string;
    /**
     * Singleton design pattern
     */
    private static _instance;
    static instance(): AnnotationTable;
    query(projectId: string, successCallback?: any, errorCallback?: any): void;
}
