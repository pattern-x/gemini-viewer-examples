import * as THREE from "three";
import { CSS2DObject, CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { BaseViewer, Hotpoint, Plugin, Vector2, Vector3 } from "../../core";
/**
 * Hotpoint plugin manages hotpoints in a viewer.
 * It can be used by DxfViewer and BimViewer.
 * The hotpoint feature in VRViewer is more complex, that one has nothing to do with this plugin.
 * VRViewer is able to use this plugin though.
 * - A hotpoint is created and stored by user. User define its html and css.
 * - A hotpoint can be added to, and removed from viewer.
 * - Caller should set a hotpointId that is unique in the session of current viewer.
 * - DxfViewer doesn't maintain the relationship between hotpoint and layout.
 */
export declare class HotpointPlugin extends Plugin {
    protected hotpointRoot?: THREE.Group;
    protected css2dRenderer: CSS2DRenderer;
    constructor(viewer: BaseViewer);
    /**
     * @description {en} Adds a hotpoint.
     * Caller should set a hotpointId that is unique in the session of current viewer.
     * @description {zh} 添加热点。
     * 调用者应该设置一个在当前Viewer会话中唯一的热点id。
     * @param hotpoint
     * - {en} hotpoint data.
     * - {zh} 热点数据。
     * @example
     * ``` typescript
     * const hotpoint = {
     *    hotpointId: "c6ea70a3-ddb0-4dd0-87c8-bd2491936428",
     *    anchorPosition: [0, 0, 0],
     *    html: "<div>hotpoint</div>",
     *    visible: true,
     * };
     * const plugin = new HotpointPlugin(viewer);
     * plugin.add(hotpoint);
     * ```
     */
    add(hotpoint: Hotpoint): void;
    /**
     * @description {en} Removes a hotpoint by given hotpointId.
     * @description {zh} 根据热点id删除热点。
     * @param {string} hotpointId
     * - {en} hotpoint id.
     * - {zh} 热点id。
     * @example
     * ``` typescript
     * const hotpointId = "c6ea70a3-ddb0-4dd0-87c8-bd2491936428";
     * const plugin = new HotpointPlugin(viewer);
     * plugin.remove(hotpointId);
     * ```
     */
    remove(hotpointId: string): void;
    /**
     * @description {en} Clears all hotpoints.
     * @description {zh} 清除所有热点。
     * @example
     * ``` typescript
     * const plugin = new HotpointPlugin(viewer);
     * plugin.clear();
     * ```
     */
    clear(): void;
    /**
     * Checks if hotpoint with specific id already exist
     * Caller should set a hotpointId that is unique in the session of current DxfViewer.
     * @internal
     */
    has(hotpointId: string): boolean;
    /**
     * @description {en} Moves a hotpoint.
     * @description {zh} 移动热点的位置。
     * @example
     * ``` typescript
     * const hotpointId = "c6ea70a3-ddb0-4dd0-87c8-bd2491936428";
     * const plugin = new HotpointPlugin(viewer);
     * plugin.move(hotpointId, [10, 10, 0]);
     * ```
     */
    move(hotpointId: string, position: Vector2 | Vector3): void;
    /**
     * @description {en} Hides or show a hotpoint.
     * @description {zh} 显示或隐藏一个热点。
     * @example
     * ``` typescript
     * const hotpointId = "c6ea70a3-ddb0-4dd0-87c8-bd2491936428";
     * const plugin = new HotpointPlugin(viewer);
     * plugin.setVisible(hotpointId, false);
     * ```
     */
    setVisible(hotpointId: string, visible: boolean): void;
    protected findHotpointObject(hotpointId: string): CSS2DObject | undefined;
    /**
     *
     * @param hotpointId
     * @param zoom
     * @returns
     * @description Fly to hotpoint by hotpointId.
     */
    flyToHotpoint(hotpointId: string, zoom?: any): void;
    destroy(): void;
    protected onAfterRender: () => void;
}
