import { SectionType } from "../../core/Constants";
import type { BaseViewer } from "../../core/viewers";
import { Plugin } from "../../core/viewers/Plugin";
import { BaseSection } from "../../plugins/sections/BaseSection";
export declare class SectionPlugin extends Plugin {
    private sections;
    private activeSectionType?;
    constructor(viewer: BaseViewer);
    get raycaster(): import("three").Raycaster | undefined;
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
     */
    deactivate(): void;
    resetSection(): void;
    /**
     *
     * @returns {boolean} Is Section actived
     */
    isActive(): boolean;
    getActiveSectionType(): SectionType | undefined;
    getActiveSection(): BaseSection | undefined;
    /**
     *
     * @param ids
     * @returns
     * @description Set the id of the object that needs to be clipping for all section
     */
    setAllSectionsClippingObjectIds(ids?: number[]): void;
    /**
     *
     * @param ids
     * @returns
     * @description Set the id of the object that needs to be clipping for section by section type
     */
    setSectionClippingObjectIds(type: SectionType, ids?: number[]): void;
    destroy(): void;
}
