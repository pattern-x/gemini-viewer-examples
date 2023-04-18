import * as THREE from "three";
import { Views } from "../utils/Viewer3DUtils";
import { BaseViewer } from "../viewers/BaseViewer";
import { BaseSection } from "./BaseSection";
import { SectionPlane } from "./SectionPlane";
import { EventInfo, InputManager } from "../../core/input/InputManager";
export declare class ObjectsBoxSection extends BaseSection {
    protected selectedObject?: SectionPlane;
    protected planesMesh?: SectionPlane[];
    protected sectionRange: Record<string, number[]>;
    constructor(viewer: BaseViewer, input: InputManager);
    activate(): void;
    deactivate(): void;
    protected initOrUpdateVertices(): void;
    initOrUpdateClipPlane(): void;
    initOrUpdateSectionPlane(): void;
    activateSelectedObject(active: boolean): void;
    onDragStart(e: EventInfo): void;
    onDragMove(e: EventInfo): void;
    onDragEnd(e: EventInfo): void;
    protected dragTranslateSectionPlane(axis: THREE.Vector3, from: THREE.Vector3, to: THREE.Vector3, actionType: Views): void;
    protected isInRange(value: number, range: number[]): boolean;
    protected getIntersections(e: EventInfo): THREE.Intersection | undefined;
    getIntersectObjects(): SectionPlane[];
    resetSection(): void;
    setSectionVisible(visible: boolean): void;
}
