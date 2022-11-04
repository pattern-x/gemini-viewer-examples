import { FontFile } from "./files/FontFile";
import * as THREE from "three";
import { TextShape } from "./TextShape";
import { BinaryReader } from "../helpers/BinaryReader";
export declare class ShxParser {
    static stopFlag: string;
    static FILE_STOP_FLAG: string[];
    static CICLESPAN: number;
    static parserHeader(reader: BinaryReader, stopMatch: string[]): string;
    static getCode(c: string): number;
    static parserCode(file: FontFile, data: Uint8Array, scale: number): TextShape;
    static skipCode(file: FontFile, data: Uint8Array, index: number): number;
    static _generateArcPoints(start: THREE.Vector2, distance: THREE.Vector2, bulge: number): THREE.Vector2;
}
