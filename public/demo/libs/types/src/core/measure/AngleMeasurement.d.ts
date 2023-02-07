import * as THREE from "three";
import { BaseMeasurement } from "./BaseMeasurement";
import { DrawableList } from "../canvas/DrawableList";
import { OSnapHelper } from "../helpers/OSnapHelper";
import type { BaseViewer } from "../viewers/BaseViewer";
export declare class AngleMeasurement extends BaseMeasurement {
    constructor(viewer: BaseViewer, drawList: DrawableList, osnapHelper: OSnapHelper);
    protected onMouseMove(position: THREE.Vector3): void;
    protected onMouseClick(e: MouseEvent): void;
    protected complete(): void;
    cancel(): void;
    deactivate(): void;
    protected setTooltipContent(): void;
    private createOrUpdateAngleMeasureDrawable;
}
