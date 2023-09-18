export interface IGroup {
    code: number;
    value: number | string | boolean;
}
export declare abstract class DxfBaseReader {
    protected pointer: number;
    protected eof: boolean;
    lastReadGroup: IGroup | undefined;
    abstract next(): IGroup;
    abstract hasNext(): boolean;
    abstract isEOF(): boolean;
}
