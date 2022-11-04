import { Emitter } from "mitt";
import { PopPanel } from "./PopPanel";
export declare type Events = {
    visible: boolean;
    reset: void;
};
export declare class PickSectionPopPanel extends PopPanel {
    eventBus: Emitter<Events>;
    protected activeSelectNode?: Element;
    protected isVisible: boolean;
    protected enabled: boolean;
    protected visibleNode?: HTMLElement;
    protected resetNode?: HTMLElement;
    constructor(container?: HTMLElement);
    createActiveSelectLayout(): void;
    addActiveItems(): void;
    enable(): void;
    disable(): void;
}
