import * as THREE from "three";
/**
 * Three.js extensions for SHP parser.
 * Code is converted from JS to TS based on: https://github.com/kig/shp.js/
 */
export declare class ShpThree {
    readonly LINE_MATERIAL: THREE.LineBasicMaterial;
    readonly MESH_MATERIAL: THREE.MeshBasicMaterial;
    /**
     *
     * @param shp
     * @param spherize is spherize or not. This only works well for the sameple shp for now!
     */
    createModel(shp: any): THREE.Object3D;
    loadCompressed(deltaEncoded: any): THREE.Object3D<THREE.Event>;
    compress(shp: any): ArrayBuffer;
    deltaEncode(arr: any): ArrayBuffer;
    deltaEncode6(arr: any): ArrayBuffer;
    storeDeltas(byteLen: any, polys: any): ArrayBuffer;
    deltaDecode(buf: any): number[];
    storeDeltas6(byteLen: any, polys: any): ArrayBuffer;
    deltaDecode6(buf: any): number[];
}
