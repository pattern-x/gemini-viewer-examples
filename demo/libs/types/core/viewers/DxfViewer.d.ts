import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { Event } from "../utils";
import { Toolbar } from "../toolbar";
import { DxfLayer } from "../dxf";
import { ILayoutObject } from "../dxf-parser";
import { DxfModelConfig, DxfViewerConfig } from "../Configs";
import { MeasurementData, MeasurementType } from "../measure/";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Font } from "three/examples/jsm/loaders/FontLoader";
import { MarkupData, MarkupType } from "../markup/Constants";
/**
 * Measurements for DxfViewer contains additional information, e.g. layoutName.
 * DxfViewer doesn't maintain the relationship between model and measurement data,
 * business logic should knows which model a set of measurement data belong to.
 */
export interface DxfMeasurementData extends MeasurementData {
    layoutName?: string;
}
/**
 * Markup for DxfViewer contains additional information, e.g. layoutName.
 * DxfViewer doesn't maintain the relationship between model and markup data,
 * business logic should knows which model a set of markup data belong to.
 */
export interface DxfMarkupData extends MarkupData {
    layoutName?: string;
}
export interface DxfLayers {
    modelId: string;
    layers: Record<string, DxfLayer>;
}
/**
 * @internal
 */
export declare enum ModeType {
    Measurement = 0,
    Markup = 1
}
/**
 * Threejs objects are organized in tree view as below:
 *
 * - modelLevelObject1              (THREE.Group, name = <modelId>)
 *     - layoutLevelObject1         (THREE.Group, name = <layout name>, used to control layout visibility)
 *         - entityLevelObject1     (THREE.Point/Line/Mesh/Group)
 *
 * - Layer threejs objects
 * {
 *    layerName:[threejsObject1,threejsObject2,threejsObject3,...] (THREE.Point/Line/Mesh)
 * }
 */
/**
 * Supported dxf version: AutoCAD 2018. Both binary and ascii are supported.
 *
 * DxfViewer version is 1.0.0 currently
 *
 * Json Encoding: UTF-8 encoding without BOM
 *
 * Coordinate system: right-handed, y-up
 *
 * About units:
 * - Distance units follows the master dxf file
 * - Area units follows the master dxf file
 * - Angle units is degree, counterclockwise by default
 * - Time unit is Second
 *
 * Color: use rgb/rgba, values between 0-1
 *
 * @example
 * ``` typescript
 * const viewerCfg = {
 *     containerId: "myCanvas",
 *     enableToolbar: true,
 *     enableSpinner: true,
 *     enableLayoutBar: true,
 * };
 * const modelCfg = {
 *     modelId: "id_0",
 *     name: "sample",
 *     src: "http://www.abc.com/sample.dxf",
 * }
 * const fontFiles = ["http://www.abc.com/hztxt.shx", "http://www.abc.com/simplex.shx"];
 * const viewer = new DxfViewer(viewerCfg);
 * await viewer.setFont(fontFiles);
 * await viewer.loadModelAsync(modelCfg);
 * ```
 */
