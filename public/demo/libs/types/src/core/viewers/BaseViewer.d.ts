import type { TFunction } from "i18next";
import * as THREE from "three";
import { OrbitControls as ThreeJsOrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { BaseViewerConfig, CameraConfig } from "../Configs";
import { CanvasRender } from "../canvas";
import { VRControls } from "../controls";
import { OrbitControls } from "../controls/OrbitControls";
import { Event } from "../utils";
/**
 * @internal
 */
export declare abstract class BaseViewer extends Event {
    /**
     * @internal
     */
    translate: TFunction;
    /**
     * @internal
     */
    viewerContainer?: HTMLElement;
    /**
     * @internal
     */
    scene?: THREE.Scene;
    /**
     * @internal
     */
    renderer?: THREE.WebGLRenderer;
    /**
     * @internal
     */
    camera?: THREE.Camera;
    /**
     * @internal
     */
    controls?: OrbitControls | ThreeJsOrbitControls | VRControls;
    protected height: number;
    protected width: number;
    /**
     * @internal
     */
    widgetContainer?: HTMLElement;
    protected viewerCfg: BaseViewerConfig;
    cameraCfg?: CameraConfig;
    /**
     * @internal
     */
    groundPlane?: THREE.Mesh;
    /**
     * @describe overlay canvas
     * @internal
     */
    overlayRender?: CanvasRender;
    protected enableOverlayRenderer: boolean;
    constructor(viewerCfg: BaseViewerConfig);
    private initLocalization;
    /**
     * Creates a viewerContainer under the container that user passed in.
     * There are some benifits to create a new one. e.g., its style won't affect
     * the container div user passed in.
     */
    private initViewerContainer;
    private initWidgetContainer;
    destroy(): void;
    enableRender(): void;
    getRaycaster(): THREE.Raycaster | undefined;
    getRaycastableObjectsByMouse(event?: MouseEvent | TouchEvent): THREE.Object3D[];
    getBBox(): THREE.Box3 | undefined;
    flyTo(position: THREE.Vector3, lookAt: THREE.Vector3): void;
    /**
     * If it is a 3d viewer.
     * DxfViewer is 2d, thus returns false.
     * @default true
     */
    is3d(): boolean;
    deactivateMeasurement(): void;
}
