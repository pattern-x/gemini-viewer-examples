import { SVGObject } from "three/examples/jsm/renderers/SVGRenderer.js";
export declare const SNAP_ICON_SIZE = 10;
export declare enum OSnapMarkerType {
    TripleCross = "TripleCross",
    Square = "Square",
    Triangle = "Triangle",
    CircleWithCross = "CircleWithCross",
    Cross = "Cross",
    Perpendicular = "Perpendicular"
}
/**
 * @internal
 */
export declare class SVGObjectUtils {
    static createSVGObject(node: SVGPathElement | SVGTextElement | SVGLineElement): SVGObject;
}
