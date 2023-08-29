import type { ShxFont } from "../ShxFont";
import { TextShape } from "./TextShape";
import { BinaryReader } from "../../../core/helpers/BinaryReader";
export declare class ShxParser {
    static FILE_STOP_FLAG: string[];
    protected static CIRCLE_SPAN: number;
    static parserHeader(reader: BinaryReader, stopMatch: string[]): string;
    /**
     * Gets code id of a char.
     */
    static getCode(char: string): number;
    /**
     * Parses code data and generates TextShape.
     */
    static parserCode(file: ShxFont, data: Uint8Array, scale: number): TextShape;
    private static skipCode;
    private static generateArcPoints;
}
