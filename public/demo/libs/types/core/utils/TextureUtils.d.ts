import * as THREE from "three";
/**
 * TextureUtils class
 * @internal
 */
export declare class TextureUtils {
    /**
     * Creates an environment texture
     */
    static createEnvTexture(pmremGenerator: THREE.PMREMGenerator | undefined, url: string): Promise<THREE.Texture>;
    /**
     * Creates default environment texture
     */
    static createEnvTextureFromDataArray(pmremGenerator: THREE.PMREMGenerator | undefined, data?: Uint16Array, width?: number, height?: number): Promise<THREE.Texture>;
    private static HDR_CITY_STREET_64x32;
}
