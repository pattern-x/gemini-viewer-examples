import { Plugin, type BaseViewer, PluginConfig } from "../../core/viewers";
export interface ViewCubePluginConfig extends Partial<PluginConfig> {
    containerId?: string;
    context?: WebGLRenderingContext | WebGL2RenderingContext;
    showAxes?: boolean;
    lineColor?: number;
}
export declare class ViewCubePlugin extends Plugin {
    static DEFAULT_ID: string;
    /**
     * @internal
     */
    private container?;
    private scene?;
    private camera?;
    private cfg;
    private renderer?;
    private directionalLight?;
    private width;
    private height;
    private requestAnimationFrameHandle?;
    private raycaster;
    private renderEnabled;
    private inputManager?;
    private viewCube?;
    private lastCoords?;
    constructor(viewer: BaseViewer, cfg?: ViewCubePluginConfig);
    private init;
    private initDom;
    private initInputManager;
    private initScene;
    private initCamera;
    private initRenderer;
    private initLights;
    private initViewCube;
    private initEvents;
    private onPointerDown;
    private onPointerMove;
    private onPointerleave;
    private onClick;
    private updateViewerCamera;
    private updateActivateMeshName;
    private getNdcPointByEvent;
    private getIntersects;
    private updateCameraAndMeshName;
    /**
     * Update viewCube according to camera direction.
     * Camera's direction is the only input factor for this class. It always look at the origin.
     * @param direction
     */
    private updateCameraDirection;
    private animate;
    private zoomToBBox;
    destroy(): void;
}
