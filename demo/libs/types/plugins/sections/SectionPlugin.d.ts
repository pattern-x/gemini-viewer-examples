import { SectionType } from "../../core/Constants";
import type { BaseViewer } from "../../core/viewers";
import { Plugin } from "../../core/viewers/Plugin";
import { BaseSection } from "../../plugins/sections/BaseSection";
export declare class SectionPlugin extends Plugin {
    static DEFAULT_ID: string;
    private sections;
    private activeSectionType?;
    constructor(viewer: BaseViewer);
    protected get raycaster(): any;
    /**
     *
     * @param {SectionType} type
     * @param clippingObjectIds
     * @description {en} Activates one of "ObjectsBoxSection", "AxisPlaneSection" or "PickPlaneSection" Section
     * @description {zh} 激活"剖切盒", "轴向剖切" 或者 "拾取面剖切"
     */
    activate(type: SectionType): void;
    /**
     * @description Deactivate Section plugin
     * @param keepSectionState Keep objects being clipped even after deactived.
     */
    deactivate(keepSectionState?: boolean): void;
    /**
     * Resets section to initial state.
     */
    reset(): void;
    /**
     * Sets gizmo and section plane mesh visibility.
     */
    setSectionPlaneVisible(visible: boolean): void;
    /**
     *
     * @returns {boolean} Is Section active
     */
    isActive(): boolean;
    /**
     * Gets the active section type.
     */
    getActiveSectionType(): SectionType | undefined;
    /**
     * Gets the active section.
     */
    getActiveSection(): BaseSection | undefined;
    /**
     * Sets clipping object ids for all sections.
     * @param ids
     * @returns
     * @description Set the id of the object that needs to be clipping for all section
     */
    protected setClippingObjectIds(ids?: number[]): void;
    /**
     * Sets clipping object ids for a specific SectionType.
     * @param ids
     * @returns
     * @description Set the id of the object that needs to be clipping for section by section type
     */
    protected setClippingObjectIdsForType(type: SectionType, ids?: number[]): void;
    destroy(): void;
}
