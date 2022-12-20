import { DxfViewer } from "../../core/viewers";
export declare class DxfLayoutBar {
    protected readonly viewer: DxfViewer;
    private element?;
    private content?;
    private itemList;
    constructor(viewer: DxfViewer);
    init(): void;
    private handleMouseWheel;
    private createItem;
    destroy(): void;
    show(): void;
    hide(): void;
}
export declare class ModelLayoutSwitchItem {
    protected readonly viewer: DxfViewer;
    private eventBus;
    element: HTMLElement;
    resetActivate?: () => void;
    active: boolean;
    constructor(viewer: DxfViewer, name: string);
    private createItem;
    setActive(active: boolean): void;
    resetActive(): void;
    destroy(): void;
}
