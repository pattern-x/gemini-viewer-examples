import * as THREE from "three";
import { Drawable } from "../../core/canvas/Drawable";
export interface OverviewMapDrawableConfig {
    image: HTMLImageElement;
    min: THREE.Vector3;
    max: THREE.Vector3;
    radius?: number;
    renderOrder?: number;
}
export declare class OverviewMapDrawable extends Drawable {
    renderOrder: number;
    image: HTMLImageElement;
    min: THREE.Vector3;
    max: THREE.Vector3;
    radius?: number;
    needsFrustumCulled: boolean;
    constructor(id: string, config: OverviewMapDrawableConfig);
    getClassType(): string;
    private getImageScreenSize;
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    drawSelect(): void;
    isPointInPath(): boolean;
    getBBox(): THREE.Box3;
}
