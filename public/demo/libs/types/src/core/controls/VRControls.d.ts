import { EventDispatcher, PerspectiveCamera, Vector3 } from "three";
import type { ControlsHelper } from "../../core/helpers";
/**
 * @internal
 */
export declare enum STATE {
    NONE = -1,
    ROTATE = 0,
    DOLLY = 1,
    PAN = 2,
    TOUCH_ROTATE = 3,
    TOUCH_DOLLY = 4
}
/**
 * @internal
 */
export declare enum Keys {
    LEFT = "ArrowLeft",
    UP = "ArrowUp",
    RIGHT = "ArrowRight",
    BOTTOM = "ArrowDown"
}
/**
 * @internal
 */
export declare class VRControls extends EventDispatcher {
    object: PerspectiveCamera;
    domElement: HTMLCanvasElement;
    isVRMode: boolean;
    enabled: boolean;
    target: Vector3;
    enableZoom: boolean;
    enablePan: boolean;
    enableRotate: boolean;
    state: STATE;
    rotateSpeed: number;
    zoomSpeed: number;
    panSpeed: number;
    scale: number;
    minZoom: number;
    maxZoom: number;
    screenSpacePanning: boolean;
    autoRotate: boolean;
    controlsHelper?: ControlsHelper;
    autoRotateSpeed: number;
    enableDamping: boolean;
    dampingFactor: number;
    minAzimuthAngle: number;
    maxAzimuthAngle: number;
    minPolarAngle: number;
    maxPolarAngle: number;
    minDistance: number;
    maxDistance: number;
    keyPanSpeed: number;
    minFov: number;
    maxFov: number;
    private zoomChanged;
    private panOffset;
    private pointerPositions;
    private rotateStart;
    private rotateEnd;
    private rotateDelta;
    private dollyStart;
    private dollyEnd;
    private dollyDelta;
    private panStart;
    private panEnd;
    private panDelta;
    private pointers;
    private spherical;
    private sphericalDelta;
    private domElementKeyEvents?;
    private quat;
    constructor(object: PerspectiveCamera, domElement: HTMLCanvasElement, isVRMode?: boolean);
    dispose(): void;
    update: () => boolean;
    private addPointer;
    private removePointer;
    private onContextMenu;
    /**
     *
     * Get the distance between two points
     * @param {number[]} p1
     * @param {number[]} p2
     * @return {*}
     * @memberof VRControls
     */
    getDist(p1: number[], p2: number[]): number;
    private trackPointer;
    /**************************PointerDown Event*************************/
    private onTouchStart;
    private onMouseDown;
    private onPointerDown;
    /**************************PointerMove Event*************************/
    private onTouchMove;
    private onMouseMove;
    private onPointerMove;
    /**************************PointerUp Event*************************/
    handlerTouchEnd(event: PointerEvent): void;
    private onPointerUp;
    private onPointerCancel;
    handleMouseWheel(event: WheelEvent): void;
    private onMouseWheel;
    /**************************Ponter down event handling*************************/
    handleMouseDownRotate(event: PointerEvent): void;
    handleMouseDownDolly(event: PointerEvent): void;
    handleMouseDownPan(event: PointerEvent): void;
    handleTouchStartRotate(): void;
    handleTouchStartDolly(pointers: PointerEvent[]): void;
    /**************************Mouse move rotate event handling*************************/
    private updateRotate;
    handleMouseMoveRotate(event: PointerEvent): void;
    /**************************Mouse move zoom event handling*************************/
    private dollyOut;
    private dollyIn;
    handleMouseMoveDolly(event: PointerEvent): void;
    /**************************Mouse move pan event handling*************************/
    private pan;
    private panLeft;
    private panUp;
    handleMouseMovePan(event: PointerEvent): void;
    /**************************One-finger or Two-finger rotate event handling*************************/
    private getSecondPointerPosition;
    handleTouchMoveRotate(event: PointerEvent): void;
    /**************************Two-finger zoom event handling*************************/
    private updateFov;
    handleTouchMoveDolly(event: PointerEvent): void;
    private handleKeyDown;
    private onKeyDown;
    listenToKeyEvents(domElement: HTMLElement): void;
}
