import * as THREE from "three";
import type { EventInfo, IPointerEvent } from "../../core/input/InputManager";
/**
 * @internal
 */
export declare class CoordinateConversionUtils {
    static getScreenPointByEvent(event: IPointerEvent | EventInfo | MouseEvent | PointerEvent, container: HTMLElement): THREE.Vector2;
    static getScreenPointByTouchEvent(event: TouchEvent, container: HTMLElement): THREE.Vector2;
    static worldPosition2ScreenPoint(vector: THREE.Vector3, camera: THREE.Camera, container: HTMLElement): THREE.Vector2;
    static screenPoint2worldPosition(vector: THREE.Vector2, camera: THREE.Camera, container: HTMLElement): THREE.Vector3;
    static screenPoint2NdcPoint(vector: THREE.Vector2, camera: THREE.Camera, container: HTMLElement): THREE.Vector2;
}
