import { TilesRenderer } from "3d-tiles-renderer";
import { find, get, includes, merge } from "lodash";
import * as THREE from "three";
import { VertexNormalsHelper } from "three/examples/jsm/helpers/VertexNormalsHelper.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { SAOPass } from "three/examples/jsm/postprocessing/SAOPass.js";
import { SSAARenderPass } from "three/examples/jsm/postprocessing/SSAARenderPass.js";
import { SSAOPass } from "three/examples/jsm/postprocessing/SSAOPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";

import { ShxFontLoader } from "../shx-parser";
import { ViewerEvent } from "./ViewerEvent";
import { BottomBar } from "src/components/bottom-bar";
import { ContextMenu, contextMenuItems } from "src/components/context-menu";
import { BimViewerDatGui } from "src/components/dat-gui";
import { CameraSettings, Settings as SettingsType, defaultSettings } from "src/components/settings";
import { DEFAULT_BIMVIEWER_TOOLBAR_CONFIG, Toolbar } from "src/components/toolbar";
import { BimViewerConfig, CameraConfig, DEFAULT_BIM_VIEWER_CONFIG, Hotpoint, ModelConfig } from "src/core/Configs";
import { matrixAutoUpdate, SectionType, layerForSelectableObjects, layerForHitableObjects } from "src/core/Constants";
import { CoordinateAxes, CoordinateAxesViewport } from "src/core/axes";
import { CanvasRender, Drawable } from "src/core/canvas";
import { CameraControlsEx } from "src/core/controls";
import { InstantiateHelper, LoadingHelper, MeshBvhHelper, RafHelper, ZoomToRectHelper } from "src/core/helpers";
import { EventInfo, InputManager, MouseButton } from "src/core/input/InputManager";
import { MeasurementData, MeasurementManager, MeasurementType } from "src/core/measure";
import { NavCubeViewport } from "src/core/navcube/NavCubeViewport";
import { AxisPlaneSection, ObjectsBoxSection, PickPlaneSection, SectionManager } from "src/core/section";
import {
    CoordinateConversionUtils,
    SceneUtils,
    CommonUtils,
    CSS2DObjectUtils,
    DeviceUtils,
    GroundUtils,
    log,
    MaterialUtils,
    Batch,
    MergeUtils,
    MaterialInfo,
    ObjectUtils,
    SkyboxUtils,
    TextureUtils,
    Viewer3DUtils,
} from "src/core/utils";
import { BaseViewer, ViewerName } from "src/core/viewers/BaseViewer";
import { WebCam } from "src/core/webcam";
import { ViewCube } from "src/plugins/view-cube/ViewCube";

const tempVec3 = /*@__PURE__*/ new THREE.Vector3();
const tempSphere = /*@__PURE__*/ new THREE.Sphere();

export class BimViewer extends BaseViewer {
    /**
     * @internal
     */
    name = ViewerName.BimViewer;
    private timer = Date.now(); // used to log time for debugging, create it at the very begining

    protected font?: Font;
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
    selectedObject: any | Drawable | undefined = undefined; // eslint-disable-line
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
    sceneBackgroundColor: THREE.Color = new THREE.Color(0xebf2f7); // TODO: add it to settings
    /**
     * @internal
     */
    skyOfGradientRamp?: THREE.Mesh;
    private stats?: Stats;
    /**
     * @internal
     */
    loadedModels: { [src: string]: { id: number; bbox?: THREE.Box3 } } = {}; // a map to store model file and id
    /**
     * @internal
     */
    loaded3dTiles: { [src: string]: { id: number; bbox: THREE.Box3; renderer: TilesRenderer } } = {}; // a map to store 3dtiles and id
    /**
     * @internal
     */
    pmremGenerator?: THREE.PMREMGenerator;

    private perspectiveCamera?: THREE.PerspectiveCamera;
    private orthoCamera?: THREE.OrthographicCamera;
    private perspectiveCameraControls?: CameraControlsEx;
    private orthoCameraConrols?: CameraControlsEx;
    private css2dRenderer?: CSS2DRenderer; // used to render html labels in the scene
    private composerRenderEnabled = true; // if we should call composer.render() in render()
    private composerEnabled = false; // if composer and passes are enabled
    private composer?: EffectComposer;
    private renderPass?: RenderPass;
    private effectFxaaPass?: ShaderPass;
    private ssaoPass?: SSAOPass | ShaderPass;
    private saoPass?: SAOPass;
    private outlinePass?: OutlinePass;
    private ssaaRenderPass?: SSAARenderPass;
    private bloomPass?: BloomPass;
    private unrealBloomPass?: UnrealBloomPass;
    private raycaster?: THREE.Raycaster;
    private cameraUpdateInterval?: NodeJS.Timer;
    private savedMaterialsForOpacity?: MaterialInfo[] = [];
    private section?: ObjectsBoxSection | PickPlaneSection | AxisPlaneSection;
    /**
     * @internal
     */
    public sectionType?: string;
    private sectionManager?: SectionManager;
    private measurementManager?: MeasurementManager;
    private zoomToRectHelper?: ZoomToRectHelper;
    // private datGui?: BimViewerDatGui; // react native not support css inline
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private datGui?: any;
    private shadowCameraHelper?: THREE.CameraHelper;
    private directionalLightHelper?: THREE.DirectionalLightHelper;
    private webcam?: WebCam;
    private webcamPlane?: THREE.Mesh;
    // RafHelper (requestAnimationFrame Helper) is used to improve render performance,
    // With this feature, it only renders when necessary, e.g. camera position changed, model loaded, etc.
    // We can disable this feature by assigning raf to undefined
    private raf?: RafHelper = new RafHelper();
    private clock: THREE.Clock = new THREE.Clock();
    private renderEnabled = true; // used together with RafHelper
    private timeoutSymbol?: symbol; // used together with RafHelper
    private isFrustumInsectChecking = false;
    private lastFrameExecuteTime = Date.now(); // used to limit max fps
    private maxFps = 60; // used to limit max fps. < 0 means no limitation
    private settings: SettingsType = defaultSettings;
    private contextMenu?: ContextMenu;
    private navCube?: NavCubeViewport;
    private viewCube?: ViewCube;
    private axes?: CoordinateAxesViewport;
    private axesInScene?: CoordinateAxes;
    private twoDModelCount = 0; // number of 2d models
    private vertexNormalsHelpers?: THREE.Group;
    /**
     * @internal
     */
    toolbar?: Toolbar<BimViewer>;
    private bottomBar?: BottomBar;
    /**
     * @internal
     */
    private bbox = new THREE.Box3();

    private anchor?: HTMLDivElement;
    private hotpointRoot?: THREE.Group;

    // eslint-disable-next-line
    constructor(viewerCfg: BimViewerConfig, cameraCfg?: CameraConfig) {
        super(viewerCfg);
        this.viewerCfg = { ...DEFAULT_BIM_VIEWER_CONFIG, ...viewerCfg } as BimViewerConfig;
        log.info("[BimViewer]", "viewerCfg:", this.viewerCfg);
        this.settings = defaultSettings;
        this.cameraCfg = cameraCfg;
        if (this.cameraCfg && this.cameraCfg.near) {
            this.settings.camera.near = this.cameraCfg.near;
        }

        if (this.cameraCfg && this.cameraCfg.far) {
            this.settings.camera.far = this.cameraCfg.far;
        }
        this.increaseJobCount(); // it is busy since initializing
        this.init();
        this.animate();
        if (this.renderer) {
            this.viewerContainer?.append(this.renderer.domElement);
        }

        this.decreaseJobCount(); // initialization done

        log.info(`[BimViewer] Initialized in ${(Date.now() - this.timer) / 1000}s`);
    }

    /**
     * Initialize everything it needs
     * @internal
     */
    init() {
        const viewerCfg = this.viewerCfg as BimViewerConfig;
        this.initThree();
        if (DeviceUtils.isBrowser && !viewerCfg.context) {
            this.initDom();
        }
        this.initEvents();
        this.initControls();
    }

    private initThree() {
        this.initScene();
        this.initRenderer();
        this.initCamera();
        this.initLights();
    }

    private initDom() {
        const viewerCfg = this.viewerCfg as BimViewerConfig;
        this.initSpinner();
        this.initCSS2DRenderer();

        if (viewerCfg.enableDatGui === true) {
            this.initDatGui(); // should be initialized later than sky, ground grid, etc.
        }
        this.initOthers();

        if (viewerCfg.enableAxisGizmo === true) {
            this.axes = this.initAxes();
        }
        if (viewerCfg.enableStats === true) {
            this.stats = this.initStats();
        }
        if (viewerCfg.enableToolbar) {
            this.toolbar = this.initToolbar();
        }
        if (viewerCfg.enableBottomBar) {
            this.bottomBar = this.initBottomBar();
        }
        if (viewerCfg.enableNavCube) {
            this.navCube = this.initNavCube();
        }
        if (viewerCfg.enableViewCube) {
            this.viewCube = this.initViewCube();
        }
        if (viewerCfg.enableContextMenu) {
            this.contextMenu = this.initContextMenu();
        }
    }

    private initScene() {
        this.scene = new THREE.Scene();
        // this.scene.background = new THREE.Color(0xebf2f7)

        // Find more performance tips at: https://discoverthreejs.com/tips-and-tricks/
        // For performance. call .updateMatrix() manually when needed.
        this.scene.matrixAutoUpdate = matrixAutoUpdate;
        // When testing the performance of your apps, one of the first things you’ll need to do is check whether it is CPU bound, or GPU bound.
        // If performance increases, then your app is GPU bound. If performance doesn’t increase, your app is CPU bound.
        // this.scene.overrideMaterial = new MeshBasicMaterial({ color: 'green' })
    }

    private initRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            preserveDrawingBuffer: true,
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        // this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.toneMappingExposure = 1;
        // this.renderer.physicallyCorrectLights = true;
        this.renderer.useLegacyLights = false;
        this.renderer.setClearColor(0xa9a9a9, 1);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        CommonUtils.printGpuInfo(this.renderer.getContext());

        this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
        this.pmremGenerator.compileEquirectangularShader();

        if (this.enableOverlayRenderer) {
            this.overlayRender = new CanvasRender(this);
        }

