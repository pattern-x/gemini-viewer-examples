import * as THREE from "three";
/**
 * Creates a sky box with light blue sky.
 * See code here:
 * https://github.com/mrdoob/three.js/blob/master/examples/webgl_materials_lightmap.html
 * @internal
 */
export declare class SkyboxUtils {
    static NAME: string;
    static MIN_SKY_RADIUS: number;
    static MAX_SKY_RADIUS: number;
    static vertexShader: string;
    static fragmentShader: string;
    static COLOR_TEMPLATES: {
        [name: string]: number[];
    };
    /**
     * Creates sky
     * @param radius
     * @param widthSegments
     * @param heightSegments
     */
    static createSkyOfGradientRamp(radius?: number, widthSegments?: number, heightSegments?: number, skyCenter?: THREE.Vector3, sunDirection?: THREE.Vector3): THREE.Mesh;
    /**
     * Creates sky according to objects in the scene. Need to do this because
     * objects' size and position may be large or out of sky box.
     */
    static createSkyOfGradientRampByObjectsInScene(scene: THREE.Scene, objectUuids: string[]): THREE.Mesh;
    /**
     * Create sky according to a bounding box
     */
    static createSkyOfGradientRampByBoundingBox(bbox: THREE.Box3): THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>;
    /**
     * Creates skybox by 6 pictures. The texture should be assigned to scene.background.
     */
    static createSkyFromTextures(pictureUrls: string[]): Promise<THREE.CubeTexture>;
}
