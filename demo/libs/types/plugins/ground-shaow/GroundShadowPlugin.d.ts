import * as THREE from "three";
import { BaseViewer, Plugin } from "../../core";
/**
 * Ground shadow config.
 */
export interface GroundShadowConfig {
    blur: number;
    darkness: number;
}
/**
 * Ground shadow plugin is used to show shadow for models.
 * Can be used by BimViewer.
 * @description
 */
export declare class GroundShadowPlugin extends Plugin {
    protected cfg: GroundShadowConfig;
    protected shadowGroup?: THREE.Group;
    protected blurPlane?: THREE.Mesh;
    protected depthMaterial?: THREE.MeshDepthMaterial;
    protected horizontalBlurMaterial?: THREE.ShaderMaterial;
    protected verticalBlurMaterial?: THREE.ShaderMaterial;
    protected shadowCamera?: THREE.OrthographicCamera;
    protected renderTarget?: THREE.WebGLRenderTarget;
    protected renderTargetBlur?: THREE.WebGLRenderTarget;
    private modelCount;
    constructor(viewer: BaseViewer, cfg?: GroundShadowConfig);
    protected get scene(): THREE.Scene | undefined;
    protected get renderer(): THREE.WebGLRenderer | undefined;
    /**
     * We'll need to update shadow when
     * - Model loaded/unloaded
     * - Any object's visibility, position, etc. changed
     */
    protected shouldUpdateShadow(): boolean;
    protected onModelLoaded: ({ modelId, bbox }: {
        modelId: string;
        bbox: THREE.Box3;
    }) => void;
    protected onShadowRender: () => void;
    private initMaterial;
    private initRenderTarget;
    private createGroundShadowByBBox;
    private blurShadow;
    protected render(): void;
    destroy(): void;
}
