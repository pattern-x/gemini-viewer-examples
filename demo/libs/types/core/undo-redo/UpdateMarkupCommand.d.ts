import { Command } from "./Command";
import type { MarkupManager } from "../../core/markup";
import type { MarkupData } from "../../core/viewers";
export declare class UpdateMarkupCommand extends Command {
    private manager;
    private oldData;
    private newData;
    constructor(manager: MarkupManager, oldData: MarkupData, newData: MarkupData);
    undo(): boolean;
    redo(): boolean;
}
