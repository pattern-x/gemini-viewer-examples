import { OrthographicCamera, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { CameraControlsEx } from "../../core/controls/CameraControlsEx";
import { BasePlaneSection } from "./BasePlaneSection";
/**
 * Objects' plane section
 **/
export declare class ObjectsPlaneSection extends BasePlaneSection {
    private objectIds;
    /**
     * Constructor
     */
    constructor(objectIds: number[], scene: Scene, camera: PerspectiveCamera | OrthographicCamera, renderer: WebGLRenderer, controls: CameraControlsEx);
    /**
     * Initialize 6 section plane
     **/
    protected initSectionPlane(): void;
    /**
     * Clears section plane
     **/
    protected clearSectionPlane(): void;
}
