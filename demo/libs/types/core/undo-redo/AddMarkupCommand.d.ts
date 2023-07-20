import { Command } from "./Command";
import type { MarkupManager } from "../../core/markup";
import type { MarkupData } from "../../core/viewers";
export declare class AddMarkupCommand extends Command {
    private manager;
    private data;
    constructor(manager: MarkupManager, data: MarkupData);
    undo(): boolean;
    redo(): boolean;
}
