import * as THREE from "three";
import { DrawableList } from "../../core/canvas";
import type { OSnapHelper } from "../../core/helpers";
import { EventInfo, InputManager } from "../../core/input/InputManager";
import { BaseMeasurement } from "../../core/measure/BaseMeasurement";
import type { BaseViewer } from "../../core/viewers";
export declare class AngleMeasurement extends BaseMeasurement {
    constructor(viewer: BaseViewer, input: InputManager, drawList: DrawableList, osnapHelper: OSnapHelper);
    protected onMouseMove(position: THREE.Vector3): void;
    protected onMouseClick(e: EventInfo): void;
    exitDrawing(): void;
    protected complete(): void;
    cancel(): void;
    deactivate(): void;
    protected setTooltipContent(): void;
    private createOrUpdateAngleMeasureDrawable;
}
