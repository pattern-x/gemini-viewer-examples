import { Box3, OrthographicCamera, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { BasePlaneSection } from "./BasePlaneSection";
import { OrbitControls } from "../controls/OrbitControls";
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
