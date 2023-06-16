import { Font } from "three/examples/jsm/loaders/FontLoader.js";
import { DxfCompareConfig, DxfModelConfig, DxfViewerConfig } from "../../core/Configs";
import { DxfChange } from "../../core/dxf";
import { DxfViewer } from "../../core/viewers/DxfViewer";
/**
 * Dxf compare helper with two viewports.
 * @example
 * ``` html
 * <div id="app">
 *     <div id="myCanvas1" style="width: 50%; height: 100%; display: inline-block;"></div>
 *     <div id="myCanvas2" style="width: 50%; height: 100%; display: inline-block; padding-left: 1px;"></div>
 * </div>
 * ```
 * ``` typescript
 * const viewerCfg1 = { containerId: "myCanvas1" };
 * const viewerCfg2 = { containerId: "myCanvas2" };
 * const modelCfg1 = { modelId: "id_1", src: "http://www.abc.com/sample1.dxf" };
 * const modelCfg2 = { modelId: "id_2", src: "http://www.abc.com/sample2.dxf" };
 * const fontFiles = ["http://www.abc.com/hztxt.shx", "http://www.abc.com/simplex.shx"];
 *
 * const compareHelper = new DxfCompareHelper(viewerCfg1, viewerCfg2);
 * await compareHelper.setFont(fontFiles);
 * await compareHelper.compare(modelCfg1, modelCfg2);
 * compareHelper.enableSyncCamera(true);
 * ```
 */
export declare class DxfCompareHelper {
    /**
     * The first DxfViewer of DxfCompareHelper.
     */
    viewer1: DxfViewer;
    /**
     * The second DxfViewer of DxfCompareHelper.
     */
    viewer2: DxfViewer;
    /**
     * Enables to synchronize camera position when another camera is moved.
     */
    protected syncCamera: boolean;
    protected font?: Font;
    private loader;
    private loadingManager?;
    protected changes?: Record<string, DxfChange>;
    private container;
    private spinner?;
    protected jobCount: number;
    private loadingProgressBar?;
    constructor(viewerCfg1: DxfViewerConfig, viewerCfg2: DxfViewerConfig);
    protected initSyncCameraEvent(): void;
    /**
     * @description {en} Enables to synchronize camera position when another camera is moved.
     * @description {zh} 设置开启或关闭同步相机视角。
     * @example
     * ```typescript
     * compareHelper.enableSyncCamera(true);
     * ```
     */
    enableSyncCamera(enable: boolean): void;
    private syncCameraControls;
    protected initSpinner(): void;
    /**
     * @description {en} Sets font.
     * This needs to be called before loading a dxf, it won't affect any loaded text.
     * It accepts shx or typeface formats. For typeface, it only support passing in 1 font file in the array for now.
     * @description {zh} 设置字体。
     * 需要在加载dxf之前调用，不会影响已加载的文字。
     * 支持shx或typeface格式。对于typeface，目前只支持传入1个字体文件。
     * @param urls
     * - {en} font file urls.
     * - {zh} 字体文件链接。
     * @example
     * ```typescript
     * compareHelper.setFont(["https://example.com/xxx.shx"]);
     * ```
     */
    setFont(urls: string[]): Promise<void>;
    /**
     * Compares two dxf files. Note that:
     * - It only compares model spaces.
     * - It shouldn't load anything else before and after compare.
     * @param modelCfg1 The first dxf to be compared
     * @param modelCfg2 The second dxf to be compared
     * @param onProgress loading progress
     */
    compare(modelCfg1: DxfModelConfig, modelCfg2: DxfModelConfig, compareCfg?: DxfCompareConfig, onProgress?: (event: ProgressEvent) => void): Promise<void>;
    /**
     * @description {en} Gets compare changes.
     * @description {zh} 获取对比变动.
     * @returns
     * - {en} Compare changes.
     * - {zh} 对比变动列表。
     * @example
     * ``` typescript
     * const changes = compareHelper.getCompareChanges();
     * console.log(changes);
     * ```
     */
    getCompareChanges(): Record<number, DxfChange> | undefined;
    /**
     * @description {en} Zooms to a compare change.
     * @description {zh} 聚焦到图纸的一处变动。
     * @param changeId
     * - {en} Change id, which is an incremental integer starts from 1.
     * - {zh} 变动id，该id是从数字1开始自增的整数。
     * @example
     * ``` typescript
     * const changeId = 1;
     * compareHelper.zoomToCompareChange(changeId);
     * ```
     */
    zoomToCompareChange(changeId: number): void;
    /**
     * Sets spinner visibility
     */
    protected setSpinnerVisibility(visible: boolean): void;
    /**
     * Increases job count, and show spinner accordingly
     */
    protected increaseJobCount(): void;
    /**
     * Decreases job count, and hide spinner accordingly
     */
    protected decreaseJobCount(): void;
}
