import * as THREE from "three";
import { ModelData2d } from "./Constants";
import { Units } from "../../core/Units";
import { DxfData } from "../../core/dxf";
import { ILayer, ILayoutObject, IPoint, IViewport, IViewportEntity } from "../../core/dxf-parser";
import { Model } from "../../core/model/Model";
import type { PdfData, PdfLayer } from "../../core/viewers/DxfViewer";
/**
 * Loaded 2d model info for DxfViewer.
 */
export declare class Model2d extends Model {
    modelId: string;
    private modelData;
    modelObject: THREE.Object3D;
    private bbox?;
    constructor(modelData: ModelData2d);
    get pdfData(): PdfData | undefined;
    get dxfData(): DxfData | undefined;
    /**
     * @internal
     */
    get msTransformMatrix(): THREE.Matrix4 | undefined;
    /**
     * @internal
     */
    set msTransformMatrix(matrix: THREE.Matrix4 | undefined);
    /**
     * @internal
     */
    get loadedEntityCount(): number;
    /**
     * Gets dxf data header.
     */
    get header(): Record<string, number | IPoint> | undefined;
    /**
     * Gets dxf data viewports.
     */
    get viewports(): IViewport[] | undefined;
    /**
     * Gets layers.
     */
    get layers(): Record<string, ILayer | PdfLayer> | undefined;
    /**
     * Gets dxf data layoutViewportsMap.
     * @internal
     */
    get layoutViewportsMap(): Record<string, IViewportEntity[]> | undefined;
    /**
     * Gets three.js object of the model.
     */
    getModelObject(): THREE.Object3D;
    /**
     * Gets model bounding box.
     */
    getBBox(): THREE.Box3;
    /**
     * Gets dxf units.
     * @internal
     */
    getUnits(): Units;
    /**
     * Gets dxf model space extent.
     * @internal
     */
    getModelSpaceExtent(): THREE.Box3 | undefined;
    /**
     * Gets layer by layer name.
     */
    getLayer(layerName: string): ILayer | PdfLayer | undefined;
    /**
     * Gets layer object and three.js object by layer name.
     */
    getObjectsByLayer(layerName: string): THREE.Object3D[] | undefined;
    /**
     * Gets layout of dxf data.
     */
    getLayouts(): ILayoutObject[];
    getLayoutByName(layoutName: string): ILayoutObject | undefined;
    /**
     * Gets layout extent of dxf data.
     * @internal
     */
    getLayoutExtent(layout: ILayoutObject): THREE.Box3;
    /**
     * Gets layout viewports.
     * @internal
     */
    getLayoutViewports(layout: ILayoutObject): IViewportEntity[];
    /**
     * Gets the layout level three.js object.
     */
    getLayoutLevelObject(layoutName: string): THREE.Object3D | undefined;
    /**
     * Sets model visibility.
     */
    setVisible(visible: boolean): void;
    /**
     * Sets layer visibility.
     */
    setLayerVisible(layerName: string, visible: boolean, enableHideVisuallySmallObjects?: boolean, cameraZoom?: number): void;
    /**
     * Sets layer opacity.
     */
    setLayerOpacity(layerName: string, opacity: number): void;
    /**
     * Sets layer color.
     */
    setLayerColor(layerName: string, color: number): void;
    /**
     * Resets layer color.
     */
    resetLayerColor(layerName: string): void;
    /**
     * @internal
     */
    switchTransformMs(layoutName: string): void;
    activateLayout(layoutName: string | undefined, isLayoutInitialized: boolean): void;
    getFilteredViewports(layout: ILayoutObject): IViewportEntity[];
    private generateObjectsByViewport;
    private setMaterialUniforms;
    private getObjectsByBoundingBox;
    /**
     * Shows objects for given layout, and hide any other layouts.
     */
    showLayoutObjects(layoutName: string): void;
    /**
     * Checks if a layer is frozen for viewport (VP Freeze)
     */
    private isLayerFrozenForViewport;
    addSpatialFilterSection(object: THREE.Object3D, dxfData: DxfData, bFromViewport?: boolean): void;
    private findSpatialFilter;
    private getAnyMaterial;
    private generateSectionsBySpatialFilter;
    private hasObject;
    private hasObjectWithId;
    /**
     * Highlights an object.
     */
    highlightObject(object: THREE.Object3D): void;
    unHighlightObject(object: THREE.Object3D): void;
    clearHighlight(): void;
}
