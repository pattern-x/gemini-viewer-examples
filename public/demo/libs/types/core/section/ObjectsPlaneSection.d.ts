import { BasePlaneSection } from "./BasePlaneSection";
import { Scene, WebGLRenderer, PerspectiveCamera, OrthographicCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
/**
 * Objects' plane section
 **/
export declare class ObjectsPlaneSection extends BasePlaneSection {
    private objectUuids;
    /**
     * Constructor
     */
    constructor(objectUuids: string[], scene: Scene, camera: PerspectiveCamera | OrthographicCamera, renderer: WebGLRenderer, controls: OrbitControls);
    /**
     * Initialize 6 section plane
     **/
    protected initSectionPlane(): void;
    /**
     * Clears section plane
     **/
    protected clearSectionPlane(): void;
}
