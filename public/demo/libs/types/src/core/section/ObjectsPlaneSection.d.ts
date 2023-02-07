import { OrthographicCamera, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { BasePlaneSection } from "./BasePlaneSection";
import { OrbitControls } from "../controls/OrbitControls";
/**
 * Objects' plane section
 **/
export declare class ObjectsPlaneSection extends BasePlaneSection {
    private objectIds;
    /**
     * Constructor
     */
    constructor(objectIds: number[], scene: Scene, camera: PerspectiveCamera | OrthographicCamera, renderer: WebGLRenderer, controls: OrbitControls);
    /**
     * Initialize 6 section plane
     **/
    protected initSectionPlane(): void;
    /**
     * Clears section plane
     **/
    protected clearSectionPlane(): void;
}
