import { BaseMeasurement } from "./BaseMeasurement";
import { CoordinateMeasureDrawable } from "./CoordinateMeasureDrawable";
import { DrawableList } from "../../core/canvas";
import { OSnapHelper } from "../../core/helpers";
import { EventInfo, InputManager } from "../../core/input/InputManager";
import type { BaseViewer } from "../../core/viewers";
export declare class CoordinateMeasurement extends BaseMeasurement {
    constructor(viewer: BaseViewer, input: InputManager, drawList: DrawableList, osnapHelper: OSnapHelper);
    protected createMeasureDrawable(): CoordinateMeasureDrawable | undefined;
    protected onMouseClick(e: EventInfo): void;
    exitDrawing(): void;
    protected complete(): void;
    cancel(): void;
    protected setTooltipContent(): void;
}
