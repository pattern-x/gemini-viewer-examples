import { Font } from "three/examples/jsm/loaders/FontLoader.js";
import { DxfModelConfig, DxfViewerConfig } from "../../core/Configs";
import { DxfChange } from "../../core/dxf";
import { DxfViewer } from "../../core/viewers/DxfViewer";
export declare class DxfCompareHelper {
    viewer1: DxfViewer;
    viewer2: DxfViewer;
    protected font?: Font;
    private loader;
    private loadingManager?;
    protected changes?: Record<string, DxfChange>;
    private container;
    private spinner?;
    protected jobCount: number;
    private loadingProgressBar?;
    constructor(viewerConfig1: DxfViewerConfig, viewerConfig2: DxfViewerConfig);
    protected initSpinner(): void;
    setFont(urls: string[]): Promise<void>;
    compare(model1: DxfModelConfig, model2: DxfModelConfig, onProgress?: (event: ProgressEvent) => void): Promise<void>;
    getCompareChanges(): Record<string, DxfChange> | undefined;
    zoomToCompareChange(changeId: number): void;
    /**
     * Sets spinner visibility
     */
    protected setSpinnerVisibility(visible: boolean): void;
    /**
     * Increases job count, and show spinner accordingly
     */
    protected increaseJobCount(): void;
    /**
     * Decreases job count, and hide spinner accordingly
     */
    protected decreaseJobCount(): void;
}
