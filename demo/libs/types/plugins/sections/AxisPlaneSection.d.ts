import * as THREE from "three";
import { BaseSection } from "./BaseSection";
import { EventInfo, InputManager } from "../../core/input/InputManager";
import type { BaseViewer } from "../../core/viewers";
import { SectionGizmo } from "../../plugins/sections/SectionGizmo";
import { SectionPlaneMesh } from "../../plugins/sections/SectionPlaneMesh";
export declare enum AxisType {
    X = "X",
    Y = "Y",
    Z = "Z"
}
export declare class AxisPlaneSection extends BaseSection {
    protected activeAxis: AxisType;
    protected gizmo?: SectionGizmo;
    protected planeMesh?: SectionPlaneMesh;
    protected clipPlane?: THREE.Plane;
    protected selectedObject?: SectionPlaneMesh | THREE.Mesh | THREE.Object3D;
    protected axisInfoMap: {
        [key in AxisType]: {
            normal: THREE.Vector3;
        };
    };
    protected center: THREE.Vector3;
    protected clipPlaneConstant?: number;
    constructor(viewer: BaseViewer, input: InputManager);
    /**
     * Activates plane section.
     * @param type Specifies the axis for sectioning. The default value is "X" axis.
     * @param clipPlaneConstant It decides where the clip plane is. By default, the clip plane passes through
     * the center of world bounding box. Caller can specify a different position.
     * E.g., when type is "X" and clipPlaneConstant is 10, it means the clip plane passes through (10, 0, 0).
     */
    activate(type?: AxisType, clipPlaneConstant?: number): void;
    deactivate(keepSectionState?: boolean): void;
    reset(): void;
    /**
     * Sets a AxisType for plane section.
     * @param type Specifies the axis for sectioning.
     * @param clipPlaneConstant It decides where the clip plane is. By default, the clip plane passes through
     * the center of world bounding box. Caller can specify a different position.
     * E.g., when type is "X" and clipPlaneConstant is 10, it means the clip plane passes through (10, 0, 0).
     */
    setActiveAxis(type: AxisType, clipPlaneConstant?: number): void;
    /**
     * Sets gizmo and section plane mesh visibility.
     */
    setSectionPlaneVisible(visible: boolean): void;
    protected initOrUpdateClipPlanes(): void;
    protected initOrUpdateSectionPlaneMeshes(): void;
    protected initOrUpdateGizmo(): void;
    mousedown: (e: EventInfo) => void;
    protected mousemove: (e: EventInfo) => void;
    onDragStart(e: EventInfo): void;
    onDragMove(e: EventInfo): void;
    onDragEnd(e: EventInfo): void;
    getIntersectObjects(): THREE.Object3D<THREE.Event>[];
    activateSelectedObject(active: boolean): void;
    /**
     * Adjusts a position by activeAxis and clipPlaneConstant.
     */
    private adjustPositionByClipPlaneConstant;
}
