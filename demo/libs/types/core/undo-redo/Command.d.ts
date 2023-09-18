export declare abstract class Command {
    protected name: string;
    constructor(name: string);
    abstract undo(): boolean;
    abstract redo(): boolean;
}
