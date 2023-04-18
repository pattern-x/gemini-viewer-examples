import { Tooltip } from "../../components/tool-tip";
import { IconClass } from "../../core/utils";
import { BaseViewer } from "../../core/viewers/BaseViewer";
declare enum BottomBarItemId {
    statistics = "statistics",
    cameraInfo = "cameraInfo",
    stats = "stats",
    tips = "tips"
}
interface BottomBarItemConfig {
    icon: IconClass;
    mutexIds?: BottomBarItemId[];
    onActive?: (item: BottomBarItem) => void;
    onDeactive?: (item: BottomBarItem) => void;
    onClick?: (item: BottomBarItem) => void;
    onUpdate?: (item: BottomBarItem) => void;
}
export declare class BottomBar {
    protected readonly viewer: BaseViewer;
    private element;
    itemList: Map<string, BottomBarItem>;
    constructor(viewer: BaseViewer);
    update(): void;
    private init;
    private createItem;
}
declare class BottomBarItem {
    readonly viewer: BaseViewer;
    private readonly bottomBar;
    protected readonly menuId: string;
    protected cfg: BottomBarItemConfig;
    private eventBus;
    private itemconfig;
    tooltip: Tooltip;
    element: HTMLElement;
    active: boolean;
    constructor(viewer: BaseViewer, bottomBar: BottomBar, menuId: string, cfg: BottomBarItemConfig);
    private createButton;
    setActive(active: boolean): void;
    update(): void;
}
export {};
