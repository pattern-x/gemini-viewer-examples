import { Euler, Object3D, Vector3 } from "three";
export interface NavCubeConfig {
    onClick?: (direction: Vector3, rotation: Euler) => void;
}
export declare class NavCube extends Object3D {
    NAVCUBE_SIZE: number;
    private clickHandler;
    constructor(cfg?: NavCubeConfig);
    private createPlane;
    private createEdge;
    private createCorner;
}
