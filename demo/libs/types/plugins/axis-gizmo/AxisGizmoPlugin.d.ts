import { BaseViewer, Plugin, PluginConfig } from "../../core";
/**
 * AxisGizmo plugin config.
 */
export interface AxisGizmoPluginConfig extends Partial<PluginConfig> {
    /**
     * UI element id to contain the plugin.
     */
    containerId?: string;
    /**
     * Ignores z-axis. It is useful for DxfViewer.
     */
    ignoreZAxis: boolean;
}
/**
 * This renderer monitors the host renderer's camera, and keeps a coordinate axes
 * the same direction as host renderer's
 */
export declare class AxisGizmoPlugin extends Plugin {
    static DEFAULT_ID: string;
    private cfg;
    private hostCamera?;
    private container?;
    private coordinateAxes?;
    private ignoreZAxis;
    private camera?;
    private scene?;
    private renderer?;
    private css2dRenderer?;
    constructor(viewer: BaseViewer, cfg: AxisGizmoPluginConfig);
    private init;
    private initRenderer;
    private initScene;
    /**
     * Sets hostCamera in case it is changed.
     * It is possible for a viewer to switch camera between a OrthographicCamera and a PerspectiveCamera.
     */
    private setHostCamera;
    private render;
    private animate;
    private update;
    /**
     * Update axes according to camera direction.
     * Camera's direction is the only input factor for this class. It always look at the origin.
     * @param direction
     */
    private updateCameraDirection;
    destroy(): void;
}
