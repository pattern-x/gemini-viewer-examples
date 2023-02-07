import { Scene, Vector3, WebGLRenderer } from "three";
import { OrbitControls } from "../controls/OrbitControls";
import type { BaseViewer } from "../viewers/BaseViewer";
export declare enum AxisType {
    X = "x",
    Y = "y",
    Z = "z"
}
export declare class AxisPlaneSection {
    private readonly container?;
    protected viewer: BaseViewer;
    protected camera: THREE.Camera;
    protected controls: OrbitControls;
    protected scene: Scene;
    protected renderer: WebGLRenderer;
    protected objectIds: number[];
    private sectionPlane?;
    isShowSectionPlane: boolean;
    private popPanel?;
    protected axisInfoMap: {
        [key in AxisType]: {
            normal: Vector3;
        };
    };
    constructor(viewer: BaseViewer, objectIds: number[], container?: HTMLElement | undefined);
    getRotateParam(axisType: AxisType): (number | Vector3)[];
    initPlane(axisType: AxisType): void;
    open(): void;
    close(): void;
    enableSection(): void;
    cancelSection(): void;
    showSectionPlane(): void;
    hideSectionPlane(): void;
}
