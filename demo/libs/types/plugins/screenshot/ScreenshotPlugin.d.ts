import { BaseViewer, BoxSelectHelper, PickMarkupHelper, Plugin, PluginConfig, ScreenshotMode, ScreenshotResult } from "../../core";
/**
 * Screenshot plugin config.
 */
export interface ScreenshotPluginConfig extends PluginConfig {
    /**
     * Image type.
     */
    type?: "image/png" | "image/jpg";
    /**
     * Image quality.
     */
    quality?: 0.8;
}
/**
 * Screenshot plugin
 */
export declare class ScreenshotPlugin extends Plugin {
    protected cfg: ScreenshotPluginConfig;
    protected boxSelectHelper?: BoxSelectHelper;
    protected pickMarkupHelper?: PickMarkupHelper;
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
}
