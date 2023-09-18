import * as THREE from "three";
import type { VRControls } from "../../core/controls";
/**
 * @internal
 */
export declare class ControlsHelper {
    camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
    controls: VRControls;
    flyDuration: number;
    autoRotateRemainingTime: number;
    automaticallyAdjustCameraPosition: boolean;
    private cameraUpdateInterval?;
    private rotateIntervalStartTime;
    private rotateInterval?;
    constructor(camera: THREE.PerspectiveCamera | THREE.OrthographicCamera, controls: VRControls);
    /**
     * Make camera fly to target position with given lookAt position
     * @param position camera's target position
     * @param lookAt camera's new lookAt position
     */
    flyTo(position: THREE.Vector3, lookAt: THREE.Vector3, onCompleteCallback?: () => void): void;
    /**
     * Adjusts camera direction to look to a certain position. While,
     * it doesn't mean to set the target position as camera's target.
     */
    lookTo(direction: THREE.Vector3): void;
    startAutoRotate(): void;
    delayAutoRotate(): void;
    startToRotate(e: KeyboardEvent): void;
    private rotateLeftOrRight;
    private rotateUpOrDown;
}
