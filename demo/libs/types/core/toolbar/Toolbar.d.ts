import { BimViewer, DxfViewer, VRViewer } from "../viewers";
import { ToolbarConfig, ToolbarMenuId, ToolbarMenuConfig } from "./Toolbar.constants";
/**
 * @class Toolbar
 * @description A customized toolbar.
 *
 * For example:
 * #### Example 1:
 * Using {@link updateMenu} to modify the toolbar configuration
 * ```typescript
 *     const toolbar = this.bimViewer.toolbar;
 *     toolbar.updateMenu(ToolbarMenuId.Viewpoint, { onActive: this.handleActive });
 *     toolbar.updateMenu(ToolbarMenuId.Annotation, { visible: false });
 * ```
 *
 * #### Example 2:
 * Using {@link addMenu} to add a new menu to the toolbar with specific position.
 * ```typescript
 *     const toolbar = this.bimViewer.toolbar;
 *     toolbar.addMenu(
 *         "newMenu",
 *         { icon: { default: "icon-new" }, menuName: "新菜单", controller: BimTreeController },
 *         [2, 5]
 *     );
 * ```
 *
 * #### Example 3:
 * Modify the configuration in to custmize the toolbar directly, and then {@link refresh} the whole toolbar.
 * ```typescript
 *     const toolbar = this.bimViewer.toolbar;
 *     const toolbarGroupConfig = [
 *         [ToolbarMenuId.OrthoMode, ToolbarMenuId.FullScreen],
 *         [ToolbarMenuId.Measure, ToolbarMenuId.Section],
 *         [ToolbarMenuId.BimTree, ToolbarMenuId.Viewpoint, ToolbarMenuId.Annotation, ToolbarMenuId.Property],
 *         [ToolbarMenuId.Setting, "newMenu"],
 *     ];
 *     toolbar.toolbarGroupConfig = toolbarGroupConfig;
 *     toolbar.refresh();
 * ```
 * @internal
 */
declare class Toolbar<T extends BimViewer | DxfViewer | VRViewer> {
    private readonly bimViewer;
    readonly menuConfig: ToolbarConfig<T>;
    groupConfig: ToolbarMenuId[][] | string[][];
    private element;
    menuList: Map<string, ToolbarMenu<T>>;
    constructor(bimViewer: T, menuConfig: ToolbarConfig<T>, groupConfig?: ToolbarMenuId[][] | string[][]);
    private init;
    private createToolbarMenu;
    /**
     * @description Modify the menu configuration and update the toolbar.
     * @param {ToolbarMenuId} menuId
     * @param {Partial<ToolbarMenuConfig>} config
     * @memberof Toolbar
     */
    updateMenu(menuId: ToolbarMenuId, config: Partial<ToolbarMenuConfig<T>>): void;
    /**
     * @description Modify the menu configuration and update the toolbar.
     * @param {{ menuId: ToolbarMenuId; config: Partial<ToolbarMenuConfig> }[]} configs
     * @memberof Toolbar
     */
    updateMenus(configs: {
        menuId: ToolbarMenuId;
        config: Partial<ToolbarMenuConfig<T>>;
    }[]): void;
    /**
     * @description Add a custmized menu to toolbar.
     * @param {string} menuId
     * @param {ToolbarMenuConfig} config
     * @param {[number, number]} [insertPosition]
     * @return {*}
     * @memberof Toolbar
     */
    addMenu(menuId: string, config: ToolbarMenuConfig<T>, insertPosition?: [number, number]): void;
    /**
     * @description Update the whole toolbar element with the current configuration.
     * @memberof Toolbar
     */
    refresh(): void;
    deactivateMeasureMenu(): void;
    show(): void;
    hide(): void;
    destroy(): void;
}
/**
 * @internal
 */
export declare class ToolbarMenu<T extends BimViewer | DxfViewer | VRViewer> {
    private readonly bimViewer;
    private readonly toolbar;
    private readonly menuId;
    private eventBus;
    active: boolean;
    element: HTMLDivElement;
    constructor(bimViewer: T, toolbar: Toolbar<T>, menuId: string, cfg: ToolbarMenuConfig<T>, parent?: ToolbarMenu<T>);
    private createButton;
    setActive(active: boolean): void;
}
export { Toolbar };