        this.setEnvironmentFromDataArray();
    }

    private initCSS2DRenderer() {
        const r = new CSS2DRenderer();
        r.setSize(this.width, this.height);
        r.domElement.style.height = "0";
        r.domElement.style.width = "0";
        r.domElement.style.position = "absolute";
        r.domElement.style.top = "0";
        r.domElement.style.left = "0";
        r.domElement.style.overflow = "visible";
        r.domElement.classList.add("css2d-renderer"); // add a class so it is easier to be found

        this.viewerContainer?.appendChild(r.domElement);
        this.css2dRenderer = r;
    }

    private initCamera() {
        if (!this.scene) {
            return; // have to init scene first
        }
        // to avoid z-fighting issue, do not set near value too small!
        // https://www.cnblogs.com/lst619247/p/9098845.html
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            45,
            this.width / this.height,
            this.settings.camera.near,
            this.settings.camera.far
        );
        this.perspectiveCamera.position.set(0, 100, 0);
        this.scene.add(this.perspectiveCamera); // need to init scene before camera
        this.camera = this.perspectiveCamera;
    }

    private initControls(isOrthCamera = false) {
        if (!this.renderer) {
            return;
        }
        // TODO: support touch device later, see https://github.com/tdushinwa/threejs_touchtest/blob/master/js/TrackballControls.js
        DeviceUtils.printDeviceInfo();

        const camera = isOrthCamera ? this.orthoCamera : this.perspectiveCamera;
        if (!camera || !this.inputManager) {
            return;
        }
        let controls: CameraControlsEx | undefined;
        if (!this.perspectiveCameraControls || !this.orthoCameraConrols) {
            // controls = new CameraControlsEx(camera, this.renderer.domElement);
            controls = new CameraControlsEx(camera, this.inputManager as unknown as HTMLElement);
            controls.dollySpeed = 0.1;
            controls.dollyToCursor = true;
            controls.enabled = true;
            controls.keyTruckSpeed = 10;
            controls.restThreshold = 0;
            // controls.keys = { LEFT: '65', UP: '87', RIGHT: '68', BOTTOM: '83' } // a, w, d, s
            controls.keys = {
                left: "KeyD", // model goes left, camera goes right
                up: "KeyE", // model goes up, camera goes down
                right: "KeyA", // model goes right, camera goes left
                bottom: "KeyQ", // model goes down, camera goes up
            };
            controls.listenToKeyEvents();
            controls.update(0);
        }
        if (!controls) {
            return;
        }
        if (isOrthCamera) {
            this.orthoCameraConrols = controls;
            controls.minZoom = 3;
            // controls.maxZoom = 5;
        } else {
            this.perspectiveCameraControls = controls;
            if (this.bbox) {
                controls.minDistance = 0.1;
                controls.maxDistance = this.bbox.getSize(new THREE.Vector3()).length() * 3;
            }
        }
        this.controls = controls;
    }

    private initRotateToCursor() {
        this.anchor = this.createAnchor();
    }

    private onResize = () => {
        if (this.viewerContainer && this.viewerContainer.parentElement) {
            this.resize(this.viewerContainer.parentElement.clientWidth, this.viewerContainer.parentElement.clientHeight);
        }
    };

    private onKeyDown = (e: EventInfo) => {
        const camera = this.camera as THREE.PerspectiveCamera | THREE.OrthographicCamera;
        const controls = this.controls as CameraControlsEx;
        if (!camera || !controls) {
            return;
        }
        const sensitivity = this.settings.keyboard.sensitivity || 3;
        const p = controls.getPosition(new THREE.Vector3()); // camera's position
        const t = controls.getTarget(new THREE.Vector3()); // target point
        const newTarget = t.clone();
        if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
            // keep camera's position uchanged, rotate to left (q) or right (e) around y-axis
            // thus it changes target(lookAt) point
            const ANGLE = sensitivity; // angle in degree
            let theta = (Math.PI * ANGLE) / 180; // angle in radians
            if (e.code === "ArrowLeft") {
                theta = -theta; // rotate to left
            }
            newTarget.x = (t.x - p.x) * Math.cos(theta) - (t.z - p.z) * Math.sin(theta) + p.x;
            newTarget.z = (t.z - p.z) * Math.cos(theta) + (t.x - p.x) * Math.sin(theta) + p.z;
            controls.setTarget(newTarget.x, newTarget.y, newTarget.z);
        } else if (e.code === "ArrowUp" || e.code === "ArrowDown") {
            // keep camera's position uchanged, rotate to left (q) or right (e) around y-axis
            // thus it changes target(lookAt) point's y value
            const ANGLE2 = sensitivity; // angle in degree
            let theta2 = (Math.PI * ANGLE2) / 180; // angle in radians
            const distVec = new THREE.Vector3(t.x - p.x, t.y - p.y, t.z - p.z); // distance vector from p to t
            const dist = distVec.length();
            const deltaY = t.y - p.y;
            if (e.code === "ArrowDown") {
                // z: rotate down
                theta2 = -theta2;
            }
            const angle = Math.asin(deltaY / dist) + theta2;
            if (angle < -Math.PI / 2 || angle > Math.PI / 2) {
                return; // cannot rotate that much
            }
            const newDeltaY = Math.sin(angle) * dist;
            newTarget.y = t.y + (newDeltaY - deltaY);
            controls.setTarget(newTarget.x, newTarget.y, newTarget.z);
        } else if (e.code === "KeyW") {
            // go forward
            const ALPHA = sensitivity * 0.01;
            const dist = p.distanceTo(t);
            if (dist < camera.near * 10) {
                // If distance is too close, better to move target position forward too, so camera can keep moving forward,
                // rather than stop at the lookAt position. Let's move it to be 'camera.near' away from camera.
                const tempTarget = controls.getTarget(new THREE.Vector3()).lerp(p, -camera.near / dist);
                controls.setTarget(tempTarget.x, tempTarget.y, tempTarget.z);
            }
            p.lerp(t, ALPHA);
            controls.setLookAt(p.x, p.y, p.z, t.x, t.y, t.z);
        } else if (e.code === "KeyS") {
            // go backward
            const ALPHA = sensitivity * 0.01;
            p.lerp(t, -ALPHA);
            controls.setLookAt(p.x, p.y, p.z, t.x, t.y, t.z, false);
        } else if (e.code === "KeyF") {
            // if there is object selected, fly to it. (This is a design by Unreal Engine)
            this.flyToSelectedObject();
        } else if (e.code === "KeyT") {
            // reset target
            // When a user does rotate(or pan) operation, where is the rotate center(camera's target)?
            // It depends on where is the camera's target as well as where is the camera itself.
            // Assume camera is at p1, user clicked at p2, target is p3, distance between p1 and p2 is d1, distance between p1 and p3 is d2.
            // In order to have a better user experience, we'll move target to p4 without changing camera's direction,
            // where distance between p1 and p4 equals d1.
            this.raycaster && this.raycaster.layers.set(layerForHitableObjects);
            const intersections = this.getIntersections();
            if (intersections.length > 0) {
                const firstIntersect = intersections.find((intersect) => {
                    const object = intersect.object;
                    // exclude invisible objects
                    // exclude non-mesh objects, ground, outline, etc.
                    return object.visible && object instanceof THREE.Mesh;
                });
                if (firstIntersect && firstIntersect.point && this.camera && this.controls) {
                    const p1 = this.camera.position;
                    const p2 = firstIntersect.point;
                    const p3 = controls.getTarget(new THREE.Vector3());
                    const d1 = p1.distanceTo(p2);
                    if (d1 > camera.near && d1 < camera.far) {
                        // only take it as valid scenario when d1 is between near and far
                        const d2 = p1.distanceTo(p3);
                        const p4 = p1.clone().lerp(p3, d1 / d2);
                        controls.setTarget(p4.x, p4.y, p4.z);
                    }
                }
            }
        } else if (e.code === "KeyY") {
            // Make camera direction vertical with y-axis.
            // It is useful when a user want to roaming horizontally with key(w/s/a/d) controls
            this.flyTo(p, t.clone().setY(p.y));
        }
        this.enableRender();
    };

    private initLights() {
        if (!this.scene) {
            return;
        }
        // TODO: move light settings into project settings panel
        // Maybe we can automatically calculate light direction, intensity, etc. according to models' materials
        const color = 0xffffff;
        const highIntensity = 1.5;
        const dl = new THREE.DirectionalLight(color, highIntensity);
        dl.name = "sun";
        dl.castShadow = true;
        dl.position.set(-2, 2, 4);
        dl.shadow.autoUpdate = false;
        dl.shadow.mapSize.width = 1024;
        dl.shadow.mapSize.height = 1024;
        this.directionalLight = dl;
        this.scene.add(dl);
        this.scene.add(dl.target);

        // The object is only displayed, it is not necessary to call enableAll
        this.directionalLightHelper = new THREE.DirectionalLightHelper(this.directionalLight);
        this.directionalLightHelper.visible = false;
        this.scene.add(this.directionalLightHelper);

        this.shadowCameraHelper = new THREE.CameraHelper(this.directionalLight.shadow.camera);
        this.shadowCameraHelper.visible = false;
        this.scene.add(this.shadowCameraHelper);

        this.ambientLight = new THREE.AmbientLight(0x303030);
        this.hemisphereLight = new THREE.HemisphereLight(color, 0xdddddd, 0.2);
        this.hemisphereLight.position.set(0, 300, 0);

        this.scene.add(this.ambientLight);
        this.scene.add(this.hemisphereLight);
    }

    /**
     * Initialize mouse/pointer events
     */
    private initEvents() {
        if (!this.renderer) {
            return;
        }
        const input = new InputManager(this.renderer.domElement);
        this.inputManager = input;
        let mousedowned = false,
            mousemoved = false;
        input.addEventListener("pointerdown", (e) => {
            mousemoved = false;
            mousedowned = true;
            e.button === MouseButton.Left && this.onAnchorPointerDown(e);
        });
        input.addEventListener("pointermove", () => {
            if (mousedowned) {
                mousemoved = true;
            }
        });
        input.addEventListener("pointerup", () => {
            mousedowned = false;
            this.onAnchorPointerUp();
        });
        let timeId: NodeJS.Timeout;
        input.addEventListener("click", (e) => {
            if (mousemoved) {
                mousemoved = false;
                return;
            }
            timeId && clearTimeout(timeId);
            // do not run immediately, because it can be a double click
            timeId = setTimeout(() => {
                switch (e.button) {
                    case MouseButton.Left:
                        this.handleMouseClick(e);
                        break;
                    default:
                        break;
                }
            }, 300);
            if (!this.selectedObject || (this.selectedObject && this.selectedObject instanceof THREE.Object3D)) {
                this.contextMenu?.hide();
            }
        });
        input.addEventListener("dblclick", (e) => {
            if (!mousemoved && this.sectionManager?.isSectionActive() && this.measurementManager?.isMeasurementActive()) {
                return;
            }
            timeId && clearTimeout(timeId);
            this.handleMouseClick(e);
            this.flyToSelectedObject();
            this.enableRender();
        });
        input.addEventListener("keydown", (e) => {
            this.onKeyDown(e);
            // if (e.altKey && e.code === "KeyR") {
            //     // alt + R to fly to random object
            //     this.flyToRandomObject();
            // }
        });
        input.addEventListener("contextmenu", (e) => {
            if (mousemoved || this.sectionManager?.isSectionActive() || this.measurementManager?.isMeasurementActive()) {
                return;
            }
            this.handleRightClick(e);
        });
        // auto resize now
        // input.addEventListener("resize", this.onResize);
        this.initRotateToCursor();
        this.raycaster = new THREE.Raycaster();
    }

    private initDatGui() {
        this.datGui = new BimViewerDatGui(this);
        this.datGui.close(); // collapse it by default
    }

    private initOthers() {
        if (!this.scene || !this.renderer || !this.camera) {
            return;
        }

        // Read some settings from Dat.Gui. While in future,
        // these default settings should be defined by project settings.
        const ctrl = this.datGui && this.datGui.controls;
        if (ctrl) {
            // some settings are read from datGui, so it requires to initialize datGui first
            if (ctrl.showGroundGrid) {
                this.groundGrid = GroundUtils.createGroundGrid();
                this.scene.add(this.groundGrid);
            }
            if (ctrl.showGrassGround) {
                (async () => {
                    this.grassGround = await GroundUtils.createGrassGround();
                    this.scene && this.scene.add(this.grassGround);
                    this.enableRender();
                })();
            }

            ctrl.webcam && this.enableWebCam();
            // the order of passes matters, outline pass should be the last one
            this.composerEnabled = ctrl.composerEnabled;
            if (this.composerEnabled) {
                this.enableComposer(true);
                this.enableRenderPass(ctrl.renderPassEnabled);
                this.enableFxaaPass(ctrl.fxaaEnabled);
                this.enableSaoPass(ctrl.saoEnabled);
                this.enableSsaoPass(ctrl.ssaoEnabled);
                this.enableOutlinePass(ctrl.outlineEnabled);
                this.enableSsaaPass(ctrl.ssaaEnabled);
                this.enableBloomPass(ctrl.bloomEnabled);
                this.enableUnrealBloomPass(ctrl.unrealBloomEnabled);
            }
        }
        // erase the black outline when viewer is focused
        this.renderer.domElement.style.outlineWidth = "0";
    }

    private initNavCube() {
        const navCubeElement = document.createElement("div");
        navCubeElement.id = "navCube";
        const navCube = new NavCubeViewport();
        if (navCube.renderer) {
            navCubeElement.appendChild(navCube.renderer.domElement);
            navCube.setHostViewer(this);
        }
        this.widgetContainer?.appendChild(navCubeElement);
        return navCube;
    }

    private initViewCube() {
        const viewCubeElement = document.createElement("div");
        viewCubeElement.id = "viewCube";
        this.widgetContainer?.appendChild(viewCubeElement);
        const viewCube = new ViewCube({
            containerId: viewCubeElement.id,
        });
        viewCube.setHostViewer(this);
        return viewCube;
    }

    private initAxes() {
        const axesDiv = document.createElement("div");
        axesDiv.classList.add("axesRenderer");
        const cav = new CoordinateAxesViewport(axesDiv, this.camera as THREE.Camera);
        this.widgetContainer?.append(axesDiv);

        // Some users want a axes in scene, so they know how a model is defined.
        // We don't want to add one more option for BimViewer, so it will be controlled together by "enableAxisGizmo"
        this.axesInScene = new CoordinateAxes(false);
        this.scene?.add(this.axesInScene);
        return cav;
    }

    private initStats() {
        const stats = new Stats() as any; // eslint-disable-line
        stats.setMode(0); // 0: fps, 1: ms
        const div = document.createElement("div");
        div.classList.add("statsOutput");
        div.appendChild(stats.domElement);
        this.widgetContainer?.append(div);
        return stats;
    }

    private initContextMenu() {
        const contextMenu = new ContextMenu({
            items: contextMenuItems,
            context: { bimViewer: this, toolbar: this.toolbar, section: this.section },
            container: this.widgetContainer,
        });
        window.oncontextmenu = (event: MouseEvent) => event.preventDefault();
        return contextMenu;
    }

    private initToolbar() {
        const viewerCfg = this.viewerCfg as BimViewerConfig;
        return new Toolbar<BimViewer>(this, merge({}, DEFAULT_BIMVIEWER_TOOLBAR_CONFIG, viewerCfg.toolbarMenuConfig));
    }

    private initBottomBar() {
        return new BottomBar(this);
    }

    /**
     * If there is any 2d model loaded
     * @internal
     */
    get has2dModel() {
        return this.twoDModelCount > 0;
    }

    private showContextMenu(event: EventInfo) {
        if (!this.contextMenu || !this.widgetContainer) {
            return;
        }

        this.raycaster && this.raycaster.layers.set(layerForHitableObjects);
        const intersections = this.getAllIntersections(event);
        log.debug("[BimViewer] showContextMenu intersections = ", intersections);
        const firstIntersect = find(intersections, (intersect) => {
            const object = intersect.object;
            // exclude invisible objects
            // exclude non-mesh objects, ground, outline, etc.
            return object instanceof THREE.Mesh && object.visible;
        });
        const context = this.contextMenu.context;
        const instanceId = (firstIntersect as THREE.Intersection)?.instanceId;
        const faceIndex = firstIntersect?.faceIndex;
        let batchId = undefined;
        if (faceIndex) {
            batchId = MergeUtils.getBatchIdByFaceIndex(firstIntersect?.object as THREE.Mesh, faceIndex);
        }
        this.contextMenu.context = { ...context, hit: firstIntersect?.object, instanceId, batchId };
        const { x, y } = event;
        this.contextMenu.show(x, y);
    }

    private handleRightClick(event: EventInfo) {
        this.showContextMenu(event);
    }

    private sycnCameraPosition(
        src: THREE.PerspectiveCamera | THREE.OrthographicCamera,
        dest: THREE.PerspectiveCamera | THREE.OrthographicCamera
    ) {
        const p = src.position;
        dest.position.set(p.x, p.y, p.z);

        if (this.scene) {
            const t = this.scene.position; // src.target
            dest.lookAt(t);
        }
    }

    private sycnControls(src: CameraControlsEx, dest: CameraControlsEx) {
        const t = src.getTarget(new THREE.Vector3());
        const p = src.getPosition(new THREE.Vector3());
        dest.setPosition(p.x, p.y, p.z);
        dest.setTarget(t.x, t.y, t.z);
    }

    setToOrthographicCamera(isOrthCamera = false) {
        if (!this.scene || !this.controls) {
            return;
        }
        const pc = this.perspectiveCamera;
        const pcc = this.perspectiveCameraControls;
        let oc = this.orthoCamera;
        let occ = this.orthoCameraConrols;
        if (isOrthCamera) {
            if (!oc) {
                oc = new THREE.OrthographicCamera(
                    -this.width / 2,
                    this.width / 2,
                    this.height / 2,
                    -this.height / 2,
                    this.settings.camera.near,
                    this.settings.camera.far
                );

                oc.position.set(0, 100, 0);
                oc.zoom = 10; // it seems 10 works better, but don't know how to set a better one!
                oc.updateProjectionMatrix();
                this.scene && this.scene.add(oc); // need to init scene before camera
                this.orthoCamera = oc;
                this.frustumSize = this.width;
            }
            if (!occ) {
                this.initControls(true);
                occ = this.orthoCameraConrols;
            }
            if (pc) {
                this.sycnCameraPosition(pc, oc);
                oc.zoom = 10;
                oc.updateProjectionMatrix();
            }
            if (pcc && occ && pc) {
                this.sycnControls(pcc, occ);
            }
            this.camera = oc;
            this.controls = occ;
        } else {
            if (pc && oc) {
                this.sycnCameraPosition(oc, pc);
            }
            if (pcc && occ && oc) {
                this.sycnControls(occ, pcc);
            }
            this.camera = pc;
            this.controls = pcc;
        }

        this.axes?.setHostCamera(this.camera as THREE.Camera);
        this.resize(this.width, this.height); // trigger camera to update properly

        this.dispatchEvent(ViewerEvent.CameraChanged);
    }

    protected animate() {
        this.requestAnimationFrameHandle = requestAnimationFrame(this.animate.bind(this));
        const delta = this.clock.getDelta();
        const updated = this.controls && this.controls.update(delta);
        if (this.maxFps > 0) {
            const delta = Date.now() - this.lastFrameExecuteTime;
            if (delta < 1000 / this.maxFps) {
                return;
            }
            this.lastFrameExecuteTime = Date.now();
        }

        this.webcam && this.webcam.animate();
        if (this.scene && this.camera) {
            // If parent container change ,auto resize
            if (this.viewerContainer && this.viewerContainer.parentElement) {
                const { width, height } = this.viewerContainer.parentElement.getBoundingClientRect();
                const needResize = this.width !== width || this.height !== height;
                if (needResize) {
                    this.resize(width, height);
                }
            }
            if (this.renderEnabled || updated) {
                //this.updateRaycasterThreshold();
                this.update3dTiles();
                this.renderer?.render(this.scene, this.camera);

                // Improves rendering framerate
                if (this.hotpointRoot && this.hotpointRoot.children.length > 0) {
                    this.css2dRenderer?.render(this.scene, this.camera);
                }

                this.dispatchEvent(ViewerEvent.AfterRender);
            }
        }

        if (this.composerRenderEnabled && this.composer && this.composerEnabled) {
            this.composer.render();
            this.composerRenderEnabled = false;
        }
        this.frustrumCullingByModelBBox();
        this.stats?.update();
        this.bottomBar?.update();
    }

    private update3dTiles() {
        if (!this.camera) {
            return;
        }
        const tileSets = Object.values(this.loaded3dTiles);
        if (tileSets.length === 0) {
            return;
        }
        // The camera matrix is expected to be up to date before calling tilesRenderer.update
        this.camera.updateMatrixWorld();
        tileSets.forEach((obj: { id: number; bbox: THREE.Box3; renderer: TilesRenderer }) => {
            obj.renderer.update();
        });
    }

    /**
     * This is a method called in animate() in order to optimize rendering speed.
     * The idea is to hide any model out of view frustrum.
     */
    private frustrumCullingByModelBBox() {
        const frustum = new THREE.Frustum();
        const projScreenMatrix = new THREE.Matrix4();
        this.isFrustumInsectChecking = true;
        if (this.camera) {
            projScreenMatrix.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse);
            frustum.setFromProjectionMatrix(projScreenMatrix);
            Object.values(this.loadedModels).forEach((obj: { id: number; bbox?: THREE.Box3 }) => {
                const model = this.scene && this.scene.getObjectById(obj.id);
                const bbox = obj.bbox;
                if (model && bbox && this.scene) {
                    // adds userData to model
                    // userData: {
                    //   _visible: boolean,
                    //   userConfigVisibility: boolean
                    // }
                    // userConfigVisibility is a flag to indicate if model's visibility ever changed by user
                    // from BimTree, LayerManager, etc. If ever changed, then frustrumCullingByModelBBox shouldn't
                    // work for thus model any more.
                    if (typeof model.userData._visible === "undefined") {
                        model.userData._visible = true;
                        Object.defineProperties(model, {
                            visible: {
                                set: (val) => {
                                    // eslint-disable-line
                                    model.userData._visible = val;
                                    if (!this.isFrustumInsectChecking) {
                                        model.userData.userConfigVisibility = true;
                                    }
                                },
                                get: () => model.userData._visible,
                            },
                        });
                    }
                    if (typeof model.userData.userConfigVisibility === "undefined") {
                        model.visible = frustum.intersectsBox(bbox);
                    }
                }
            });
            // 3dTiles
            Object.values(this.loaded3dTiles).forEach((obj: { id: number; bbox: THREE.Box3; renderer: TilesRenderer }) => {
                const model = obj.renderer.group;
                if (model && !obj.bbox.isEmpty() && this.scene) {
                    // adds userData to model
                    // userData: {
                    //   _visible: boolean,
                    //   userConfigVisibility: boolean
                    // }
                    // userConfigVisibility is a flag to indicate if model's visibility ever changed by user
                    // from BimTree, LayerManager, etc. If ever changed, then frustrumCullingByModelBBox shouldn't
                    // work for thus model any more.
                    if (typeof model.userData._visible === "undefined") {
                        model.userData._visible = true;
                        Object.defineProperties(model, {
                            visible: {
                                set: (val) => {
                                    // eslint-disable-line
                                    model.userData._visible = val;
                                    if (!this.isFrustumInsectChecking) {
                                        model.userData.userConfigVisibility = true;
                                    }
                                },
                                get: () => model.userData._visible,
                            },
                        });
                    }
                    if (typeof model.userData.userConfigVisibility === "undefined") {
                        model.visible = frustum.intersectsBox(obj.bbox);
                    }
                }
            });
        }
        this.isFrustumInsectChecking = false;
    }

    /**
     * In order to have a better performance, it should only render when necessary.
     * Usually, we should enable render for these cases:
     *  - Anything added to, removed from scene, or objects' position, scale, rotation, opacity, material, etc. changed
     *  - Anything selected/unselected
     *  - Camera changed
     *  - Render area resized
     * @internal
     */
    enableRender = (time = 1000) => {
        this.renderEnabled = true;
        if (!this.raf) {
            return;
        }
        this.timeoutSymbol && this.raf.clearTimeout(this.timeoutSymbol);
        this.timeoutSymbol = this.raf.setTimeout(() => {
            this.renderEnabled = false;
            // when main render process is done, enable composer render
            this.composerRenderEnabled = true;
        }, time);
    };

    destroy() {
        this.inputManager?.removeEventListener();
        if (this.datGui && this.datGui.gui) {
            this.datGui.beforeDestroy();
            this.datGui = undefined;
        }
        const wc = this.webcamPlane;
        if (this.scene && wc) {
            this.scene.remove(wc);
            wc.geometry.dispose();
            (wc.material as THREE.Material).dispose();
            this.webcamPlane = undefined;
        }
        this.webcam = undefined;
        this.composer = undefined;
        this.renderPass = undefined;
        this.effectFxaaPass = undefined;
        this.saoPass = undefined;
        this.ssaoPass = undefined;
        this.outlinePass = undefined;

        this.ambientLight = undefined;
        this.directionalLight = undefined;
        this.hemisphereLight = undefined;
        if (this.directionalLightHelper) {
            this.directionalLightHelper.dispose();
            this.directionalLightHelper = undefined;
        }
        if (this.controls) {
            this.disposeRotateToCursor();
            this.controls.dispose();
            this.controls = undefined;
        }
        if (this.perspectiveCameraControls) {
            this.perspectiveCameraControls.dispose();
            this.perspectiveCameraControls = undefined;
        }
        if (this.shadowCameraHelper) {
            this.shadowCameraHelper.dispose();
            this.shadowCameraHelper = undefined;
        }
        if (this.css2dRenderer) {
            this.viewerContainer?.removeChild(this.css2dRenderer.domElement);
            this.css2dRenderer = undefined;
        }
        this.stats = undefined;
        this.raycaster = undefined;
        this.selectedObject = undefined;
        if (this.groundGrid) {
            this.groundGrid.geometry.dispose();
            (this.groundGrid.material as THREE.Material).dispose();
            this.groundGrid.clear();
            this.groundGrid = undefined;
        }
        if (this.grassGround) {
            this.grassGround.geometry.dispose();
            (this.grassGround.material as THREE.Material).dispose();
            this.grassGround.clear();
            this.grassGround = undefined;
        }
        if (this.skyOfGradientRamp) {
            this.skyOfGradientRamp.geometry.dispose();
            // TODO: don't know why ShaderMaterial still cannot be released from memory
            (this.skyOfGradientRamp.material as THREE.Material).dispose();
            this.skyOfGradientRamp.clear();
            this.skyOfGradientRamp = undefined;
        }
        this.savedMaterialsForOpacity = undefined;
        this.section = undefined;
        this.sectionType = undefined;
        Object.keys(this.loadedModels).forEach((key) => {
            delete this.loadedModels[key];
        });

        Object.values(this.loaded3dTiles).forEach((model: { id: number; bbox: THREE.Box3; renderer: TilesRenderer }) => {
            model.renderer.dispose();
        });
        this.loaded3dTiles = {};
        this.perspectiveCamera = undefined;
        this.perspectiveCameraControls = undefined;

        if (this.raf) {
            this.timeoutSymbol && this.raf.clearTimeout(this.timeoutSymbol);
            this.raf = undefined;
        }
        if (this.contextMenu) {
            this.contextMenu.destroy();
            this.contextMenu = undefined;
        }
        if (this.navCube) {
            this.navCube.dispose();
            this.navCube = undefined;
        }
        if (this.viewCube) {
            this.viewCube.destroy();
            this.viewCube = undefined;
        }
        if (this.axes) {
            this.axes.dispose();
            this.axes = undefined;
        }
        if (this.axesInScene) {
            this.axesInScene.clear();
            this.axesInScene = undefined;
        }
        if (this.toolbar) {
            this.toolbar.destroy();
            this.toolbar = undefined;
        }
        this.font = undefined;
        if (this.pmremGenerator) {
            this.pmremGenerator.dispose();
            this.pmremGenerator = undefined;
        }

        this.measurementManager?.destroy();
        this.measurementManager = undefined;

        this.zoomToRectHelper?.destroy();
        this.zoomToRectHelper = undefined;

        this.sectionManager?.destroy();
        this.sectionManager = undefined;

        super.destroy();
    }

    /**
     * Loads a 3d model from local
     * @internal
     */
    async loadLocalModel(
        url: string,
        modelCfg: ModelConfig,
        manager?: THREE.LoadingManager,
        onProgress?: (event: ProgressEvent) => void
    ): Promise<void> {
        this.timer = Date.now();
        // it's better to increase jobCount in individule loadXxx method,
        // but for less modification, let's do it here.
        this.increaseJobCount();

        try {
            const loadingHelper = new LoadingHelper(manager);
            // font is used for dxf for now
            if (this.font) {
                loadingHelper.setFont(this.font as Font);
            }
            const object = await loadingHelper.loadLocalModel(url, modelCfg.src, onProgress);

            if (object) {
                this.applyOptionsAndAddToScene(url, object, modelCfg);
                return Promise.resolve();
            }
        } catch (error) {
            const msg = `Error loading ${modelCfg.src}`;
            log.error(msg, error);
            return Promise.reject(msg);
        } finally {
            this.decreaseJobCount();
        }
        return Promise.reject();
    }

    /**
     * Loads a 3d model
     */
    async loadModel(modelCfg: ModelConfig, onProgress?: (event: ProgressEvent) => void): Promise<void> {
        this.timer = Date.now();
        // it's better to increase jobCount in individule loadXxx method,
        // but for less modification, let's do it here.
        this.increaseJobCount();
        try {
            const loadingHelper = new LoadingHelper();
            // font is used for dxf for now
            if (this.font) {
                loadingHelper.setFont(this.font as Font);
            }
            const object = await loadingHelper.loadModel(modelCfg.src, modelCfg.fileFormat, onProgress);

            if (object) {
                this.applyOptionsAndAddToScene(modelCfg.src, object, modelCfg);
                return Promise.resolve();
            }
        } catch (error) {
            const msg = `Error loading ${modelCfg.src}`;
            log.error(msg, error);
            return Promise.reject(msg);
        } finally {
            this.decreaseJobCount();
        }
        return Promise.reject();
    }

    /**
     * Loads 3dtiles
     * TODO: Temporarily does not support 3dtiles version 1.0 above
     * The coordinate system is not processed yet
     * @internal
     */
    async load3dTiles(modelCfg: ModelConfig): Promise<void> {
        this.timer = Date.now();
        // it's better to increase jobCount in individule loadXxx method,
        // but for less modification, let's do it here.
        this.increaseJobCount();
        const tilesRenderer = new TilesRenderer(modelCfg.src);
        const bbox = new THREE.Box3();
        const object = await new Promise<THREE.Object3D | undefined>((resolve, reject) => {
            tilesRenderer.onLoadTileSet = () => {
                const success = tilesRenderer.getBounds(bbox);
                if (!success) {
                    if (!tilesRenderer.getBoundingSphere(tempSphere)) {
                        log.warn(`[BimViewer] Can't get the correct bounding box of 3dTiles '${modelCfg.src}'!`);
                        reject();
                    } else {
                        tempSphere.getBoundingBox(bbox);
                    }
                }
                log.debug(bbox);
                // avoid multiple calls
                tilesRenderer.onLoadTileSet = null;
                const object = tilesRenderer.group;
                log.debug(object);
                resolve(object);
            };
            tilesRenderer.onLoadModel = (model: THREE.Object3D) => {
                model.traverse((obj) => {
                    if (!matrixAutoUpdate && obj.matrixAutoUpdate) {
                        obj.matrixAutoUpdate = matrixAutoUpdate;
                        obj.updateMatrix();
                    }
                    // eslint-disable-next-line
                    if ((obj as any).isMesh) {
                        obj.castShadow = true;
                        obj.receiveShadow = true;
                    }
                    // eslint-disable-next-line
                    if ((obj as any).geometry) {
                        obj.layers.enableAll();
                    }
                });
                model.updateWorldMatrix(false, true);
                this.updateDirectionalLightShadow();
                this.enableRender();
            };
            tilesRenderer.setCamera(this.camera as THREE.Camera);
            tilesRenderer.setResolutionFromRenderer(this.camera as THREE.Camera, this.renderer as THREE.WebGLRenderer);
            tilesRenderer.update();
        });

        if (object) {
            const t = Date.now();
            let modelId = modelCfg.modelId || modelCfg.src;
            if (this.loaded3dTiles[modelId]) {
                let i = 1;
                while (this.loaded3dTiles[`${modelId}_${i}`]) {
                    i++;
                }
                modelId = `${modelId}_${i}`;
                log.warn(`[BimViewer] 3dTiles '${modelId}' is loaded more than once!`);
            }

            this.loaded3dTiles[modelId] = { id: object.id, bbox, renderer: tilesRenderer };

            if (modelCfg.matrix && modelCfg.matrix.length === 16) {
                const mat = new THREE.Matrix4();
                mat.elements = modelCfg.matrix;
                object.applyMatrix4(mat);
            } else {
                const pos = modelCfg.position || [0, 0, 0];
                const rot = modelCfg.rotation || [0, 0, 0];
                const scale = modelCfg.scale || [1, 1, 1];
                object.position.set(pos[0], pos[1], pos[2]);
                object.rotation.set((rot[0] * Math.PI) / 180.0, (rot[1] * Math.PI) / 180.0, (rot[2] * Math.PI) / 180.0);
                object.scale.set(scale[0], scale[1], scale[2]);
            }
            object.matrixAutoUpdate = matrixAutoUpdate;
            object.updateMatrix();
            object.updateMatrixWorld(true);
            this.scene?.add(object);
            bbox.applyMatrix4(object.matrix);

            this.computeBoundingBox();
            this.tryAdjustDirectionalLight();
            const loadedModelsCount = Object.keys(this.loadedModels).length;
            const isFirstModel = loadedModelsCount === 0 && Object.keys(this.loaded3dTiles).length === 1;
            if (isFirstModel) {
                const ctrl = this.datGui && this.datGui.controls;
                this.regenSkyOfGradientRamp();
                if (ctrl && ctrl.showGroundGrid) {
                    this.regenGroundGrid();
                }

                this.tryAdjustCameraNearAndFar();
                this.goToHomeView(); // only go to home view once, when the first model loaded
            }

            log.info(`[BimViewer] Added 3dTiles '${modelCfg.src}' to scene in ${(Date.now() - t) / 1000}s`);
            this.enableRender();
            this.decreaseJobCount();
            return Promise.resolve();
        }
        this.decreaseJobCount();
        return Promise.reject();
    }

    /**
     * Sets font.
     * This needs to be called before loading a dxf, it won't affect any loaded text.
     * It accepts shx or typeface formats. For typeface, it only support passing in 1 font file in the array for now.
     * @param urls font file urls
     */
    async setFont(urls: string[]) {
        const t = Date.now();
        if (ShxFontLoader.isShxFile(urls[0])) {
            this.font = await new ShxFontLoader().loadAsync(urls);
        } else {
            if (urls.length > 1) {
                log.warn(`[BimViewer] Only support 1 typeface font file for now, others will be ignored!`);
            }
            this.font = await new FontLoader().loadAsync(urls[0]);
        }
        log.info(`[BimViewer] Font file(s) load time in ${(Date.now() - t) / 1000}s`);
    }

    /**
     * Sets decoder path for draco loader.
     * Draco decoder will be used if a model is draco encoded.
     * @param decoderPath e.g., "three/js/libs/draco/gltf/"
     * @internal
     */
    setDracoDecoderPath(path: string) {
        LoadingHelper.setDracoDecoderPath(path);
    }

    /**
     * Applies options and add object to scene.
     */
    private applyOptionsAndAddToScene = (url: string, object: THREE.Object3D, modelCfg: ModelConfig) => {
        log.info(`[BimViewer] '${url}' is loaded in ${(Date.now() - this.timer) / 1000}s, adding to scene...`);
        this.timer = Date.now();

        const fileName = modelCfg.src && modelCfg.src.toLowerCase();
        if (fileName && fileName.endsWith("dxf")) {
            this.twoDModelCount++;
        }

        if (modelCfg.matrix && modelCfg.matrix.length === 16) {
            const mat = new THREE.Matrix4();
            mat.elements = modelCfg.matrix;
            object.applyMatrix4(mat);
        } else {
            const pos = modelCfg.position || [0, 0, 0];
            const rot = modelCfg.rotation || [0, 0, 0];
            const scale = modelCfg.scale || [1, 1, 1];
            object.position.set(pos[0], pos[1], pos[2]);
            object.rotation.set((rot[0] * Math.PI) / 180.0, (rot[1] * Math.PI) / 180.0, (rot[2] * Math.PI) / 180.0);
            object.scale.set(scale[0], scale[1], scale[2]);
        }

        // Set object.matrixAutoUpdate = matrixAutoUpdate for static or rarely moving objects and manually call
        // object.updateMatrix() whenever their position/rotation/quaternion/scale are updated.
        object.matrixAutoUpdate = matrixAutoUpdate;
        object.updateMatrix();
        object.traverse((obj) => {
            if (!matrixAutoUpdate && obj.matrixAutoUpdate) {
                obj.matrixAutoUpdate = matrixAutoUpdate;
                obj.updateMatrix();
            }
        });

        const instantiate = modelCfg.instantiate;
        const merge = modelCfg.merge;
        if (instantiate) {
            // load and display first, then do instantiation
            setTimeout(() => {
                this.instantiate(object);
                // If we do instantiate, better to goToHomeView() and regenSky() after instantiate is done,
                // otherwise, the bounding box could be wrong.
                // This makes loading take longer time, since we add to scene after instantiate!
                setTimeout(() => {
                    if (merge) {
                        this.merge(object);
                    }
                    this.addLoadedModelToScene(object, modelCfg);
                }, 0);
            }, 0);
        } else if (merge) {
            setTimeout(() => {
                this.merge(object);
                // If we do instantiate, better to goToHomeView() and regenSky() after instantiate is done,
                // otherwise, the bounding box could be wrong.
                // This makes loading take longer time, since we add to scene after instantiate!
                setTimeout(() => this.addLoadedModelToScene(object, modelCfg), 0);
            }, 0);
        } else {
            this.addLoadedModelToScene(object, modelCfg);
        }
    };

    /**
     * Add newly added object to scene.
     * Also, usually(but not always) we should regenerate sky and go to home view
     * @param object
     */
    private addLoadedModelToScene(object: THREE.Object3D, modelCfg: ModelConfig) {
        if (!this.scene) {
            return;
        }

        if (modelCfg.merge) {
            const t = Date.now();
            // If highlighting is not required, the original index data may not be preserved
            MeshBvhHelper.createMeshBvhAsync([object], { saveOriginalIndex: true });
            log.info(`[BimViewer] Creates mesh bvh cost ${(Date.now() - t) / 1000}s`);
        }
        // enable shadow
        object.traverse((obj) => {
            // eslint-disable-next-line
            if ((obj as any).isMesh) {
                obj.castShadow = true;
                obj.receiveShadow = true;
            }
            // eslint-disable-next-line
            if ((obj as any).geometry) {
                obj.layers.enableAll();
            }
        });

        this.scene.add(object);
        const bbox = new THREE.Box3().setFromObject(object);

        // It is a valid case when a model is loaded more than once,
        // but we need to handle this.loadedModels' 'key' properly.
        let modelId = modelCfg.modelId || modelCfg.src;
        if (this.loadedModels[modelId]) {
            let i = 1;
            while (this.loadedModels[`${modelId}_${i}`]) {
                i++;
            }
            modelId = `${modelId}_${i}`;
            log.warn(`[BimViewer] Model '${modelId}' is loaded more than once!`);
        }
        this.loadedModels[modelId] = { id: object.id, bbox };

        this.computeBoundingBox();
        this.tryAdjustDirectionalLight();
        const modelIds = Object.values(this.loadedModels).map((obj) => obj.id);
        Object.values(this.loaded3dTiles).forEach((obj) => modelIds.push(obj.id));
        const isFirstModel = !modelIds || modelIds.length <= 1;
        if (isFirstModel) {
            if (this.has2dModel) {
                // this.scene.background = new THREE.Color(0x000000);
                this.setToOrthographicCamera(true);
                if (this.skyOfGradientRamp) {
                    this.scene.remove(this.skyOfGradientRamp);
                }
            } else {
                const ctrl = this.datGui && this.datGui.controls;
                this.regenSkyOfGradientRamp();
                if (ctrl && ctrl.showGroundGrid) {
                    this.regenGroundGrid();
                }
            }
            this.tryAdjustCameraNearAndFar();
            this.goToHomeView(); // only go to home view once, when the first model loaded
        }
        // this.scene.add(bbox);

        if (modelCfg.edges) {
            ObjectUtils.addOutlines(object);
        }
        log.info(`[BimViewer] Added '${modelCfg.src}' to scene in ${(Date.now() - this.timer) / 1000}s`);
        this.enableRender();
        // this.decreaseJobCount();
        this.dispatchEvent(ViewerEvent.ModelLoaded);
    }

    /**
     * We won't set a opacity directly, because that way will lose model's original opacity value
     * @param isAdd is add or remove the opacity we added
     * @param opacity
     * @internal
     */
    public addOrRemoveObjectOpacity(isAdd = true, opacity = 0.3, includeObjectIds?: number[], excludeObjectIds?: number[]) {
        // store informations into materials, so we can revert them
        if (!this.savedMaterialsForOpacity) {
            this.savedMaterialsForOpacity = [];
        }
        if (!this.scene) {
            return;
        }
        const scene = this.scene;
        const materialInfoList: MaterialInfo[] = [];
        const modelIds = Object.values(this.loadedModels).map((obj) => obj.id);
        Object.values(this.loaded3dTiles).forEach((obj) => modelIds.push(obj.id));
        modelIds.forEach((id) => {
            if (isAdd) {
                if (this.savedMaterialsForOpacity && this.savedMaterialsForOpacity.length > 0) {
                    ObjectUtils.revertObjectOpacityById(scene, id, this.savedMaterialsForOpacity);
                }
                const list = ObjectUtils.setObjectOpacityById(scene, id, opacity, includeObjectIds, excludeObjectIds);
                materialInfoList.push(...list);
            } else if (this.savedMaterialsForOpacity) {
                ObjectUtils.revertObjectOpacityById(scene, id, this.savedMaterialsForOpacity);
            }
        });
        if (isAdd) {
            this.savedMaterialsForOpacity = materialInfoList;
        } else {
            this.savedMaterialsForOpacity = [];
        }
        this.enableRender();
    }

    /**
     * @internal
     */
    public hasTransparentObject(): boolean {
        return !!(this.savedMaterialsForOpacity && this.savedMaterialsForOpacity.length > 0);
    }

    /**
     * @internal
     */
    public showVertexNormals(show: boolean, size = 0.1) {
        if (show) {
            if (!this.vertexNormalsHelpers) {
                this.vertexNormalsHelpers = new THREE.Group();
            }
            this.scene?.traverseVisible((obj: THREE.Object3D) => {
                const objectNamesToExclude = ["SKYBOX", "GROUND_GRID", "GRASS_GROUND", "BIM_VIEWER_BOX_HELPER"];
                if (obj instanceof THREE.Mesh && !objectNamesToExclude.includes(obj.name)) {
                    const normal = obj.geometry.attributes.normal;
                    if (!normal) {
                        return;
                    }
                    const helper = new VertexNormalsHelper(obj, size, 0xff0000);
                    this.vertexNormalsHelpers?.add(helper);
                }
            });
            this.scene?.add(this.vertexNormalsHelpers);
        } else if (this.vertexNormalsHelpers) {
            this.scene?.remove(this.vertexNormalsHelpers);
            this.vertexNormalsHelpers = undefined;
        }
    }

    // resize render area
    // if no width or height passed in, use window.innerWidth/window.innerHeight instead
    protected resize(width: number, height: number) {
        // handle window resize event
        super.resize(width, height);
        if (height > 0) {
            if (this.composer) {
                this.composer.setSize(width, height);
            }
            if (this.effectFxaaPass) {
                // eslint-disable-next-line
                this.effectFxaaPass.uniforms["resolution"].value.set(1 / width, 1 / height);
            }
        }
        this.enableRender();
    }

    /**
     * @internal
     */
    public getRaycaster(): THREE.Raycaster | undefined {
        return this.raycaster;
    }

    /**
     * @internal
     */
    public getRaycastableObjectsByMouse(event?: EventInfo): THREE.Object3D[] {
        let objects: THREE.Object3D[] = [];
        if (!this.raycaster || !this.camera || !this.scene || !event || !this.viewerContainer) {
            return objects;
        }
        const screenPoint = new THREE.Vector2(event.x, event.y);
        const coords = CoordinateConversionUtils.screenPoint2NdcPoint(screenPoint, this.camera, this.viewerContainer);
        this.camera.updateMatrixWorld();
        this.raycaster.setFromCamera(coords, this.camera);
        objects = this.getRaycastableObjects();
        return objects;
    }

    private getRaycastableObjects(): THREE.Object3D[] {
        const objects: THREE.Object3D[] = [];
        Object.values(this.loadedModels).forEach((obj) => {
            const object = this.scene && this.scene.getObjectById(obj.id);
            if (object && object.visible) {
                objects.push(object);
            }
        });
        Object.values(this.loaded3dTiles).forEach((obj) => {
            const object = this.scene && this.scene.getObjectById(obj.id);
            if (object && object.visible) {
                objects.push(object);
            }
        });
        return objects;
    }

    /**
     * Gets intersections by given mouse location.
     * If no MouseEvent is passed in, use (0, 0) as the raycaster's origin.
     */
    private getIntersections(event?: EventInfo): THREE.Intersection[] {
        const objects = this.getRaycastableObjectsByMouse(event);

        let intersects = (this.raycaster && this.raycaster.intersectObjects(objects, true)) || [];
        //filter clipp object
        if (this.renderer && this.renderer.clippingPlanes.length > 0) {
            intersects = intersects.filter((intsect) => {
                return this.renderer?.clippingPlanes.every(function (plane) {
                    return plane.distanceToPoint(intsect.point) > 0;
                });
            });
        }
        return intersects;
    }

    private getAllIntersections(event?: EventInfo): THREE.Intersection[] {
        if (!this.raycaster || !this.camera || !this.scene || !this.viewerContainer) {
            return [];
        }

        const screenPoint = new THREE.Vector2(event?.x, event?.y);
        const coords = CoordinateConversionUtils.screenPoint2NdcPoint(screenPoint, this.camera, this.viewerContainer);
        this.raycaster.setFromCamera(coords, this.camera);
        const objects: THREE.Object3D[] = this.scene.children;

        let intersects = this.raycaster.intersectObjects(objects, true) || [];
        //filter clipp object
        if (this.renderer && this.renderer.clippingPlanes.length > 0) {
            intersects = intersects.filter((intsect) => {
                return this.renderer?.clippingPlanes.every(function (plane) {
                    return plane.distanceToPoint(intsect.point) > 0;
                });
            });
        }
        return intersects;
    }

    /**
     * Handles mouse click event
     */
    private handleMouseClick(event: EventInfo) {
        // when measure is enabled, disable highlight/select feature
        if (this.measurementManager?.isMeasurementActive() || this.sectionManager?.isSectionActive()) {
            return;
        }
        const t = Date.now();
        this.raycaster && this.raycaster.layers.set(layerForSelectableObjects);
        const intersections = this.getIntersections(event);
        log.debug(`[BimViewer] getIntersections costs ${(Date.now() - t) / 1000}s`);

        const firstIntersect = intersections.find((intersect) => {
            const object = intersect.object;
            // exclude invisible objects
            // exclude non-selectable non-mesh objects, ground, outline, etc. It's kind of complex, but gonna be wired if user can select another object behand a mesh.
            return object.visible && (object.userData.selectable !== false || object instanceof THREE.Mesh);
        });
        let object: THREE.Object3D | Drawable | undefined = (firstIntersect && firstIntersect.object) || undefined;
        let instanceId; // used for InstancedMesh
        let batchId; // used for merged mesh
        if (object) {
            if (object instanceof THREE.InstancedMesh) {
                instanceId = (firstIntersect as THREE.Intersection).instanceId;
                if (
                    this.selectedObject &&
                    this.selectedObject.id === object.id &&
                    this.selectedObject.userData.instanceId === instanceId
                ) {
                    // if the same InstancedMesh is selected and with the same instanceId, then deselect it
                    object = undefined;
                }
            } else if (MergeUtils.isMergedMesh(object as THREE.Mesh)) {
                const faceIndex = (firstIntersect && firstIntersect.faceIndex) || -1;
                if (faceIndex >= 0) {
                    batchId = MergeUtils.getBatchIdByFaceIndex(object as THREE.Mesh, faceIndex);
                    if (
                        this.selectedObject &&
                        this.selectedObject.id === object.id &&
                        this.selectedObject.userData.batchId === batchId
                    ) {
                        object = undefined;
                    }
                } else {
                    object = undefined;
                }
            } else if (this.selectedObject && this.selectedObject.id === object.id) {
                // if one object is selected twice, deselect it
                object = undefined;
            }
        }

        if (intersections.length > 0 && intersections[0].point) {
            const drawables = this.overlayRender?.getDrawablesByPosition(intersections[0].point, this.raycaster);
            if (drawables && drawables.length > 0) {
                // this.clearSelection();
                // drawables[0].selected = true;
                // this.selectedObject = drawables[0];
                object = drawables[0];
            }
        }
        if (this.selectedObject) {
            this.clearSelection();
        }
        object ? this.selectObject(object, instanceId, batchId) : this.clearSelection();
    }

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
    public selectObject(
        object?: THREE.Object3D | Drawable,
        instanceId?: number,
        batchId?: number,
        depthTest: boolean | undefined = undefined
    ) {
        if (object instanceof Drawable) {
            this.selectedObject = object;
            this.selectedObject.selected = true;
            this.enableRender();
            return;
        }
        // revert last selected object's material if any
        if (this.selectedObject) {
            const userData = this.selectedObject.userData;
            if (userData.instanceId != null && userData.originalMatrix && userData.clonedMesh) {
                this.scene && this.scene.remove(userData.clonedMesh); // clear the cloned mesh
                const im = this.selectedObject as THREE.InstancedMesh;
                im.setMatrixAt(userData.instanceId, userData.originalMatrix); // revert the matrix
                im.instanceMatrix.needsUpdate = true;
                im.updateMatrix(); // need to call it since object.matrixAutoUpdate is false
                delete userData.instanceId;
                delete userData.originalMatrix;

                // if the cloned object is selected, then just de-select it and return
                if (object === userData.clonedMesh) {
                    userData.clonedMesh.geometry.dispose();
                    delete userData.clonedMesh;
                    this.selectedObject = undefined;
                    if (this.outlinePass) {
                        this.outlinePass.selectedObjects = [];
                    }
                    return;
                }
                userData.clonedMesh.geometry.dispose();
                delete userData.clonedMesh;
            } else if (userData.batchId != null && userData.clonedMesh) {
                this.scene && this.scene.remove(userData.clonedMesh); // clear the cloned mesh
                delete userData.batchId;

                // if the cloned object is selected, then just de-select it and return
                if (object === userData.clonedMesh) {
                    userData.clonedMesh.geometry.dispose();
                    delete userData.clonedMesh;
                    this.selectedObject = undefined;
                    if (this.outlinePass) {
                        this.outlinePass.selectedObjects = [];
                    }
                    return;
                }
                userData.clonedMesh.geometry.dispose();
                delete userData.clonedMesh;
            } else if (userData.originalMaterial) {
                if (this.selectedObject.material) {
                    // manually dispose it according to https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects
                    const material = this.selectedObject.material;
                    if (Array.isArray(material)) {
                        material.forEach((m) => m.dispose());
                    } else if (material instanceof THREE.Material) {
                        material.dispose();
                    }
                }
                this.selectedObject.material = userData.originalMaterial;
                delete userData.originalMaterial; // clean up
            }
            this.selectedObject = undefined;
            if (this.outlinePass) {
                this.outlinePass.selectedObjects = [];
            }
        }
        if (!this.scene || !object) {
            this.enableRender();
            return;
        }
        if (object instanceof THREE.InstancedMesh && instanceId != null) {
            const im = object as THREE.InstancedMesh;
            const originalMatrix = new THREE.Matrix4();
            const hideMatrix = new THREE.Matrix4();
            hideMatrix.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0); // this matrix hides an object
            im.getMatrixAt(instanceId, originalMatrix);
            this.selectedObject = object;
            if (this.outlinePass) {
                this.outlinePass.selectedObjects = [object];
            }

            // Here is the example to select InstancedMesh, which is to call setColorAt()
            // https://threejs.org/examples/?q=instanc#webgl_instancing_raycast
            // While, it sounds like only support MeshPhongMaterial. So here, we'll clone
            // a mesh with highlighted color to replace the original instance in InstancedMesh
            const clonedMaterial = MaterialUtils.clonedHighlightMaterials(object, {
                depthTest,
            });
            if (clonedMaterial) {
                // clone a new mesh for the selected instance
                const clonedMesh = new THREE.Mesh(im.geometry.clone(), clonedMaterial);
                clonedMesh.applyMatrix4(object.matrixWorld.multiply(originalMatrix));
                clonedMesh.matrixWorldNeedsUpdate = true;
                clonedMesh.name = "Cloned mesh for highlighting";
                clonedMesh.layers.enableAll();
                // hide the original mesh by its matrix
                const matrix = originalMatrix.clone();
                matrix.multiplyMatrices(originalMatrix, hideMatrix);
                im.setMatrixAt(instanceId, matrix);
                im.instanceMatrix.needsUpdate = true;
                im.updateMatrix(); // need to call it since object.matrixAutoUpdate is false
                this.selectedObject.userData.instanceId = instanceId; // store some instanceId so highlight can be reverted
                this.selectedObject.userData.originalMatrix = originalMatrix;
                this.selectedObject.userData.clonedMesh = clonedMesh;
                this.scene.add(clonedMesh); // add it to scene temporaly
            }
        } else if (MergeUtils.isMergedMesh(object as THREE.Mesh) && batchId != null) {
            const batch = MergeUtils.getBatchByBatchId(object as THREE.Mesh, batchId);
            let logStr = `[BimViewer] Clicked on merged mesh(id: ${object.id}).`;
            logStr += ` Original mesh batchId: ${batchId}, name: ${batch?.name}`;
            log.info(logStr);
            const clonedMaterial = MaterialUtils.clonedHighlightMaterials(object as THREE.Mesh, { depthTest });
            const clonedGeom = MergeUtils.cloneGeometryForBatch(object as THREE.Mesh, batch as Batch);
            if (clonedMaterial && clonedGeom) {
                const clonedMesh = new THREE.Mesh(clonedGeom, clonedMaterial);
                clonedMesh.applyMatrix4(object.matrixWorld);
                clonedMesh.matrixWorldNeedsUpdate = true;
                clonedMesh.name = "Cloned mesh for highlighting";
                clonedMesh.layers.enableAll();
                this.selectedObject = object;
                this.selectedObject.userData.batchId = batchId;
                this.selectedObject.userData.clonedMesh = clonedMesh;
                this.scene.add(clonedMesh);
            }
        } else {
            // save the original material, so we can reverit it back when deselect
            const clonedMaterial = MaterialUtils.clonedHighlightMaterials(object as THREE.Mesh, { depthTest });
            if (clonedMaterial) {
                this.selectedObject = object;
                this.selectedObject.userData.originalMaterial = this.selectedObject.material;
                this.selectedObject.material = clonedMaterial;
                if (this.outlinePass) {
                    this.outlinePass.selectedObjects = [object];
                }
            }
        }
        this.enableRender();
    }

    /**
     * Clears the current selection
     */
    public clearSelection() {
        // remove select fot drawable
        if (this.selectedObject && this.selectedObject instanceof Drawable) {
            this.selectedObject.selected = false;
        } else {
            this.selectObject(); // simply select nothing
        }
        this.selectedObject = undefined;
    }

    /**
     * Gets bounding box
     * @internal
     */
    getBBox(): THREE.Box3 | undefined {
        return this.bbox;
    }

    /**
     * Make camera fly to objects
     */
    protected flyToObjects(objects: THREE.Object3D[]) {
        if (!objects || objects.length === 0 || !this.camera) {
            return;
        }
        const eye = new THREE.Vector3();
        const look = new THREE.Vector3();
        const bbox = new THREE.Box3();
        objects.forEach((object) => {
            const box = SceneUtils.getBoundingBox(object);
            bbox.union(box);
        });

        const cameraDir = new THREE.Vector3();
        this.camera.getWorldDirection(cameraDir);
        Viewer3DUtils.getCameraPositionByBboxAndDirection(bbox, eye, look, this.camera.projectionMatrix, cameraDir);

        // this.flyTo(eye, look);

        const distance = new THREE.Vector3().subVectors(eye, look).length();
        (this.controls as CameraControlsEx).moveTo(eye.x, eye.y, eye.z, true);
        if (this.camera instanceof THREE.OrthographicCamera) {
            const width = this.camera.right - this.camera.left;
            const height = this.camera.top - this.camera.bottom;
            const bbSize = new THREE.Vector3();
            bbox.getSize(bbSize);
            const zoom = Math.min(width / bbSize.x, height / bbSize.y);
            (this.controls as CameraControlsEx).zoomTo(zoom, true);
        } else if (this.camera instanceof THREE.PerspectiveCamera) {
            (this.controls as CameraControlsEx).dollyTo(distance, true);
        }
        (this.controls as CameraControlsEx).setFocalOffset(0, 0, 0, true);

        // maybe use fitToBox better
        // (this.controls as CameraControlsEx).fitToBox(bbox, true, {
        //     paddingTop: bbSize.length() / 5,
        //     paddingBottom: bbSize.length() / 5,
        //     paddingLeft: bbSize.length() / 5,
        //     paddingRight: bbSize.length() / 5,
        // });
    }

    /**
     * Make camera fly to an object
     * @internal
     */
    public flyToObject(object: THREE.Object3D) {
        this.flyToObjects([object]);
    }

    /**
     * Flies to current selected object if any
     */
    protected flyToSelectedObject() {
        if (!this.selectedObject) {
            return;
        }
        let obj = this.selectedObject;
        // if part of InstancedMesh is selected, fly to that part rather than fly to the whole InstancedMesh
        if (obj instanceof THREE.InstancedMesh && obj.userData.clonedMesh) {
            obj = obj.userData.clonedMesh;
        } else if (MergeUtils.isMergedMesh(obj) && obj.userData.clonedMesh) {
            obj = obj.userData.clonedMesh;
        }
        this.flyToObject(obj);
    }

    /**
     * Flies to a random object (by alt + r).
     * It is useful when either the data is wrong or there is bug in program,
     * then we cannot see anything in the scene!
     */
    protected flyToRandomObject() {
        const modelIds = Object.values(this.loadedModels).map((obj) => obj.id);
        Object.values(this.loaded3dTiles).forEach((obj) => modelIds.push(obj.id));
        const modelCount = modelIds.length;
        if (modelCount <= 0) {
            return;
        }

        const index = Math.floor(Math.random() * modelCount);
        const id = modelIds[index];
        const model = this.scene?.getObjectById(id);
        if (!model) {
            return;
        }

        const objectIds: number[] = []; // store id, rather than id or object instances
        this.scene?.traverseVisible((obj: THREE.Object3D) => {
            const objectNamesToExclude = ["SKYBOX", "GROUND_GRID", "GRASS_GROUND", "BIM_VIEWER_BOX_HELPER"];
            if ((obj instanceof THREE.Mesh || obj instanceof THREE.Line) && !objectNamesToExclude.includes(obj.name)) {
                objectIds.push(obj.id);
            }
        });
        if (objectIds.length < 1) {
            return;
        }
        const rand = Math.floor(Math.random() * objectIds.length);
        const obj = this.scene?.getObjectById(objectIds[rand]);
        if (!obj) {
            return;
        }
        log.info(`[BimViewer] Flying to random object: ${obj.name}, type: ${obj.type}`);
        this.selectObject(obj, undefined, undefined, true);
        this.flyToObject(obj);
    }

    /**
     * Make camera fly to target position with given lookAt position
     * @param position camera's target position
     * @param lookAt camera's new lookAt position
     */
    public flyTo(position: THREE.Vector3, lookAt: THREE.Vector3) {
        // TODO: redesign
        const camera = this.camera as THREE.PerspectiveCamera | THREE.OrthographicCamera;
        const controls = this.controls as CameraControlsEx;
        if (!camera || !controls) {
            return;
        }
        if (position.equals(lookAt)) {
            log.error("[BimViewer] camera position and lookAt cannot be the same!");
            return;
        } else if (!CommonUtils.isVectorValid(position) || !CommonUtils.isVectorValid(lookAt)) {
            log.error("[BimViewer] invalid position or lookAt!");
            return;
        }
        // If distance between position and lookAt is too near or far (according to camera's near/far settings).
        // need to adjust 'position' to fit it.
        const distance = position.distanceTo(lookAt);
        if (distance < camera.near) {
            // the new position is just farer than original position
            position = position
                .clone()
                .sub(lookAt)
                .normalize()
                .multiplyScalar(camera.near * 1.1);
            log.warn("[BimViewer] camera could be too close to see the object!");
        } else if (distance > camera.far) {
            // the new position is just closer than original position
            position = position
                .clone()
                .sub(lookAt)
                .normalize()
                .multiplyScalar(camera.far * 0.9);
            log.warn("[BimViewer] camera could be too far to see the object!");
        }

        // It seem that setOrbitPoint and setLookAt can not use in the same
        controls.setLookAt(position.x, position.y, position.z, lookAt.x, lookAt.y, lookAt.z, true);

        // const update = (p: THREE.Vector3, t: THREE.Vector3) => {
        //     controls.setLookAt(p.x, p.y, p.z, t.x, t.y, t.z);
        // };

        // // since we've implemented a new controls, whose target may not be at the center
        // // of screen, so, we'd better use camera's position. And, let's assume the origin target
        // // is in the center of screen.
        // const originPosition = camera.position.clone();
        // const cameraDir = new THREE.Vector3();
        // camera.getWorldDirection(cameraDir);
        // const dist = controls.getTarget(new THREE.Vector3()).distanceTo(originPosition);
        // // calculate a target in the center of screen
        // const originLookAt = originPosition.clone().addScaledVector(cameraDir, dist);
        // const totalTime = 500; // total duration in ms
        // const startTime = Date.now();
        // this.cameraUpdateInterval && clearInterval(this.cameraUpdateInterval);
        // this.cameraUpdateInterval = setInterval(() => {
        //     let elipsedTime = Date.now() - startTime;
        //     if (elipsedTime > totalTime) {
        //         elipsedTime = totalTime;
        //     }
        //     // calculate current position by alpha
        //     const calcCurrPos = (v1: THREE.Vector3, v2: THREE.Vector3, alpha: number): THREE.Vector3 => {
        //         const x = v1.x + (v2.x - v1.x) * alpha;
        //         const y = v1.y + (v2.y - v1.y) * alpha;
        //         const z = v1.z + (v2.z - v1.z) * alpha;
        //         return new THREE.Vector3(x, y, z);
        //     };
        //     const p = calcCurrPos(originPosition, position, elipsedTime / totalTime);
        //     const t = calcCurrPos(originLookAt, lookAt, elipsedTime / totalTime);
        //     update(p, t);
        //     if (elipsedTime >= totalTime) {
        //         clearInterval(this.cameraUpdateInterval);
        //         this.cameraUpdateInterval = undefined;
        //     }
        // }, 10);
    }

    /**
     * Fits the camera to view all objects in scene
     */
    public viewFitAll() {
        if (!this.scene || !this.camera) {
            return;
        }
        const eye = new THREE.Vector3();
        const look = new THREE.Vector3();
        const bbox = SceneUtils.getVisibleObjectBoundingBox(this.scene);
        const cameraDir = new THREE.Vector3();
        this.camera?.getWorldDirection(cameraDir);
        Viewer3DUtils.getCameraPositionByBboxAndDirection(bbox, eye, look, this.camera.projectionMatrix, cameraDir);
        this.flyTo(eye, look);
    }

    /**
     * Goes to home view
     */
    public goToHomeView() {
        const camera = this.camera;
        const home = this.cameraCfg;
        const position = home && CommonUtils.arrayToVector3(home.eye);
        const target = home && CommonUtils.arrayToVector3(home.look);
        if (position && target) {
            // TODO: flyTo() doesn't handle OrthographicCamera properly, we need another process!
            // this.flyTo(position, target);
            (this.controls as CameraControlsEx).setLookAt(
                position.x,
                position.y,
                position.z,
                target.x,
                target.y,
                target.z,
                true
            );
            (this.controls as CameraControlsEx).setFocalOffset(0, 0, 0, true);
        } else if (this.scene) {
            // if home.eye not defined in project, then go to 'Front'
            const eye = new THREE.Vector3();
            const look = new THREE.Vector3();
            const cameraDir = new THREE.Vector3(-1, -0.5, -1);
            if (this.has2dModel) {
                // get a proper direction by bbox
                const sizeX = this.bbox.max.x - this.bbox.min.x;
                const sizeY = this.bbox.max.y - this.bbox.min.y;
                const sizeZ = this.bbox.max.z - this.bbox.min.z;
                const minSize = Math.min(sizeX, sizeY, sizeZ);
                if (sizeX - minSize <= 0) {
                    cameraDir.set(1, 0, 0); // left view
                } else if (sizeY - minSize <= 0) {
                    cameraDir.set(0, -1, 0); // top view
                } else if (sizeZ - minSize <= 0) {
                    cameraDir.set(0, 0, -1); // front view
                }
            }
            Viewer3DUtils.getCameraPositionByBboxAndDirection(this.bbox, eye, look, camera?.projectionMatrix, cameraDir);
            if (!this.cameraCfg || (this.cameraCfg && (!this.cameraCfg.eye || !this.cameraCfg.look))) {
                this.cameraCfg = {
                    eye: eye.toArray(),
                    look: look.toArray(),
                };
            }
            if (camera instanceof THREE.OrthographicCamera) {
                const bbox = this.bbox;
                const sizeX = bbox.max.x - bbox.min.x;
                const sizeZ = bbox.max.z - bbox.min.z;
                // adjust zoom value according to object size and camera's top/bottom/left/right
                const leftRightSize = camera.right - camera.left;
                const bottomTopSize = camera.top - camera.bottom;
                camera.zoom = Math.max(leftRightSize, bottomTopSize) / Math.max(sizeX, sizeZ);
                camera.zoom /= 2; // make it smaller seems better
                camera.updateProjectionMatrix();
            }
            // do not allow camera's target and position is the same point!!
            if (!eye.equals(look)) {
                this.flyTo(eye, look);
            }
        }
    }

    public zoomToBBox(bbox: THREE.Box3) {
        const eye = new THREE.Vector3();
        const look = new THREE.Vector3();
        const cameraDir = new THREE.Vector3();
        this.camera?.getWorldDirection(cameraDir);
        Viewer3DUtils.getCameraPositionByBboxAndDirection(bbox, eye, look, this.camera?.projectionMatrix, cameraDir);
        if (!eye.equals(look)) {
            // this.flyTo(eye, look);

            const distance = new THREE.Vector3().subVectors(eye, look).length();
            (this.controls as CameraControlsEx).moveTo(eye.x, eye.y, eye.z, true);
            if (this.camera instanceof THREE.OrthographicCamera) {
                const width = this.camera.right - this.camera.left;
                const height = this.camera.top - this.camera.bottom;
                const bbSize = new THREE.Vector3();
                bbox.getSize(bbSize);
                const zoom = Math.min(width / bbSize.x, height / bbSize.y);
                (this.controls as CameraControlsEx).zoomTo(zoom, true);
            } else if (this.camera instanceof THREE.PerspectiveCamera) {
                (this.controls as CameraControlsEx).dollyTo(distance, true);
            }
            (this.controls as CameraControlsEx).setFocalOffset(0, 0, 0, true);
        }
    }

    /**
     * Tries to adjust camera near/far clip plane according to objects size in scene.
     * Do this to avoid the case when objects are too small or big thus clipped!
     */
    private tryAdjustCameraNearAndFar() {
        const camera = this.camera as THREE.PerspectiveCamera | THREE.OrthographicCamera;
        if (!this.scene || !camera) {
            return;
        }
        const bbox = this.bbox;
        const near = camera.near;
        const far = camera.far;
        const sizeX = bbox.max.x - bbox.min.x;
        const sizeY = bbox.max.y - bbox.min.y;
        const sizeZ = bbox.max.z - bbox.min.z;
        const maxSize = Math.max(sizeX, sizeY, sizeZ);
        const factor = 5; // a value according to experience
        const maxNear = maxSize / factor; // camera.near shouldn't bigger than this
        const minFar = maxSize * factor; // camera.far shouldn't smaller than this
        if (near > maxNear || far < minFar) {
            const n2s = (n: number): string => CommonUtils.numberToString(n);
            log.info(`[BimViewer] BBox's longest side is: ${n2s(maxSize)}`);
            if (near > maxNear) {
                log.warn(`[BimViewer] camera.near(${n2s(near)}) shouldn't bigger than ${n2s(maxNear)}, will change it!`);
                camera.near = maxNear;
            }
            if (far < minFar) {
                log.warn(`[BimViewer] camera.far(${n2s(far)}) shouldn't smaller than ${n2s(minFar)}, will change it!`);
                camera.far = minFar;
            }
        }
        // adjust zoom value according to object size and camera's top/bottom/left/right
        if (camera instanceof THREE.OrthographicCamera) {
            const leftRightSize = camera.right - camera.left;
            const bottomTopSize = camera.top - camera.bottom;
            camera.zoom = Math.max(leftRightSize, bottomTopSize) / Math.max(sizeX, sizeZ);
            camera.zoom /= 2; // make it smaller seems better
        }
        camera.updateProjectionMatrix();
    }

    // TODO: Set the fixed direction according to the time
    private tryAdjustDirectionalLight() {
        if (!this.directionalLight) {
            return;
        }
        const bbox = this.bbox;
        const sphere = new THREE.Sphere();
        bbox.getBoundingSphere(sphere);
        const center = sphere.center;
        const radius = sphere.radius;
        const camera = this.directionalLight.shadow.camera;
        camera.zoom = 1.0;
        camera.top = radius;
        camera.bottom = -radius;
        camera.right = radius;
        camera.left = -radius;
        camera.near = 0.1;
        camera.far = 2 * radius;
        camera.updateProjectionMatrix();

        const lightDirection = new THREE.Vector3(-1, -0.5, 1);
        // Keep the default direction consistent with UE
        //const lightDirection = new THREE.Vector3(0.641, -0.423, -0.641);
        lightDirection.normalize().multiplyScalar(radius);
        this.directionalLight.position.copy(center).addScaledVector(lightDirection, -1);
        this.directionalLight.target.position.copy(center);
        log.debug("[BimViewer] this.directionalLight.position", this.directionalLight.position);
        log.debug("[BimViewer] this.directionalLight.target.position", this.directionalLight.target.position);

        this.updateDirectionalLight();
        this.enableRender();
    }

    /**
     * @internal
     */
    updateDirectionalLight() {
        if (!this.directionalLight) {
            return;
        }
        this.directionalLight.updateMatrixWorld();
        this.directionalLight.target.updateMatrixWorld();
        if (this.directionalLightHelper) {
            // matrix = light.matrixWorld
            this.directionalLightHelper.update();
            !this.scene?.matrixAutoUpdate && this.directionalLightHelper.updateWorldMatrix(false, true);
        }
        this.directionalLight.shadow.needsUpdate = true;
        // update the light's shadow camera's projection matrix
        this.directionalLight.shadow.camera.updateProjectionMatrix();

        if (this.shadowCameraHelper) {
            // and now update the camera helper we're using to show the light's shadow camera
            this.shadowCameraHelper.update();
            if (!this.scene?.matrixAutoUpdate) {
                const shadowCamera = this.directionalLight.shadow.camera;
                shadowCamera.position.setFromMatrixPosition(this.directionalLight.matrixWorld);
                tempVec3.setFromMatrixPosition(this.directionalLight.target.matrixWorld);
                shadowCamera.lookAt(tempVec3);
                shadowCamera.updateMatrixWorld();
                // matrix = camera.worldMatrix
                this.shadowCameraHelper.updateWorldMatrix(false, true);
            }
        }
    }

    private updateDirectionalLightShadow() {
        if (!this.directionalLight) {
            return;
        }
        this.directionalLight.shadow.needsUpdate = true;
    }

    /**
     * @internal
     */
    showDirectionalLightHelper(visible: boolean) {
        if (this.directionalLightHelper) {
            this.directionalLightHelper.visible = visible;
        }

        if (this.shadowCameraHelper) {
            this.shadowCameraHelper.visible = visible;
        }
    }

    /**
     * Regenerates skybox according to models' location and size
     */
    private regenSkyOfGradientRamp() {
        if (!this.scene) {
            return;
        }
        if (this.skyOfGradientRamp) {
            this.skyOfGradientRamp.geometry.dispose();
            (this.skyOfGradientRamp.material as THREE.Material).dispose();
            this.scene.remove(this.skyOfGradientRamp);
            this.skyOfGradientRamp.clear();
            this.skyOfGradientRamp = undefined;
        }
        const modelIds = Object.values(this.loadedModels).map((obj) => obj.id);
        Object.values(this.loaded3dTiles).forEach((obj) => modelIds.push(obj.id));
        if (modelIds) {
            const home = this.cameraCfg;
            const position = home && CommonUtils.arrayToVector3(home.eye);
            const target = home && CommonUtils.arrayToVector3(home.look);
            let bbox = new THREE.Box3();
            if (position && target) {
                const p1 = position;
                const p2 = target;
                bbox.expandByPoint(new THREE.Vector3(p1.x, p1.y, p1.z));
                bbox.expandByPoint(new THREE.Vector3(p2.x, p2.y, p2.z));
            } else {
                bbox = SceneUtils.getObjectsBoundingBox(this.scene, modelIds);
            }
            this.skyOfGradientRamp = SkyboxUtils.createSkyOfGradientRampByBoundingBox(bbox);
            this.scene.add(this.skyOfGradientRamp);
        }
    }

    /**
     * Regenerates ground grid according to models' location and size
     */
    private regenGroundGrid() {
        if (!this.scene) {
            return;
        }
        if (this.groundGrid) {
            this.groundGrid.geometry.dispose();
            (this.groundGrid.material as THREE.Material).dispose();
            this.scene.remove(this.groundGrid);
        }
        const modelIds = Object.values(this.loadedModels).map((obj) => obj.id);
        Object.values(this.loaded3dTiles).forEach((obj) => modelIds.push(obj.id));
        if (modelIds) {
            const home = this.cameraCfg;
            const center = home && CommonUtils.arrayToVector3(home.look);
            center && (center.y = 0);
            // TODO: will need to consider ground size according to models' size
            this.groundGrid = GroundUtils.createGroundGrid(undefined, undefined, center);
            this.scene.add(this.groundGrid);
        }
    }

    /**** Anchor rotation related interface start ****/
    private setOrbitPoint(event: EventInfo) {
        const controls = this.controls as CameraControlsEx;
        if (!this.camera || !this.renderer || !this.controls || !this.scene || !this.raycaster || !this.viewerContainer) {
            return;
        }

        if (this.selectedObject && this.selectedObject instanceof THREE.Object3D) {
            const box = new THREE.Box3().setFromObject(this.selectedObject);
            const center = new THREE.Vector3();
            box.getCenter(center);
            controls?.setOrbitPoint(center.x, center.y, center.z);
            const point = CoordinateConversionUtils.worldPosition2ScreenPoint(center, this.camera, this.viewerContainer);
            this.setAnchorPosition(point);
        } else {
            this.raycaster && this.raycaster.layers.set(layerForHitableObjects);
            const intersections = this.getIntersections(event);
            const vector = new THREE.Vector2(event.x, event.y);

            if (intersections && intersections.length !== 0) {
                const point = intersections[0].point;
                controls?.setOrbitPoint(point.x, point.y, point.z);
                this.setAnchorPosition(vector);
            } else {
                const center = this.bbox.getCenter(new THREE.Vector3());
                controls.setOrbitPoint(center.x, center.y, center.z);
                const screenPosition = CoordinateConversionUtils.worldPosition2ScreenPoint(
                    center,
                    this.camera,
                    this.renderer.domElement
                );
                this.setAnchorPosition(screenPosition);
            }
        }
    }

    private onAnchorPointerDown = (event: EventInfo) => {
        if (!this.controls?.enableRotate || !this.renderer || this.sectionManager?.isSectionActive()) {
            return;
        }
        this.setOrbitPoint(event);
    };

    private setAnchorPosition(position: THREE.Vector2) {
        if (this.anchor) {
            this.anchor.className = `anchor active`;
            this.anchor.style.left = `${position.x}px`;
            this.anchor.style.top = `${position.y}px`;
        }
    }

    private createAnchor() {
        const anchor = document.createElement("div");
        anchor.className = "anchor";
        this.viewerContainer?.appendChild(anchor);
        return anchor;
    }

    private disposeAnchor() {
        if (this.anchor) {
            this.viewerContainer?.removeChild(this.anchor);
            this.anchor = undefined;
        }
    }

    private onAnchorPointerUp = () => {
        if (this.anchor) {
            this.anchor.className = `anchor`;
        }
        if (!this.viewerContainer || !this.camera || !this.controls) {
            return;
        }
    };

    private disposeRotateToCursor() {
        this.disposeAnchor();
    }
    /******* Anchor rotation related interface end *********/

    /**
     * Adds a hotpoint.
     * Caller should set a hotpointId that is unique in the session of current DxfViewer.
     */
    addHotpoint(hotpoint: Hotpoint) {
        const exists = this.hasHotpoint(hotpoint.hotpointId);
        if (exists) {
            log.warn(`[BimViewer] Hotpoint with id '${hotpoint.hotpointId}' already exist!`);
            return;
        }
        const p = hotpoint.anchorPosition;
        const object = CSS2DObjectUtils.createHotpoint(hotpoint.html);
        object.position.set(p[0] || 0, p[1] || 0, p[2] || 0);
        object.visible = hotpoint.visible !== false;
        object.userData.hotpoint = hotpoint;

        if (!this.hotpointRoot) {
            this.hotpointRoot = new THREE.Group();
            this.hotpointRoot.matrixAutoUpdate = matrixAutoUpdate;
            this.hotpointRoot.matrixWorldAutoUpdate = false;
            this.hotpointRoot.name = "HotpointRoot";
            this.scene?.add(this.hotpointRoot);
        }
        this.hotpointRoot.add(object);
        object.updateWorldMatrix(false, false);
        this.enableRender();
    }

    /**
     * Removes a hotpoint by given hotpointId.
     * Caller should set a hotpointId that is unique in the session of current DxfViewer.
     */
    removeHotpoint(hotpointId: string) {
        const objects = this.hotpointRoot?.children || [];
        for (let i = 0; i < objects.length; ++i) {
            const obj = objects[i];
            if (obj.userData.hotpoint?.hotpointId === hotpointId) {
                obj.removeFromParent();
            }
        }
    }

    /**
     * Clears all hotpoints.
     */
    clearHotpoints() {
        this.hotpointRoot?.clear();
    }

    /**
     * Checks if hotpoint with specific id already exist
     * Caller should set a hotpointId that is unique in the session of current DxfViewer.
     * @internal
     */
    hasHotpoint(hotpointId: string): boolean {
        const objects = this.hotpointRoot?.children || [];
        return objects.findIndex((obj) => obj.userData.hotpoint?.hotpointId === hotpointId) !== -1;
    }

    /**
     * Enables or disable Composer
     * @internal
     */
    public enableComposer(enable: boolean) {
        if (!this.scene || !this.camera || !this.renderer) {
            return;
        }

        this.composerEnabled = enable;
        if (enable && !this.composer) {
            this.composer = new EffectComposer(this.renderer);
        }
        this.enableRender();
    }

    /**
     * Enables or disable RenderPass
     * @internal
     */
    public enableRenderPass(enable: boolean) {
        if (!this.scene || !this.camera || !this.renderer || !this.composer) {
            return;
        }

        if (enable && !this.renderPass) {
            const pass = new RenderPass(this.scene, this.camera);
            pass.setSize(this.width, this.height);
            this.composer.addPass(pass);
            this.renderPass = pass;
        }
        if (this.renderPass) {
            this.renderPass.enabled = enable;
        }
        this.enableRender();
    }

    /**
     * Enables or disable FxaaPass
     * @internal
     */
    public enableFxaaPass(enable: boolean) {
        if (!this.scene || !this.camera || !this.renderer || !this.composer) {
            return;
        }

        if (enable && !this.effectFxaaPass) {
            const pass = new ShaderPass(FXAAShader);
            // eslint-disable-next-line
            pass.uniforms["resolution"].value.set(1 / this.width, 1 / this.height);
            pass.setSize(this.width, this.height);
            pass.renderToScreen = true;
            this.composer.addPass(pass);
            this.effectFxaaPass = pass;
        }
        if (this.effectFxaaPass) {
            this.effectFxaaPass.enabled = enable;
        }
        this.enableRender();
    }

    /**
     * Enables or disable SAOPass
     * @internal
     */
    public enableSaoPass(enable: boolean) {
        if (!this.scene || !this.camera || !this.renderer || !this.composer) {
            return;
        }

        if (enable && !this.saoPass) {
            const pass = new SAOPass(this.scene, this.camera, false, true, new THREE.Vector2(1 / this.width, 1 / this.height));
            pass.setSize(this.width, this.height);
            // pass.renderToScreen = true
            // pass.resolution.set(1024, 1024)
            pass.params.output = 0;
            pass.params.saoBias = 0.5; // -1 - 1
            pass.params.saoIntensity = 0.00005; // 0 - 1
            pass.params.saoScale = 5; // 0 - 10
            pass.params.saoKernelRadius = 40; // 1 - 100
            pass.params.saoMinResolution = 0; // 0 - 1
            // pass.params.saoBlur = true
            // pass.params.saoBlurRadius = 8 // 0 - 200
            // pass.params.saoBlurStdDev = 4 // 0.5 - 150
            // pass.params.saoBlurDepthCutoff = 0.01 // 0 - 0.1
            this.composer.addPass(pass);
            this.saoPass = pass;
        }
        if (this.saoPass) {
            this.saoPass.enabled = enable;
        }
        this.enableRender();
    }

    /**
     * Enables or disable SSAOPass
     * @internal
     */
    public enableSsaoPass(enable: boolean) {
        if (!this.scene || !this.camera || !this.renderer || !this.composer) {
            return;
        }

        if (enable && !this.ssaoPass) {
            const pass = new SSAOPass(this.scene, this.camera, this.width, this.height);
            pass.kernelRadius = 16;
            pass.minDistance = 0.005; // 0.001 - 0.02
            pass.maxDistance = 0.1; // 0.01 - 0.3
            // pass.output = 0 // 'Default': 0, 'SSAO': 1, 'Blur': 2, 'Beauty': 3, 'Depth': 4, 'Normal': 5
            this.composer.addPass(pass);
            this.ssaoPass = pass;
        }
        if (this.ssaoPass) {
            this.ssaoPass.enabled = enable;
        }
        this.enableRender();
    }

    /**
     * Enables or disable OutlinePass
     * @internal
     */
    public enableOutlinePass(enable: boolean) {
        if (!this.scene || !this.camera || !this.renderer || !this.composer) {
            return;
        }

        if (enable && !this.outlinePass) {
            const pass = new OutlinePass(new THREE.Vector2(this.width, this.height), this.scene, this.camera);
            pass.edgeStrength = 3;
            pass.edgeGlow = 0;
            pass.edgeThickness = 2;
            pass.pulsePeriod = 0; // 0: don't pulse
            // outlinePass.usePatternTexture =
            pass.visibleEdgeColor.set(0xff0000);
            pass.hiddenEdgeColor.set(0xffa080);
            this.composer.addPass(pass);
            this.outlinePass = pass;
        }
        if (this.outlinePass) {
            this.outlinePass.enabled = enable;
        }
        this.enableRender();
    }

    /**
     * Enables or disable SSAARenderPass
     * @internal
     */
    public enableSsaaPass(enable: boolean) {
        if (!this.scene || !this.camera || !this.renderer || !this.composer) {
            return;
        }

        if (enable && !this.ssaaRenderPass) {
            const pass = new SSAARenderPass(this.scene, this.camera, 0xffffff, 0);
            this.composer.addPass(pass);
            this.ssaaRenderPass = pass;
        }
        if (this.ssaaRenderPass) {
            this.ssaaRenderPass.enabled = enable;
        }
        this.enableRender();
    }

    /**
     * Enables or disable BloomPass
     * @internal
     */
    public enableBloomPass(enable: boolean) {
        if (!this.scene || !this.camera || !this.renderer || !this.composer) {
            return;
        }

        if (enable && !this.bloomPass) {
            const pass = new BloomPass(
                1, // strength
                25, // kernel size
                4 // sigma ?
            );
            pass.renderToScreen = true; // usually set it to true if it is the last pass
            this.composer.addPass(pass);
            this.bloomPass = pass;
        }
        if (this.bloomPass) {
            this.bloomPass.enabled = enable;
        }
        this.enableRender();
    }

    /**
     * Enables or disable UnrealBloomPass
     * @internal
     */
    public enableUnrealBloomPass(enable: boolean) {
        if (!this.scene || !this.camera || !this.renderer || !this.composer) {
            return;
        }

        if (enable && !this.unrealBloomPass) {
            const pass = new UnrealBloomPass(new THREE.Vector2(this.width, this.height), 1, 0, 0);
            pass.threshold = 0;
            pass.strength = 0.5;
            pass.radius = 0;
            this.composer.addPass(pass);
            this.unrealBloomPass = pass;
        }
        if (this.unrealBloomPass) {
            this.unrealBloomPass.enabled = enable;
        }
        this.enableRender();
    }

    /**
     * Enable section.
     * Currently, it only implemented local(object) box section.
     */
    public activateSection(type = SectionType.ObjectsBoxSection, clippingObjectIds?: number[]) {
        if (!this.inputManager || this.sectionManager?.isSectionActive()) {
            return;
        }
        this.sectionType = type;
        this.clearSelection();
        if (!this.sectionManager) {
            this.sectionManager = new SectionManager(this, this.inputManager);
        }
        this.sectionManager.activateSection(type, clippingObjectIds);
        this.enableRender();
    }

    /**
     * Deactivates section
     */
    public deactivateSection() {
        this.sectionManager?.deactivateSection();
        this.enableRender();
    }

    /**
     * @internal
     */
    setSectionClippingObjectIds(clippingObjectIds?: number[]) {
        this.sectionManager?.setSectionClippingObjectIds(clippingObjectIds);
        this.enableRender();
    }

    /**
     * @internal
     */
    getActiveSection() {
        return this.sectionManager?.getActiveSection();
    }

    /**
     * @internal
     */
    getMeasurementManager() {
        return this.measurementManager;
    }

    /**
     * Gets measurement data
     * @internal
     */
    getMeasurements(): MeasurementData[] {
        if (!this.inputManager) {
            return [];
        }
        if (!this.measurementManager) {
            this.measurementManager = new MeasurementManager(this, this.inputManager);
        }
        const mm = this.measurementManager;
        return mm.getMeasurementsData();
    }

    /**
     * Activates one of "Distance", "Area" or "Angle" measurement
     * @param type "Distance", "Area" or "Angle"
     */
    activateMeasurement(type: MeasurementType) {
        if (!this.inputManager) {
            return;
        }
        if (!this.measurementManager) {
            this.measurementManager = new MeasurementManager(this, this.inputManager);
        }
        const mm = this.measurementManager;
        mm.activateMeasurement(type);
        this.clearSelection();
    }

    /**
     * Deactivates measurement
     */
    deactivateMeasurement() {
        this.measurementManager?.deactivateMeasurement();
    }

    /**
     * @internal
     */
    setMeasurementVisibility(id: string, visible: boolean): boolean {
        if (!this.inputManager || !this.measurementManager || !id) {
            return false;
        }
        const mm = this.measurementManager;
        return mm.setMeasurementVisibility(id, visible);
    }

    /**
     * Clears all measurement results
     */
    clearMeasurements() {
        this.measurementManager?.clearMeasurements();
    }

    /**
     * Zooms to selected box area.
     */
    zoomToRect() {
        if (!this.zoomToRectHelper) {
            this.zoomToRectHelper = new ZoomToRectHelper(this);
        }
        this.zoomToRectHelper.activate();
    }

    /**
     * @internal
     */
    deactivateZoomRect() {
        this.zoomToRectHelper?.deactivate();
    }

    /**
     * @internal
     */
    public enableWebCam() {
        if (!this.scene) {
            return;
        }

        // for now, this is a demo. Just create a 5x4 plane and put it somewhere
        if (!this.webcam) {
            this.webcam = new WebCam();
        }
        if (!this.webcamPlane) {
            this.webcamPlane = this.webcam.createWebCamPlane();
            this.webcamPlane.position.set(10, 2, 0);
        }
        this.scene.add(this.webcamPlane);
    }

    /**
     * @internal
     */
    public disableWebCam() {
        if (!this.scene) {
            return;
        }
        if (this.webcamPlane) {
            this.webcamPlane.geometry.dispose();
            (this.webcamPlane.material as THREE.Material).dispose();
            this.scene.remove(this.webcamPlane);
        }
    }

    /**
     * Sets environment for the scene.
     * @param hdrUrl Full path of picture url in hdr format
     */
    public setEnvironment(hdrUrl: string) {
        TextureUtils.createEnvTexture(this.pmremGenerator, hdrUrl).then((texture) => {
            if (this.scene) {
                this.scene.environment = texture;
            }
        });
    }

    /**
     * Sets environment for the scene.
     * @param data Uint16Array of the hdr content
     * @internal
     */
    public setEnvironmentFromDataArray(data?: Uint16Array) {
        TextureUtils.createEnvTextureFromDataArray(this.pmremGenerator, data).then((texture) => {
            if (this.scene) {
                this.scene.environment = texture;
            }
        });
    }

    async takeObjectsScreenshot(uniqueIds: string[]) {
        return new Promise((resolve, reject) => {
            if (!this.renderer) {
                reject("renderer is undefined");
            }
            // const excludeObjectIds: string[] = [];
            this.scene?.traverse((object: THREE.Object3D) => {
                if (object instanceof THREE.Mesh) {
                    if (includes(uniqueIds, get(object.userData, "UniqueId"))) {
                        // excludeObjectIds.push(object.id);
                        object.visible = true;
                    } else {
                        object.visible = false;
                    }
                }
            });
            // ObjectUtils.setObjectOpacity(this.scene, 0.1, undefined, excludeObjectIds);
            this.enableRender();
            setTimeout(() => {
                resolve(this.renderer?.domElement.toDataURL("image/png"));
            }, 1000);
        });
    }

    /**
     * Sets object to a specific color. Note that:
     * - The change is permanent, and cannot be recovered to the original color or material.
     * - If a material is shared, it may affect other objects.
     * @param color A color number in format of "0x000000"
     * @internal
     */
    setObjectColor(object: THREE.Object3D, color: number) {
        // unselect any selected/highlighted object, otherwise, there maybe bug
        this.clearSelection();

        // Find out all materials for the object. The key is material id.
        const materials: Record<number, THREE.Material> = {};
        object.traverse((obj) => {
            const material = (obj as any).material; // eslint-disable-line
            if (!material) {
                return;
            }
            if (Array.isArray(material)) {
                material.forEach((mat: THREE.Material) => {
                    materials[mat.id] = mat;
                });
            } else {
                materials[material.id] = material;
            }
        });

        // change color one by one
        for (const id in materials) {
            MaterialUtils.setMaterialColor(materials[id], new THREE.Color(color));
        }
        this.enableRender();
    }

    /**
     * Updates raycaster threshold to a proper value, so user can easily pick points and lines
     */
    private updateRaycasterThreshold() {
        const camera = this.camera;
        if (!camera || !this.raycaster) {
            return;
        }

        // TODO: There are problems about line raycaster in OrthographicCamera.
        // Zoom need to be considered.
        const threshold = 12 / camera.zoom;
        const params = this.raycaster.params;
        if (!params.Line) {
            params.Line = { threshold: threshold };
        } else {
            params.Line.threshold = threshold;
        }
        if (!params.Points) {
            params.Points = { threshold: threshold };
        } else {
            params.Points.threshold = threshold;
        }
        // log.info(`[BimViewer] Raycaster threshold: ${threshold}`);
    }

    /**
     * Instatiates leaf nodes of given object.
     * If objects' geometry and material are the same, they can be instanced.
     * @param object
     */
    private instantiate(object: THREE.Object3D) {
        new InstantiateHelper(object).instantiate();
    }

    /**
     * Merges leaf nodes of given object.
     * If objects' materials are the same, they can be merged.
     * @param object
     */
    private merge(object: THREE.Object3D) {
        this.increaseJobCount();
        try {
            const objects: THREE.Object3D[] = [];
            object.traverse((obj) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if ((obj as any).geometry && (obj as any).material) {
                    // eslint-disable-line
                    objects.push(obj);
                }
            });
            MergeUtils.deepMerge(objects, object);
        } finally {
            this.decreaseJobCount();
        }
    }

    /**
     * Updates project settings
     * @internal
     */
    public updateProjectSettings(settings: SettingsType) {
        this.settings = settings;

        const updateCameraSettings = (
            c: THREE.PerspectiveCamera | THREE.OrthographicCamera | undefined,
            cs: CameraSettings
        ) => {
            if (c && cs) {
                c.near = cs.near;
                c.far = cs.far;
                c.updateProjectionMatrix();
            }
        };
        updateCameraSettings(this.perspectiveCamera, this.settings.camera);
        updateCameraSettings(this.orthoCamera, this.settings.camera);
        this.enableRender(10);
    }

    /**
     * Compute bounding box of loaded models
     * @internal
     */
    public computeBoundingBox(): THREE.Box3 {
        const bbox = new THREE.Box3();
        Object.values(this.loadedModels).forEach((model: { id: number; bbox?: THREE.Box3 }) => {
            if (model.bbox && !model.bbox.isEmpty()) {
                bbox.union(model.bbox);
            }
        });

        Object.values(this.loaded3dTiles).forEach((model: { id: number; bbox: THREE.Box3; renderer: TilesRenderer }) => {
            if (!model.bbox.isEmpty()) {
                bbox.union(model.bbox);
            }
        });

        this.bbox = bbox;

        if (this.controls) {
            this.controls.minDistance = 0.1;
            this.controls.maxDistance = this.bbox.getSize(new THREE.Vector3()).length() * 3;
        }
        return bbox;
    }
}
