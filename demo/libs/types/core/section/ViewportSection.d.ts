import { Box3, Group, Plane, Scene, Vector3 } from "three";
import { Views } from "../utils/Viewer3DUtils";
import { BoxFace, BoxLine } from "./BaseBoxSection";
/**
 * For dxf viewport section, only 4 section planes are required.
 */
export declare class ViewportSection {
    isOpen: boolean;
    protected sectionBox?: Box3;
    protected scene: Scene;
    private objectIds;
    private isShowSection;
    constructor(scene: Scene, objectsIds: number[], isShowSection?: boolean);
    setSectionBox(sectionBox: Box3): void;
    /**
     * Starts to clip
     */
    open(): void;
    /**
     * Close clipper
     */
    close(): void;
    /**
     * reset clipper
     */
    reset(): void;
    protected group: Group;
    protected planes: Array<Plane>;
    protected vertices: Vector3[];
    protected faces: Array<BoxFace>;
    protected lines: Array<BoxLine>;
    protected sectionPlaneMap: Map<Views, Plane>;
    /**
     * Initialize clip box
     */
    protected initSectionBox(): void;
    /**
     * Only 4 section planes
     */
    protected initPlanes(): void;
    /**
     * Clears clip box
     */
    protected clearSectionBox(): void;
    private setObjectsSectionEnabled;
    /**
     * Initialize or update 8 vertices of section box
     */
    protected initOrUpdateVertices(): void;
    protected initOrUpdateFaces(): void;
    /**
     * Initialize 12 lines of section box
     */
    protected initOrUpdateLines(): void;
}
