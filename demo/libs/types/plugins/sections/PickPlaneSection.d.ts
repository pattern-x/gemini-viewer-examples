import * as THREE from "three";
import { Tooltip } from "../../components/tool-tip";
import { EventInfo, InputManager } from "../../core/input/InputManager";
import type { BaseViewer } from "../../core/viewers";
import { BaseSection } from "../../plugins/sections/BaseSection";
import { SectionGizmo } from "../../plugins/sections/SectionGizmo";
import { SectionPlaneMesh } from "../../plugins/sections/SectionPlaneMesh";
export declare class PickPlaneSection extends BaseSection {
    protected faceInfo?: {
        position: THREE.Vector3;
        normal: THREE.Vector3;
    };
    protected gizmo?: SectionGizmo;
    protected planeMesh?: SectionPlaneMesh;
    protected clipPlane?: THREE.Plane;
    protected selectedObject?: SectionPlaneMesh | THREE.Mesh | THREE.Object3D;
    protected center: THREE.Vector3;
    protected tooltip?: Tooltip;
    constructor(viewer: BaseViewer, input: InputManager);
    activate(): void;
    deactivate(): void;
    setSection(): void;
    resetSection(): void;
    setSectionPlaneMeshVisible(visible: boolean): void;
    protected initOrUpdateClipPlanes(): void;
    protected initOrUpdateSectionPlaneMeshes(): void;
    protected initOrUpdateGizmo(): void;
    mousedown: (e: EventInfo) => void;
    mousemove: (e: EventInfo) => void;
    onDragStart(e: EventInfo): void;
    onDragMove(e: EventInfo): void;
    onDragEnd(e: EventInfo): void;
    getIntersectObjects(): THREE.Object3D<THREE.Event>[];
    activateSelectedObject(active: boolean): void;
    pickFace(e: EventInfo): THREE.Intersection<THREE.Object3D<THREE.Event>> | undefined;
}
