/**
 * Markup data
 */
export interface MarkupData {
    /**
     * id is used by business logic to manage(find, delete, etc.) markups
     */
    id: string;
    type: MarkupType;
    /**
     * Two dimension float array stores 2d points.
     * e.g. [[1, 1], [2.5, 3]]
     */
    points: number[][];
    strokeStyle?: string;
    lineWidth?: number;
    fillStyle?: string;
}
/**
 * Markup type, including Arrow, Circle, Rectangle, Text, etc.
 */
export declare enum MarkupType {
    Arrow = "Arrow",
    Circle = "Circle",
    CloudLine = "CloudLine",
    CloudLineRectangle = "CloudLineRectangle",
    Dot = "Dot",
    Ellipse = "Ellipse",
    PolyLine = "PolyLine",
    Rectangle = "Rectangle",
    Text = "Text",
    X = "X"
}
