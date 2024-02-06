import * as THREE from "three";
import { Model } from "../../core/model";
import type { BaseViewer } from "../../core/viewers/BaseViewer";
export declare class SceneManager {
    private viewer;
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    private pmremGenerator?;
    private lights?;
    private modelGroup;
    constructor(viewer: BaseViewer);
    private initLights;
    private initPMREMGenerator;
    get maxFragmentUniforms(): number;
    addModel(model: Model): void;
    enableShadow(enable: boolean): void;
    enableClipping(enable: boolean): void;
    enableLights(enable: boolean): void;
    debugLights(enable: boolean): void;
    setBackground(background: THREE.Color | THREE.CubeTexture | THREE.Texture | null): void;
    get directionalLight(): THREE.DirectionalLight;
    get ambientLight(): THREE.Object3D<THREE.Object3DEventMap> | undefined;
    get hemisphereLight(): THREE.Object3D<THREE.Object3DEventMap> | undefined;
    get lightHelpers(): THREE.Object3D<THREE.Object3DEventMap> | undefined;
    get directionalLightHelper(): THREE.DirectionalLightHelper;
    get cameraHelper(): THREE.CameraHelper;
    setEnvironmentFromData(data?: Uint16Array): Promise<void>;
    setEnvironment(hdrUrl: string): Promise<void>;
    resize(): void;
    getRaycastableObjects(): THREE.Object3D<THREE.Object3DEventMap>[];
    tryAdjustDirectionalLight(): void;
    /**
     * @internal
     */
    updateDirectionalLight(): void;
    private updateDirectionalLightShadow;
    /**
     * @internal
     */
    showDirectionalLightHelper(visible: boolean): void;
    destroy(): void;
}
