import * as THREE from "three";
import { ProgressBar } from "../../components/progress-bar";
import { DxfCompareConfig, DxfModelConfig, DxfViewerConfig } from "../../core/Configs";
import { DxfChange, DxfLoader } from "../../core/dxf";
import { FontManager } from "../../core/font";
import { DxfViewer } from "../../core/viewers/DxfViewer";
/**
 * Dxf compare helper with one viewport.
 * @example
 * ``` html
 * <div id="app">
 *     <div id="myCanvas" style="width: 100%; height: 100%; display: inline-block;"></div>
 * </div>
 * ```
 * ``` typescript
 * const viewerCfg = { containerId: "myCanvas" };
 * const modelCfg1 = { modelId: "id_1", src: "http://www.abc.com/sample1.dxf" };
 * const modelCfg2 = { modelId: "id_2", src: "http://www.abc.com/sample2.dxf" };
 * const fontFiles = ["http://www.abc.com/hztxt.shx", "http://www.abc.com/simplex.shx"];
 *
 * const compareHelper = new BaseDxfCompareHelper(viewerCfg);
 * await compareHelper.setFont(fontFiles);
 * await compareHelper.compare(modelCfg1, modelCfg2);
 * ```
 */
export declare class BaseDxfCompareHelper {
    /**
     * DxfViewer of DxfCompareHelper.
     */
    viewer: DxfViewer;
    protected fontManager?: FontManager;
    protected loader: DxfLoader;
    protected loadingManager?: THREE.LoadingManager;
    protected changes?: Record<string, DxfChange>;
    protected container: HTMLElement;
    protected spinner?: HTMLDivElement;
    protected jobCount: number;
    protected loadingProgressBar?: ProgressBar;
    constructor(viewerCfg: DxfViewerConfig);
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
     * const changes = compareHelper.getChanges();
     * console.log(changes);
     * ```
     */
    getChanges(): Record<number, DxfChange> | undefined;
    /**
     * @description {en} Zooms to a compare change.
     * @description {zh} 聚焦到图纸的一处变动。
     * @param changeId
     * - {en} Change id, which is an incremental integer starts from 1.
     * - {zh} 变动id，该id是从数字1开始自增的整数。
     * @example
     * ``` typescript
     * const changeId = 1;
     * compareHelper.zoomToChange(changeId);
     * ```
     */
    zoomToChange(changeId: number): void;
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
