import * as THREE from "three";
export interface ViewCubePluginConfig {
    containerId: string;
    context?: WebGLRenderingContext | WebGL2RenderingContext;
}
export declare class ViewCubePlugin {
    private cfg;
    /**
     * @internal
     */
    container?: HTMLElement;
    /**
     * @internal
     */
    scene?: THREE.Scene;
    private renderer?;
    /**
     * @internal
     */
    camera?: THREE.OrthographicCamera;
    private directionalLight?;
    private width;
    private height;
    private requestAnimationFrameHandle?;
    private raycaster;
    update?: () => void;
    constructor(cfg: ViewCubePluginConfig);
    private init;
    private initDom;
    private initScene;
    private initCamera;
    private initRenderer;
    private initLights;
    getNdcPointByPointerEvent(event: PointerEvent): THREE.Vector2 | undefined;
    getIntersects(coords: THREE.Vector2): THREE.Intersection<THREE.Object3D<THREE.Event>>[] | undefined;
    zoomToBbox(bbox: THREE.Box3): void;
    private animate;
    destroy(): void;
}
