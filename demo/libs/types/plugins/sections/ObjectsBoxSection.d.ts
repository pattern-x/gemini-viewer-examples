import * as THREE from "three";
import { BaseSection } from "./BaseSection";
import { SectionPlaneMesh } from "./SectionPlaneMesh";
import { EventInfo, InputManager } from "../../core/input/InputManager";
import { Views } from "../../core/utils/Viewer3DUtils";
import { BaseViewer } from "../../core/viewers/BaseViewer";
export declare class ObjectsBoxSection extends BaseSection {
    protected selectedObject?: SectionPlaneMesh;
    protected planeMeshes?: SectionPlaneMesh[];
    protected sectionRange: Record<string, number[]>;
    constructor(viewer: BaseViewer, input: InputManager);
    activate(): void;
    deactivate(): void;
    protected initOrUpdateVertices(): void;
    protected initOrUpdateClipPlanes(): void;
    protected initOrUpdateSectionPlaneMeshes(): void;
    activateSelectedObject(active: boolean): void;
    onDragStart(e: EventInfo): void;
    onDragMove(e: EventInfo): void;
    onDragEnd(e: EventInfo): void;
    protected dragTranslateSectionPlane(axis: THREE.Vector3, from: THREE.Vector3, to: THREE.Vector3, actionType: Views): void;
    protected isInRange(value: number, range: number[]): boolean;
    protected getIntersections(e: EventInfo): THREE.Intersection | undefined;
    getIntersectObjects(): SectionPlaneMesh[];
    resetSection(): void;
    setSectionPlaneMeshVisible(visible: boolean): void;
}
