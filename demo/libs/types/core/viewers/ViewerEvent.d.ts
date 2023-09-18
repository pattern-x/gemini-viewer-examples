/**
 * Viewer events
 * TODO: dxf event and bim event
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
     * TODO:bimviewer need too.
     * Triggered when a model is loaded.
     */
    ModelLoaded = "ModelLoaded",
    /**
     * Triggered before rendered.
     */
    BeforeRender = "BeforeRender",
    /**
     * Triggered when rendered
     * @internal
     */
    AfterRender = "AfterRender",
    /**
     * Triggered when animate() is executed.
     * @internal
     */
    OnAnimate = "OnAnimate",
    /**
     * Triggered when bimviewer switch camera
     * @internal
     */
    CameraChanged = "CameraChanged",
    /**
     * Triggered when box select activated
     */
    BoxSelectActivated = "BoxSelectActivated",
    /**
     * Triggered when box select deactivated
     */
    BoxSelectDeactivated = "BoxSelectDeactivated",
    /**
     * Triggered when pick markup activated
     */
    PickMarkupActivated = "PickMarkupActivated",
    /**
     * Triggered when pick markup deactivated
     */
    PickMarkupDeactivated = "PickMarkupDeactivated",
    MarkupActivated = "MarkupActivated",
    /**
     * Triggered when markup feature is deactivated
     */
    MarkupDeactivated = "MarkupDeactivated",
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
    BeforeRemoveMarkup = "BeforeRemoveMarkup",
    MeasurementActivated = "MeasurementActivated",
    MeasurementDeactivated = "MeasurementDeactivated",
    /**
     * Triggered when a measure is added
     */
    MeasurementAdded = "MeasurementAdded",
    /**
     * Triggered when a measure is removed
     */
    MeasurementRemoved = "MeasurementRemoved"
}
