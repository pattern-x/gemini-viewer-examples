import { DxfBaseReader, IGroup } from "./DxfBaseReader";
export default class DxfBinaryReader extends DxfBaseReader {
    private reader;
    private decoder;
    constructor(data: ArrayBuffer);
    next(): IGroup;
    hasNext(): boolean;
    isEOF(): boolean;
    private parseGroupValue;
    private readNullTerminatedString;
    private ReadBinaryData;
}
