import * as THREE from "three";
import { Drawable } from "../../core/canvas";
import { EventInfo } from "../../core/input/InputManager";
/**
 * Touch helper for mobile
 */
export declare class MobileTouchHelperDrawable extends Drawable {
    private position;
    needsFrustumCulled: boolean;
    renderOrder: number;
    constructor(position: THREE.Vector2);
    setPosition(position: THREE.Vector2): void;
    isPointInPath(p: THREE.Vector3, raycaster?: THREE.Raycaster | undefined): boolean;
    draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    drawInnerCircle(ctx: CanvasRenderingContext2D): void;
    drawOuterRing(ctx: CanvasRenderingContext2D): void;
    drawSnapTriangle(ctx: CanvasRenderingContext2D): void;
    translate(tx: number, ty: number): void;
    getTouchPoint(): {
        x: number;
        y: number;
    };
    isIntersect(e: EventInfo): boolean;
    drawSelect(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    getClassType(): string;
}
