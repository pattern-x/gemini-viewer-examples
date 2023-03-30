import { PopPanel } from "./PopPanel";
import type { PickPlaneSection } from "../../core/section/PickPlaneSection";
import type { BaseViewer } from "../../core/viewers/BaseViewer";
export declare class PickSectionPopPanel extends PopPanel {
    protected activeSelectNode?: Element;
    protected isVisible: boolean;
    protected enabled: boolean;
    protected visibleNode?: HTMLElement;
    protected resetNode?: HTMLElement;
    protected section: PickPlaneSection;
    constructor(viewer: BaseViewer);
    keydown: (e: KeyboardEvent) => void;
    destroy(): void;
    createActiveSelectLayout(): void;
    addActiveItems(): void;
    enable(): void;
    disable(): void;
}
