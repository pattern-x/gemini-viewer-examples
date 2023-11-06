import * as THREE from "three";
import { Control, NavigationModes } from "./Control";
import type { CameraManager } from "../../core/camera";
/**
 *
 * @description control for 2d. dxf,pdf etc.
 */
export declare class PlanControl implements Control {
    readonly mode = NavigationModes.Plan;
    private cameraManager;
    constructor(cameraManager: CameraManager);
    setupControl(): void;
    adjustCameraByBbox(box: THREE.Box3): void;
}
