import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
export declare class CSS2DObjectUtils {
    /**
     * Creates CSS2DObject with HTMLElement
     */
    static createCSS2DObject(element: HTMLElement): CSS2DObject;
    static createDefaultHotpoint(size?: number): CSS2DObject;
    static createHotpoint(html?: string): CSS2DObject;
    static createLabel(label: string, cssClass?: string): CSS2DObject;
    /**
     * Recursively find "dataset.objectId" of a HTMLElement
     */
    static tryFindObjectId(element: HTMLElement): number | undefined;
}
