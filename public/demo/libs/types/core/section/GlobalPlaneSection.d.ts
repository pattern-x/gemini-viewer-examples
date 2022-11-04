import { BasePlaneSection } from "./BasePlaneSection";
import { Box3, Scene, WebGLRenderer, PerspectiveCamera, OrthographicCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
/**
 * GlobalPlaneSection section
 */
export declare class GlobalPlaneSection extends BasePlaneSection {
    /**
     * Constructor
     */
    constructor(sectionBox: Box3, scene: Scene, camera: PerspectiveCamera | OrthographicCamera, renderer: WebGLRenderer, controls: OrbitControls);
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
