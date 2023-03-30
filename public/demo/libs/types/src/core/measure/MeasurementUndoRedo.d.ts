import { OperationRecord, UndoRedoHelper } from "../../core/helpers";
import type { MeasurementManager } from "../../core/measure/MeasurementManager";
export declare enum MeasurementState {
    Add = "ADD",
    Remove = "REMOVE"
}
export declare class MeasurementUndoRedo extends UndoRedoHelper {
    private manager;
    constructor(manager: MeasurementManager, maxCount?: number);
    undo(): OperationRecord | undefined;
    redo(): OperationRecord | undefined;
}
