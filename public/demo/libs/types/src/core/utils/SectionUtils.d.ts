import * as THREE from "three";
/**
 * @internal
 */
export declare class SectionUtils {
    static setMaterialSection(mat: THREE.Material, planes: THREE.Plane[], bAppend?: boolean, bClipIntersection?: boolean): void;
    static removeSection(object: THREE.Object3D): void;
    static addSection(object: THREE.Object3D, planes: THREE.Plane[], bAppend?: boolean, bClipIntersection?: boolean): void;
    static generateSectionPlanesByBox(sectionBox: THREE.Box2): THREE.Plane[];
    static generateSectionPlanesByPoints(points: THREE.Vector2[], bLeftSideOfForwadDirection?: boolean): THREE.Plane[] | undefined;
}
