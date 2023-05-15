import { SectionType } from "../../core/Constants";
import { InputManager } from "../../core/input/InputManager";
import { BaseSection } from "../../core/section/BaseSection";
import type { BaseViewer } from "../../core/viewers";
export declare class SectionManager {
    private viewer;
    private sections;
    private activeSectionType?;
    constructor(viewer: BaseViewer, input: InputManager);
    get raycaster(): import("three").Raycaster | undefined;
    activateSection(type: SectionType, clippingObjectIds?: number[]): void;
    deactivateSection(): void;
    resetSection(): void;
    isSectionActive(): boolean;
    getActiveSectionType(): SectionType | undefined;
    getActiveSection(): BaseSection | undefined;
    setSectionClippingObjectIds(ids?: number[]): void;
    destroy(): void;
}
