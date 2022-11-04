import { BaseVRMesh } from "./BaseVRMesh";
/**
 * A sphere that maps the one image. More than one may be included later.
 */
export declare class VRSphere extends BaseVRMesh {
    constructor(images: string[], thumbnailImages?: string[], size?: number);
    create(): Promise<void>;
    protected createMesh(): Promise<void>;
}
