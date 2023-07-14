import * as THREE from "three";
import { BaseViewer, Plugin } from "../../core";
interface GroundShadowConfig {
    blur: number;
    darkness: number;
}
/**
 * Copied from https://threejs.org/examples/?q=shadow#webgl_shadow_contact
 * @description Ground shadow for models.
 */
export declare class GroundShadowPlugin extends Plugin {
    protected config: GroundShadowConfig;
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
    get scene(): THREE.Scene | undefined;
    get renderer(): THREE.WebGLRenderer | undefined;
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
    render(): void;
    destroy(): void;
}
export {};
