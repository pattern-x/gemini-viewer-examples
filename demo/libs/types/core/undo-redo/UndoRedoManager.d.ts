import { Command } from "./Command";
declare type CommandData = Command | Command[];
export declare class UndoRedoManager {
    private history;
    private step;
    private maxCount;
    private isBatchCommand;
    private batchCommands;
    constructor(maxCount?: number);
    addCommand(command: Command): void;
    startTransaction(): void;
    endTransaction(): void;
    undo(): boolean;
    redo(): boolean;
    getCommands(): CommandData[];
    canUndo(): boolean;
    canRedo(): boolean;
    clear(): void;
    destroy(): void;
}
export {};
