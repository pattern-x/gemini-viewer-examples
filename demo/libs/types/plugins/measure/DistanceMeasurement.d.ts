import { BaseMeasurement } from "./BaseMeasurement";
import { DistanceMeasureDrawable } from "./DistanceMeasureDrawable";
import { DrawableList } from "../../core/canvas";
import { OSnapHelper } from "../../core/helpers";
import { EventInfo, InputManager } from "../../core/input/InputManager";
import type { BaseViewer } from "../../core/viewers";
export declare class DistanceMeasurement extends BaseMeasurement {
    /**
     * The ratio of real world value and the value in three.js(pdf, a map, etc.).
     */
    private scale?;
    constructor(viewer: BaseViewer, input: InputManager, drawList: DrawableList, osnapHelper: OSnapHelper);
    protected createMeasureDrawable(): DistanceMeasureDrawable | undefined;
    protected onMouseClick(e: EventInfo): void;
    exitDrawing(): void;
    protected complete(): void;
    cancel(): void;
    deactivate(): void;
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
