import * as THREE from "three";
import { CSS2DObject, CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";

import { BaseViewer, CSS2DObjectUtils, log, Hotpoint, matrixAutoUpdate, Plugin, ViewerEvent, Vector2, Vector3 } from "src/core";

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
export class HotpointPlugin extends Plugin {
    protected hotpointRoot?: THREE.Group;
    protected css2dRenderer: CSS2DRenderer;

    constructor(viewer: BaseViewer) {
        super(viewer, { id: "HotpointPlugin" });

        // eslint-disable-next-line
        this.css2dRenderer = (this.viewer as any).css2dRenderer;

        this.viewer.addEventListener(ViewerEvent.AfterRender, this.onAfterRender);
    }

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
    add(hotpoint: Hotpoint): void {
        const exists = this.has(hotpoint.hotpointId);
        if (exists) {
            log.warn(`[Hotpoint] Hotpoint with id '${hotpoint.hotpointId}' already exist!`);
            return;
        }
        const p = hotpoint.anchorPosition;
        const object = CSS2DObjectUtils.createHotpoint(hotpoint.html);
        object.position.set(p[0] || 0, p[1] || 0, p[2] || 0);
        object.visible = hotpoint.visible !== false;
        object.userData.hotpoint = hotpoint;

        if (!this.hotpointRoot) {
            this.hotpointRoot = new THREE.Group();
            this.hotpointRoot.matrixAutoUpdate = matrixAutoUpdate;
            this.hotpointRoot.matrixWorldAutoUpdate = false;
            this.hotpointRoot.name = "HotpointRoot";
            this.viewer.scene?.add(this.hotpointRoot);
        }
        this.hotpointRoot.add(object);
        object.updateWorldMatrix(false, false);
        this.viewer.enableRender();
    }

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
    remove(hotpointId: string): void {
        const objects = this.hotpointRoot?.children || [];
        for (let i = 0; i < objects.length; ++i) {
            const obj = objects[i];
            if (obj.userData.hotpoint?.hotpointId === hotpointId) {
                obj.removeFromParent();
            }
        }
    }

    /**
     * @description {en} Clears all hotpoints.
     * @description {zh} 清除所有热点。
     * @example
     * ``` typescript
     * const plugin = new HotpointPlugin(viewer);
     * plugin.clear();
     * ```
     */
    clear(): void {
        this.hotpointRoot?.clear();
    }

    /**
     * Checks if hotpoint with specific id already exist
     * Caller should set a hotpointId that is unique in the session of current DxfViewer.
     * @internal
     */
    has(hotpointId: string): boolean {
        return !!this.findHotpointObject(hotpointId);
    }

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
    move(hotpointId: string, position: Vector2 | Vector3): void {
        const object = this.findHotpointObject(hotpointId);
        if (object) {
            const z = (position as Vector3).z || 0;
            object.position.set(position.x, position.y, z);
            object.updateWorldMatrix(false, false);
            this.viewer.enableRender();
            // we probably don't need to update the anchorPosition
        }
    }

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
    setVisible(hotpointId: string, visible: boolean): void {
        const object = this.findHotpointObject(hotpointId);
        if (object) {
            object.visible = visible;
        }
    }

    protected findHotpointObject(hotpointId: string): CSS2DObject | undefined {
        const objects = this.hotpointRoot?.children || [];
        const object = objects.find((obj) => obj.userData.hotpoint?.hotpointId === hotpointId);
        return object as CSS2DObject;
    }

    protected onAfterRender = () => {
        const scene = this.viewer.scene;
        const camera = this.viewer.camera;
        if (!scene || !camera || !this.hotpointRoot || this.hotpointRoot.children.length === 0) {
            return;
        }
        // TODO: if css2dRenderer.render() is already called in viewer, then we don't need to call it again.
        this.css2dRenderer?.render(scene, camera);
    };
}
