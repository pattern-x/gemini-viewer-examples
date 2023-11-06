import * as THREE from "three";
import { Settings as SettingsType } from "../../components/settings";
import { BimViewerConfig, CameraConfig, ModelConfig } from "../../core/Configs";
import { SectionType, Vector3 } from "../../core/Constants";
import { Drawable } from "../../core/canvas";
import { FontManager } from "../../core/font";
import { EventInfo } from "../../core/input/InputManager";
import { Model3d, ModelData3d } from "../../core/model";
import { BaseViewer } from "../../core/viewers/BaseViewer";
import { MeasurementData, MeasurementPlugin, MeasurementType } from "../../plugins/measure";
import { SectionPlugin } from "../../plugins/sections";
export declare class BimViewer extends BaseViewer {
    /**
     * @internal
     */
    name: any;
    private timer;
    protected fontManager?: FontManager;
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
    enableSelection: boolean;
    /**
     * @internal
     */
    selectedObject: any | Drawable | undefined;
    /**
     * @internal
     */
    loadedModels: Model3d[];
    /**
     * @internal
     */
    pmremGenerator?: THREE.PMREMGenerator;
    private perspectiveCamera?;
    private orthoCamera?;
    private perspectiveCameraControls?;
    private orthoCameraConrols?;
    private css2dRenderer?;
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
    /**
     * @internal
     */
    sectionType?: string;
    private zoomToRectHelper?;
    private shadowCameraHelper?;
    private directionalLightHelper?;
    private webcam?;
    private webcamPlane?;
    private raf?;
    private clock;
    private renderEnabled;
    private timeoutSymbol?;
    private enableModelLevelFrustumCulling;
    private isFrustumInsectChecking;
    private settings;
    private twoDModelCount;
    private vertexNormalsHelpers?;
    enableFastOperation: boolean;
    private operationTimeout?;
    private edgesVisible;
    /**
     * @internal
     */
    distanceCullingFactor: number;
    /**
     * @internal
     */
    operationTimeoutMs: number;
    /**
     * @internal
     */
    private bbox;
    enableAnchorPointer: boolean;
    private anchor?;
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
    private initCSS2DRenderer;
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
    private initOthers;
    private initLoadingProgressBar;
    private sycnCameraAndControls;
    /**
     * Sets to orthographic or perspective camera.
     * @param toOrtho Set to orthographic camera if true.
     * @returns
     */
    setToOrthographicCamera(toOrtho?: boolean): void;
    protected animate(): void;
    private update3dTiles;
    /**
     * This is a method called in animate() in order to optimize rendering speed.
     * The idea is to hide any model out of view frustum.
     * This should have a better performance than THREE's frustum culling, because we did it in
     * model level to avoid iterating all its objects.
     */
    private frustumCullingByModelBBox;
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
     * Sets font.
     * This needs to be called before loading a dxf, it won't affect any loaded text.
     * It accepts shx or typeface formats. For typeface, it only support passing in 1 font file in the array for now.
     * @param urls font file urls
     */
    setFont(urls: string[]): Promise<void>;
    /**
     * Sets decoder path for draco loader.
     * Draco decoder will be used if a model is draco encoded.
     * @param decoderPath e.g., "libs/draco/gltf/"
     * @internal
     */
    setDracoDecoderPath(path: string): void;
    /**
     * Applies options and add object to scene.
     */
    private applyOptionsAndAddToScene;
    /**
     *
     * @param model
     * @returns
     * @description Add model data to viewer.
     */
    addModel(model: ModelData3d): void;
    private calculateMeshSurfaceArea;
    setAllModelTransparent(opacity: number): void;
    clearAllModelTransparent(): void;
    setObjectTransparent(object: THREE.Object3D, opacity: number): void;
    clearObjectTransparent(object: THREE.Object3D): void;
    setOthersObjectTransparent(object: THREE.Object3D): void;
    setModelTransparent(modelId: string): void;
    clearModelTransparent(modelId: string): void;
    setObjectVisible(object: THREE.Object3D, visible: boolean): void;
    hideOthersObject(object: THREE.Object3D): void;
    setModelVisible(modelId: string, visible: boolean): void;
    setAllModelVisible(visible: boolean): void;
    /**
     * @internal
     */
    showVertexNormals(show: boolean, size?: number): void;
    protected resize(width: number, height: number): void;
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
    private getClickedObject;
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
     * Enables/disables model edges.
     */
    enableModelEdges(enable: boolean, onProgress?: (event: ProgressEvent) => void): Promise<void>;
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
     * Flies to a random object (by "R" key).
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
     * Triggered when there is any operation, like pan, rotate, zoom, etc.
     * We'll do these at this time:
     * - Enable distance culling
     * - Hide object edge if there is
     * - Disable shadow
     */
    protected onOperation: () => void;
    /**
     * @description Compatible with older versions, use SectionPlugin instead
     * @internal
     * @deprecated use SectionPlugin instead
     */
    get sectionPlugin(): SectionPlugin | undefined;
    /**
     * Enable section.
     * Currently, it only implemented local(object) box section.
     * @deprecated use SectionPlugin instead
     */
    activateSection(type?: SectionType): void;
    /**
     * Deactivates section
     * @deprecated use SectionPlugin instead
     */
    deactivateSection(): void;
    /**
     * @internal
     * @deprecated use SectionPlugin instead
     */
    getActiveSection(): import("../../plugins/sections").BaseSection | undefined;
    /**
     * @description Compatible with older versions, use MeasurePlugin instead
     * @internal
     * @description use MeasurementPlugin instead
     * @deprecated use MeasurePlugin instead
     */
    get measurePlugin(): MeasurementPlugin | undefined;
    /**
     * Gets measurement data
     * @internal
     */
    getMeasurements(): MeasurementData[];
    /**
     * Activates one of "Distance", "Area" or "Angle" measurement
     * @param type "Distance", "Area" or "Angle"
     * @deprecated use MeasurePlugin instead
     */
    activateMeasurement(type: MeasurementType): void;
    /**
     * Deactivates measurement
     * @deprecated use MeasurePlugin instead
     */
    deactivateMeasurement(): void;
    /**
     * @internal
     * @deprecated use MeasurePlugin instead
     */
    setMeasurementVisibility(id: string, visible: boolean): boolean;
    /**
     * Clears all measurement results
     * @deprecated use MeasurePlugin instead
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
    /**
     * @internal
     */
    takeObjectsScreenshot(uniqueIds: string[]): Promise<unknown>;
    /**
     * Sets object to a specific color. Note that:
     * - The change is permanent, and cannot be recovered to the original color or material.
     * - If a material is shared, it may affect other objects.
     * @param color A color number in format of "0x000000"
     * @internal
     */
    setObjectColor(object: THREE.Object3D, color: number): void;
    /**
     * Updates raycaster threshold to a proper value, so user can easily pick points and lines
     */
    private updateRaycasterThreshold;
    /**
     * Merges leaf nodes of given object.
     * If objects' materials are the same, they can be merged.
     * TODO: change merge() and MergeUtils.deepMerge to async
     * @param object
     */
    private merge;
    /**
     * Updates project settings
     * @internal
     */
    updateProjectSettings(settings: SettingsType): void;
    /**
     * Compute bounding box of loaded models
     * @internal
     */
    computeBoundingBox(): THREE.Box3;
    /**
     * Sets distance culling factor in order to improve performance.
     * 0 means distance culling is disabled.
     * 100 means a 1x1 squre mesh is visible within 100.
     * @internal
     */
    setDistanceCullingFactor(val: number): void;
    /**
     * Gets distance culling factor.
     * @internal
     */
    getDistanceCullingFactor(): number;
    /**
     * Gets camera position and direction.
     */
    getCameraPositionAndDirection(): {
        position: Vector3;
        direction: Vector3;
    } | undefined;
}
