import { PopPanel } from "./PopPanel";
import type { BaseViewer } from "../../core/viewers/BaseViewer";
import { AxisPlaneSection } from "../../plugins/sections/AxisPlaneSection";
export declare class AxisSectionPopPanel extends PopPanel {
    protected axis: string;
    protected activeItem?: string;
    protected groupSelectNode?: HTMLElement;
    protected activeSelectNode?: HTMLElement;
    protected isVisible: boolean;
    protected section: AxisPlaneSection;
    constructor(viewer: BaseViewer);
    keydown: (e: KeyboardEvent) => void;
    destroy(): void;
    createGroupSelectLayout(): void;
    addGroupSelectItems(): void;
    createActiveSelectLayout(): void;
    addActiveItems(): void;
}
