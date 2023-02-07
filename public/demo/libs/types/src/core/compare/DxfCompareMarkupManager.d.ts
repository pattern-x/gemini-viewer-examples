import { DxfChange } from "../dxf";
import { Event } from "../utils";
import type { DxfViewer } from "../viewers";
export declare class DxfCompareMarkupManager extends Event {
    private viewer;
    private overlayRender?;
    private drawableList;
    constructor(viewer: DxfViewer);
    render(): void;
    drawCompareDrawable(changes: Record<string, DxfChange>): void;
    setCompareDrawableVisible(visilbe: boolean): void;
}
