import { BufferGeometry } from "three";
export interface BvhParameter {
    maxDepth?: number;
    maxLeafTris?: number;
    setBoundingBox?: boolean;
    saveOriginalIndex?: boolean;
    transferred?: boolean;
    onProgress?: (progress: number) => void;
}
export declare class GenerateMeshBvhWorker {
    private running;
    private worker;
    constructor();
    isRunning(): boolean;
    generate(geometries: BufferGeometry[], params?: BvhParameter): Promise<void> | undefined;
    dispose(): void;
}
