export declare class Container {
    width: number;
    height: number;
    container: HTMLDivElement;
    viewerContainer?: HTMLDivElement;
    widgetContainer?: HTMLDivElement;
    constructor(containerId: string);
    /**
     * Creates a viewerContainer under the container that user passed in.
     * There are some benefits to create a new one. e.g., its style won't affect
     * the container div user passed in.
     */
    private initViewerContainer;
    /**
     *
     * @description Create a div for ui widget, if widget need position, just relative container, maybe remove later.
     */
    private initWidgetContainer;
    get needResize(): boolean;
    destroy(): void;
}
