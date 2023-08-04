import * as THREE from "three";
import { BaseViewer, Plugin, PluginConfig } from "../../core";
/**
 * Ground grid plugin.
 */
export interface GroundGridPluginConfig extends PluginConfig {
    /**
     * Ground size.
     */
    size?: number;
    /**
     * Number of divisions.
     */
    divisions?: number;
    /**
     * If ground grid is visible. It is visible by default.
     */
    visible?: boolean;
}
/**
 * Ground grid plugin.
 * Can be used by BimViewer.
 */
export declare class GroundGridPlugin extends Plugin {
    protected cfg: GroundGridPluginConfig;
    protected NAME: string;
    protected DEFAULT_SIZE: number;
    protected DEFAULT_DIVISIONS: number;
    protected DEFAULT_MAT_PARAMS: {
        color: number;
        transparent: boolean;
        opacity: number;
        wireframeLinewidth: number;
    };
    protected gridHelper?: THREE.GridHelper;
    constructor(viewer: BaseViewer, cfg?: GroundGridPluginConfig);
    protected init(): void;
    setVisible(visible: boolean): void;
    protected onModelLoaded: () => void;
    /**
     * Creates ground grid
     */
    protected createGroundGrid(size?: number, divisions?: number, groundCenter?: THREE.Vector3): THREE.GridHelper;
    destroy(): void;
}
