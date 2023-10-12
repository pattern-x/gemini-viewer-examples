import * as THREE from "three";
/**
 * MaterialUtils class
 * @internal
 */
export declare class MaterialUtils {
    /**
     * Compares two materials
     */
    static materialEquals(m1: THREE.Material, m2: THREE.Material): boolean;
    /**
     * Compares two materials, which could be material or material array
     */
    static materialsEquals(m1: THREE.Material | THREE.Material[], m2: THREE.Material | THREE.Material[]): boolean;
    /**
     * Compares two colors
     */
    static colorEquals(c1: THREE.Color, c2: THREE.Color): boolean;
    static clonedHighlightMaterials(mesh: THREE.Mesh | THREE.Line | THREE.Points, options?: {
        depthTest?: boolean;
        highlightColor?: THREE.Color;
        opacity?: number;
    }): THREE.Material | THREE.Material[] | undefined;
    static clonedHighlightMaterial(material: THREE.Material, options?: {
        depthTest?: boolean;
        highlightColor?: THREE.Color;
        opacity?: number;
    }): THREE.Material;
    /**
     * Clone given material(s)
     */
    static cloneMaterial(material: THREE.Material | THREE.Material[]): THREE.Material | THREE.Material[];
    static getMaterialColor(material: THREE.Material | THREE.Material[]): THREE.Color;
    static setMaterialColor(material: THREE.Material | THREE.Material[], color: THREE.Color): void;
    static setMaterialOpacity(material: THREE.Material | THREE.Material[], opacity: number): void;
    /**
     * Clone object's materials
     */
    static cloneMaterials(object: THREE.Object3D): void;
}
