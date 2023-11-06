export declare enum NavigationModes {
    Orbit = 0,
    FirstPerson = 1,
    Plan = 2,
    VR = 3
}
export interface Control {
    mode: NavigationModes;
    setupControl(): void;
    adjustCameraByBbox(bbox: THREE.Box3): void;
}
