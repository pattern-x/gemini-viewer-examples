export declare class IndexedDbManager {
    readonly DATABASE_NAME = "gemini_viewer_db";
    readonly TABLES: {
        name: string;
        options: {
            keyPath: string;
            autoIncrement: boolean;
        };
        indexArray: never[];
    }[];
    private db?;
    /**
     * Singleton design pattern
     */
    private static _instance;
    static instance(): IndexedDbManager;
    /**
     * Make sure to open database, and the table is already created before add/put/delete, etc.
     */
    getDatabase(): Promise<IDBDatabase>;
    /**
     * Close database.
     */
    closeDatabase(): void;
    private deleteDataBase;
    private getDB;
    private getUpgradedDB;
    private createTable;
}
