import { DrawableData } from "./Constants";
import { Drawable } from "./Drawable";
/**
 * A group of Drawlables for a certain category
 */
export declare class DrawableList {
    private category;
    private drawableMap;
    constructor(category: string);
    addDrawable(drawable: Drawable): void;
    updateDrawable(drawable: Drawable, newData: DrawableData): void;
    removeDrawable(drawable: Drawable): void;
    getDrawableById(id: string): Drawable | undefined;
    clear(): void;
    getDrawables(): Map<string, Drawable>;
    getDrawableDatas(): DrawableData[];
    setDrawableDatas(drawableDatas: DrawableData[]): void;
    getDrawableByPosition(p: THREE.Vector3, raycaster?: THREE.Raycaster): Drawable | undefined;
}
