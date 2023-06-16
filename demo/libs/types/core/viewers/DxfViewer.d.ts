/// <reference types="stats.js" />
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { Font } from "three/examples/jsm/loaders/FontLoader.js";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { Toolbar } from "../../components/toolbar";
import { DxfCompareConfig, DxfModelConfig, DxfViewerConfig, Hotpoint, ModelConfig } from "../../core/Configs";
import { Box2, ScreenshotMode, Vector2 } from "../../core/Constants";
import { Drawable, DrawableData } from "../../core/canvas";
import { DxfChange, DxfData, DxfLayer } from "../../core/dxf";
import { ILayoutObject } from "../../core/dxf-parser";
import { EventInfo } from "../../core/input/InputManager";
import { MarkupManager, MarkupType } from "../../core/markup";
import { MeasurementData, MeasurementManager, MeasurementType } from "../../core/measure";
import { BaseViewer, ScreenshotResult, ViewerName } from "../../core/viewers/BaseViewer";
/**
 * Markup for DxfViewer contains additional information, e.g. layoutName.
 *
 * DxfViewer doesn't maintain the relationship between model and markup data,
 * business logic should knows which model a set of markup data belong to.
 */
export type MarkupData = DrawableData;
export interface EntityData {
    modelId: string;
    layerName: string;
}
/**
 * A group of dxf/dwg layers for a drawing.
 */
