/**
 * Device util class
 * @internal
 */
export declare class DeviceUtils {
    /**
     * Checks if it is opened in touch screen device, like iphone, ipad, etc.
     */
    static isTouchScreenDevice(): boolean;
    static printDeviceInfo(): void;
    /**
     * Gets GPU Graphics card info
     * @param canvas
     */
    static getWebGlRendererInfo(canvas: HTMLCanvasElement): string;
}
