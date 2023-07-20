import { Box3, OrthographicCamera, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { CameraControlsEx } from "../../core/controls/CameraControlsEx";
import { BasePlaneSection } from "./BasePlaneSection";
/**
 * GlobalPlaneSection section
 */
export declare class GlobalPlaneSection extends BasePlaneSection {
    /**
     * Constructor
     */
    constructor(sectionBox: Box3, scene: Scene, camera: PerspectiveCamera | OrthographicCamera, renderer: WebGLRenderer, controls: CameraControlsEx);
    /**
     * Initialize section box
     */
    protected initSectionPlane(): void;
    /**
     * Updates planes for section plane
     */
    protected updatePlanes(): void;
    /**
     * Clears section planes
     */
    protected clearSectionPlane(): void;
}
