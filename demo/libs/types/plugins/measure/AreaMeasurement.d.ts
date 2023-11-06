import * as THREE from "three";
import { AreaMeasureDrawable } from "./AreaMeasureDrawable";
import { BaseMeasurement } from "./BaseMeasurement";
import { DrawableList } from "../../core/canvas";
import { OSnapHelper } from "../../core/helpers";
import { EventInfo, InputManager } from "../../core/input/InputManager";
import type { BaseViewer } from "../../core/viewers";
export declare class AreaMeasurement extends BaseMeasurement {
    /**
     * The ratio of real world value and the value in three.js(pdf, a map, etc.).
     */
    private scale?;
    constructor(viewer: BaseViewer, input: InputManager, drawList: DrawableList, osnapHelper: OSnapHelper);
    activate(): void;
    deactivate(): void;
    protected createMeasureDrawable(): AreaMeasureDrawable | undefined;
    protected onMouseMove(position: THREE.Vector3): void;
    protected onMouseClick(e: EventInfo): void;
    exitDrawing(): void;
    protected complete(): void;
    cancel(): void;
    protected setTooltipContent(): void;
    /**
     * Gets the scale value.
     */
    getScale(): number | undefined;
    /**
     * Sets the scale value.
     */
    setScale(scale: number): void;
}
