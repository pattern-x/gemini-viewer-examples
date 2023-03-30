import { TilesRenderer } from "3d-tiles-renderer";
import * as THREE from "three";
import { Settings as SettingsType } from "../../components/settings";
import { Toolbar } from "../../components/toolbar";
import { BimViewerConfig, CameraConfig, ModelConfig } from "../../core/Configs";
import { SectionType } from "../../core/Constants";
import { Drawable } from "../../core/canvas";
import { EventInfo } from "../../core/input/InputManager";
import { MeasurementData, MeasurementManager, MeasurementType } from "../../core/measure";
import { BaseViewer, ViewerName } from "../../core/viewers/BaseViewer";
export declare class BimViewer extends BaseViewer {
    /**
     * @internal
     */
    name: ViewerName;
    private timer;
    /**
     * @internal
     */
    ambientLight?: THREE.AmbientLight;
    /**
     * @internal
     */
    directionalLight?: THREE.DirectionalLight;
    /**
     * @internal
     */
    hemisphereLight?: THREE.HemisphereLight;
    /**
     * @internal
     */
    selectedObject: any | Drawable | undefined;
    /**
     * @internal
     */
    groundGrid?: THREE.Line;
    /**
     * @internal
     */
    grassGround?: THREE.Mesh;
    /**
     * @internal
     */
    sceneBackgroundColor: THREE.Color;
    /**
     * @internal
     */
    skyOfGradientRamp?: THREE.Mesh;
    private stats?;
    /**
     * @internal
     */
    loadedModels: {
        [src: string]: {
            id: number;
            bbox?: THREE.BoxHelper;
        };
    };
    /**
     * @internal
     */
    loaded3dTiles: {
        [src: string]: {
            id: number;
            bbox: THREE.Box3;
            renderer: TilesRenderer;
        };
    };
    /**
     * @internal
     */
    pmremGenerator?: THREE.PMREMGenerator;
    private perspectiveCamera?;
    private orthoCamera?;
    private perspectiveCameraControls?;
    private orthoCameraConrols?;
    private composerRenderEnabled;
    private composerEnabled;
    private composer?;
    private renderPass?;
    private effectFxaaPass?;
    private ssaoPass?;
    private saoPass?;
    private outlinePass?;
    private ssaaRenderPass?;
    private bloomPass?;
    private unrealBloomPass?;
    private raycaster?;
    private cameraUpdateInterval?;
    private savedMaterialsForOpacity?;
    private section?;
    /**
     * @internal
     */
    sectionType?: string;
    private sectionManager?;
    private measurementManager?;
    private zoomToRectHelper?;
    private datGui?;
    private shadowCameraHelper?;
    private directionalLightHelper?;
    private webcam?;
    private webcamPlane?;
    private raf?;
    private clock;
    private renderEnabled;
    private timeoutSymbol?;
    private isFrustumInsectChecking;
    private lastFrameExecuteTime;
    private maxFps;
    private settings;
    private spinner?;
    private jobCount;
    private contextMenu?;
    private navCube?;
    private axes?;
    private axesInScene?;
    private twoDModelCount;
    private vertexNormalsHelpers?;
    /**
     * @internal
     */
    toolbar?: Toolbar<BimViewer>;
    private bottomBar?;
    /**
     * @internal
     */
    private bbox;
    private anchor?;
    private lastOrbPoint?;
    constructor(viewerCfg: BimViewerConfig, cameraCfg?: CameraConfig);
    /**
     * Initialize everything it needs
     * @internal
     */
    init(): void;
    private initThree;
    private initDom;
    private initScene;
    private initRenderer;
    private initCamera;
    private initControls;
    private initRotateToCursor;
    private onResize;
    private onKeyDown;
    private initLights;
    /**
     * Initialize mouse/pointer events
     */
    private initEvents;
    private initDatGui;
    private initSpinner;
    private initOthers;
    private initNavCube;
    private initAxes;
    private initStats;
    private initContextMenu;
    private initToolbar;
    private initBottomBar;
    /**
     * If there is any 2d model loaded
     * @internal
     */
    get has2dModel(): boolean;
    private showContextMenu;
    private handleRightClick;
    private sycnCameraPosition;
    private sycnControls;
    setToOrthographicCamera(isOrthCamera?: boolean): void;
    protected animate(): void;
    private update3dTiles;
    /**
     * This is a method called in animate() in order to optimize rendering speed.
     * The idea is to hide any model out of view frustrum.
     */
    private frustrumCullingByModelBBox;
    /**
     * In order to have a better performance, it should only render when necessary.
     * Usually, we should enable render for these cases:
     *  - Anything added to, removed from scene, or objects' position, scale, rotation, opacity, material, etc. changed
     *  - Anything selected/unselected
     *  - Camera changed
     *  - Render area resized
     * @internal
     */
    enableRender: (time?: number) => void;
    destroy(): void;
    /**
     * Loads a 3d model from local
     * @internal
     */
    loadLocalModel(url: string, modelCfg: ModelConfig, manager?: THREE.LoadingManager, onProgress?: (event: ProgressEvent) => void): Promise<void>;
    /**
     * Loads a 3d model
     */
    loadModel(modelCfg: ModelConfig, onProgress?: (event: ProgressEvent) => void): Promise<void>;
    /**
     * Loads 3dtiles
     * TODO: Temporarily does not support 3dtiles version 1.0 above
     * The coordinate system is not processed yet
     * @internal
     */
    load3dTiles(modelCfg: ModelConfig): Promise<void>;
    /**
     * Applies options and add object to scene.
     */
    private applyOptionsAndAddToScene;
    /**
     * Add newly added object to scene.
     * Also, usually(but not always) we should regenerate sky and go to home view
     * @param object
     */
    private addLoadedModelToScene;
    /**
     * We won't set a opacity directly, because that way will lose model's original opacity value
     * @param isAdd is add or remove the opacity we added
     * @param opacity
     * @internal
     */
    addOrRemoveObjectOpacity(isAdd?: boolean, opacity?: number, includeObjectIds?: number[], excludeObjectIds?: number[]): void;
    /**
     * @internal
     */
    hasTransparentObject(): boolean;
    /**
     * @internal
     */
    showVertexNormals(show: boolean, size?: number): void;
    protected resize(width?: number, height?: number): void;
    /**
     * @internal
     */
    getRaycaster(): THREE.Raycaster | undefined;
    /**
     * @internal
     */
    getRaycastableObjectsByMouse(event?: EventInfo): THREE.Object3D[];
    private getRaycastableObjects;
    /**
     * Gets intersections by given mouse location.
     * If no MouseEvent is passed in, use (0, 0) as the raycaster's origin.
     */
    private getIntersections;
    private getAllIntersections;
    /**
     * Handles mouse click event
     */
    private handleMouseClick;
    /**
     * Select or unselect an object.
     * It doesn't support selecting more than one objects.
     * It doesn't support selecting a parent object which doesn't have material itself.
     * In order to support de-select, we'll need to store some information, we do this via userData:
     * For InstancedMesh, there are two cases:
     * 1) One Mesh in InstancedMesh is selected
     * it adds following to selected object: userData \{
     *   instanceId: number,
     *   originalMatrix: THREE.Matrix4,
     *   clonedMesh: THREE.Mesh
     * \}
     * 2) The whole InstancedMesh is selected. This case is no different from a normal Mesh is selected, so:
     * For Mesh, it adds: userData \{
     *   originalMaterial: THREE.Material
     * \}
     * @param object
     * @param instanceId pass in instanceId if an InstancedMesh is selected
     * @param depthTest set to false if caller want to make sure user can see it. When an object is
     * selected by user manually, we don't need to make sure user can see it. While if selection is
     * made by program, we parbably need to make sure user can see it, in other words, the selected
     * object won't be blocked by other objects.
     * @internal
     */
    selectObject(object?: THREE.Object3D | Drawable, instanceId?: number, batchId?: number, depthTest?: boolean | undefined): void;
    /**
     * Clears the current selection
     */
    clearSelection(): void;
    /**
     * Gets bounding box
     * @internal
     */
    getBBox(): THREE.Box3 | undefined;
    /**
     * Make camera fly to objects
     */
    protected flyToObjects(objects: THREE.Object3D[]): void;
    /**
     * Make camera fly to an object
     * @internal
     */
    flyToObject(object: THREE.Object3D): void;
    /**
     * Flies to current selected object if any
     */
    protected flyToSelectedObject(): void;
    /**
     * Flies to a random object (by alt + r).
     * It is useful when either the data is wrong or there is bug in program,
     * then we cannot see anything in the scene!
     */
    protected flyToRandomObject(): void;
    /**
     * Make camera fly to target position with given lookAt position
     * @param position camera's target position
     * @param lookAt camera's new lookAt position
     */
    flyTo(position: THREE.Vector3, lookAt: THREE.Vector3): void;
    /**
     * Fits the camera to view all objects in scene
     */
    viewFitAll(): void;
    /**
     * Goes to home view
     */
    goToHomeView(): void;
    zoomToBBox(bbox: THREE.Box3): void;
    /**
     * Tries to adjust camera near/far clip plane according to objects size in scene.
     * Do this to avoid the case when objects are too small or big thus clipped!
     */
    private tryAdjustCameraNearAndFar;
    private tryAdjustDirectionalLight;
    /**
     * @internal
     */
    updateDirectionalLight(): void;
    private updateDirectionalLightShadow;
    /**
     * @internal
     */
    showDirectionalLightHelper(visible: boolean): void;
    /**
     * Regenerates skybox according to models' location and size
     */
    private regenSkyOfGradientRamp;
    /**
     * Regenerates ground grid according to models' location and size
     */
    private regenGroundGrid;
    /**** Anchor rotation related interface start ****/
    private setOrbitPoint;
    private onAnchorPointerDown;
    private setAnchorPosition;
    private createAnchor;
    private disposeAnchor;
    private onAnchorPointerUp;
    private disposeRotateToCursor;
    /******* Anchor rotation related interface end *********/
    /**
     * Enables or disable Composer
     * @internal
     */
    enableComposer(enable: boolean): void;
    /**
     * Enables or disable RenderPass
     * @internal
     */
    enableRenderPass(enable: boolean): void;
    /**
     * Enables or disable FxaaPass
     * @internal
     */
    enableFxaaPass(enable: boolean): void;
    /**
     * Enables or disable SAOPass
     * @internal
     */
    enableSaoPass(enable: boolean): void;
    /**
     * Enables or disable SSAOPass
     * @internal
     */
    enableSsaoPass(enable: boolean): void;
    /**
     * Enables or disable OutlinePass
     * @internal
     */
    enableOutlinePass(enable: boolean): void;
    /**
     * Enables or disable SSAARenderPass
     * @internal
     */
    enableSsaaPass(enable: boolean): void;
    /**
     * Enables or disable BloomPass
     * @internal
     */
    enableBloomPass(enable: boolean): void;
    /**
     * Enables or disable UnrealBloomPass
     * @internal
     */
    enableUnrealBloomPass(enable: boolean): void;
    /**
     * Enable section.
     * Currently, it only implemented local(object) box section.
     */
    activateSection(type?: SectionType): void;
    /**
     * Deactivates section
     */
    deactivateSection(): void;
    /**
     * @internal
     */
    getActiveSection(): import("../../core/section").BaseSection | undefined;
    /**
     * @internal
     */
    getMeasurementManager(): MeasurementManager | undefined;
    /**
     * Gets measurement data
     * @internal
     */
    getMeasurements(): MeasurementData[];
    /**
     * Activates one of "Distance", "Area" or "Angle" measurement
     * @param type "Distance", "Area" or "Angle"
     */
    activateMeasurement(type: MeasurementType): void;
    /**
     * Deactivates measurement
     */
    deactivateMeasurement(): void;
    /**
     * @internal
     */
    setMeasurementVisibility(id: string, visible: boolean): boolean;
    /**
     * Clears all measurement results
     */
    clearMeasurements(): void;
    /**
     * Zooms to selected box area.
     */
    zoomToRect(): void;
    /**
     * @internal
     */
    deactivateZoomRect(): void;
    /**
     * @internal
     */
    enableWebCam(): void;
    /**
     * @internal
     */
    disableWebCam(): void;
    /**
     * Sets environment for the scene.
     * @param hdrUrl Full path of picture url in hdr format
     */
    setEnvironment(hdrUrl: string): void;
    /**
     * Sets environment for the scene.
     * @param data Uint16Array of the hdr content
     * @internal
     */
    setEnvironmentFromDataArray(data?: Uint16Array): void;
    takeObjectsScreenshot(uniqueIds: string[]): Promise<unknown>;
    /**
     * Updates raycaster threshold to a proper value, so user can easily pick points and lines
     */
    private updateRaycasterThreshold;
    /**
     * Instatiates leaf nodes of given object.
     * If objects' geometry and material are the same, they can be instanced.
     * @param object
     */
    private instantiate;
    /**
     * Merges leaf nodes of given object.
     * If objects' materials are the same, they can be merged.
     * @param object
     */
    private merge;
    /**
     * Sets spinner visibility
     */
    protected setSpinnerVisibility(visible: boolean): void;
    /**
     * Increases job count, and show spinner accordingly
     * @internal
     */
    increaseJobCount(): void;
    /**
     * Decreases job count, and hide spinner accordingly
     * @internal
     */
    decreaseJobCount(): void;
    /**
     * Updates project settings
     * @internal
     */
    updateProjectSettings(settings: SettingsType): void;
    private dynamicallyUpdateControllerTarget;
    /**
     * Compute bounding box of loaded models
     * @internal
     */
    computeBoundingBox(): THREE.Box3;
}
