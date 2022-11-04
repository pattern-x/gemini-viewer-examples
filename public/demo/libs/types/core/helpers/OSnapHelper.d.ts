import * as THREE from "three";
import { SVGObject } from "../patches/SVGRenderer";
export declare enum OSnapType {
    None = 0,
    StartPoint = 1,
    EndPoint = 2,
    MiddlePoint = 4,
    PointOnLine = 8,
    Intersection = 16,
    FootOfPerpendicular = 32
}
export declare class OSnapHelper {
    private scene;
    private camera;
    private markers;
    private activeOSnapType;
    constructor(scene: THREE.Scene, camera: THREE.Camera);
    private initOSnapMarkers;
    getMarker(type: OSnapType): SVGObject;
    deactivate(): void;
    destroy(): void;
    /**
     * Tries to find a proper snap point and display corresponding marker.
     * @param intersections
     * @returns Target snap point if any
     */
    handleSnap(intersections: THREE.Intersection[], mouseDownPosition: THREE.Vector3, completed: boolean | undefined): THREE.Vector3 | undefined;
    private activateMarker;
    /**
     * Gets possible osnap info for an intersection
     */
    private getOSnapInfo;
    /**
     * Gets start/end point of a line for an intersection
     */
    private getStartAndEndPoints;
    private getFootOfPerpendicular;
    protected getSnapTolerance(): number;
}
