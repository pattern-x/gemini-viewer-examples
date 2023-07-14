import { BaseViewer, Plugin } from "../../core";
/**
 * Skybox plugin for BimViewer
 */
export declare class SkyboxPlugin extends Plugin {
    private skybox?;
    constructor(viewer: BaseViewer);
    private createDefaultSkybox;
    private updateSkyboxByBox;
    /**
     *
     * @param urls
     * @description set custom sky box image
     */
    setSkybox(urls: string[]): void;
    /**
     * @description reset default sky box
     */
    resetDefaultSkybox(): void;
    /**
     *
     * @param enable
     * @description enable sky box
     */
    enableSkybox(enable: boolean): void;
    destroy(): void;
}
