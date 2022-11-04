import * as THREE from "three";
import { CSS2DObject, CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
import { DxfViewer } from "../viewers/DxfViewer";
import { DxfViewerConfig } from "../Configs";
/**
 * @internal
 */
export declare type MakerImgUrl = {
    defaultUrl: string;
    hoverUrl: string;
    transformStyle?: string;
};
/**
 * OverviewMap class
 * @internal
 */
export declare class OverviewMap extends DxfViewer {
    cameraMarker?: CSS2DObject;
    cameraDirElement?: HTMLElement;
    cameraElement?: HTMLElement;
    private zoom;
    private _minZoomRadio;
    private _maxZoomRadio;
    private baseImageUuid?;
    transformMatrix?: THREE.Matrix4;
    rotateSpeed: number;
    tolerance: number;
    private isInitCameraZoom;
    private cameraDefaultUrl?;
    private cameraHoverUrl?;
    private dirDefaultUrl?;
    private dirHoverUrl?;
    private rotateStart;
    private translateStart;
    private cameraDirDivPos;
    private parentTranslate;
    private isMarkerRotating;
    private isMarkerTranslating;
    private resizeObserver?;
    private pointerMoveHandle?;
    private cameraDirPointerDownHandle?;
    private cameraPointerDownHandle?;
    private pointerUpHandle?;
    private dblClickHandle?;
    private wheelEventHandle?;
    private animationId?;
    private bbox;
    css2dRenderer?: CSS2DRenderer;
    constructor(viewerCfg: DxfViewerConfig);
    private initOverviewMap;
    get minZoomRadio(): number;
    set minZoomRadio(value: number);
    get maxZoomRadio(): number;
    set maxZoomRadio(value: number);
    private initCSS2DRenderer;
    private initResize;
    private initMarkerImageUrls;
    protected initControls(): void;
    protected initOthers(): void;
    protected initMouseWheel(): void;
    private initHoverMakerEvent;
    private initCameraMarkerEvents;
    private createImage;
    private initCameraPointMarker;
    private updateMarker;
    private computeObjectBoundingBox;
    protected resize(width: number, height: number): void;
    transfromToCurrentCoordinate(position: [number, number, number]): number[];
    /**
     * Loads image
     */
    loadImage(url: string, minX: number, maxX: number, minZ: number, maxZ: number, y?: number, resetCamera?: boolean): void;
    setTransformMatrix(matrix: number[]): void;
    reset(): void;
    goToHomeView(): void;
    updateBaseImage(url: string, minX: number, maxX: number, minZ: number, maxZ: number, y?: number, resetCamera?: boolean): void;
    /**
     * Updates the overviewmap picture
     * @internal
     */
    updateMarkerImage(dirImg: MakerImgUrl, cameraImg: MakerImgUrl): void;
    updateMarkerTransform(location?: [number, number, number], dir?: [number, number, number], scale?: [number, number, number], totalTime?: number): void;
    cancelAnimation(): void;
    getCameraMarkerDirection(): number[];
    getCameraMarkerPosition(): number[] | undefined;
    dollyIn(zoomDelta?: number): void;
    dollyOut(zoomDelta?: number): void;
    protected animate(): void;
}
