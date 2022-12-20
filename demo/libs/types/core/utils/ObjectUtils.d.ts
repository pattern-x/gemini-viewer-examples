import * as THREE from "three";
import { Exploder } from "../exploder/Exploder";
/**
 * @internal
 */
export interface MaterialInfo {
    uuid: string;
    material?: THREE.Material;
    clonedMaterial?: THREE.Material;
    opacity: number;
    transparent: boolean;
    side: THREE.Side;
}
/**
 * Util class for Threejs Object
 * @internal
 */
export declare class ObjectUtils {
    /**
     * Clears any styles, including transparency, wireframe mode, filter by floor, etc.
     * @param object
     */
    static resetObjectStyle(object: THREE.Object3D): void;
    /**
     * Clears any styles, including transparency, wireframe mode, filter by floor, etc.
     */
    static resetObjectStyleByUuid(scene: THREE.Scene, uuid: string): void;
    /**
     * Sets an object's opacity
     * @returns returns MaterialInfo list in case caller want to revert the opacity
     */
    static setObjectOpacity(object: THREE.Object3D, opacity?: number, includeObjectUuids?: string[], excludeObjectUuids?: string[]): MaterialInfo[];
    /**
     * Reverts an object's opacity
     * @param object the root object
     */
    static revertObjectOpacity(object: THREE.Object3D, materialInfoList: MaterialInfo[], includeObjectUuids?: string[], excludeObjectUuids?: string[]): void;
    /**
     * Sets an object's opacity
     */
    static setObjectOpacityByUuid(scene: THREE.Scene, uuid: string, opacity?: number, includeObjectUuids?: string[], excludeObjectUuids?: string[]): MaterialInfo[];
    /**
     * Reverts an object's opacity
     */
    static revertObjectOpacityByUuid(scene: THREE.Scene, uuid: string, materialInfoList: MaterialInfo[], includeObjectUuids?: string[], excludeObjectUuids?: string[]): void;
    /**
     * Applies material to an object, including its children
     * The originalMaterial will be saved to userData in case user want to revert it
     */
    static applyMaterialToObject(object: THREE.Object3D, material: THREE.Material | THREE.Material[], includeObjectUuids?: string[], excludeObjectUuids?: string[]): void;
    /**
     * Revert applied material to an object, including its children
     */
    static revertAppliedMaterialToObject(object: THREE.Object3D, includeObjectUuids?: string[], excludeObjectUuids?: string[]): void;
    /**
     * Sets an object's opacity
     */
    static applyMaterialToObjectByUuid(scene: THREE.Scene, uuid: string, material: THREE.Material | THREE.Material[], includeObjectUuids?: string[], excludeObjectUuids?: string[]): void;
    /**
     * Reverts an object's opacity
     */
    static revertAppliedMaterialToObjectByUuid(scene: THREE.Scene, uuid: string, includeObjectUuids?: string[], excludeObjectUuids?: string[]): void;
    /**
     * Applies a default opacity material to an object, including its children
     */
    static applyOpacityMaterialToObject(object: THREE.Object3D, includeObjectUuids?: string[], excludeObjectUuids?: string[]): void;
    /**
     * Explodes an object
     */
    static explodeObject(scene: THREE.Scene, object: THREE.Object3D, explodeUp?: boolean): Exploder;
    /**
     * Unexplodes an object
     */
    static unexplodeObject(exploder: Exploder): void;
    /**
     * Sets an object to be wireframe mode.
     * In order to revert wireframe mode, we'll store original material in userData: \{
     *   materialForWireframe: THREE.Material
     * \}
     * It seems wireframe mode have performance degradation, look at here for more info:
     * https://stackoverflow.com/questions/45917611/shader-wireframe-of-an-object
     */
    static setWireframeMode(object: THREE.Object3D): void;
    /**
     * Sets an object to be wireframe mode.
     */
    static setWireframeModeByUuid(scene: THREE.Scene, uuid: string): void;
    /**
     * Reverts an object to be non-wireframe mode.
     */
    static revertWireframeMode(object: THREE.Object3D): void;
    /**
     * Reverts an object to be non-wireframe mode.
     */
    static revertWireframeModeByUuid(scene: THREE.Scene, uuid: string): void;
    /**
     * Finds objects by name, id, userData, etc.
     * @param scene
     * @param targetUuids target object uuids to find from
     * @param searchText search text
     * @param findFirst only find the first
     */
    private static findInner;
    /**
     * Finds objects by given string
     */
    static find(scene: THREE.Scene, searchText: string, targetUuids?: string[], findFirst?: boolean): THREE.Object3D[];
    /**
     * Finds the first object by given string
     */
    static findFirst(scene: THREE.Scene, searchText: string, targetUuids?: string[], findFirst?: boolean): THREE.Object3D | undefined;
    /**
     * Checks if given string contains floor
     * @param str string to match, e.g. '5F(xxx)'
     */
    private static getFloorsFromString;
    /**
     * Matches if a string contains floor string
     * @param str string to match, e.g. '5F(xxx)'
     * @param floor '5F', etc.
     */
    private static matchFloor;
    /**
     * Matches if a string contains one of floor string in floors
     * @param str string to match, e.g. '5F(xxx)'
     * @param floor '5F', etc.
     */
    private static matchFloors;
    /**
     * Distincts/find floors from models, by checking children object.name
     */
    static distinctFloors(scene: THREE.Scene, modelUuid: string[]): string[];
    /**
     * Sets object's visible to true if its name, etc. match one of given floor.
     * This method won't affect other objects that don't match.
     */
    static traverseObjectByFloors(scene: THREE.Scene, modelUuid: string, floors: number[], matchCallback?: (object: THREE.Object3D) => void, unmatchCallback?: (object: THREE.Object3D) => void): never[] | undefined;
    /**
     * Sets object belong to given floors to be visible
     * @param modelUuid root or parent object uuid
     * @param makeUnmatchedInvisible if it should make unmatched object invisible
     */
    static setVisibleForFloors(scene: THREE.Scene, modelUuid: string, floors: number[], makeUnmatchedInvisible?: boolean): void;
    static revertVisibleForFloors(object: THREE.Object3D): void;
    static revertVisibleForFloorsByUuid(scene: THREE.Scene, uuid: string): void;
    private static getObjectByUuid;
    /**
     * Outline default material
     */
    private static OUTLINE_MATERIAL;
    /**
     * Creates outlines for given object and children
     * @param options 'replaceOriginalObject' must be used carefully, it removes original objects and cannot get back for now.
     *   It can be used in case for really large models that has a bad performace.
     */
    static addOutlines(object: THREE.Object3D, options?: {
        visibleOnly: boolean;
        meshOnly: boolean;
        replaceOriginalObject: boolean;
    }): THREE.LineSegments[];
    /**
     * Recursively removes outlines for given object and children
     */
    static removeOutlines(object: THREE.Object3D): void;
    /**
     * Recursively checks if an object or children has outline already
     */
    static hasOutline(object: THREE.Object3D): boolean;
    /**
     * Sets outline visiblility for given object and children
     */
    static setOutlinesVisibility(object: THREE.Object3D, visible: boolean): void;
    /**
     * Creates outline for given geometry
     */
    static createOutline(geometry: THREE.BufferGeometry, matrix: THREE.Matrix4, material?: THREE.LineBasicMaterial): THREE.LineSegments;
    /**
     * Creates outline for given geometry
     */
    static createOutlineSync(geometry: THREE.BufferGeometry, matrix: THREE.Matrix4, material?: THREE.LineBasicMaterial): THREE.LineSegments;
    /**
     * Clones object
     * @param object target object to be cloned
     * @param cloneMaterial if it needs to clone material or not
     * @returns cloned object
     */
    static cloneObject(object: THREE.Object3D, cloneMaterial?: boolean): THREE.Object3D;
    private static BOX_FACE_MATERIAL;
    /**
     * Creates box mesh
     */
    static createBox(sizeX: number, sizeY: number, sizeZ: number, faceMaterial?: THREE.Material, withBottom?: boolean): THREE.Mesh<THREE.BufferGeometry, THREE.Material>;
    /**
     * TODO: Relative to center
     */
    static rebaseObjectOnRTC(object: THREE.Object3D): THREE.Object3D;
    static removeEmptyObjects(object: THREE.Object3D): void;
    /**
     * To save memory, object3d shares some variables
     */
    static setSharedVariablesOfObject(object: THREE.Object3D): void;
    /**
     * Checks if an object is a drawable leaf object
     */
    static isLeafObject(obj: THREE.Object3D): boolean;
}
