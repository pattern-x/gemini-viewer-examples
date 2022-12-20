import { BaseVRMesh } from "./BaseVRMesh";
/**
 * A cube contains 6 planes, each plane contains 4 sub-planes as bellow:
 * ratio, 1 : 1
 *    width0 : width1
 *  ______________________
 * |           |          |
 * | 1024x1024 |          |
 * |  _1_1.jpg | _1_2.jpg |
 * |___________|__________|
 * |           |          |
 * |           |          |
 * |  _2_1.jpg | _2_2.jpg |
 * |___________|__________|
 *
 * ratio, 4 : 1
 *    width0 : width1
 *  ________________
 * |           |    |
 * | 1024x1024 |    |
 * |  _1_1.jpg |    | _1_2.jpg
 * |___________|____|
 * |           |    | 256x256
 * |___________|____| _2_2.jpg
 *   _2_1.jpg
 *
 * An example of image name is l1_b_1_2.jpg
 * l: level;
 * "r" | "l" | "u" | "d" | "f" | "b": means left, right, up, down, front, back
 * x, -x, y, -y, z, -z, aka, right, left, up/top, down/bottom, front, back
 */
export declare class VRCube24Faces extends BaseVRMesh {
    private ratio;
    private subPlaneWidth0;
    private subPlaneWidth1;
    /**
     * @param images must be in order of right, left, up/top, down/bottom, front, back
     * And the 4 images for each side, must be in order of 1_1, 1_2, 2_1, 2_2.
     */
    constructor(images: string[], thumbnailImages?: string[], size?: number);
    create(): Promise<void>;
    protected createMesh(): Promise<void>;
    private createPlaneOfAFace;
}
