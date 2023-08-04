import { IUploader } from "./IUploader";
import type { ModelConfig, BimViewer } from "../../core";
/**
 * @internal
 */
export declare class LocalModelUploader extends IUploader {
    private viewer;
    readonly defaultModelConfig: ModelConfig;
    constructor(viewer: BimViewer, elementId?: string);
    protected formats(): string[];
    /**
     * Uploads model files. There are several cases:
     * - Upload a single file, a glTF, obj, etc.
     * - Upload a model with external (bin, texture) files.
     * - Upload many model files with the same format, a number of glTF without external bin or texture.
     * It doesn't support the case to upload many model files, and one or more of them contains external files.
     */
    protected uploadFiles(files: FileList): void;
    private checkAllFilesWithTheSameFormat;
    /**
     * Upload single model file without external texture/bin, etc.
     * With this function, caller can upload many gltf/glb at one time.
     */
    private uploadSingleFile;
}
