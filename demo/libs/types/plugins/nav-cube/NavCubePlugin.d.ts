import { OrthographicCamera, Scene, Vector3 } from "three";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { NavCube } from "./NavCube";
import { Plugin, type BaseViewer, PluginConfig } from "../../core/viewers";
/**
 * ViewCube plugin config.
 */
export interface NavCubePluginConfig extends PluginConfig {
    containerId: string;
}
/**
 * This renderer monitors the host renderer's camera, and keeps a NavCube
 * the same direction as host renderer's
 */
export declare class NavCubePlugin extends Plugin {
    protected cfg: NavCubePluginConfig;
    protected renderer?: CSS3DRenderer;
    protected navCube?: NavCube;
    protected camera?: OrthographicCamera;
    protected scene?: Scene;
    constructor(viewer: BaseViewer, cfg?: NavCubePluginConfig);
    init(): void;
    initRenderer(): void;
    initScene(): void;
    render(): void;
    animate(): void;
    update(): void;
    /**
     * Update navCube according to camera direction.
     * Camera's direction is the only input factor for this class. It always look at the origin.
     * @param direction
     */
    updateCameraDirection(direction: Vector3, up: Vector3): void;
    destroy(): void;
}
