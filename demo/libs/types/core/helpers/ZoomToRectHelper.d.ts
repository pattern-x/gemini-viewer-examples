import * as THREE from "three";
import type { BaseViewer } from "../../core/viewers";
export declare class ZoomToRectHelper {
    protected viewer: BaseViewer;
    private boxSelectHelper?;
    private active;
    constructor(viewer: BaseViewer);
    private get viewerContainer();
    get camera(): THREE.OrthographicCamera | THREE.PerspectiveCamera;
    get raycaster(): THREE.Raycaster;
    isActive(): boolean;
    activate(): void;
    deactivate(): void;
    protected pickPositionByScreenPoint(p: THREE.Vector2): THREE.Vector3 | undefined;
    protected handleZoomToRect(leftTop: THREE.Vector2, rightBottom: THREE.Vector2): void;
    destroy(): void;
}
