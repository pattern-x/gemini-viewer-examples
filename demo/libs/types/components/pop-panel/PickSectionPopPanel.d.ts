import { PopPanel } from "./PopPanel";
import type { BaseViewer } from "../../core/viewers/BaseViewer";
import type { PickPlaneSection } from "../../plugins/sections/PickPlaneSection";
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
