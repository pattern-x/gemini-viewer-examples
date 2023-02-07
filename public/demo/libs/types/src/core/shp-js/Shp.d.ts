export declare enum SHP {
    NULL = 0,
    POINT = 1,
    POLYLINE = 3,
    POLYGON = 5
}
export declare class SHPParser {
    parse(arrayBuffer: any): any;
    parseShape(dv: any, idx: any, length: any): any;
}
