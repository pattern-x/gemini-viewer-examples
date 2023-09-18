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
