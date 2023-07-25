import { DxfLayers, DxfViewer, Plugin, PluginConfig } from "../../core";
/**
 * Dxf layer manager config.
 */
export interface LayerManagerPluginConfig extends PluginConfig {
    /**
     * Container div id.
     */
    containerId: string;
    /**
     * If panel is visible. It is visible by default.
     */
    visible?: boolean;
}
/**
 * Dxf layer manager plugin events.
 */
/**
 * Dxf layer manager.
 * Can be used by DxfViewer.
 */
export declare class LayerManagerPlugin extends Plugin {
    protected cfg: LayerManagerPluginConfig;
    protected container?: HTMLDivElement;
    protected layerMgrRoot?: HTMLDivElement;
    protected layerList?: HTMLDivElement;
    protected headerText?: HTMLSpanElement;
    protected closeBtn?: HTMLSpanElement;
    protected dxfLayersArray?: DxfLayers[];
    protected checkboxes?: HTMLInputElement[];
    constructor(viewer: DxfViewer, cfg?: LayerManagerPluginConfig);
    protected init(): void;
    setVisible(visible: boolean): void;
    protected show(): void;
    protected hide(): void;
    destroy(): void;
    buildPage(): void;
    addContent(): void;
    generateListItem(layer: string, visible: boolean, color: string): string;
    addEventHandlers(): void;
    checkboxHandler(checkbox: HTMLInputElement): void;
    updatePage(): void;
    updateHeaderText(): void;
    convertDecimalToHex(decimal: number): string;
}
