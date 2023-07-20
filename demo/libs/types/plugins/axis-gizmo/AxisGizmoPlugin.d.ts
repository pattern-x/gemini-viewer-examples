import * as THREE from "three";
import { BaseViewer, Plugin, PluginConfig } from "../../core";
/**
 * AxisGizmo plugin config.
 */
export interface AxisGizmoPluginConfig extends PluginConfig {
    /**
     * UI element id to contain the plugin.
     */
    containerId: string;
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
    init(): void;
    initRenderer(): void;
    initScene(): void;
    /**
     * Sets hostCamera in case it is changed.
     * It is possible for a viewer to switch camera between a OrthographicCamera and a PerspectiveCamera.
     */
    setHostCamera(hostCamera: THREE.Camera): void;
    render(): void;
    animate(): void;
    update(): void;
    /**
     * Update axes according to camera direction.
     * Camera's direction is the only input factor for this class. It always look at the origin.
     * @param direction
     */
    updateCameraDirection(direction: THREE.Vector3, up: THREE.Vector3): void;
    destroy(): void;
}
