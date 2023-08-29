import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { BaseFont } from "./BaseFont";
export declare class FontManager {
    private loader;
    protected fontMap: Map<string, BaseFont>;
    protected fileNames?: string[];
    unsupportedChars: Record<string, number>;
    missingFonts: Record<string, number>;
    static enableFontCache: boolean;
    constructor();
    /**
     *
     * @param urls The order represents the priority
     * @returns
     * @description The best fonts order is: Load linear fonts first followed by ttf fonts, font types load Western fonts first in loaded chinese fonts.
     * @description Microsoft Yahei is the most worthy choice of Chinese font on the Win platform, but it is not the default viewer and needs to be set; Sans-serif fonts such as Arial and Tahoma are the main fonts for Western fonts.
     * @description At present, the latest font launched by Apple and San Francisco for Apple, the display effect is also the most elegant, but only the latest system can support, while blackface - Jane and Helvetica can get more system version support, the display effect is also similar, can be accepted.
     * @example font-family: Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
     */
    loadFonts(urls: string[]): Promise<void>;
    /**
     *
     * @param text
     * @param fontName
     * @param size
     * @returns
     * @description Gets text shape by fontName and size.
     */
    getTextShape(text: string, fontName: string, size: number): THREE.Shape[] | undefined;
    /**
     *
     * @param fontName
     * @param char
     * @param size
     * @returns
     */
    getCharShape(char: string, fontName: string, size: number): THREE.BufferGeometry<THREE.NormalBufferAttributes> | TextGeometry | undefined;
    getNotFoundTextShape(size: number): THREE.BufferGeometry<THREE.NormalBufferAttributes> | THREE.ExtrudeGeometry | undefined;
    private checkAllFontsLoaded;
    getFontFromIndexeddb(): Promise<void>;
    isShxFont(fontName: string): boolean | undefined;
    /**
     * Just for log usage
     */
    getUnsupportedChar(): Record<string, number>;
    releaseFontData(): void;
    destroy(): void;
    static isShxFile(url: string): boolean;
    static isTtfFile(url: string): boolean;
    static isJsonFile(url: string): boolean;
    static getFileName(url: string): string;
    static getExtension(url: string): string;
}
