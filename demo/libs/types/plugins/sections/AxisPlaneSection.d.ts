import * as THREE from "three";
import { BaseSection } from "./BaseSection";
import { EventInfo, InputManager } from "../../core/input/InputManager";
import type { BaseViewer } from "../../core/viewers";
import { SectionGizmo } from "../../plugins/sections/SectionGizmo";
import { SectionPlane } from "../../plugins/sections/SectionPlane";
export declare enum AxisType {
    X = "X",
    Y = "Y",
    Z = "Z"
}
export declare class AxisPlaneSection extends BaseSection {
    protected activeAxis: AxisType;
    protected gizmo?: SectionGizmo;
    protected planeMesh?: SectionPlane;
    protected clipPlane?: THREE.Plane;
    protected selectedObject?: SectionPlane | THREE.Mesh;
    protected axisInfoMap: {
        [key in AxisType]: {
            normal: THREE.Vector3;
        };
    };
    protected center: THREE.Vector3;
    constructor(viewer: BaseViewer, input: InputManager);
    activate(): void;
    deactivate(): void;
    resetSection(): void;
    setActiveAxis(type: AxisType): void;
    setSectionVisible(visible: boolean): void;
    initOrUpdateClipPlane(): void;
    initOrUpdateSectionPlane(): void;
    initOrUpdateGizmo(): void;
    onDragStart(e: EventInfo): void;
    onDragMove(e: EventInfo): void;
    onDragEnd(e: EventInfo): void;
    getIntersectObjects(): THREE.Object3D<THREE.Event>[];
    activateSelectedObject(active: boolean): void;
}