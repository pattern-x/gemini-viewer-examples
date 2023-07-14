import * as THREE from "three";
import { BaseMeasureDrawable } from "./BaseMeasureDrawable";
import { MeasurementData, MeasurementType } from "./BaseMeasurement";
import type { BaseViewer } from "../../core/viewers";
import { Plugin } from "../../core/viewers/Plugin";
export declare class MeasurementPlugin extends Plugin {
    selectedDrawable: BaseMeasureDrawable | undefined;
    private overlayRender?;
    private drawableList;
    private drawableHelperList;
    private inputManager;
    private osnapHelper;
    private measurements;
    private activeMeasurementType;
    private mobileTouchHelper?;
    constructor(viewer: BaseViewer);
    private initEvents;
    get canvas(): HTMLCanvasElement;
    get raycaster(): THREE.Raycaster | undefined;
    add(drawable: BaseMeasureDrawable, needFireEvent?: boolean): void;
    create(data: MeasurementData): BaseMeasureDrawable;
    remove(drawable: BaseMeasureDrawable, needFireEvent?: boolean): void;
    private updateSnapTolerance;
    /**
     *
     * @param {MeasurementType} type
     * @description {en} Activates one of "Distance", "Area" or "Angle" measurement
     * @description {zh} 激活"距离", "面积" 或者 "角度"测量
     */
    activate(type: MeasurementType): void;
    /**
     * @description {en} Deactivates measurement.
     * @description {zh} 退出测量。
     */
    deactivate(): void;
    getActiveMeasurementType(): MeasurementType | undefined;
    /**
     *
     * @returns {boolean}
     * @description Is measure plugin actived
     */
    isActive(): boolean;
    /**
     *
     * @returns {boolean} Is measuring now
     */
    isMeasuring(): boolean;
    /**
     *
     * @returns {MeasurementData[]}
     * @description {en} Gets all measurements.
     * @description {zh} 获取所有测量数据。
     */
    getData(): MeasurementData[];
    /**
     * @description {en} Cancels current measurement. This won't deactivate measurement, rather, you can start a new measurement.
     * @description {zh} 取消当前的测量绘制。这并不会退出测量，用户可以开始一个新的测量。
     */
    cancel(): void;
    /**
     *
     * @param {MeasurementData[]} dataArray
     * @description {en} Sets measurement data.
     * @description {zh} 设置测量数据。
     */
    setData(dataArray: MeasurementData[]): void;
    /**
     * Sets a measurement drawable's visibility by id.
     * @param id
     * @param visible
     * @returns
     * @description Sets a measurement's visibility.
     */
    setVisibilityById(id: string, visible: boolean): boolean;
    /**
     * Sets all measurement drawables' visibilities.
     */
    setVisibilities(visible: boolean): void;
    /**
     * @description {en} Clears measurement results.
     * @description {zh} 清除测量结果。
     */
    clear(): void;
    /**
     * Gets a measurement drawable by id.
     */
    getById(id: string): BaseMeasureDrawable;
    removeById(id: string): void;
    /**
     * Selects a measurement drawable by id.
     * @param {string} id
     * @description Selects a measurement by id
     */
    selectById(id: string): void;
    /**
     * Selects a measurement drawable.
     */
    select(drawable: BaseMeasureDrawable): void;
    /**
     *
     * @param renderEnabled If need render measurement
     * @description Unselects a measurement.
     */
    unselect(renderEnabled?: boolean): void;
    /**
     * @description Destroy measure plugin
     */
    destroy(): void;
    private keydown;
    private render;
}
