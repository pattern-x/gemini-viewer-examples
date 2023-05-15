import * as THREE from "three";
import type { BaseViewer } from "../../../core/viewers";
export interface ViewCubeConfig {
    containerId: string;
    context?: WebGLRenderingContext | WebGL2RenderingContext;
    showAxes?: boolean;
    lineColor?: number;
}
export declare class ViewCube {
    /**
     * @internal
     */
    name: string;
    private cfg;
    private plugin;
    private showAxes;
    private group?;
    private viewCubeFaces;
    private readonly AXIS_LENGTH;
    private readonly AXIS_COLOR_X;
    private readonly AXIS_COLOR_Y;
    private readonly AXIS_COLOR_Z;
    private readonly FACE_BACKGROUND_COLOR;
    private readonly FACE_HOVER_BACKGROUND_COLOR;
    private readonly EDGE_COLOUR;
    private readonly EDGE_OPACITY;
    private readonly EDGE_SIZE;
    private readonly CORNER_WIDTH;
    private readonly CORNER_COLOR;
    private readonly CORNER_OPACITY;
    private faces;
    private innerViewCubeMesh?;
    private hostViewer?;
    private lineColor;
    private activateMeshName?;
    private lastCoords?;
    constructor(config: ViewCubeConfig);
    init(): void;
    private createAxes;
    private createViewCubeFaces;
    private createViewCubeFace;
    private createViewCubeEdges;
    private createEdge;
    private createViewCubeCorners;
    private createCorner;
    private onPointerDown;
    private onPointerMove;
    private updateActivateMaterial;
    private onPointerleave;
    private initEvent;
    private update;
    private updateViewCube;
    private updateMeshTick;
    private updateHostViewerCamera;
    /**
     * Update viewCube according to camera direction.
     * Camera's direction is the only input factor for this class. It always look at the origin.
     * @param direction
     */
    updateCameraDirection(direction: THREE.Vector3, up: THREE.Vector3): void;
    setHostViewer(hostViewer: BaseViewer): void;
    destroy(): void;
}
