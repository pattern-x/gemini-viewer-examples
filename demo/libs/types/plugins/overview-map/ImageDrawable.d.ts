import * as THREE from "three";
import { Vector3, Vector2 } from "../../core/Constants";
import { Drawable } from "../../core/canvas/Drawable";
export interface ImageDrawableConfig {
    image: HTMLImageElement;
    position: Vector3 | THREE.Vector3;
    radius?: number;
    enabledHover?: boolean;
    direction?: Vector3 | THREE.Vector3;
    rotation?: number;
    hoverImage?: HTMLImageElement;
    translate?: Vector2;
    scale?: number;
    isDirectionFromCamera?: boolean;
}
export declare class ImageDrawable extends Drawable {
    enabledHover: boolean;
    hover: boolean;
    needsFrustumCulled: boolean;
    position: THREE.Vector3;
    radius?: number;
    direction?: THREE.Vector3;
    rotation?: number;
    image: HTMLImageElement;
    hoverImage?: HTMLImageElement;
    translate?: Vector2;
    scale: number;
    constructor(id: string, cfg: ImageDrawableConfig);
    private direction2Rotation;
    private getRotation;
    private drawImage;
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    drawSelect(): void;
    getBounds(): THREE.Box3;
    getClassType(): string;
    isPointInPath(mousePosition: THREE.Vector3, raycaster?: THREE.Raycaster): boolean;
    getBBox(): THREE.Box3;
}
