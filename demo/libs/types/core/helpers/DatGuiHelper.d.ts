import * as dat from "dat.gui";
import { BimViewer } from "../viewers/BimViewer";
import { DxfViewer } from "../viewers/DxfViewer";
import { Exploder } from "../exploder/Exploder";
import { VRViewer } from "..";
/**
 * @internal
 */
export declare class DatGuiHelper {
    viewer: BimViewer | undefined;
    gui?: dat.GUI;
    exploderDict?: {
        [objId: number]: Exploder;
    };
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
        showGrassGround: boolean;
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
        sectionMode: string[];
        alVisible: boolean;
        alColor: string;
        alIntensity: number;
        alCastShadow: boolean;
        dlVisible: boolean;
        dlColor: string;
        dlIntensity: number;
        dlCastShadow: boolean;
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
    };
    /**
     * Init dat.GUI
     */
    init(): void;
    private setExplodeMode;
    open(): void;
    close(): void;
    beforeDestroy(): void;
}
/**
 * @internal
 */
export declare class VRViewerDatGuiHelper {
    viewer: VRViewer | undefined;
    gui?: dat.GUI;
    constructor(viewer: VRViewer);
    /**
     * Defined all controls here, which will be displyed in dat.GUI
     * Color should follow these formats:
     * '#ffffff', [0, 0, 0], [0, 0, 0, 0.5], \{ h: 100, s: 0.9, v: 0.3 \}
     */
    readonly controls: {
        fullScreen: () => void;
    };
    /**
     * Init dat.GUI
     */
    init(): void;
    open(): void;
    close(): void;
    beforeDestroy(): void;
}
/**
 * @internal
 */
export declare class DxfViewerDatGuiHelper {
    viewer: DxfViewer | undefined;
    gui?: dat.GUI;
    constructor(viewer: DxfViewer);
    /**
     * Defined all controls here, which will be displyed in dat.GUI
     * Color should follow these formats:
     * '#ffffff', [0, 0, 0], [0, 0, 0, 0.5], \{ h: 100, s: 0.9, v: 0.3 \}
     */
    controls: Record<string, any>;
    /**
     * Init dat.GUI
     */
    init(): void;
    open(): void;
    close(): void;
    beforeDestroy(): void;
}
