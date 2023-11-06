import { OrthographicCamera, Scene, Vector3 } from "three";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { NavCube } from "./NavCube";
import { type BaseViewer, Plugin, PluginConfig } from "../../core/viewers";
/**
 * ViewCube plugin config.
 */
export interface NavCubePluginConfig extends Partial<PluginConfig> {
    containerId: string;
}
/**
 * This renderer monitors the host renderer's camera, and keeps a NavCube
 * the same direction as host renderer's
 */
export declare class NavCubePlugin extends Plugin {
    static DEFAULT_ID: string;
    protected cfg: NavCubePluginConfig;
    protected renderer?: CSS3DRenderer;
    protected navCube?: NavCube;
    protected camera?: OrthographicCamera;
    protected scene?: Scene;
    constructor(viewer: BaseViewer, cfg?: NavCubePluginConfig);
    protected init(): void;
    protected initRenderer(): void;
    protected initScene(): void;
    protected render(): void;
    protected animate(): void;
    protected update(): void;
    /**
     * Update navCube according to camera direction.
     * Camera's direction is the only input factor for this class. It always look at the origin.
     * @param direction
     */
    protected updateCameraDirection(direction: Vector3, up: Vector3): void;
    destroy(): void;
}
