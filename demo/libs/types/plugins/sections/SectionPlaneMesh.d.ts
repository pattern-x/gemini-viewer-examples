import * as THREE from "three";
/**
 * Visible section plan mesh.
 */
export declare class SectionPlaneMesh extends THREE.Mesh {
    static readonly normalPlaneColor: THREE.Color;
    static readonly activePlaneColor: THREE.Color;
    static readonly normalLineColor = 16777215;
    actionType: string;
    vertices: THREE.Vector3[];
    edge: THREE.Line;
    wireframe?: THREE.LineSegments;
    constructor(actionType: string, vertices: THREE.Vector3[]);
    createIgnoreClipMaterials(material: THREE.Material): void;
    createEdge(vertices: THREE.Vector3[]): THREE.Line<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.LineBasicMaterial>;
    createLine(): void;
    update(vertices: THREE.Vector3[]): void;
    rotatePlane(axis: THREE.Vector3, angle: number): void;
    setDirection(normal: THREE.Vector3): void;
    getPlaneNormal(): THREE.Vector3;
    setActive(active: boolean): void;
    getPlaneCenter(): THREE.Vector3;
}
