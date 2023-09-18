/**
 * Drawable data, including measurement data, markup data, etc.
 */
export interface DrawableData {
    /**
     * id is used by business logic to manage(find, update, delete, etc.) drawables
     */
    id: string;
    /**
     * Two dimension float array stores 2d or 3d points.
     * e.g., You can use "[[1, 1], [2.5, 3]]" to represent a distance measurement result,
     * "[1, 1]" is the first point, and "[2.5, 3]" is the second point.
     */
    points: number[][];
    lineWidth?: number;
    /**
     * Line color is number array. e.g: [r, g, b, a]
     */
    lineColor?: number[];
    /**
     * Fill color is number array. e.g: [r, g, b, a]
     */
    fillColor?: number[];
    /**
     * Drawable dta type
     */
    type: string;
}
