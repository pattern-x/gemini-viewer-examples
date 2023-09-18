import JSBI from "jsbi";
export declare class BinaryReader {
    private endian;
    private position;
    private data;
    private decoder;
    constructor(arraybuffer: ArrayBuffer, endian?: string);
    readAsciiString(length: number): string;
    readUtf8String(length: number): string;
    readBytes(length?: number): Uint8Array;
    readUint8(): number;
    readInt8(): number;
    readUint16(): number;
    readInt16(): number;
    readUint32(): number;
    readInt32(): number;
    readFloat32(): number;
    readFloat64(): number;
    readInt64(): JSBI;
    readUint64(): JSBI;
    getPosition(): number;
    setPosition(position: number): void;
    isEnd(): boolean;
}
