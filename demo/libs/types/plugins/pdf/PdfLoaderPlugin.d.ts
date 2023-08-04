import { Font } from "three/examples/jsm/loaders/FontLoader.js";
import { BaseViewer, DxfModelConfig, Model2d, Plugin, PluginConfig, ShxFont } from "../../core";
/**
 * Pdf loader plugin config.
 */
export interface PdfLoaderPluginConfig extends PluginConfig {
    font: ShxFont | Font;
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
