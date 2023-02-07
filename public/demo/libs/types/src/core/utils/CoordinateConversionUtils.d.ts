import * as THREE from "three";
/**
 * @internal
 */
export declare class CoordinateConversionUtils {
    static getScreenPointByEvent(event: MouseEvent, container: HTMLElement): THREE.Vector2;
    static getScreenPointByTouchEvent(event: TouchEvent, container: HTMLElement): THREE.Vector2;
    static worldPosition2ScreenPoint(vector: THREE.Vector3, camera: THREE.Camera, container: HTMLElement): THREE.Vector2;
    static screenPoint2worldPosition(vector: THREE.Vector2, camera: THREE.Camera, container: HTMLElement): THREE.Vector3;
    static screenPoint2NdcPoint(vector: THREE.Vector2, camera: THREE.Camera, container: HTMLElement): THREE.Vector2;
}
