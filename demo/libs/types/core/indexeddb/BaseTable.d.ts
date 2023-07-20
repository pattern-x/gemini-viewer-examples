/**
 * Table is known as ObjectStore in IndexedDb
 */
export declare class BaseTable {
    db?: IDBDatabase;
    isCreatingTable: boolean;
    constructor();
    /**
     * Derived class have to override this method and return a table name!
     */
    tableName(): string;
    /**
     * Adds a record to a table
     */
    add(record: any, successCallback?: any, errorCallback?: any): void;
    /**
     * Saves a record
     */
    save(record: any, successCallback?: any, errorCallback?: any): void;
    /**
     * Deletes a record
     */
    delete(key: string, successCallback?: any, errorCallback?: any): void;
    /**
     * Updates a record
     */
    update(): void;
    /**
     * Queries records in a table
     * @param cursorHandler callback to handle records one by one
     */
    query(cursorHandler?: any, errorCallback?: any): void;
    queryByIndex(indexName: any, indexValue: any, successCallback?: any, errorCallback?: any): void;
    queryAll(successCallback?: any, errorCallback?: any): void;
    clearAll(successCallback?: any, errorCallback?: any): void;
}
