import type { DxfViewer } from "../viewers";
import { DxfChange } from "../../core/dxf";
import { Event } from "../../core/utils";
export declare class DxfCompareMarkupManager extends Event {
    private viewer;
    private overlayRender?;
    private drawableList;
    constructor(viewer: DxfViewer);
    drawCompareDrawable(changes: Record<string, DxfChange>): void;
    setCompareDrawableVisible(visilbe: boolean): void;
}
