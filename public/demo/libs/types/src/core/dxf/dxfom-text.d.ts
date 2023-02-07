export interface DxfTextContentElement {
    /** text content */
    text: string;
    /** strike-through */
    k?: 1;
    /** overscore */
    o?: 1;
    /** underscore */
    u?: 1;
}
export declare const decodeDxfTextCharacterCodes: (text: string, mbcsEncoding?: string | TextDecoder) => string;
export declare const decodeDxfTextUnicodeCodePoints: (text: string) => string;
export declare const decodeDxfTextMbcsCharacterCodes: (text: string, encoding: string | TextDecoder) => string;
export declare const parseDxfTextContent: (text: string, options?: {
    readonly encoding?: string | TextDecoder;
}) => DxfTextContentElement[];
