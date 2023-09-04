import { IUploader } from "./IUploader";
import type { DxfViewer, ModelConfig } from "../../core";
/**
 * @internal
 */
export declare class LocalDxfUploader extends IUploader {
    private viewer;
    private pdfWorker;
    onSuccess?: (event: any) => void;
    readonly defaultModelConfig: ModelConfig;
    constructor(viewer: DxfViewer, elementId?: string);
    setPdfWorker(pdfWorker: string): void;
    protected formats(): string[];
    protected uploadFiles(files: FileList): void;
    /**
     * Upload single dxf file.
     */
    private uploadSingleDxf;
    /**
     * Upload single dxf file.
     */
    private uploadSinglePdf;
}
