import * as THREE from "three";
import { CameraControls } from "../camera-controls/CameraControls";
export declare class CameraControlsEx extends CameraControls {
    minZoom: number;
    draggingSmoothTime: number;
    private dollySpeedBackup;
    private azimuthRotateSpeedBackup;
    private polarRotateSpeedBackup;
    private truckSpeedBackup;
    private domElementKeyEvents?;
    keyTruckSpeed: number;
    keys: {
        left: string;
        up: string;
        right: string;
        bottom: string;
    };
    constructor(object: THREE.PerspectiveCamera | THREE.OrthographicCamera, domElement?: HTMLElement);
    get enableZoom(): boolean;
    set enableZoom(value: boolean);
    get enableRotate(): boolean;
    set enableRotate(value: boolean);
    get enableTruck(): boolean;
    set enableTruck(value: boolean);
    private onKeyDown;
    private onKeyUp;
    listenToKeyEvents(): void;
    stopListenToKeyEvents(): void;
    /**
     * Dispose the OrbitControls instance itself, remove all eventListeners.
     * @category Methods
     */
    dispose(): void;
}