export declare class DxfViewer extends Event {
    private readonly CAMERA_Z_POSITION;
    private readonly CAMERA_MIN_ZOOM;
    private readonly MODEL_LAYOUT_NAME;
    private readonly COMPARE_MARKUPS;
    private timer;
    /**
     * @internal
     */
    translate: import("i18next").TFunction;
    /**
     * @internal
     */
    container: HTMLElement;
    /**
     * @internal
     */
    camera?: THREE.OrthographicCamera;
    /**
     * @internal
     */
    scene: THREE.Scene;
    /**
     * @internal
     */
    renderer?: THREE.WebGLRenderer;
    protected enableSVGRenderer: boolean;
    private svgRenderer?;
    /**
     * @internal
     */
    controls?: OrbitControls;
    protected font?: Font;
    protected enableSelection?: boolean;
    protected selectedObject?: THREE.Object3D;
    protected stats?: Stats;
    private loadedModels;
    private masterModelId;
    private dxfLayoutBar?;
    protected height: number;
    protected width: number;
    private raycaster?;
    private cameraUpdateInterval?;
    private mouseMoved;
    private mouseDoubleClicked;
    protected selected: boolean;
    private measurementManager?;
    private markupManager?;
    private raf?;
    protected renderEnabled: boolean;
    private svgRenderEnabled;
    private timeoutSymbol?;
    private spinner?;
    private loadingProgressBar?;
    private jobCount;
    /**
     * @internal
     */
    rootHtmlElement: HTMLElement;
    private contextMenu?;
    private axes?;
    /**
     * @internal
     */
    toolbar?: Toolbar<DxfViewer>;
    private bottomBar?;
    protected viewerCfg: DxfViewerConfig;
    /**
     * @internal
     */
    groundPlane?: THREE.Mesh;
    private enableHideVisuallySmallObjects;
    private sortedHidableObjects;
    private lastCameraZoom;
    private activeLayoutName;
    private layoutInfos;
    private units;
    private raycastableObjects;
    private changes;
    private fpsUtils;
    private compareMarkupCanvas;
    private compareMarkupCtx;
    private compareMarkupDataArray;
    /**
     * @internal
     */
    mode: ModeType;
    constructor(viewerCfg: DxfViewerConfig);
    /**
     * Initialize everything it needs
     * @internal
     */
    protected init(): void;
    private initContainer;
    private initScene;
    private initRenderer;
    /**
     * Hides the compare markup canvas
     */
    hideCompareMarkupCanvas(): void;
    private initCompareMarkupCanvas;
    private setCompareMarkupCanvasSize;
    private initCamera;
    /**
     * @internal
     */
    protected initControls(): void;
    private initRootHtmlElement;
    private onResize;
    protected onControlsChange(viewer: DxfViewer): () => void;
    protected onControlsEnd(viewer: DxfViewer): () => void;
    private initSpinner;
    /**
     * Initialize mouse/pointer events
     */
    private initEvents;
    protected initMouseWheel(): void;
    protected initOthers(): void;
    private initLocalization;
    private initAxes;
    private initStats;
    showStats(id: number): void;
    private initToolbar;
    private initBottomBar;
    private initLoadingProgressBar;
    /**
     * Shows the layout bar
     * @internal
     */
    showLayoutBar(): void;
    /**
     * Hides the layout bar
     * @internal
     */
    hideLayoutBar(): void;
    protected animate(): void;
    /**
     * In order to have a better performance, it should only render when necessary.
     * Usually, we should enable render for these cases:
     *  - Anything added to, removed from scene, or objects' position, scale, rotation, opacity, material, etc. changed
     *  - Anything selected/unselected
     *  - Camera changed
     *  - Render area resized
     * @internal
     */
    enableRender: (time?: number) => void;
    /**
     * In order to have a better performance, it should only render when necessary.
     * Usually, we should enable render for these cases:
     *  - measurements
     * @internal
     */
    enableSVGRender: (time?: number) => void;
    getFps(): number;
    /**
     * Destroies DxfViewer
     */
    destroy(): void;
    /**
     * Used to indicate how many dxf is loading
     */
    private loadingDxfCount;
    /**
     * Loads a dxf file.
     * The first loaded file will be taken as a "master" model.
     * Any other files are non-master, we call "overlay" model.
     * We'll load everything of a master model, including model and paper space.
     * For an overlay model, we'll only load its model space. And its model space can only
     * overly to master model's model space.
     * @example
     * ``` typescript
     * const viewerCfg = {
     *     containerId: "myCanvas",
     * };
     * const modelCfg = {
     *     modelId: "id_0",
     *     name: "dxf 0",
     *     src: "http://www.abc.com/sample.dxf",
     * }
     * const viewer = new DxfViewer(viewerCfg);
     * await viewer.loadModelAsync(modelCfg, (event) => {
     *     const progress = (event.loaded * 100) / event.total;
     *     console.log(`${event.type}: ${progress}%`);
     * });
     * console.log("Loaded");
     * ```
     */
    loadModelAsync(modelCfg: DxfModelConfig, onProgress?: (event: ProgressEvent) => void): Promise<void>;
    /**
     * Unloads a dxf
     * @internal
     */
    unloadDxf(): void;
    /**
     * If it is under compare mode
     */
    private compareMode;
    /**
     * If it is under compare mode
     */
    isCompareMode(): boolean;
    /**
     * Compares two dxf files. Note that:
     * - It only compares model spaces.
     * - It shouldn't load anything else before and after compare.
     * @param url1 The first dxf to be compared
     * @param url2 The second dxf to be compared
     * @internal
     */
    compare(url1: string, url2: string, onProgress?: (event: ProgressEvent) => void): Promise<void>;
    /**
     * Gets loaded entity count
     * @internal
     * @returns {number}
     */
    getEntitiesCount(): number;
    /**
     * Gets loaded dxf model id array
     */
    protected getLoadedDxfModelIds(): string[];
    /**
     * Gets layouts
     */
    getLayoutNames(): string[];
    /**
     * Gets layouts.
     * Only returns master model's layouts.
     */
    protected getLayouts(): ILayoutObject[];
    private handleOverlayDxf;
    /**
     * Activates a layout
     */
    activateLayout(layoutName: string): void;
    /**
     * Calculates the boundingBox of objects with child objects in the children of layoutLevelObject
     */
    private calBoundingBoxOfLayoutChild;
    /**
     * Gets active layout
     */
    getActiveLayoutName(): string | undefined;
    /**
     * Gets dxf layers.
     * @example
     * ``` typescript
     * const dxfLayers = viewer.getLayers();
     * for (let i = 0; i < dxfLayers.length; ++i) {
     *     const layers = dxfLayers[i].layers;
     *     const layerNames = Object.keys(layers).sort();
     *     console.log(layerNames);
     * }
     * ```
     */
    getLayers(): DxfLayers[];
    /**
     * Sets model's (aka, a dxf file) visibility.
     * @throws Throws exception if modelId doesn't exist.
     */
    setModelVisibility(modelId: string, visible: boolean): void;
    /**
     * Sets layer's visibility.
     * @param layerName Layer's name to show or hide
     * @param visible Layer's target visibility
     * @param modelId Useful when more than one model is loaded, if not specified, will use the master model.
     * @throws Throws exception if given modelId doesn't exist.
     * @example
     * ``` typescript
     * // Hides layer "0"
     * viewer.setLayerVisibility("0", false);
     * ```
     */
    setLayerVisibility(layerName: string, visible: boolean, modelId?: string): void;
    /**
     * Sets layer's opacity
     * @internal
     */
    setLayerOpacity(): void;
    /**
     * Sets layer's color
     * @throws Throws exception if layer doesn't exist.
     * @internal
     */
    setLayerColor(layerName: string, color: number, modelId?: string): void;
    /**
     * Sets font.
     * This needs to be called before loading a dxf, it won't affect any loaded text.
     * It accepts shx or typeface formats. For typeface, it only support passing in 1 font file in the array for now.
     * @param urls font file urls
     */
    setFont(urls: string[]): Promise<void>;
    /**
     * Sets display length units.
     * @internal Not implemented yet!
     * @default Millimeters
     */
    setDisplayLengthUnits(): void;
    /**
     * Sets display area units
     * @internal Not implemented yet!
     * @default Meters
     */
    setDisplayAreaUnits(): void;
    /**
     * Sets display decimal digits
     * @internal Not implemented yet!
     * @default 2
     */
    setDisplayPrecision(): void;
    /**
     * Activates one of "Distance", "Area" or "Angle" measurement
     * @param type "Distance", "Area" or "Angle"
     * @example
     * ``` typescript
     * viewer.activateMeasurement(MeasurementType.Distance);
     * ```
     */
    activateMeasurement(type: MeasurementType): void;
    /**
     * Deactivates measurement
     */
    deactivateMeasurement(): void;
    /**
     * Gets active measurement type
     */
    getActiveMeasurementType(): MeasurementType | undefined;
    /**
     * Gets all measurements
     * @example
     * ``` typescript
     * const measurementData = viewer.getMeasurements();
     * console.log(measurementData);
     * ```
     */
    getMeasurements(): DxfMeasurementData[];
    /**
     * Sets measurement data.
     * User can set measurement data for all layouts, DxfViewer manages their visibilities
     * for different layouts.
     * @example
     * ``` typescript
     * const measurementData = [{
     *     type: "Distance",
     *     id: "c6ea70a3-ddb0-4dd0-87c8-bd2491936428",
     *     points: [[0, 1000], [5000, 1000]],
     *     layoutName: "Model",
     * }];
     * viewer.setMeasurements(measurementData);
     * ```
     */
    setMeasurements(measurementData: DxfMeasurementData[]): void;
    /**
     * Selects a measurement by id
     * @internal
     */
    selectMeasurement(id: string): void;
    /**
     * Unselects a measurement by id
     * @internal
     */
    unselectMeasurement(): void;
    /**
     * Removes a measurement
     */
    removeMeasurementById(id: string): void;
    setMeasurementsVisibility(visible: boolean): void;
    /**
     * Clears all measurement results
     */
    clearMeasurements(): void;
    /** markup start **/
    /**
     * Activates markup feature
     * @param type MarkupType | undefined
     * @example
     * ``` typescript
     * viewer.activateMarkup(MarkupType.Arrow);
     * ```
     */
    activateMarkup(type?: MarkupType): void;
    /**
     * Deactivates markup
     */
    deactivateMarkup(): void;
    /**
     * Gets active markup type
     */
    getActiveMarkupType(): MarkupType | undefined;
    /**
     * Set markup stroke color
     * @internal
     */
    setMarkupStrokeStyle(color: string): void;
    /**
     * @internal
     */
    getMarkupStrokeStyle(): string | undefined;
    /**
     * Set markup fill color
     * @internal
     */
    setMarkupFillStyle(color: string): void;
    /**
     * @internal
     */
    getMarkupFillStyle(): string | undefined;
    /**
     * Set markup stroke line width
     * @internal
     */
    setMarkupLineWidth(lineWidth: number): void;
    /**
     * @internal
     */
    getMarkupLineWidth(): number | undefined;
    /**
     * Set markup font size
     * @internal
     */
    setMarkupFontSize(fontSize: number): void;
    /**
     * @internal
     */
    getMarkupFontSize(): number | undefined;
    /**
     * Gets all markups
     * @returns DxfMarkupData array
     */
    getMarkups(): DxfMarkupData[];
    /**
     * Sets markup data.
     * User can set markup data for all layouts, DxfViewer manages their visibilities
     * for different layouts.
     * @example
     * ``` typescript
     * const markupData = [{
     *     type: "Arrow",
     *     id: "c6ea70a3-ddb0-4dd0-87c8-bd2491936428",
     *     lineWidth: 2,
     *     strokeStyle: "#ff0000",
     *     fillStyle: "#ff000030",
     *     points: [[0, 0], [1000, 1000]],
     *     layoutName: "Model",
     * }];
     * viewer.setMarkups(markupData);
     * ```
     */
    setMarkups(markupData: DxfMarkupData[]): void;
    setMarkupsVisibility(visible: boolean): void;
    /**
     * Clears markups
     */
    clearMarkups(): void;
    /** markup end **/
    /**
     * draw compare markups
     */
    private drawCompareMarkups;
    private drawCompareMarkup;
    private getCompareMarkupTolerance;
    private getCompareMarkupBBox;
    private getLayoutByName;
    private getActiveLayoutInfo;
    private getMsTransformMatrix;
    private switchTransformMs;
    private getLayoutExtentEx;
    private getModelSpaceExtent;
    private getLayoutExtent;
    /**
     * Shows objects for given layout, and hide any other layouts.
     */
    private showLayoutObjects;
    private getLayoutViewports;
    private setMaterialUniforms;
    /**
     * Checks if a layer is frozen for viewport (VP Freeze)
     */
    private isLayerFrozenForViewport;
    private generateObjectsByViewport;
    private findSpatialFilter;
    private getAnyMaterial;
    private addSpatialFilterSection;
    private getObjectsByBoundingBox;
    private getDxfUnits;
    private generateSectionsBySpatialFilter;
    /**
     * Add newly added object to scene.
     * Also, usually(but not always) we should regenerate sky and go to home view
     * @param object
     */
    private addLoadedModelToScene;
    protected resize(width?: number, height?: number): void;
    /**
     * @internal
     */
    getRaycaster(): THREE.Raycaster | undefined;
    /**
     * Gets raycast-able objects.
     * Raycast-able objects should be visible objects in scene.
     * @internal
     */
    getRaycastableObjects(): THREE.Object3D[];
    /**
     * Gets intersections by given mouse location.
     * If no MouseEvent is passed in, use (0, 0) as the raycaster's origin.
     */
    private getIntersections;
    /**
     * Handles mouse click event
     */
    private handleMouseClick;
    /**
     * Select or unselect an object.
     */
    protected selectObject(object?: THREE.Object3D, depthTest?: boolean): void;
    /**
     * Clears the current selection
     */
    protected clearSelection(): void;
    /**
     * Makes camera fly to objects
     */
    protected flyToObjects(objects: THREE.Object3D[]): void;
    /**
     * Make camera fly to an object
     */
    protected flyToObject(object: THREE.Object3D): void;
    /**
     * Flies to current selected object if any
     */
    protected flyToSelectedObject(): void;
    /**
     * Flies to a random object (by alt + r).
     * It is useful when either the data is wrong or there is bug in program,
     * then we cannot see anything in the scene!
     */
    protected flyToRandomObject(): void;
    /**
     * Makes camera fly to target position with given lookAt position
     * @param position camera's target position
     * @param lookAt camera's new lookAt position
     * @param targetCameraZoom camera's target zoom value
     */
    private flyTo;
    /**
     * Moves camera to target position
     * @param position 2d position
     */
    protected goTo(position: THREE.Vector2 | THREE.Vector3, targetCameraZoom?: number, animate?: boolean): void;
    /**
     * Moves camera to home view
     */
    goToHomeView(): void;
    /**
     * Zooms to specific bounding box
     * @internal
     */
    zoomToBBox(bbox: THREE.Box3): void;
    /**
     * Zooms to a compare change
     * @param handle a changing entity's handle
     */
    protected zoomToCompareChange(handle: string): void;
    /**
     * Sets background color
     * @param r value between 0-1
     * @param g value between 0-1
     * @param b value between 0-1
     * @example
     * ``` typescript
     * // Sets background to gray
     * viewer.setBackgroundColor(0.5, 0.5, 0.5);
     * ```
     */
    setBackgroundColor(r: number, g: number, b: number): void;
    /**
     * Sets spinner visibility
     */
    protected setSpinnerVisibility(visible: boolean): void;
    /**
     * Increases job count, and show spinner accordingly
     */
    protected increaseJobCount(): void;
    /**
     * Decreases job count, and hide spinner accordingly
     */
    protected decreaseJobCount(): void;
    /**
     * Gets LayoutInfo by layoutName. It creats LayoutInfo if doesn't exist.
     */
    private getLayoutInfo;
    /**
     * Creates a ground plane which is much bigger than bbox.
     */
    private updateGroundPlane;
    /**
     * Merges objects by layer and layout.
     */
    private merge;
    /**
     * Compute bounding box of loaded models
     * @internal
     */
    computeBoundingBox(): THREE.Box3;
    /**
     * Checks if an expected zoom value is valid, and adjust its value if necessary.
     */
    private checkAndGetLimitedCameraZoom;
    /**
     * Set the visibility of dxf objects based on the camera frustum.
     * TODO: the visibility of the children of modelspace or paperspace objects
     */
    private setVisibilityByCameraFrustum;
    private getVisiblePixelSize;
    private setLayoutHidableObjectArray;
    private statObjects;
    /**
     * Updates hidable objects' visibility once camera.zoom changed.
     */
    private updateHidableObjectsVisibility;
    /**
     * Updates raycaster threshold to a proper value, so user can easily pick points and lines
     */
    private updateRaycasterThreshold;
    /**
     * Updates camera zoom value for shader materials, which are created in DXFLoader
     */
    private updateCameraZoomUniform;
}
