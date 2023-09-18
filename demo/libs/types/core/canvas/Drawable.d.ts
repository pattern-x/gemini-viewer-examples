import * as THREE from "three";
import { DrawableData } from "./Constants";
import { Event } from "../../core/utils";
/**
 * @internal
 */
export declare abstract class Drawable<DrawableEvents extends Record<string, unknown> = Record<string, unknown>> extends Event<DrawableEvents> {
    protected readonly DEFAULT_LINE_WIDTH = 1;
    protected readonly DEFAULT_STROKE_STYLE: number[];
    protected readonly DEFAULT_FILL_STYLE: number[];
    id: string;
    protected lineWidth: number;
    protected lineColor: number[];
    protected fillColor: number[];
    x: number;
    y: number;
    width: number;
    height: number;
    protected points: THREE.Vector3[];
    userData: Record<any, any>;
    protected tolerance: number;
    visible: boolean;
    selected: boolean;
    /**
     * render order, the bigger number is on the top
     */
    renderOrder: number;
    needsFrustumCulled: boolean;
    protected editPointSize: number;
    protected editPointFillColor: string;
    protected editPointStrokeColor: string;
    protected matrix: THREE.Matrix4;
    protected ctx?: CanvasRenderingContext2D;
    constructor(id?: string);
    setTolerance(t: number): void;
    render(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    getData(): DrawableData;
    setData(data: DrawableData): void;
    getVertexes(): THREE.Vector3[];
    setLineWidth(lineWidth?: number): void;
    setLineColor(color?: number[]): void;
    setFillColor(color?: number[]): void;
    isSelected(): boolean;
    getCenter(): THREE.Vector3;
    transToScreenCoord(vector: THREE.Vector3, camera: THREE.Camera): THREE.Vector2;
    /**
     *
     * @param ctx
     * @param camera
     * @describe just for debug bounds
     */
    private drawBounds;
    /**
     *
     * @param ctx
     * @param camera
     * @describe just for debug
     */
    private drawCenter;
    /**
     *
     * @param p is world position
     * @param raycaster just for 3d intersect
     * @returns boolean
     * @describe is point interact drawable, use to select drawable, the same as threejs object raycast
     */
    abstract isPointInPath(p: THREE.Vector3, raycaster?: THREE.Raycaster): boolean;
    getBounds(): THREE.Box3;
    /**
     *
     * @param ctx
     * @param camera
     * @describe abstract draw method
     */
    abstract draw(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    /**
     *
     * @param ctx
     * @param camera
     * @describe abstract drawSelect method
     */
    abstract drawSelect(ctx: CanvasRenderingContext2D, camera: THREE.Camera): void;
    /**
     * @describe class type for serialize
     */
    abstract getClassType(): string;
}
