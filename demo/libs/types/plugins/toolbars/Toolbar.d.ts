import { ToolbarConfig, ToolbarMenuConfig, ToolbarMenuId } from "./Toolbar.constants";
import { type BaseViewer } from "../../core/viewers";
/**
 * @class Toolbar
 * @description A customized toolbar.
 *
 * For example:
 * #### Example 1:
 * Using {@link updateMenu} to modify the toolbar configuration
 * ```typescript
 *     const toolbar = this.viewer.toolbar;
 *     toolbar.updateMenu(ToolbarMenuId.Viewpoint, { onActive: this.handleActive });
 *     toolbar.updateMenu(ToolbarMenuId.Annotation, { visible: false });
 * ```
 *
 * #### Example 2:
 * Using {@link addMenu} to add a new menu to the toolbar with specific position.
 * ```typescript
 *     const toolbar = this.viewer.toolbar;
 *     toolbar.addMenu(
 *         "newMenu",
 *         { icon: { default: "icon-new" }, menuName: "New menu item", controller: BimTreeController },
 *         [2, 5]
 *     );
 * ```
 *
 * #### Example 3:
 * Modify the configuration in to custmize the toolbar directly, and then {@link refresh} the whole toolbar.
 * ```typescript
 *     const toolbar = this.viewer.toolbar;
 *     const toolbarGroupConfig = [
 *         [ToolbarMenuId.OrthoMode, ToolbarMenuId.FullScreen],
 *         [ToolbarMenuId.Measure, ToolbarMenuId.Section],
 *         [ToolbarMenuId.BimTree, ToolbarMenuId.Viewpoint, ToolbarMenuId.Annotation, ToolbarMenuId.Property],
 *         [ToolbarMenuId.Setting, "newMenu"],
 *     ];
 *     toolbar.toolbarGroupConfig = toolbarGroupConfig;
 *     toolbar.refresh();
 * ```
 */
export declare class Toolbar {
    protected viewer: BaseViewer;
    protected element: HTMLDivElement | undefined;
    protected visible: boolean;
    activateMenuId?: string;
    menuList: Map<string, ToolbarMenu>;
    protected menuCfg: ToolbarConfig;
    protected groupCfg: ToolbarMenuId[][] | string[][];
    constructor(viewer: BaseViewer, menuCfg: ToolbarConfig, groupCfg?: ToolbarMenuId[][] | string[][]);
    private init;
    keydown: (e: KeyboardEvent) => void;
    clearActive(): void;
    setActive(menuId: string, active: boolean): void;
    private createToolbarMenu;
    /**
     * @description Modify the menu configuration and update the toolbar.
     * @param {ToolbarMenuId} menuId
     * @param {Partial<ToolbarMenuConfig>} config
     * @memberof Toolbar
     */
    updateMenu(menuId: ToolbarMenuId, config: Partial<ToolbarMenuConfig>): void;
    /**
     * @description Modify the menu configuration and update the toolbar.
     * @param {{ menuId: ToolbarMenuId; config: Partial<ToolbarMenuConfig> }[]} configs
     * @memberof Toolbar
     */
    updateMenus(configs: {
        menuId: ToolbarMenuId;
        config: Partial<ToolbarMenuConfig>;
    }[]): void;
    /**
     * @description Add a custmized menu to toolbar.
     * @param {string} menuId
     * @param {ToolbarMenuConfig} config
     * @param {[number, number]} [insertPosition]
     * @return {*}
     * @memberof Toolbar
     */
    addMenu(menuId: string, config: ToolbarMenuConfig, insertPosition?: [number, number]): void;
    /**
     * @description Update the whole toolbar element with the current configuration.
     * @memberof Toolbar
     */
    refresh(): void;
    show(): void;
    hide(): void;
    destroy(): void;
}
/**
 * @internal
 */
export declare class ToolbarMenu {
    private eventBus;
    active: boolean;
    element: HTMLDivElement;
    toolbar: Toolbar;
    markupToolbar?: Toolbar;
    menuId: string;
    constructor(viewer: BaseViewer, toolbar: Toolbar, menuId: string, cfg: ToolbarMenuConfig, parent?: ToolbarMenu);
    private createButton;
    setActive(active: boolean): void;
}
