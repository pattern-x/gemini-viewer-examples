import * as THREE from "three";
import { GradientColorSkybox } from "./GradientColorSkybox";
import { BaseViewer, Plugin, PluginConfig } from "../../core";
/**
 * Skybox plugin config.
 */
export interface SkyboxPluginConfig extends PluginConfig {
    /**
     * Initial single color of the skybox.
     * If specified, it initialize with a single color background. Otherwise,
     * the skybox initialize with default gradient colors.
     */
    color?: number[];
}
/**
 * Skybox plugin. It is mainly used by BimViewer, while can also be used by DxfViewer and VRViewer.
 * You can set skybox in several means:
 * 1) Single color, by using setSkyboxByColor().
 * 2) Gradient colors, by using setSkyboxByGradientColors().
 * 3) Cube texture, by using setSkyboxByCubeTexture().
 */
export declare class SkyboxPlugin extends Plugin {
    protected gradientColorSkybox?: GradientColorSkybox;
    constructor(viewer: BaseViewer, cfg?: SkyboxPluginConfig);
    /**
     * Set skybox by a single color.
     * @param color rgb number array, each value is between 0 and 1. e.g. [0.92, 0.95, 0.96]
     */
    setSkyboxByColor(color?: number[]): void;
    /**
     * Sets skybox by 3 gradient colors (top, skyline, bottom).
     */
    setSkyboxByGradientColors(topColor?: number[], // 0x86b6f5
    skylineColor?: number[], // 0xffffff
    bottomColor?: number[]): void;
    /**
     * Sets skybox by cube texture (6 images).
     */
    setSkyboxByCubeTexture(urls: string[]): void;
    /**
     * Updates gradient color skybox when models' bbox changed.
     */
    private updateGradientColorSkybox;
    destroy(): void;
    /**
     * Converts rgb color number array to THREE.Color.
     */
    protected rgb2Color(color: number[]): THREE.Color;
}
