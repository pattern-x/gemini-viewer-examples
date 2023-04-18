/**
 * Perspective and Orthographic camera share the same settings
 * @internal
 */
export interface CameraSettings {
    near: number;
    far: number;
}
/**
 * @internal
 */
export interface MouseSetting {
    sensitivity: number;
}
/**
 * @internal
 */
export interface KeyboardSetting {
    sensitivity: number;
}
/**
 * @internal
 */
export interface Settings {
    unit: string;
    decimalPrecision: number;
    camera: CameraSettings;
    mouse: MouseSetting;
    keyboard: KeyboardSetting;
}
/**
 * @internal
 */
export declare const defaultSettings: Settings;
export declare const cameraNearRange: number[];
export declare const cameraFarRange: number[];
export declare const unitRange: {
    [key: string]: string;
};
export declare const sensitivityRange: number[];
export declare const decimalPrecisionRange: {
    [key: string]: number;
};
export declare const settingStoreKeyName = "THREE_RENDER_SETTING";
