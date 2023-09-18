export declare class ColorUtils {
    static color2rgba(style: string): [number, number, number, number];
    static rgba2Color(rgba: number[]): string;
    /**
     * Converts color string in format "rgba(255, 255, 255, 1)" to rgba number array.
     */
    static colorStr2Rgba(colorStr: string): number[];
    /**
     * Converts rgb or rgba to hex number.
     * @param rgba Color value is between 0 and 1.
     */
    static rgb2Hex(rgba: number[]): number;
    /**
     * Maps a value between 0 and 1 to 0 and 255.
     */
    private static to255;
    /**
     * Maps a value between 0 and 255 to 0 and 1.
     */
    private static to1;
}
