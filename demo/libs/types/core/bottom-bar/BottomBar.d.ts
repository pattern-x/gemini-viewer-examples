import { BimViewer, DxfViewer, VRViewer } from "../viewers";
import { IconClass } from "../utils/CommonUtils";
import { Tooltip } from "../../components/tool-tip/Tooltip";
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
    protected readonly viewer: BimViewer | DxfViewer | VRViewer;
    private element;
    itemList: Map<string, BottomBarItem>;
    constructor(viewer: BimViewer | DxfViewer | VRViewer);
    update(): void;
    private init;
    private createItem;
}
declare class BottomBarItem {
    readonly viewer: BimViewer | DxfViewer | VRViewer;
    private readonly bottomBar;
    protected readonly menuId: string;
    protected cfg: BottomBarItemConfig;
    private eventBus;
    private itemconfig;
    tooltip: Tooltip;
    element: HTMLElement;
    active: boolean;
    constructor(viewer: BimViewer | DxfViewer | VRViewer, bottomBar: BottomBar, menuId: string, cfg: BottomBarItemConfig);
    private createButton;
    setActive(active: boolean): void;
    update(): void;
}
export {};
