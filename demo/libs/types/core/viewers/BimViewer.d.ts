import * as THREE from "three";
import { Model3d } from "../model";
import { CpuIntersection } from "../pick";
import { BaseViewer } from "./BaseViewer";
import { ViewerName } from "./Constants";
import { BimViewerConfig, CameraConfig, ModelConfig } from "../../core/Configs";
export declare class BimViewer extends BaseViewer {
    name: ViewerName;
    loadedModels: Model3d[];
    distanceCullingFactor: number;
    selectedObject?: THREE.Object3D;
    private effect;
    enableSelection: boolean;
    constructor(viewerCfg: BimViewerConfig, cameraCfg?: CameraConfig);
    protected setupDefaultEvents(): void;
    protected setDefaultBackground(): void;
    protected handleAnchorPoint(intersect?: CpuIntersection): void;
    protected handleClickObject(object: THREE.Object3D): void;
    is3d(): boolean;
    loadLocalModel(url: string, modelCfg: ModelConfig, manager?: THREE.LoadingManager, onProgress?: (event: ProgressEvent) => void): Promise<void>;
    loadModel(modelCfg: ModelConfig, onProgress?: ((event: ProgressEvent<EventTarget>) => void) | undefined): Promise<void>;
    private loadModelInternal;
    /**
     * Sets distance culling factor in order to improve performance.
     * 0 means distance culling is disabled.
     * 100 means a 1x1 squre mesh is visible within 100.
     * @internal
     */
    setDistanceCullingFactor(val: number): void;
    /**
     * Gets distance culling factor.
     * @internal
     */
    getDistanceCullingFactor(): number;
    setAllModelTransparent(opacity: number): void;
    clearAllModelTransparent(): void;
    setObjectTransparent(object: THREE.Object3D, opacity: number): void;
    clearObjectTransparent(object: THREE.Object3D): void;
    setOthersObjectTransparent(object: THREE.Object3D): void;
    setModelTransparent(modelId: string): void;
    clearModelTransparent(modelId: string): void;
    setObjectVisible(object: THREE.Object3D, visible: boolean): void;
    hideOthersObject(object: THREE.Object3D): void;
    setModelVisible(modelId: string, visible: boolean): void;
    setAllModelVisible(visible: boolean): void;
    setObjectHighlight(object: THREE.Object3D): void;
    clearHighlight(): void;
    clearSelection(): void;
    enableSsao(enable: boolean): void;
    getSsaoEnabled(): boolean;
    setEnvironmentData(data?: Uint16Array): Promise<void>;
    setEnvironment(hdrUrl: string): Promise<void>;
    showVertexNormals(show: boolean, size?: number): void;
    getLights(): {
        sun: THREE.DirectionalLight;
        ambient: THREE.Object3D<THREE.Object3DEventMap> | undefined;
        hemisphere: THREE.Object3D<THREE.Object3DEventMap> | undefined;
    };
    debugLights(enable: boolean): void;
}
