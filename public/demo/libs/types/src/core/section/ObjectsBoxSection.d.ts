import { OrthographicCamera, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { BaseBoxSection } from "./BaseBoxSection";
import { OrbitControls } from "../controls/OrbitControls";
/**
 * Object's box section
 **/
export declare class ObjectsBoxSection extends BaseBoxSection {
    private objectIds;
    /**
     * Constructor
     */
    constructor(scene: Scene, camera: PerspectiveCamera | OrthographicCamera, renderer: WebGLRenderer, controls: OrbitControls, objectIds: number[]);
    /**
     * Initialize 6 section plane
     **/
    protected initPlanes(): void;
    /**
     * Clears section box
     **/
    protected clearSectionBox(): void;
}
