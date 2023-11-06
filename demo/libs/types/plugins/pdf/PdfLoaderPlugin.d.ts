import { PdfLoader } from "./PdfLoader";
import { BaseViewer, DxfModelConfig, FontManager, Plugin, PluginConfig, Model2d, Vector2 } from "../../core";
/**
 * Pdf loader plugin config.
 */
export interface PdfLoaderPluginConfig extends Partial<PluginConfig> {
    font?: FontManager;
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
    loader?: PdfLoader;
    constructor(viewer: BaseViewer, cfg: PdfLoaderPluginConfig);
    /**
     * Loads a pdf.
     * @param modelCfg
     * @param onProgress
     * @returns
     */
    loadAsync(modelCfg: DxfModelConfig, onProgress: (event: ProgressEvent) => void): Promise<Model2d>;
    /**
     *
     * @param page
     * @param onProgress
     * @returns
     * @description load specified pdf page
     */
    loadPage(page: number, onProgress?: (event: ProgressEvent) => void): Promise<undefined>;
    /**
     *
     * @returns {Number}
     * @description Get pdf pages number.
     */
    getPageCount(): number | undefined;
    private getPdfViewport;
    worldPosition2PdfPoint(position: Vector2): {
        x: number;
        y: number;
    };
    pdfPoint2WorldPosition(point: Vector2): {
        x: number;
        y: number;
    };
}
