import * as THREE from "three";
import { ActionType } from "../../plugins/sections/Section.constants";
export declare class SectionGizmo extends THREE.Group {
    protected redMaterial: THREE.MeshBasicMaterial;
    protected greenMaterial: THREE.MeshBasicMaterial;
    protected blueMaterial: THREE.MeshBasicMaterial;
    protected highlightMaterial: THREE.MeshBasicMaterial;
    protected pickableMaterial: THREE.MeshBasicMaterial;
    protected originalMaterial?: THREE.MeshBasicMaterial;
    protected hoverObject?: THREE.Mesh;
    constructor(normal?: THREE.Vector3);
    initIgnoreClipMaterial(): void;
    setDirection(normal: THREE.Vector3): void;
    initOrUpdateByAxis(normal: THREE.Vector3): void;
    createTranslateGizmo(actionType: ActionType, direction: THREE.Vector3, size: number, material: THREE.Material): THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material>;
    createRotateGizmo(actionType: ActionType, direction: THREE.Vector3, size: number, material: THREE.Material, degree: number): THREE.Mesh<THREE.TorusGeometry, THREE.Material>;
    createSphere(size: number, material: THREE.Material, position?: THREE.Vector3): void;
    setActiveAxis(axis: THREE.Vector3): void;
    private createHoverRotateObjectByAxis;
    setActive(active: boolean, selectObject: THREE.Mesh): void;
    adjustSize(camera: THREE.Camera): void;
}
