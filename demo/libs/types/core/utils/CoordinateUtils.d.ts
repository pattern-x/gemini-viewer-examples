import * as THREE from "three";
import type { EventInfo, IPointerEvent } from "../../core/input/InputManager";
/**
 * @internal
 * Some concepts:
 *
 * 1. Screen coordinate:
 * (0, 0)
 * ----------------------> x
 * |                   |
 * |                   |
 * |                   |
 * |                   |
 * |___________________|
 * y                   (1024, 768) e.g.
 *
 * 2. Normalized screen coordinate:
 * (0, 0)
 * ----------------------> x
 * |                   |
 * |                   |
 * |                   |
 * |                   |
 * |___________________|
 * y                   (1, 1)
 *
 * 3. NDC: Normalized Device Coordinates
 *             ^ y       (1, 1)
 *             |
 * (-1, 0)     |(0, 0)   (1, 0)
 * ----------------------> x
 *             |
 *             |
 * (-1, -1)
 *
 * 4. World Coordinates
 *      ^ y
 *      |
 *      |     / x
 *      |   /
 *      | /
 * ---------------> z
 *   (0, 0)
 */
export declare class CoordinateUtils {
    /**
     * Gets screen coordinate by pointer event.
     */
    static getScreenCoordinateByEvent(event: IPointerEvent | EventInfo | MouseEvent | PointerEvent, container: HTMLElement): THREE.Vector2;
    /**
     * Gets screen coordinate by touch event.
     */
    static getScreenCoordinateByTouchEvent(event: TouchEvent, container: HTMLElement): THREE.Vector2;
    /**
     * Converts world to screen coordinate.
     */
    static world2Screen(vector: THREE.Vector3, camera: THREE.Camera, container: HTMLElement): THREE.Vector2;
    /**
     * Converts a bbox under world coordinate to screen coordinate.
     */
    static worldBBox2Screen(bbox: THREE.Box3, camera: THREE.Camera, container: HTMLElement): THREE.Box2;
    /**
     * Converts screen to world coordinate.
     */
    static screen2World(vector: THREE.Vector2, camera: THREE.Camera, container: HTMLElement): THREE.Vector3;
    /**
     * Converts screen point to NDC coordinate.
     * @description {en} Normalized screen coordinate: bottom-left(-1, -1), top-right(1, 1).
     * @description {zh} 标准化屏幕坐标：左下角(-1, -1), 右上角(1, 1)。
     * @description {en} World coordinate to normalized screen coordinate(0-1).
     * @description {zh} 世界坐标转标准化屏幕坐标（0-1）。
     */
    static screen2Ndc(vector: THREE.Vector2, camera: THREE.Camera, container: HTMLElement): THREE.Vector2;
    /**
     * @description {en} Normalized screen coordinate: top-left(0, 0), bottom-right(1, 1).
     * @description {zh} 标准化屏幕坐标：左上角(0, 0), 右下角(1, 1)。
     * @description {en} World coordinate to normalized screen coordinate(0-1).
     * @description {zh} 世界坐标转标准化屏幕坐标（0-1）。
     */
    static world2NormalizedScreen(worldCoord: THREE.Vector2 | THREE.Vector3, camera: THREE.Camera, container: HTMLElement): THREE.Vector2;
}
