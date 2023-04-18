export interface OperationRecord {
    type: string;
    payload: unknown;
}
export declare class UndoRedoHelper {
    private history;
    private step;
    private maxCount;
    constructor(maxCount?: number);
    addRecord(type: string, data: unknown): void;
    undo(): OperationRecord | undefined;
    redo(): OperationRecord | undefined;
    clear(): void;
    destroy(): void;
}
