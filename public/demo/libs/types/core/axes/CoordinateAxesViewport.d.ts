import * as THREE from "three";
import { BimViewer } from "../viewers/BimViewer";
import { CoordinateAxes } from "./CoordinateAxes";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
import { DxfViewer } from "../viewers/DxfViewer";
import { VRViewer } from "../viewers/VRViewer";
/**
 * This renderer monitors the host renderer's camera, and keeps a coordinate axes
 * the same direction as host renderer's
 */
export declare class CoordinateAxesViewport {
    hostRenderer?: BimViewer | DxfViewer | VRViewer;
    container: HTMLDivElement;
    coordinateAxes?: CoordinateAxes;
    camera?: THREE.OrthographicCamera;
    scene?: THREE.Scene;
    renderer?: THREE.WebGLRenderer;
    css2dRenderer?: CSS2DRenderer;
    height: number;
    width: number;
    constructor(container: HTMLDivElement, hostRenderer: BimViewer | DxfViewer | VRViewer);
    init(): void;
    initRenderer(): void;
    initScene(): void;
    render(): void;
    animate(): void;
    update(): void;
    /**
     * Update axes according to camera direction.
     * Camera's direction is the only input factor for this class. It always look at the origin.
     * @param direction
     */
    updateCameraDirection(direction: THREE.Vector3, up: THREE.Vector3): void;
    dispose(): void;
}
