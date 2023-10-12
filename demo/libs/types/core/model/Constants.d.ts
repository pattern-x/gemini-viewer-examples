import * as THREE from "three";
import type { DxfData } from "../../core/dxf";
import type { PdfData } from "../../core/viewers";
/**
 * Loaded 3d model info for BimViewer.
 */
export interface ModelData3d {
    /**
     * modelId that is unique for loaded models
     */
    modelId: string;
    /**
     * Three.js object.
     */
    object: THREE.Object3D;
    /**
     * Bounding box of the model.
     */
    bbox?: THREE.Box3;
    /**
     * Edge objects of the model.
     */
    edges?: THREE.LineSegments[];
    /**
     * TilesRenderer for 3dTiles
     * @internal
     */
    tilesRenderer?: any;
}
/**
 * Loaded 2d model info for DxfViewer.
 */
export interface ModelData2d {
    /**
     * modelId that is unique for loaded models
     */
    modelId: string;
    /**
     * Used for dxf data.
     */
    dxfData?: DxfData;
    /**
     * Used for pdf data.
     */
    pdfData?: PdfData;
    /**
     * Model space transform matrix.
     * @internal
     */
    msTransformMatrix?: THREE.Matrix4;
}
