import * as THREE from "three";
import { Control, NavigationModes } from "./Control";
import type { CameraManager } from "../../core/camera/CameraManager";
export declare class OrbitControl implements Control {
    readonly mode = NavigationModes.Orbit;
    private cameraManager;
    constructor(cameraManager: CameraManager);
    setupControl(): void;
    adjustCameraByBbox(box: THREE.Box3): void;
}
