import * as THREE from "three";
import { BimViewer, DxfViewer } from "..";
import { BaseMeasurement, MeasurementData, MeasurementAssets } from "./BaseMeasurement";
import { OSnapHelper } from "../helpers/OSnapHelper";
import { SVGObject } from "../patches/SVGRenderer";
export declare class DistanceMeasurement extends BaseMeasurement {
    pointMarkers: SVGObject[];
    line?: THREE.Line;
    label?: THREE.Object3D | SVGObject;
    lineMarkers?: THREE.Line[];
    constructor(viewer: BimViewer | DxfViewer, measurementScene: THREE.Scene, osnapHelper: OSnapHelper);
    createMeasurementAssetsByData(data: MeasurementData): MeasurementAssets;
    select(assets: MeasurementAssets): void;
    unselect(assets: MeasurementAssets): void;
    protected onMouseMove(position: THREE.Vector3): void;
    protected onMouseClick(e: MouseEvent): void;
    protected complete(): void;
    cancel(): void;
    protected setTooltipContent(): void;
    protected getMeasurementAssets(): MeasurementAssets;
    protected removeMarkers(): void;
    private createOrUpdatePointMarkers;
    private createOrUpdateLineMarker;
    private createOrUpdateLabel;
    /**
     * Creates vertical short lines at endpoints of the distance measurement line.
     */
    private createVerticalLineMarkers;
    private initEvents;
    /**
     * update short lines's direction when rotating the camera
     */
    private updateShortLines;
}
