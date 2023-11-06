import * as THREE from "three";
import { ObjectExploder } from "./ObjectExploder";
import { BaseViewer, Plugin, PluginConfig, Vector3 } from "../../core";
export interface ExplodePluginConfig extends Partial<PluginConfig> {
    /**
     * Explode center.
     * If specified, each object explode based on this position. Otherwise,
     * each object explode based on its own center.
     */
    explodeCenter?: Vector3;
    /**
     * By default, it explodes to every direction. In some scenarios, user may want to
     * explode only in up/down direction.
     */
    explodeUp?: boolean;
}
/**
 * Exploder class is used to explode objects in a viewer.
 * Can be used by BimViewer.
 * @internal
 */
export declare class ExplodePlugin extends Plugin {
    static DEFAULT_ID: string;
    protected cfg: ExplodePluginConfig;
    protected exploders: ObjectExploder[];
    constructor(viewer: BaseViewer, cfg?: ExplodePluginConfig);
    get scene(): THREE.Scene;
    /**
     * Initialize the
     */
    init(): void;
    /**
     * Explode objects
     * @param scale 1 means do not explode at all, recommended value between 1-5.
     */
    explode(scale: number): void;
    /**
     * Unexplode objects
     */
    unexplode(): void;
    protected onModelLoaded: () => void;
    /**
     * Checks if exploder already exists for a model/object.
     */
    protected hasExploderForModel(modelObjectId: number): boolean;
    destroy(): void;
}
