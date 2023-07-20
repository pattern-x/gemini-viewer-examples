import * as THREE from "three";
import type { BimViewer, DxfViewer } from "../../core/viewers";
export declare class ZoomToRectHelper {
    protected viewer: DxfViewer | BimViewer;
    private boxSelectHelper?;
    private actived;
    constructor(viewer: DxfViewer | BimViewer);
    private get viewerContainer();
    get camera(): THREE.OrthographicCamera | THREE.PerspectiveCamera;
    get raycaster(): THREE.Raycaster;
    isActived(): boolean;
    activate(): void;
    deactivate(): void;
    protected pickPositionByScreenPoint(p: THREE.Vector2): THREE.Vector3 | undefined;
    protected handleZoomToRect(leftTop: THREE.Vector2, rightBottom: THREE.Vector2): void;
    destroy(): void;
}
