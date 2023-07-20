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
    /**
     * @description {en} Normalized screen coordinate: left-top(0,0), right-bottom(1,1).
     * @description {zh} 标准化屏幕坐标：左上角(0,0), 右下角(1,1)。
     * (0,0)
     *    _______________________
     *   |                      |
     *   |                      |
     *   |         X ->         |
     *   |                      |
     *   |                      |
     *   |______________________|
     *                        (1,1)
     * @description {en} World coordinate to normalized screen coordinate(0-1).
     * @description {zh} 世界坐标转标准化屏幕坐标（0-1）。
     */
    static worldCoordinate2NormalizedScreenCoordinate(worldCoordinate: THREE.Vector2 | THREE.Vector3, camera: THREE.Camera, container: HTMLElement): THREE.Vector2;
}
