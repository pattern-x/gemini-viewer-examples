import { IUploader } from "./IUploader";
import type { DxfViewer, ModelConfig } from "../../core";
/**
 * @internal
 */
export declare class LocalDxfUploader extends IUploader {
    private viewer;
    onSuccess?: (event: any) => void;
    readonly defaultModelConfig: ModelConfig;
    constructor(viewer: DxfViewer, elementId?: string);
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
