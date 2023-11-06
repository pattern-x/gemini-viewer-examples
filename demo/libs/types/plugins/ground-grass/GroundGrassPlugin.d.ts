import * as THREE from "three";
import { BaseViewer, Plugin, PluginConfig } from "../../core";
export interface GroundGrassPluginConfig extends Partial<PluginConfig> {
    /**
     * Url of a texture image.
     */
    texture?: string;
    /**
     * Ground width.
     */
    width?: number;
    /**
     * Ground height.
     */
    height?: number;
    /**
     * How many times the texture is repeated.
     */
    repeatX?: number;
    /**
     * How many times the texture is repeated.
     */
    repeatY?: number;
    /**
     * If ground grass is visible. It is visible by default.
     */
    visible?: boolean;
}
/**
 * Ground grass plugin.
 * Can be used by BimViewer.
 */
export declare class GroundGrassPlugin extends Plugin {
    static DEFAULT_ID: string;
    protected cfg: GroundGrassPluginConfig;
    protected NAME: string;
    protected DEFAULT_SIZE: number;
    protected DEFAULT_REPEAT: number;
    protected groundGrass?: THREE.Mesh;
    constructor(viewer: BaseViewer, cfg?: GroundGrassPluginConfig);
    protected init(): void;
    setVisible(visible: boolean): void;
    protected onModelLoaded: () => void;
    protected createGrassGround(texture: string, width: number, height: number, repeatX: number, repeatY: number): Promise<THREE.Mesh>;
    destroy(): void;
}
