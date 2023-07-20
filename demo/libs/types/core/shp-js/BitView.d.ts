export declare class BitView {
    buffer: any;
    u8: any;
    constructor(buf: any);
    getBit(idx: any): number;
    setBit(idx: any, val: any): void;
    getInt12(idx: any): number;
    setInt12(idx: any, val: any): void;
    getInt6(idx: any): number;
    setInt6(idx: any, val: any): void;
    test(): BitView;
}
