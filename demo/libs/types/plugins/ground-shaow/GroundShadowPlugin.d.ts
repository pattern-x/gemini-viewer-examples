import * as THREE from "three";
import { BaseViewer, Plugin, PluginConfig } from "../../core";
/**
 * Ground shadow config.
 */
export interface GroundShadowPluginConfig extends Partial<PluginConfig> {
    blur: number;
    darkness: number;
}
/**
 * Ground shadow plugin is used to show shadow for models.
 * Can be used by BimViewer.
 * @description
 */
export declare class GroundShadowPlugin extends Plugin {
    static DEFAULT_ID: string;
    protected cfg: GroundShadowPluginConfig;
    protected shadowGroup?: THREE.Group;
    protected blurPlane?: THREE.Mesh;
    protected depthMaterial?: THREE.MeshDepthMaterial;
    protected horizontalBlurMaterial?: THREE.ShaderMaterial;
    protected verticalBlurMaterial?: THREE.ShaderMaterial;
    protected shadowCamera?: THREE.OrthographicCamera;
    protected renderTarget?: THREE.WebGLRenderTarget;
    protected renderTargetBlur?: THREE.WebGLRenderTarget;
    private shouldRender;
    private timeout?;
    constructor(viewer: BaseViewer, cfg?: GroundShadowPluginConfig);
    protected get scene(): any;
    protected get renderer(): any;
    /**
     * Updates ground shadow.
     */
    update(): void;
    protected onModelLoaded: () => void;
    protected onShadowRender: () => void;
    private initMaterial;
    private initRenderTarget;
    private updateGroundShadow;
    private blurShadow;
    protected render(): void;
    destroy(): void;
}
