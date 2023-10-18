import * as THREE from "three";
import { BvhParameter } from "../../core/workers";
/**
 * Bvh: Bounding volume hierarchy
 */
export declare class MeshBvhHelper {
    private running;
    private workers;
    constructor(workerCount?: number);
    isRunning(): boolean;
    generate(geometries: THREE.BufferGeometry[], params?: BvhParameter): Promise<void>;
    dispose(): void;
    static createMeshBvhSync(objects: THREE.Object3D[], params?: BvhParameter): void;
    static createMeshBvhAsync(objects: THREE.Object3D[], params?: BvhParameter): Promise<void>;
}
