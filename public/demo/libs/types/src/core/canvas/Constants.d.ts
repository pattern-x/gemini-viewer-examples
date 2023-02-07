/**
 * Markup data
 */
export interface DrawableData {
    /**
     * id is used by business logic to manage(find, delete, etc.) markups
     */
    id: string;
    /**
     * Two dimension float array stores 2d points.
     * e.g. [[1, 1], [2.5, 3]]
     */
    points: number[][];
    lineWidth?: number;
    lineColor?: string;
    fillColor?: string;
    /**
     * is class type for serialize
     */
    type: string;
}
