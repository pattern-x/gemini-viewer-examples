import { BaseViewer, DxfModelConfig, FontManager, Model2d, Plugin, PluginConfig } from "../../core";
/**
 * Pdf loader plugin config.
 */
export interface PdfLoaderPluginConfig extends PluginConfig {
    font: FontManager;
    pdfWorker: string;
}
/**
 * Pdf loader plugin.
 */
export declare class PdfLoaderPlugin extends Plugin {
    protected cfg: PdfLoaderPluginConfig;
    constructor(viewer: BaseViewer, cfg: PdfLoaderPluginConfig);
    /**
     * Loads a pdf.
     * @param modelCfg
     * @param onProgress
     * @returns
     */
    loadAsync(modelCfg: DxfModelConfig, onProgress: (event: ProgressEvent) => void): Promise<Model2d>;
}