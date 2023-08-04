import { BaseVRMesh } from "./BaseVRMesh";
/**
 * A cube contains 6 planes
 * "r" | "l" | "u" | "d" | "f" | "b": means left, right, up, down, front, back
 * x, -x, y, -y, z, -z, aka, right, left, up/top, down/bottom, front, back
 */
export declare class VRCube extends BaseVRMesh {
    constructor(images: string[], thumbnailImages?: string[], size?: number);
    create(): Promise<void>;
    protected createMesh(): Promise<void>;
}
