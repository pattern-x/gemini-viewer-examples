import * as THREE from "three";
import { BimViewerConfig, CameraConfig } from "../Configs";
import { Toolbar } from "../toolbar";
import { SectionMode } from "../Constants";
import { MeasurementType } from "../measure/";
import { ModelConfig } from "../Configs";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Settings as SettingsType } from "../../components/settings/ProjectSettingsDef";
export declare class BimViewer {
    private timer;
    /**
     * @internal
     */
    translate: import("i18next").TFunction;
    /**
     * @internal
     */
    container: HTMLElement;
    /**
     * @internal
     */
    camera?: THREE.PerspectiveCamera | THREE.OrthographicCamera;
    /**
     * @internal
     */
    scene: THREE.Scene;
    /**
     * @internal
     */
    renderer?: THREE.WebGLRenderer;
    protected enableSVGRenderer: boolean;
    private svgRenderer?;
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
    controls?: OrbitControls;
    /**
     * @internal
     */
    selectedObject: any | undefined;
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
            uuid: string;
            bbox?: THREE.BoxHelper;
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
    private height;
    private width;
    private raycaster?;
    private cameraUpdateInterval?;
    private savedMaterialsForOpacity?;
    private mouseMoved;
    private mouseDoubleClicked;
    private section?;
    /**
     * @internal
     */
    sectionMode?: string;
    private measurementManager?;
    private datGui?;
    private webcam?;
    private webcamPlane?;
    private raf?;
    private renderEnabled;
    private svgRenderEnabled;
    private timeoutSymbol?;
    private isFrustumInsectChecking;
    private lastFrameExecuteTime;
    private maxFps;
    private events;
    private settings;
    private spinner?;
    private jobCount;
    /**
     * @internal
     */
    rootHtmlElement: HTMLElement;
    private contextMenu?;
    private navCube?;
    private axes?;
    private twoDModelCount;
    private vertexNormalsHelpers?;
    /**
     * @internal
     */
    toolbar?: Toolbar<BimViewer>;
    private bottomBar?;
    private bimViewerCfg;
    /**
     * @internal
     */
    bbox: THREE.Box3;
    /**
     * @internal
     */
    cameraCfg?: CameraConfig;
    constructor(bimViewerCfg: BimViewerConfig, cameraCfg?: CameraConfig);
    /**
     * Initialize everything it needs
     * @internal
     */
    init(): void;
    private initContainer;
    private initScene;
    private initRenderer;
    private initCamera;
    private initControls;
    private initRootHtmlElement;
    private onResize;
    private onControlsChange;
    private onKeyDown;
    /**
     * When 'pointerup' event is triggered, we don't know if it is a dblclick.
     * So, need to wait for 200ms etc. to see if there is another mouse click.
     * @internal
     */
    onPointerUp(viewer: BimViewer, event: MouseEvent): () => void;
    private initLights;
    /**
     * Initialize mouse/pointer events
     */
    private initPointerEvents;
    private initDatGui;
    private initSpinner;
    private initOthers;
    private initLocalization;
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
    /**
     * In order to have a better performance, it should only render when necessary.
     * Usually, we should enable render for these cases:
     *  - measurements
     * @internal
     */
    enableSVGRender: (time?: number) => void;
    destroy(): void;
    /**
     * Loads a 3d model from local
     * @internal
     */
    loadLocalModel(url: string, modelCfg: ModelConfig, onProgress?: (event: ProgressEvent) => void): Promise<void>;
    /**
     * Loads a 3d model
     */
    loadModel(modelCfg: ModelConfig, onProgress?: (event: ProgressEvent) => void): Promise<void>;
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
     */
    addOrRemoveObjectOpacity(isAdd?: boolean, opacity?: number, includeObjectUuids?: string[], excludeObjectUuids?: string[]): void;
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
    getRaycastableObjects(): THREE.Object3D[];
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
     */
    selectObject(object?: THREE.Object3D, instanceId?: number, batchId?: number, depthTest?: boolean | undefined): void;
    /**
     * Clears the current selection
     */
    clearSelection(): void;
    /**
     * Make camera fly to objects
     */
    protected flyToObjects(objects: THREE.Object3D[]): void;
    /**
     * Make camera fly to an object
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
    flyTo(position: THREE.Vector3, lookAt: THREE.Vector3, onCompleteCallback?: () => void): void;
    /**
     * Fits the camera to view all objects in scene
     */
    viewFitAll(): void;
    /**
     * Goes to home view
     */
    goToHomeView(): void;
    /**
     * Tries to adjust camera near/far clip plane according to objects size in scene.
     * Do this to avoid the case when objects are too small or big thus clipped!
     */
    private tryAdjustCameraNearAndFar;
    /**
     * Regenerates skybox according to models' location and size
     */
    private regenSkyOfGradientRamp;
    /**
     * Regenerates ground grid according to models' location and size
     */
    private regenGroundGrid;
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
    enableSection(sectionMode?: SectionMode): void;
    disableSection(): void;
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
     * Clears all measurement results
     */
    clearMeasurements(): void;
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
     * @internal
     */
    setSpinnerVisibility(visible: boolean): void;
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
     * Calls addEventListener of a node.
     * This makes sure to removeEventListener properly
     * @param node window, dom element, etc.
     * @param type 'change', 'keydown', etc.
     * @param func event callback
     */
    private addEvent;
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
