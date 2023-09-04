import type { Toolbar } from "./Toolbar";
import { IconClass } from "../../core";
import type { BaseViewer } from "../../core/viewers";
/**
 * @type
 * 1: click event
 * 2：show popup
 * 3：show submenu
 * 4：turn on/off
 */
export declare enum MenuTypeEnums {
    ClickEvent = 1,
    Popup = 2,
    SubMenu = 3,
    Switch = 4
}
/**
 * Buildin toolbar ids
 */
export declare enum ToolbarMenuId {
    HomeView = "HomeView",
    OrthoMode = "OrthoMode",
    Measure = "Measure",
    MeasureDistance = "MeasureDistance",
    MeasureArea = "MeasureArea",
    MeasureAngle = "MeasureAngle",
    MeasureCoordinate = "MeasureCoordinate",
    MeasureClear = "MeasureClear",
    MarkupVisibility = "MarkupVisibility",
    Markup = "Markup",
    MarkupArrow = "Arrow",
    MarkupRect = "Rect",
    MarkupCloudRect = "CloudRect",
    MarkupPolyLine = "PolyLine",
    MarkupCloudLine = "CloudLine",
    MarkupEllipse = "Ellipse",
    MarkupCircle = "Circle",
    MarkupDot = "Dot",
    MarkupText = "Text",
    MarkupX = "X",
    MarkupStrokeStyle = "StrokeStyle",
    MarkupLineWidth = "LineWidth",
    MarkupLineWidth2 = "LineWidth2",
    MarkupLineWidth5 = "LineWidth5",
    MarkupLineWidth10 = "LineWidth10",
    MarkupFontSize = "FontSize",
    MarkupFontSize14 = "FontSize14",
    MarkupFontSize18 = "FontSize18",
    MarkupFontSize24 = "FontSize24",
    MarkupClear = "MarkupClear",
    MarkupQuit = "MarkupQuit",
    Section = "Section",
    SectionBox = "SectionBox",
    SectionPlane = "SectionPlane",
    SectionAxis = "SectionAxis",
    BimTree = "BimTree",
    Viewpoint = "Viewpoint",
    Annotation = "Annotation",
    Property = "Property",
    Settings = "Settings",
    Compared = "Compared",
    QuitCompare = "QuitCompare",
    Fullscreen = "FullScreen",
    SceneClear = "SceneClear",
    Layers = "Layers",
    ZoomToRectangle = "ZoomToRectangle",
    Screenshot = "GetScreenshot"
}
/**
 * Toolbar menu config.
 * Used to define menu item name, icon, child items, etc.
 */
export interface ToolbarMenuConfig {
    menuName?: string;
    icon?: IconClass;
    children?: ToolbarConfig;
    visible?: boolean;
    mutexIds?: ToolbarMenuId[];
    defaultActive?: boolean;
    type?: MenuTypeEnums;
    customElement?: (viewer: BaseViewer, menuId: string, cfg: ToolbarMenuConfig) => HTMLDivElement;
    onActive?: (viewer: BaseViewer) => void;
    onDeactive?: (viewer: BaseViewer) => void;
    onClick?: (viewer: BaseViewer, toolbar: Toolbar, event: MouseEvent | TouchEvent) => void;
}
/**
 * Toolbar config.
 * The key is ToolbarMenuId, and the value is a ToolbarMenuConfig.
 */
export declare type ToolbarConfig = {
    [key in ToolbarMenuId]?: ToolbarMenuConfig;
};
/**
 * @internal
 */
export declare const GROUP_CONFIG: ToolbarMenuId[][];
