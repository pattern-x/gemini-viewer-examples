import type { ModelConfig } from "../..";
import type { BimViewer, DxfViewer, VRViewer } from "../../core/viewers";
/**
 * @internal
 */
export declare class IUploader {
    protected input: HTMLInputElement;
    constructor(elementId?: string);
    protected formats(): string[];
    protected uploadFiles(files: FileList): void;
    openFileBrowserToUpload(): void;
}
/**
 * @internal
 */
export declare class LocalModelUploader extends IUploader {
    private viewer;
    readonly defaultModelConfig: ModelConfig;
    constructor(viewer: BimViewer, elementId?: string);
    protected formats(): string[];
    protected uploadFiles(files: FileList): void;
}
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
}
/**
 * @internal
 */
export declare class LocalImageUploader extends IUploader {
    viewer: VRViewer;
    constructor(viewer: VRViewer, elementId: string);
    protected formats(): string[];
    protected uploadFiles(files: FileList): void;
}
