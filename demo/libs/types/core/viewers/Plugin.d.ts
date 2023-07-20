import { Event } from "../utils";
import { type BaseViewer } from "./BaseViewer";
/**
 * Base plugin config.
 */
export interface PluginConfig {
    /**
     * ID for this Plugin, unique within its viewer.
     */
    id: string;
}
/**
 * Base plugin class.
 */
export declare abstract class Plugin<PluginEvents extends Record<string, unknown> = {}> extends Event<PluginEvents> {
    readonly id: string;
    protected viewer: BaseViewer;
    /**
     * Creates this Plugin and installs it into the given {@link Viewer}.
     *
     * @param {string} id ID for this plugin, unique among all plugins in the viewer.
     * @param {Viewer} viewer The viewer.
     * @param {Object} [cfg] Options
     */
    constructor(viewer: BaseViewer, cfg: PluginConfig);
    /**
     * Destroys this Plugin and removes it from its viewer.
     */
    destroy(): void;
}
