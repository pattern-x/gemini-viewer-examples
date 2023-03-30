/**
 * Viewer events
 * TODO: dxf event asnd bim event
 */
export declare enum ViewerEvent {
    /**
     * Triggered when click viewer
     */
    MouseClicked = "MouseClicked",
    /**
     * Triggered when layout is changed.
     * It is specific for DxfViewer.
     */
    LayoutChanged = "LayoutChanged",
    /**
     * @internal
     */
    ModelLoaded = "ModelLoaded",
    /**
     * Triggered when rendered
     * @internal
     */
    RenderAfter = "RenderAfter",
    /**
     * Triggered when bimviewer switch camera
     * @internal
     */
    CameraChanged = "CameraChanged",
    /**
     * Triggered when a markup is clicked
     * @internal
     */
    /**
     * Triggered when markup feature is deactivated
     */
    MarkupDeactived = "MarkupDeactived",
    /**
     * Triggered when a markup is added
     */
    MarkupAdded = "MarkupAdded",
    /**
     * Triggered when a markup is updated
     */
    MarkupUpdated = "MarkupUpdated",
    /**
     * Triggered when a markup is removed
     */
    MarkupRemoved = "MarkupRemoved",
    /**
     * Triggered before a markup is being removed
     */
    BeforeRemoveMarkup = "BeforeRemoveMarkup"
}