export interface DxfLayers {
    modelId: string;
    layers: Record<string, DxfLayer>;
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
 * "dwg" is short for "drawing", it is a file format saved by AutoCAD.
 * And "dxf" is data exchange format, which can be converted from a dwg file.
 * We cannot read dwg directly, and need to convert it to dxf first via ODA.
 *
 * Supported dxf version: AutoCAD 2018. Both binary and ascii are supported.
 *
 * Json Encoding: UTF-8 encoding without BOM
 *
 * Coordinate system: right-handed, y-up
 *
 * About units:
 * - The unit of distance follows the master dxf file's unit
 * - The unit of area follows the master dxf file's unit
 * - The unit of angle is "degree", counterclockwise
 * - The unit of time is "second"
 *
 * Color: use rgb/rgba, values between 0-1
 *
 * About Measurement in DxfViewer:
 * - A measurement is generated by DxfViewer.
 * - Measurements data should be stored by users, so users can restore measurements data into DxfViewer later.
 * - DxfViewer manages measurements data, it can be created, removed, hidden, etc.
 * - DxfViewer doesn't maintain the relationship between measurement and layout.
 *
 * About Markup in DxfViewer:
 * Markup is pretty similar to measurement.
 *
 * About Hotpoint in DxfViewer:
 * - A hotpoint is created and stored by user.
 * - A hotpoint can be added to, and removed from DxfViewer.
 * - Caller should set a hotpointId that is unique in the session of current DxfViewer.
 * - DxfViewer doesn't hide a hotpoint, user is able to do it.
 * - DxfViewer doesn't maintain the relationship between hotpoint and layout.
 *
 * About layouts
 * - Each layout has its own home view.
 * - When switching to another layout, it clears all measurements, markups and hotpoints.
 * - When switching to another layout, it deactivates any in-progress operation like measurement, markup, etc.
 *
 * About overlay
 * - It supports to add as many models as user want, as long as the browser has sufficient memory, cpu/gpu, etc.
 * - The first model is called "master" model, others are called "overlay" models.
 * - It ignores an overlay model's paper space.
 * - An overlay model's unit should be converted to master model's unit if they are not the same.
 * - We'll append modelId as prefix for getLayers()
 *
 * About comparision
 * - It compares just "Model" spaces.
 * - It compares entities with the same handles and types.
 * - It compares entities' geometries, positions, scales, etc.
 * - It ignores a layer's visibility, freeze settings.
 * - It ignores an entity's properties, like linetype, line width, fill pattern, font, color, etc.
 * - It ignores spatial filters (xclip) of block references.
 * - It ignores layer relative operations, like moving an entity to another layer, changing a layer color, etc.
 * - By default, an "Added" entity is rendered in green, a "Removed" entity is in red, a "Modified" entity is composed by two parts, one "Removed" and another "Added".
 *
 * About undo/redo
 * - It supports undo/redo for measurement and markup operations. E.g., creating/deleting/moving a markup.
 * - Setting/removing a batch of measurements or markups will be taken as one operation.
 * - Switching to another layout clears all undo/redo history.
 *
 * About OSnap
 * - It supports snapping to the end points and middle point of a line.
 * - It supports snapping to the intersection point of two lines.
 * - It supports snapping to the foot of perpendicular against a line.
 * - It supports snapping to any point along a line.
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
 *
 * const viewer = new DxfViewer(viewerCfg);
 * await viewer.setFont(fontFiles);
 * await viewer.loadModelAsync(modelCfg);
 * ```
 */
export declare class DxfViewer extends BaseViewer {
    /**
     * @internal
     */
    name: ViewerName;
    private readonly CAMERA_Z_POSITION;
    private readonly CAMERA_MIN_ZOOM;
    private frustumSize;
    private timer;
    protected css2dRenderer?: CSS2DRenderer;
    protected font?: Font;
    protected enableSelection?: boolean;
    protected selectedObject?: THREE.Object3D | Drawable;
    protected stats?: Stats;
    /**
     * The record "key" is modelId or src.
     * @internal
     */
    loadedModels: Record<string, {
        dxfData?: DxfData;
        msTransformMatrix?: THREE.Matrix4;
    }>;
    /**
     * @internal
     */
    masterModelId: string;
    private dxfLayoutBar?;
    private loadingManager?;
    private raycaster?;
    private cameraUpdateInterval?;
    protected selected: boolean;
    private measurementManager?;
    private markupManager?;
    private zoomToRectHelper?;
    private boxSelectHelper?;
    private pickMarkupHelper?;
    private raf?;
    private clock;
    protected renderEnabled: boolean;
    private timeoutSymbol?;
    private loadingProgressBar?;
    private contextMenu?;
    private axes?;
    /**
     * @internal
     */
    toolbar?: Toolbar<DxfViewer>;
    private bottomBar?;
    private enableHideVisuallySmallObjects;
    private sortedHidableObjects;
    private lastCameraZoom;
    private lastFrame;
    private activeLayoutName;
    private layoutInfos;
    private units;
    private raycastableObjects;
    private changes;
    private fpsUtils;
    protected hotpointRoot?: THREE.Group;
    constructor(viewerCfg: DxfViewerConfig);
    /**
     * Initialize everything it needs
     * @internal
     */
    protected init(): void;
    private initInputManager;
    private initThree;
    private initDom;
    private initScene;
    private initRenderer;
    protected initCSS2DRenderer(): void;
    /**
     * @internal
     */
    private initCamera;
    /**
     * @internal
     */
    protected initControls(): void;
    private onResize;
    protected onControlsChange(viewer: DxfViewer): () => void;
    /**
     * Initialize mouse/pointer events
     */
    private initEvents;
    protected initOthers(): void;
    private initAxes;
    private initStats;
    /**
     * Shows the stats panel, which indicates current FPS, MS, MB, etc.
     * @internal
     */
    showStats(): void;
    /**
     * Shows the stats panel, which indicates current FPS, MS, MB, etc.
     * @internal
     */
    hideStats(): void;
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
     * Gets current FPS value
     * @internal
     */
    getFps(): number;
    /**
     * @internal
     */
    is3d(): boolean;
    /**
     * @description {en} Destroys DxfViewer.
     * @description {zh} 销毁 DxfViewer。
     * @example
     * ```typescript
     * viewer.destroy();
     * ```
     */
    destroy(): void;
    /**
     * Used to indicate how many dxf is loading
     */
    private loadingDxfCount;
    /**
     * @description {en} Loads a dxf file.
     * The first loaded file will be taken as a "master" model.
     * Any other files are non-master, we call "overlay" model.
     * We'll load everything of a master model, including model and paper space.
     * For an overlay model, we'll only load its model space. And its model space can only
     * overly to master model's model space.
     * @description {zh} 加载 dxf 文件。
     * 第一个加载的文件将被视为“主”模型。
     * 任何其他文件都是非主文件，我们称之为“叠加”模型。
     * 我们将加载主模型的所有内容，包括模型和图纸空间。
     * 对于叠加模型，我们只会加载其模型空间。并且它的模型空间只能叠加到主模型的模型空间上。
     * @param modelCfg
     * - {en} The configuration of the model to be loaded.
     * - {zh} 要加载的模型的配置。
     * @param onProgress
     * - {en} A callback function to indicate the loading progress.
     * - {zh} 用于指示加载进度的回调函数。
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
     * @internal
     */
    isCompareMode(): boolean;
    /**
     * Compares two dxf files. Note that:
     * - It only compares model spaces.
     * - It shouldn't load anything else before and after compare.
     * @param model1 The first dxf to be compared
     * @param model2 The second dxf to be compared
     * @param {DxfCompareConfig} compareConfig The compare config
     * @param onProgress loading progress
     * @internal
     */
    compare(model1: DxfModelConfig, model2: DxfModelConfig, compareConfig?: DxfCompareConfig, onProgress?: (event: ProgressEvent) => void): Promise<void>;
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
     * @description {en} Gets layout names of the master model.
     * @description {zh} 获取主模型的布局名称。
     * @returns
     * - {en} Layout names of the master model.
     * - {zh} 主模型的布局名称。
     * @example
     * ```typescript
     * const layoutNames = dxfViewer.getLayoutNames();
     * console.log(layoutNames); // ['Model', 'Layout1', 'Layout2']
     * ```
     */
    getLayoutNames(): string[];
    /**
     * Gets layouts.
     * Only returns master model's layouts.
     */
    protected getLayouts(): ILayoutObject[];
    private handleOverlayDxf;
    /**
     * @description {en} Activates a layout.
     * @description {zh} 激活布局。
     * @param layoutName
     * - {en} The name of the layout to be activated.
     * - {zh} 要激活的布局名称。
     * @example
     * ```typescript
     * viewer.activateLayout('Layout1');
     * ```
     */
    activateLayout(layoutName: string): void;
    private cancelAllOperations;
    /**
     * @description {en} Gets active layout.
     * @description {zh} 获取当前布局。
     * @returns
     * - {en} Active layout name or undefined.
     * - {zh} 当前激活的布局名称或undefined。
     * @example
     * ``` typescript
     * const activeLayout = viewer.getActiveLayoutName();
     * console.log(activeLayout);
     * ```
     */
    getActiveLayoutName(): string | undefined;
    /**
     * @description {en} Gets dxf layers.
     * @description {zh} 获取dxf图层。
     * @returns
     * - {en} Dxf layers.
     * - {zh} dxf图层。
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
     * @internal
     */
    setModelVisibility(modelId: string, visible: boolean): void;
    /**
     * @description {en} Sets layer's visibility.
     * @description {zh} 设置图层的可见性。
     * @param layerName
     * - {en} Layer's name to show or hide.
     * - {zh} 要显示或隐藏的图层名称。
     * @param visible
     * - {en} Layer's target visibility.
     * - {zh} 图层的目标可见性。
     * @param modelId
     * - {en} Useful when more than one model is loaded, if not specified, will use the master model.
     * - {zh} 当加载了多个模型时有用，如果未指定，将使用主模型。
     * @throws Error
     * - {en}: Throws exception if given modelId doesn't exist.
     * - {zh} 如果给定的modelId不存在，则抛出异常。
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
     * Resets a layer's color.
     * @internal
     */
    resetLayerColor(layerName: string, modelId?: string): void;
    /**
     * @description {en} Sets font.
     * This needs to be called before loading a dxf, it won't affect any loaded text.
     * It accepts shx or typeface formats. For typeface, it only support passing in 1 font file in the array for now.
     * @description {zh} 设置字体。
     * 需要在加载dxf之前调用，不会影响已加载的文字。
     * 支持shx或typeface格式。对于typeface，目前只支持传入1个字体文件。
     * @param urls
     * - {en} font file urls.
     * - {zh} 字体文件链接。
     * @example
     * ```typescript
     * viewer.setFont(["https://example.com/xxx.shx"]);
     * ```
     */
    setFont(urls: string[]): Promise<void>;
    /**
     * Sets loading manager.
     * @internal
     * This needs to be called before loading a dxf, used to load local external links.
     * @param manager
     */
    setLoadingManager(manager: THREE.LoadingManager): void;
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
     * @description {en} Gets current view extent.
     * This is useful for user to save this value as a viewpoint, and jump to this viewpoint next time.
     * @description {zh} 获取当前视图范围。
     * 用户可使用该接口获取当前视口范围，并在适当的场景下跳转到该视口范围。
     * @example
     * ``` typescript
     * const box = viewer.getCurrentViewExtent();
     * console.log("Current view extent:", box);
     * ```
     */
    getCurrentViewExtent(): Box2;
    /**
     * @description {en} Gets screenshot of a rectangular area, or by box selecting an area. Returns an image in format of base64 string.
     * @description {zh} 获取矩形区域或者框选区域的截图。返回base64格式的图片。
     * @param mode
     * - {en} screenshot mode("Default", "BoxSelection" and "PickMarkup").
     * - {zh} 截图模式("全屏"， "框选" 和 "选中批注")。
     * @example
     * ``` typescript
     * // {en} Click on markup to take screenshot.
     * // {zh} 点击批注截屏。
     * const mode = ScreenshotMode.PickMarkup;
     * viewer.getScreenshot(mode).then(data => console.log(data));
     * // {en} Take screenshot by box selecting an area.
     * // {zh} 根据用户的框选截屏。
     * const mode = ScreenshotMode.BoxSelection;
     * viewer.getScreenshot(mode).then(data => console.log(data));
     * // {en} Take screenshot of the whole view.
     * // {zh} 全屏截屏。
     * const mode = ScreenshotMode.Default;
     * viewer.getScreenshot(mode).then(data => console.log(data));
     * ```
     */
    getScreenshot(mode?: ScreenshotMode): Promise<undefined | ScreenshotResult>;
    /**
     * @internal
     */
    getMeasurementManager(): MeasurementManager | undefined;
    /**
     * @description {en} Activates one of "Distance", "Area" or "Angle" measurement
     * @description {zh} 激活"距离", "面积" 或者 "角度"测量
     * @param type
     * - "Distance", "Area" or "Angle"
     * @example
     * ``` typescript
     * viewer.activateMeasurement(MeasurementType.Distance);
     * ```
     */
    activateMeasurement(type: MeasurementType): void;
    /**
     * @description {en} Deactivates measurement.
     * @description {zh} 退出测量。
     * @example
     * ``` typescript
     * viewer.deactivateMeasurement();
     * ```
     */
    deactivateMeasurement(): void;
    /**
     * @description {en} Gets active measurement type.
     * @description {zh} 获取当前激活的测量类型。
     * @returns
     * - "Distance", "Area" or "Angle" or undefined
     * @example
     * ``` typescript
     * const measurementType = viewer.getActiveMeasurementType();
     * console.log(measurementType);
     * ```
     */
    getActiveMeasurementType(): MeasurementType | undefined;
    /**
     * @description {en} Gets all measurements.
     * @description {zh} 获取所有测量数据。
     * @returns
     * - {en} measurement data array.
     * - {zh} 测量数据数组。
     * @example
     * ``` typescript
     * const measurementData = viewer.getMeasurements();
     * console.log(measurementData);
     * ```
     */
    getMeasurements(): MeasurementData[];
    /**
     * @description {en} Cancels drawing measurement.
     * @description {zh} 取消测量绘制。
     */
    cancelMeasurement(): void;
    /**
     * @description {en} Sets measurement data.
     * @description {zh} 设置测量数据。
     * @param measurementData
     * - {en} measurement data array.
     * - {zh} 测量数据数组。
     * @example
     * ``` typescript
     * const measurementData = [{
     *     type: "Distance",
     *     id: "c6ea70a3-ddb0-4dd0-87c8-bd2491936428",
     *     points: [[0, 1000], [5000, 1000]],
     * }];
     * viewer.setMeasurements(measurementData);
     * ```
     */
    setMeasurements(measurementData: MeasurementData[]): void;
    /**
     * Selects a measurement by id
     * @internal
     */
    selectMeasurement(id: string): void;
    /**
     * Unselects a measurement.
     * @internal
     */
    unselectMeasurement(): void;
    /**
     * @description {en} Removes a measurement by id.
     * @description {zh} 根据id删除测量数据。
     * @param id
     * - {en} Measurement data id.
     * - {zh} 测量数据id。
     * @example
     * ``` typescript
     * const id = "c6ea70a3-ddb0-4dd0-87c8-bd2491936428";
     * viewer.removeMeasurement(id);
     * ```
     */
    removeMeasurement(id: string): void;
    /**
     * Sets a measurement's visibility.
     * Note that, the markup should belong to active layout. You shouldn't update a markup of an inactive layout.
     * @internal
     */
    setMeasurementVisibility(id: string, visible: boolean): boolean;
    /**
     * @description {en} Clears measurement results.
     * @description {zh} 清除测量结果。
     * @example
     * ``` typescript
     * viewer.clearMeasurements();
     * ```
     */
    clearMeasurements(): void;
    /** markup start **/
    /**
     * @internal
     */
    getMarkupManager(): MarkupManager | undefined;
    /**
     * @description {en} Activates markup feature.
     * @description {zh} 激活标注功能。
     * @param type
     * - {en} markup type.
     * - {zh} 标注类型。
     * @example
     * ``` typescript
     * const markupType = MarkupType.Arrow;
     * viewer.activateMarkup(markupType);
     * ```
     */
    activateMarkup(type: MarkupType): void;
    /**
     * @description {en} Deactivates markup feature.
     * @description {zh} 退出标注功能。
     * @example
     * ``` typescript
     * viewer.deactivateMarkup();
     * ```
     */
    deactivateMarkup(): void;
    /**
     * @description {en} Gets active markup type.
     * @description {zh} 获取激活的标注类型。
     * @returns
     * - {en} markup type.
     * - {zh} 标注类型。
     * @example
     * ``` typescript
     * const markupType = viewer.getActiveMarkupType();
     * console.log(markupType);
     * ```
     */
    getActiveMarkupType(): MarkupType | undefined;
    /**
     * Set markup stroke color
     * @internal
     */
    setMarkupLineColor(color: string): void;
    /**
     * @internal
     */
    getMarkupLineColor(): string | undefined;
    /**
     * Set markup fill color
     * @internal
     */
    setMarkupFillColor(color: string): void;
    /**
     * @internal
     */
    getMarkupFillColor(): string | undefined;
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
     * @description {en} Gets all markups.
     * @description {zh} 获取所有标注数据。
     * @returns
     * - {en} markup data array.
     * - {zh} 标注数据数组。
     * @example
     * ``` typescript
     * const markupData = viewer.getMarkups();
     * console.log(markupData);
     * ```
     */
    getMarkups(): MarkupData[];
    /**
     * @description {en} Adds markups to active layout.
     * @description {zh} 添加标注到当前布局。
     * @param markupDataArray
     * - {en} markup data array.
     * - {zh} 标注数据数组。
     * @example
     * ``` typescript
     * const markupData = [{
     *     type: "ArrowMarkup",
     *     id: "c6ea70a3-ddb0-4dd0-87c8-bd2491936428",
     *     lineWidth: 2,
     *     strokeStyle: "#ff0000",
     *     fillStyle: "#ff000030",
     *     points: [[0, 0], [1000, 1000]],
     * }];
     * viewer.setMarkups(markupData);
     * ```
     */
    setMarkups(markupDataArray: MarkupData[]): void;
    /**
     * Sets a markup's visibility by id.
     * Note that, the markup should belong to active layout. You shouldn't update a markup of an inactive layout.
     * @internal
     */
    setMarkupVisibility(id: string, visible: boolean): boolean;
    /**
     * @description {en} Updates a markup.
     * @description {zh} 更新标注。
     * @param {MarkupData} markup
     * - {en} markup data.
     * - {zh} 标注数据。
     * @returns
     * - {en} Whether update successfully, true means success, false means failure.
     * - {zh} 是否更新成功，true表示成功，false表示失败。
     * @example
     * ``` typescript
     * const markupData = {
     *    type: "ArrowMarkup",
     *    id: "c6ea70a3-ddb0-4dd0-87c8-bd2491936428",
     *    lineWidth: 3,
     *    strokeStyle: "#ff0000",
     *    fillStyle: "#ff000030",
     *    points: [[0, 0], [1000, 1000]],
     * };
     * viewer.updateMarkup(markupData);
     */
    updateMarkup(markup: MarkupData): boolean;
    /**
     * @description {en} Removes a markup by markup id.
     * @description {zh} 根据标注id删除标注。
     * @param {string} id
     * - {en} markup id.
     * - {zh} 标注id。
     * @returns
     * - {en} Whether remove successfully, true means success, false means failure.
     * - {zh} 是否删除成功，true表示成功，false表示失败。
     * @example
     * ``` typescript
     * const markupId = "c6ea70a3-ddb0-4dd0-87c8-bd2491936428";
     * viewer.removeMarkup(markupId);
     * ```
     */
    removeMarkup(id: string): boolean;
    /**
     * @description {en} Clears markups.
     * @description {zh} 清除所有标注。
     * @example
     * ``` typescript
     * viewer.clearMarkups();
     * ```
     */
    clearMarkups(): void;
    /** markup end **/
    /**
     * @description {en} Adds a hotpoint.
     * Caller should set a hotpointId that is unique in the session of current DxfViewer.
     * @description {zh} 添加热点。
     * 调用者应该设置一个在当前DxfViewer会话中唯一的热点id。
     * @param hotpoint
     * - {en} hotpoint data.
     * - {zh} 热点数据。
     * @example
     * ``` typescript
     * const hotpoint = {
     *    hotpointId: "c6ea70a3-ddb0-4dd0-87c8-bd2491936428",
     *    anchorPosition: [0, 0, 0],
     *    html: "<div>hotpoint</div>",
     *    visible: true,
     * };
     * viewer.addHotpoint(hotpoint);
     * ```
     */
    addHotpoint(hotpoint: Hotpoint): void;
    /**
     * @description {en} Removes a hotpoint by given hotpointId.
     * @description {zh} 根据热点id删除热点。
     * @param {string} hotpointId
     * - {en} hotpoint id.
     * - {zh} 热点id。
     * @example
     * ``` typescript
     * const hotpointId = "c6ea70a3-ddb0-4dd0-87c8-bd2491936428";
     * viewer.removeHotpoint(hotpointId);
     * ```
     */
    removeHotpoint(hotpointId: string): void;
    /**
     * @description {en} Clears all hotpoints.
     * @description {zh} 清除所有热点。
     * @example
     * ``` typescript
     * viewer.clearHotpoints();
     * ```
     */
    clearHotpoints(): void;
    /**
     * Checks if hotpoint with specific id already exist
     * Caller should set a hotpointId that is unique in the session of current DxfViewer.
     * @internal
     */
    hasHotpoint(hotpointId: string): boolean;
    /**
     * Gets mouse hit result in world coordinate
     * @example
     * ``` typescript
     * document.addEventListener("click", (event) => {
     *     const result = viewer.getHitResult(event);
     *     const loc = result?.location;
     *     if (loc) {
     *         console.log(`Clicked at x: ${loc[0]}, y: ${loc[1]}`);
     *     }
     * });
     * ```
     * @internal
     */
    getHitResult(event: MouseEvent | PointerEvent | EventInfo): Vector2 | undefined;
    /**
     * Gets hit result by Normalized Device Coordinates.
     * Lower left coordinate: (-1, -1)
     * Upper right coordinate: (1, 1)
     */
    protected getHitResultByNdcCoordinate(coord: Vector2): Vector2 | undefined;
    /**
     * @description {en} Asks user to select a box area, and zooms to it.
     * @description {zh} 询问用户选择一个框选区域，然后缩放到该区域。
     * @example
     * ``` typescript
     * viewer.zoomToRect();
     * ```
     */
    zoomToRect(): void;
    /**
     * @internal
     */
    deactivateZoomRect(): void;
    /**
     * draw compare markups
     */
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
    private getFilteredViewports;
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
     * @internal
     */
    addLoadedModelToScene(object: THREE.Object3D, modelCfg: ModelConfig, dxfData: DxfData): Promise<void>;
    /**
     * @description {en} resize viewer
     * @description {zh} 重置视图大小
     * @param {number} width
     * - {en} width of viewer
     * - {zh} 视图宽度。
     * @param {number} height
     * - {en} height of viewer
     * - {zh} 视图高度。
     * @example
     * ```typescript
     * const width = 800;
     * const height = 600;
     * viewer.resize(width, height);
     * ```
     */
    resize(width: number, height: number): void;
    /**
     * @internal
     */
    getRaycaster(): THREE.Raycaster | undefined;
    /**
     * TODO: Remove it later.
     * Gets raycast-able objects.
     * Raycast-able objects should be visible objects and is snap object in scene.
     */
    private getRaycastableObjects;
    /**
     * Gets the corresponding viewport by judging that the point is in the viewport
     */
    private getViewportByPoint;
    /**
     * Gets raycast-able objects by mouseEvent.
     * @internal
     */
    getRaycastableObjectsByMouse(event?: EventInfo): THREE.Object3D<THREE.Event>[];
    /**
     * Gets intersections by given mouse location.
     * If no MouseEvent is passed in, use (0, 0) as the raycaster's origin.
     */
    private getIntersections;
    /**
     * Handles mouse click event
     */
    private handleMouseClick;
    private selectDrawableByEvent;
    /**
     * Select or unselect an object.
     * depthTest is turned off by default. The highlighting is more pronounced when objects cover each other.
     */
    protected selectObject(object?: THREE.Object3D, depthTest?: boolean): void;
    /**
     * Clears the current selection
     * @internal
     */
    clearSelection(): void;
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
     * @internal
     */
    flyTo(position: THREE.Vector3, lookAt: THREE.Vector3, targetCameraZoom?: number, animate?: boolean): void;
    /**
     * Moves camera to target position
     * @param position 2d position
     * @internal
     */
    goTo(position: Vector2, targetCameraZoom?: number, animate?: boolean): void;
    /**
     * @description {en} Moves camera to home view.
     * @description {zh} 移动相机到主视图.
     * @example
     * ``` typescript
     * viewer.goToHomeView();
     * ```
     */
    goToHomeView(): void;
    /**
     * @description {en} Zooms to specific bounding box.
     * @description {zh} 缩放到指定的包围盒.
     * @param bbox
     * - {en} 2d bounding box
     * - {zh} 2d 包围盒。
     * @example
     * ``` typescript
     * const box = { min: { x: 0, y: 0 }, max: { x: 10000, y: 10000} };
     * viewer.zoomToBBox(box);
     * ```
     */
    zoomToBBox(bbox: Box2): void;
    /**
     * @description {en} Zooms to view extent.
     * @description {zh} 缩放到视图范围.
     * @example
     * ``` typescript
     * viewer.zoomToExtent();
     * ```
     */
    zoomToExtent(): void;
    /**
     * @description {en} Zooms to a compare change.
     * @description {zh} 聚焦到图纸的一处变动。
     * @param changeId
     * - {en} Change id, which is an incremental integer starts from 1.
     * - {zh} 变动id，该id是从数字1开始自增的整数。
     * @example
     * ``` typescript
     * const changeId = 1;
     * viewer.zoomToCompareChange(changeId);
     * ```
     * @internal
     */
    zoomToCompareChange(changeId: number): void;
    /**
     * @description {en} Gets compare changes.
     * @description {zh} 获取对比变动.
     * @returns
     * - {en} Compare changes.
     * - {zh} 对比变动列表。
     * @example
     * ``` typescript
     * const changes = viewer.getCompareChanges();
     * console.log(changes);
     * ```
     * @internal
     */
    getCompareChanges(): Record<number, DxfChange> | undefined;
    /**
     * @description {en} Sets background color.
     * @description {zh} 设置背景颜色.
     * @param r
     * - {en} value between 0-1.
     * - {zh} 0-1之间的值。
     * @param g
     * - {en} value between 0-1.
     * - {zh} 0-1之间的值。
     * @param b
     * - {en} value between 0-1.
     * -{zh} 0-1之间的值。
     * @example
     * ``` typescript
     * // {en} Sets background to gray
     * // {zh} 设置背景为灰色
     * viewer.setBackgroundColor(0.5, 0.5, 0.5);
     * ```
     */
    setBackgroundColor(r: number, g: number, b: number): void;
    /**
     * Gets LayoutInfo by layoutName. It creats LayoutInfo if doesn't exist.
     */
    private getLayoutInfo;
    /**
     * Creates a ground plane which is much bigger than bbox.
     */
    private updateGroundPlane;
    /**
     * Compute bounding box of loaded models for active layout
     * @internal
     */
    computeBoundingBox(): THREE.Box3;
    /**
     * Checks if an expected zoom value is valid, and adjust its value if necessary.
     */
    private checkAndGetLimitedCameraZoom;
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
     * Updates camera zoom value for shader materials, which are created in DxfLoader
     */
    private updateCameraZoomUniform;
}