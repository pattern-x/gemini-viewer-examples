import { IUploader } from "./IUploader";
import type { VRViewer } from "../../core";
/**
 * @internal
 */
export declare class LocalImageUploader extends IUploader {
    viewer: VRViewer;
    constructor(viewer: VRViewer, elementId: string);
    protected formats(): string[];
    protected uploadFiles(files: FileList): void;
}
