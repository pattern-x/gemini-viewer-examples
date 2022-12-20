import { BimViewer } from "../viewers/BimViewer";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import { NavCube } from "./NavCube";
import { OrthographicCamera, Scene, Vector3 } from "three";
/**
 * This renderer monitors the host renderer's camera, and keeps a NavCube
 * the same direction as host renderer's
 */
export declare class NavCubeViewport {
    hostRenderer?: BimViewer;
    renderer?: CSS3DRenderer;
    navCube?: NavCube;
    camera?: OrthographicCamera;
    scene?: Scene;
    height: number;
    width: number;
    constructor(width?: number, height?: number);
    init(): void;
    initRenderer(): void;
    initScene(): void;
    render(): void;
    animate(): void;
    setHostRenderer(renderer: BimViewer): void;
    update(): void;
    /**
     * Update navCube according to camera direction.
     * Camera's direction is the only input factor for this class. It always look at the origin.
     * @param direction
     */
    updateCameraDirection(direction: Vector3, up: Vector3): void;
    dispose(): void;
}
