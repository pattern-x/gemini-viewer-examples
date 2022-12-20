import { SVGObject } from "three/examples/jsm/renderers/SVGRenderer";
export declare const SNAP_ICON_COLOR = "#7fffbf";
export declare const SNAP_ICON_SIZE = 10;
export declare const DEFAULT_LABEL_FONT_SIZE = 14;
export declare const DEFAULT_LINE_WIDTH = 2.5;
export declare enum SnapType {
    Dot = "Dot",
    Square = "Square",
    Triangle = "Triangle",
    Cross = "Cross",
    Perpendicular = "Perpendicular"
}
/**
 * @internal
 */
export declare class SVGObjectUtils {
    static createSVGObject(node: SVGPathElement | SVGTextElement | SVGLineElement): SVGObject;
    static createPointMarker(size?: number): SVGObject;
    static createSnapIcon(type: SnapType, fill?: string, size?: number, stroke?: string, strokeWidth?: string): SVGObject;
    static createLine(length?: number, stroke?: string, strokeWidth?: number): SVGObject;
    static createLabel(label: string, fill?: string, fontSize?: number, y?: number): SVGObject;
}
