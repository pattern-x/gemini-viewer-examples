import * as THREE from "three";
export interface ViewCubeConfig {
    showAxes?: boolean;
    lineColor?: number;
}
export declare enum ViewCubeName {
    TopFace = "TopFace",
    FrontFace = "FrontFace",
    RightFace = "RightFace",
    BackFace = "BackFace",
    LeftFace = "LeftFace",
    BottomFace = "BottomFace",
    TopFrontEdge = "TopFrontEdge",
    TopRightEdge = "TopRightEdge",
    TopBackEdge = "TopBackEdge",
    TopLeftEdge = "TopLeftEdge",
    FrontRightEdge = "FrontRightEdge",
    BackRightEdge = "BackRightEdge",
    BackLeftEdge = "BackLeftEdge",
    FrontLeftEdge = "FrontLeftEdge",
    BottomFrontEdge = "BottomFrontEdge",
    BottomRightEdge = "BottomRightEdge",
    BottomBackEdge = "BottomBackEdge",
    BottomLeftEdge = "BottomLeftEdge",
    TopFrontRightCorner = "TopFrontRightCorner",
    TopBackRightCorner = "TopBackRightCorner",
    TopBackLeftCorner = "TopBackLeftCorner",
    TopFrontLeftCorner = "TopFrontLeftCorner",
    BottomFrontRightCorner = "BottomFrontRightCorner",
    BottomBackRightCorner = "BottomBackRightCorner",
    BottomBackLeftCorner = "BottomBackLeftCorner",
    BottomFrontLeftCorner = "BottomFrontLeftCorner"
}
export declare class ViewCube extends THREE.Object3D {
    readonly name = "ViewCube";
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
    private showAxes;
    private lineColor;
    dirty: boolean;
    activateMeshName?: string;
    constructor(cfg?: ViewCubeConfig);
    private init;
    private createAxes;
    private createViewCubeFaces;
    private createViewCubeFace;
    private createViewCubeEdges;
    private createEdge;
    private createViewCubeCorners;
    private createCorner;
    getBBox(): THREE.Box3;
    getDirectionByViewCubeName(viewCubeName: ViewCubeName): THREE.Vector3 | undefined;
    update(): void;
    private updateViewCube;
    private updateMeshTick;
}
