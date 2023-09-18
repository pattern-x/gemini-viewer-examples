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
    static isMobile: boolean;
    static creatReactNativeCanvas(context: WebGLRenderingContext | WebGL2RenderingContext | CanvasRenderingContext2D): HTMLCanvasElement;
    static isBrowser: boolean;
    static isNode: boolean;
}
