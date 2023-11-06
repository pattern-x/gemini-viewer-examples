import * as THREE from "three";
import { Control, NavigationModes } from "./Control";
import type { CameraManager } from "../../core/camera/CameraManager";
export declare class VRControl implements Control {
    readonly mode = NavigationModes.FirstPerson;
    private cameraManager;
    constructor(cameraManager: CameraManager);
    setupControl(): void;
    adjustCameraByBbox(box: THREE.Box3): void;
}
