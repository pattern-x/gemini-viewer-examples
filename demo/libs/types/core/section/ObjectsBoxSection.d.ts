import { BaseBoxSection } from "./BaseBoxSection";
import { Scene, WebGLRenderer, PerspectiveCamera, OrthographicCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
/**
 * Object's box section
 **/
export declare class ObjectsBoxSection extends BaseBoxSection {
    private objectUuids;
    /**
     * Constructor
     */
    constructor(scene: Scene, camera: PerspectiveCamera | OrthographicCamera, renderer: WebGLRenderer, controls: OrbitControls, objectsUuids: string[]);
    /**
     * Initialize 6 section plane
     **/
    protected initPlanes(): void;
    /**
     * Clears section box
     **/
    protected clearSectionBox(): void;
}
