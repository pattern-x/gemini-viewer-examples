import { IconClass } from "../utils";
import type { BimViewer, DxfViewer, VRViewer } from "../viewers";
import { Toolbar } from "./Toolbar";
/**
 * @type
 * 1: click event
 * 2：show popup
 * 3：show submenu
 * 4：turn on/off
 * @internal
 */
export declare enum MenuTypeEnums {
    ClickEvent = 1,
    Popup = 2,
    SubMenu = 3,
    Switch = 4
}
/**
 * Buildin toolbar ids
 * @internal
 */
export declare enum ToolbarMenuId {
    HomeView = "HomeView",
    OrthoMode = "OrthoMode",
    Measure = "Measure",
    MeasureDistance = "MeasureDistance",
    MeasureArea = "MeasureArea",
    MeasureAngle = "MeasureAngle",
    MeasureClear = "MeasureClear",
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
    AxisSectionPlane = "AxisSectionPlane",
    BimTree = "BimTree",
    Viewpoint = "Viewpoint",
    Annotation = "Annotation",
    Property = "Property",
    Settings = "Settings",
    Fullscreen = "FullScreen",
    SceneClear = "SceneClear",
    Layers = "Layers",
    ZoomToRectangle = "ZoomToRectangle"
}
/**
 * ToolbarConfig
 * @internal
 */
export interface ToolbarMenuConfig<T extends BimViewer | DxfViewer | VRViewer> {
    menuName: string;
    icon: IconClass;
    children?: ToolbarConfig<T>;
    visible?: boolean;
    mutexIds?: ToolbarMenuId[];
    defaultActive?: boolean;
    type: MenuTypeEnums;
    customElement?: (bimViewer: T, menuId: string, cfg: ToolbarMenuConfig<T>) => HTMLDivElement;
    onActive?: (bimViewer: T) => void;
    onDeactive?: (bimViewer: T) => void;
    onClick?: (bimViewer: T, toolbar: Toolbar<T>, event: MouseEvent) => void;
}
/**
 * @internal
 */
export declare type ToolbarConfig<T extends BimViewer | DxfViewer | VRViewer> = {
    [key in ToolbarMenuId]?: ToolbarMenuConfig<T>;
};
