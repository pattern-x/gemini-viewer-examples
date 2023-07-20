import { Box3, BufferGeometry, Object3D, Layers, Material, Matrix4 } from "three";
export declare enum ObjectType {
    Object = 0,
    Point = 1,
    Line = 2,
    LineSegment = 3,
    Mesh = 4
}
export declare type CallBack = (object: DxfObject) => void;
export declare class DxfObject {
    name: string;
    type: ObjectType;
    matrix: Matrix4;
    parent?: DxfObject;
    children: DxfObject[];
    layers: Layers;
    renderOrder: number;
    userData: any;
    material?: Material;
    geometry?: BufferGeometry;
    matrixWorld?: Matrix4;
    constructor(type?: ObjectType);
    add(object: DxfObject, ...args: DxfObject[]): this;
    remove(object: DxfObject, ...args: DxfObject[]): this;
    removeFromParent(): this;
    clear(): this;
    traverse(callback: CallBack): void;
    clone(recursive?: boolean): DxfObject;
    copy(source: DxfObject, recursive?: boolean): this;
    convertToThreejsObject(recursive?: boolean): Object3D<import("three").Event> | undefined;
    static getBox(object: DxfObject, box: THREE.Box3, parentMatrix?: Matrix4): Box3;
}
