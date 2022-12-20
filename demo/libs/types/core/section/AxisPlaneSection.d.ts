import { BimViewer } from "../viewers/BimViewer";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OrthographicCamera, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three";
export declare enum AxisType {
    X = "x",
    Y = "y",
    Z = "z"
}
export declare class AxisPlaneSection {
    private readonly container?;
    protected bimViewer: BimViewer;
    protected camera: PerspectiveCamera | OrthographicCamera;
    protected controls: OrbitControls;
    protected scene: Scene;
    protected renderer: WebGLRenderer;
    protected objectUuids: string[];
    private sectionPlane?;
    isShowSectionPlane: boolean;
    private popPanel?;
    protected axisInfoMap: {
        [key in AxisType]: {
            normal: Vector3;
        };
    };
    constructor(bimViewer: BimViewer, objectUuids: string[], container?: HTMLElement | undefined);
    getRotateParam(axisType: AxisType): (number | Vector3)[];
    initPlane(axisType: AxisType): void;
    open(): void;
    close(): void;
    enableSection(): void;
    cancelSection(): void;
    showSectionPlane(): void;
    hideSectionPlane(): void;
}
