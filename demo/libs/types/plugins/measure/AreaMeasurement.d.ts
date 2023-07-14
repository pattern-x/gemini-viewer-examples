import { AreaMeasureDrawable } from "./AreaMeasureDrawable";
import { BaseMeasurement } from "./BaseMeasurement";
import { DrawableList } from "../../core/canvas";
import { OSnapHelper } from "../../core/helpers";
import { EventInfo, InputManager } from "../../core/input/InputManager";
import type { BaseViewer } from "../../core/viewers";
export declare class AreaMeasurement extends BaseMeasurement {
    constructor(viewer: BaseViewer, input: InputManager, drawList: DrawableList, osnapHelper: OSnapHelper);
    activate(): void;
    deactivate(): void;
    protected createMeasureDrawable(): AreaMeasureDrawable | undefined;
    protected onMouseClick(e: EventInfo): void;
    exitDrawing(): void;
    protected complete(): void;
    cancel(): void;
    protected setTooltipContent(): void;
}
