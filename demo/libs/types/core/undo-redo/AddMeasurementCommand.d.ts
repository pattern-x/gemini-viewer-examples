import { Command } from "./Command";
import type { MeasurementPlugin, MeasurementData } from "../../plugins/measure";
export declare class AddMeasurementCommand extends Command {
    private manager;
    private data;
    constructor(manager: MeasurementPlugin, data: MeasurementData);
    undo(): boolean;
    redo(): boolean;
}
