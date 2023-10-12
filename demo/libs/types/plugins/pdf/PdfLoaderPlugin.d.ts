import { BaseViewer, DxfModelConfig, FontManager, Plugin, PluginConfig } from "../../core";
import type { ModelData2d } from "../../core/model/Constants";
/**
 * Pdf loader plugin config.
 */
export interface PdfLoaderPluginConfig extends Partial<PluginConfig> {
    font: FontManager;
    /**
     * Whether to use progressive load or not.
     * @default true
     */
    enableProgressiveLoad?: boolean;
    pdfWorker: string;
}
/**
 * Pdf loader plugin.
 */
export declare class PdfLoaderPlugin extends Plugin {
    static DEFAULT_ID: string;
    protected cfg: PdfLoaderPluginConfig;
    constructor(viewer: BaseViewer, cfg: PdfLoaderPluginConfig);
    /**
     * Loads a pdf.
     * @param modelCfg
     * @param onProgress
     * @returns
     */
    loadAsync(modelCfg: DxfModelConfig, onProgress: (event: ProgressEvent) => void): Promise<ModelData2d>;
}
