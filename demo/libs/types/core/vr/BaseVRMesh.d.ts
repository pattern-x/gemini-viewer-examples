import * as THREE from "three";
/**
 * The base class of vr mesh.
 */
export declare class BaseVRMesh extends THREE.Group {
    protected textureLoader: THREE.TextureLoader;
    protected images: string[];
    protected mesh?: THREE.Object3D;
    protected thumbnailImages?: string[];
    protected thumbnailMesh?: THREE.Mesh;
    protected size: number;
    private fadingInInterval?;
    private fadingOutInterval?;
    constructor(images: string[], thumbnailImages?: string[], size?: number);
    /**
     * Fades in by changing its opacity
     */
    fadeIn(durationInMs?: number): void;
    protected materialEquals(materials1: THREE.Material[], materials2: THREE.Material[]): boolean;
    /**
     * Fades out by changing its opacity.
     * In the meantime, will dynamically change its scale. We do this because there is
     * bug in threejs that when two or more pictures are transparent, it may render improperly!
     */
    fadeOut(durationInMs?: number): void;
    /**
     * Clears existing fadeIn/fadeOut intervals if any
     */
    private clearFading;
    protected getMaterials(): THREE.Material[];
    protected create(): void;
    protected createThumbnailMesh(size: number): Promise<void>;
    protected loadTextures(images: string[]): THREE.Texture[];
    protected loadTexturesAsync(images: string[]): Promise<THREE.Texture[]>;
    destroyMesh(mesh: THREE.Mesh): void;
    destroy(): void;
}
