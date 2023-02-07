import { MarkupManager } from "./MarkupManager";
import { OperationRecord, UndoRedoHelper } from "../helpers/UndoRedoHelper";
export declare enum MarkupState {
    Add = "Add",
    Update = "Update",
    Remove = "Remove"
}
export declare class MarkupUndoRedo extends UndoRedoHelper {
    manager: MarkupManager;
    constructor(manager: MarkupManager, maxCount?: number);
    undo(): OperationRecord | undefined;
    redo(): OperationRecord | undefined;
}
