import * as THREE from "three";
import { type BaseViewer, BoxSelectHelper, PickMarkupHelper, Plugin, PluginConfig, ScreenshotMode, ScreenshotResult } from "../../core";
/**
 * Screenshot plugin config.
 */
export interface ScreenshotPluginConfig extends Partial<PluginConfig> {
    /**
     * Image type.
     */
    type?: "image/png" | "image/jpg";
    /**
     * Image quality.
     */
    quality?: number;
    /**
     * Sets background transparent, this must be used for "image/png" format.
     * @default false
     * @internal
     */
    setBackgroundTransparent?: boolean;
}
/**
 * Screenshot plugin
 */
export declare class ScreenshotPlugin extends Plugin {
    static DEFAULT_ID: string;
    protected cfg: ScreenshotPluginConfig;
    protected boxSelectHelper?: BoxSelectHelper;
    protected pickMarkupHelper?: PickMarkupHelper;
    protected originalBackground: THREE.Color | undefined;
    protected originalClearAlpha: number;
    constructor(viewer: BaseViewer, cfg?: ScreenshotPluginConfig);
    /**
     * @description {en} Gets screenshot of current canvas. Returns an image in format of base64 string.
     * @description {zh} 获取画布的截屏。该方法返回一个 base64 类型的字符串。
     * @example
     * ``` typescript
     * const plugin = new ScreenshotPlugin(viewer);
     * const base64Image = plugin.getScreenshot();
     * console.log(base64Image);
     * ```
     */
    getScreenshot(): string | undefined;
    /**
     * Gets screenshot by bbox under screen cooridinate.
     */
    getScreenshotByScreenBBox(bbox: THREE.Box2): Promise<string | undefined>;
    /**
     * Gets screenshot by bbox under world coordinate.
     * It needs to convert world to screen coordinate, in order to get the
     * screenshot range. Assume it maps to bboxA under screen coordinate,
     * and current view boundary is bboxB (e.g., 0,0 - 1024,768).
     * Since, a given world coordinate may not be in current view boundary.
     * The finally screenshot is the overlap of bboxA and bboxB. When
     * - bboxA includes bboxB, it get screenshot for bboxB
     * - bboxB includes bboxA, it get screenshot for bboxA
     * - bboxA overlaps with bboxB, it get screenshot for the overlapped area
     * - bboxA doesn't overlap with bboxB, it get nothing
     *
     * A best practice to use this API is to use orthographic camera, under top view,
     * and pass in viewer's bbox.
     */
    getScreenshotByWorldBBox(bbox: THREE.Box3): Promise<string | undefined>;
    /**
     * @description {en} Gets screenshot of a rectangular area, or by box selecting an area. Returns an image in format of base64 string.
     * @description {zh} 获取矩形区域或者框选区域的截图。返回base64格式的图片。
     * @param mode
     * - {en} screenshot mode("Default", "BoxSelection" and "PickMarkup").
     * - {zh} 截图模式("全屏"， "框选" 和 "选中批注")。
     * @example
     * ``` typescript
     * // {en} Click on markup to take screenshot.
     * // {zh} 点击批注截屏。
     * const mode = ScreenshotMode.PickMarkup;
     * viewer.getScreenshot(mode).then(data => console.log(data));
     * // {en} Take screenshot by box selecting an area.
     * // {zh} 根据用户的框选截屏。
     * const mode = ScreenshotMode.BoxSelection;
     * viewer.getScreenshot(mode).then(data => console.log(data));
     * // {en} Take screenshot of the whole view.
     * // {zh} 全屏截屏。
     * const mode = ScreenshotMode.Default;
     * const plugin = new ScreenshotPlugin(viewer);
     * plugin.getScreenshotAsync(mode).then(data => console.log(data));
     * ```
     */
    getScreenshotAsync(mode?: ScreenshotMode): Promise<undefined | ScreenshotResult>;
    /**
     * If ScreenshotPlugin is active.
     */
    isActive(): (() => boolean) | undefined;
    /**
     * Cancel current operation if any.
     */
    cancel(): void;
    /**
     * Sets scene background transparent.
     * This is useful when taking screenshop of png format.
     * In some cases, user don't want the background with a fixed background color.
     */
    private setBackgroundTransparent;
    /**
     * Recovers to original background settings.
     */
    private recoverBackgroundTransparency;
}
