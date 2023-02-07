import * as THREE from "three";
import { BaseMeasureDrawable } from "./BaseMeasureDrawable";
import { MeasurementData, MeasurementType } from "./BaseMeasurement";
import type { BaseViewer } from "../viewers/BaseViewer";
export declare class MeasurementManager {
    scene: THREE.Scene;
    selectedMeasurementDrawable: BaseMeasureDrawable | undefined;
    private overlayRender?;
    private drawableList;
    private viewer;
    private osnapHelper;
    private measurements;
    private activeMeasurementType;
    private undoRedoHelper;
    constructor(viewer: BaseViewer);
    private initEvents;
    get canvas(): HTMLCanvasElement;
    get raycaster(): THREE.Raycaster | undefined;
    getPixelSizeInWorldCoord(): number;
    /**
     * The closest intersection
     * @param e
     */
    getIntersections: (e: MouseEvent) => THREE.Intersection[];
    addMeasurement(drawable: BaseMeasureDrawable, needRecord?: boolean): void;
    createMeasurement(data: MeasurementData): import("..").Drawable;
    removeMeasurement(drawable: BaseMeasureDrawable, needRecord?: boolean): void;
    updateSnapTolerance(pixelSize?: number): void;
    activateMeasurement(type: MeasurementType): void;
    deactivateMeasurement(): void;
    getActiveMeasurementType(): MeasurementType | undefined;
    isMeasurementActive(): boolean;
    getMeasurementsData(): MeasurementData[];
    setMeasurementsData(dataArray: MeasurementData[]): void;
    setMeasurementsVisibility(visible: boolean): void;
    clearMeasurements(): void;
    removeMeasurementById(id: string, needRecord?: boolean): void;
    selectMeasurementById(id: string): void;
    selectMeasurement(drawable: BaseMeasureDrawable): void;
    unselectMeasurement(): void;
    undo(): void;
    redo(): void;
    clearUndoRedo(): void;
    destroy(): void;
    keydown: (e: KeyboardEvent) => void;
}
