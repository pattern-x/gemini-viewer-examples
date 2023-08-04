import * as dat from "dat.gui";
import { Plugin, type BimViewer } from "../../core/viewers";
/**
 * @internal
 */
export declare class BimViewerDatGuiPlugin extends Plugin {
    protected viewer: BimViewer;
    gui?: dat.GUI;
    /**
     *
     * @param viewer pass in the Viewer3D, so we can reference its data members
     */
    constructor(viewer: BimViewer);
    /**
     * Defined all controls here, which will be displyed in dat.GUI
     * Color should follow these formats:
     * '#ffffff', [0, 0, 0], [0, 0, 0, 0.5], \{ h: 100, s: 0.9, v: 0.3 \}
     */
    readonly controls: {
        showGroundGrid: boolean;
        showGroundGrass: boolean;
        skyMode: string[];
        environments: string[];
        homeView: () => void;
        views: string[];
        OrthographicCamera: boolean;
        viewpoints: boolean;
        annotations: boolean;
        takeSnapshot: () => void;
        fullScreen: () => void;
        webcam: boolean;
        uploadFile: () => void;
        showBimTree: boolean;
        showPropertyPanel: boolean;
        transparentMode: boolean;
        showVertexNormals: boolean;
        explode: number;
        sectionMode: string[];
        alVisible: boolean;
        alColor: string;
        alIntensity: number;
        dlColor: string;
        showDlHelper: boolean;
        hlVisible: boolean;
        hlIntensity: number;
        hlColor: number[];
        hlGroundColor: number[];
        fogEnabled: boolean;
        fogColor: number;
        fogNearDistance: number;
        fogFarDistance: number;
        composerEnabled: boolean;
        renderPassEnabled: boolean;
        fxaaEnabled: boolean;
        saoEnabled: boolean;
        ssaoEnabled: boolean;
        outlineEnabled: boolean;
        ssaaEnabled: boolean;
        bloomEnabled: boolean;
        unrealBloomEnabled: boolean;
        enableFastOperation: boolean;
        distanceCullingFactor: number;
    };
    /**
     * Init dat.GUI
     */
    init(): void;
    open(): void;
    close(): void;
    destroy(): void;
}
