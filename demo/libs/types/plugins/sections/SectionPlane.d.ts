import * as THREE from "three";
export declare class SectionPlane extends THREE.Mesh {
    static readonly normalPlaneColor: THREE.Color;
    static readonly activePlaneColor: THREE.Color;
    static readonly normalLineColor = 16777215;
    actionType: string;
    vertices: THREE.Vector3[];
    edge: THREE.Line;
    constructor(actionType: string, vertices: THREE.Vector3[]);
    private createIgnoreClipMaterials;
    createEdge(vertices: THREE.Vector3[]): THREE.Line<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.LineBasicMaterial>;
    update(vertices: THREE.Vector3[]): void;
    rotatePlane(axis: THREE.Vector3, angle: number): void;
    setDirection(normal: THREE.Vector3): void;
    getPlaneNormal(): THREE.Vector3;
    setActive(active: boolean): void;
    getPlaneCenter(): THREE.Vector3;
}
