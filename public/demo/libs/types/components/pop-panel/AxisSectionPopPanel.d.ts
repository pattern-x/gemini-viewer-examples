import { Emitter } from "mitt";
import { PopPanel } from "./PopPanel";
import { AxisType } from "../../core/section/AxisPlaneSection";
export declare type Events = {
    axis: AxisType;
    visible: boolean;
};
export declare class AxisSectionPopPanel extends PopPanel {
    protected axis: string;
    protected activeItem?: string;
    protected groupSelectNode?: HTMLElement;
    protected activeSelectNode?: HTMLElement;
    protected isVisible: boolean;
    eventBus: Emitter<Events>;
    constructor(container?: HTMLElement);
    createGroupSelectLayout(): void;
    addGroupSelectItems(): void;
    createActiveSelectLayout(): void;
    addActiveItems(): void;
}
