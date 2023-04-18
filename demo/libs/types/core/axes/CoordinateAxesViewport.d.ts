import * as THREE from "three";
/**
 * This renderer monitors the host renderer's camera, and keeps a coordinate axes
 * the same direction as host renderer's
 */
export declare class CoordinateAxesViewport {
    private hostCamera?;
    private container;
    private coordinateAxes?;
    private ignoreZAxis;
    private camera?;
    private scene?;
    private renderer?;
    private css2dRenderer?;
    private height;
    private width;
    constructor(container: HTMLDivElement, hostCamera: THREE.Camera, ignoreZAxis?: boolean);
    init(): void;
    initRenderer(): void;
    initScene(): void;
    /**
     * Sets hostCamera in case it is changed.
     * It is possible for a viewer to switch camera between a OrthographicCamera and a PerspectiveCamera.
     */
    setHostCamera(hostCamera: THREE.Camera): void;
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
