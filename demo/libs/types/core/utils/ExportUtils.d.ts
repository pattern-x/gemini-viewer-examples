import * as THREE from "three";
import type { DRACOExporterOptions } from "three/examples/jsm/exporters/DRACOExporter";
import type { GLTFExporterOptions } from "three/examples/jsm/exporters/GLTFExporter";
/**
 * @internal
 */
export declare class ExportUtils {
    static EXTENSION_GLTF: string;
    static EXTENSION_GLB: string;
    static EXTENSION_OBJ: string;
    static EXTENSION_DRACO: string;
    static EXTENSION_JSON: string;
    static EXTENSION_STL: string;
    private static downloadLink;
    /**
     * Exports given object to gltf file
     */
    static exportToGltf(input: THREE.Object3D, filename: string): void;
    /**
     * Exports given object to glb file
     */
    static exportToGlb(input: THREE.Object3D, filename: string): void;
    /**
     * Exports given object to gltf/glb file
     * @param input given object
     * @param filename filename without path, nor extension
     * @param options
     */
    static exportToGltfOrGlb(input: THREE.Object3D, filename: string, options?: GLTFExporterOptions): void;
    /**
     * Exports given object to obj file
     */
    static exportToObj(input: THREE.Object3D, filename: string): void;
    /**
     * Exports given object to draco(drc) file
     */
    static exportToDraco(input: THREE.Mesh, filename: string, options?: DRACOExporterOptions): void;
    /**
     * Exports given object to stl file
     */
    static exportToStl(input: THREE.Object3D, filename: string, binary?: boolean): void;
    /**
     * Exports to threejs json
     * @param input
     * @param filename
     */
    static exportToThreeJsJson(input: THREE.Object3D, filename: string): void;
    /**
     * Saves blob as file
     */
    static save(blob: Blob, filename: string): void;
    static saveArrayBuffer(buffer: ArrayBuffer, filename: string): void;
    static saveJson(json: object, filename: string): void;
    static saveJsonString(jsonString: string, filename: string): void;
    static saveString(str: string, filename: string): void;
    static saveDataView(dataView: DataView, filename: string): void;
    /**
     * Adds extention if missing
     */
    private static addExtention;
}
