export declare class BitConverter {
    static GetBytes(value: string | number | boolean | []): Uint8Array;
    static Get1Bytes(value: number | boolean | []): Uint8Array;
    static byteTosbyte(byte: number): number;
    static ToBoolean(value: Uint8Array, startIndex: number): boolean;
    static ToInt8(value: Uint8Array, startIndex: number): number;
    static ToUInt8(value: Uint8Array, startIndex: number): number;
    static ToInt16(value: Uint8Array, startIndex: number): number;
    static ToInt32(value: Uint8Array, startIndex: number): number;
    static ToUInt16(value: Uint8Array, startIndex: number): number;
    static ToUInt32(value: Uint8Array, startIndex: number): number;
    static ToChar(value: Uint8Array, startIndex: number): string;
    static ToAscii(value: Uint8Array, startIndex: number): string;
    static ToAsciiString(value: Uint8Array, startIndex: number, length: number): string;
    static ToUTF16String(value: Uint8Array, startIndex: number, length: number): string;
    static ToFloat32(value: Uint8Array, startIndex: number): number;
    static ToFloat64(value: Uint8Array, startIndex: number): number;
}
