import * as THREE from "three";
import { Tooltip } from "../../components/tool-tip";
import { mouseButtonAction, singleTouchAction } from "../../core/camera-controls/types";
import type { EventInfo, InputManager } from "../../core/input/InputManager";
import type { BimViewer, DxfViewer } from "../../core/viewers";
/**
 * Box select an area in screen coordinate.
 * @internal
 */
export declare class BoxSelectHelper {
    protected viewer: DxfViewer | BimViewer;
    protected input: InputManager;
    protected mouseDown: boolean;
    protected mouseMove: boolean;
    protected mouseDownPositionX: number;
    protected mouseDownPositionY: number;
    protected tempKey?: mouseButtonAction;
    protected tempTouch?: singleTouchAction;
    protected tempEnableRotate: boolean;
    protected rectDom?: HTMLDivElement;
    protected tooltip?: Tooltip;
    private actived;
    static readonly BORDER_COLOR = "#fff000";
    static readonly BORDER_WIDTH = "2px";
    protected resolve?: (value: THREE.Box2 | PromiseLike<THREE.Box2> | undefined) => void;
    protected reject?: (reason: any) => void;
    protected isResolvedOrRejected: boolean;
    constructor(viewer: DxfViewer | BimViewer);
    private get viewerContainer();
    isActived(): boolean;
    activate(): void;
    deactivate(): void;
    private mousedown;
    private mousemove;
    private mouseup;
    keydown: (e: EventInfo) => void;
    private drawRect;
    private setRectDomVisible;
    /**
     * Starts to select a box area
     */
    select(): Promise<THREE.Box2 | undefined>;
    destroy(): void;
}
