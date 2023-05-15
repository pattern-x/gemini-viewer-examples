import { Command } from "./Command";
import type { MeasurementData, MeasurementManager } from "../../core/measure";
export declare class RemoveMeasurementCommand extends Command {
    private manager;
    private data;
    constructor(manager: MeasurementManager, data: MeasurementData);
    undo(): boolean;
    redo(): boolean;
}
