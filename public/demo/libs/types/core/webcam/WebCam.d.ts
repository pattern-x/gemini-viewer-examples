import * as THREE from "three";
/**
 * This class is just a demo yet
 * Reference to https://sbcode.net/threejs/webcam/
 * @internal
 */
export declare class WebCam {
    private webcamCanvas;
    private webcam;
    private canvasCtx;
    private webcamTexture;
    private shaderMaterial;
    readonly vertexShader = "\n    varying vec2 vUv;\n    void main( void ) {\n        vUv = uv;\n        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\n    }";
    readonly fragmentShader = "\n    uniform vec3 keyColor;\n    uniform float similarity;\n    uniform float smoothness;\n    varying vec2 vUv;\n    uniform sampler2D map;\n    void main() {\n        vec4 videoColor = texture2D(map, vUv);\n\n        float Y1 = 0.299 * keyColor.r + 0.587 * keyColor.g + 0.114 * keyColor.b;\n        float Cr1 = keyColor.r - Y1;\n        float Cb1 = keyColor.b - Y1;\n        \n        float Y2 = 0.299 * videoColor.r + 0.587 * videoColor.g + 0.114 * videoColor.b;\n        float Cr2 = videoColor.r - Y2; \n        float Cb2 = videoColor.b - Y2; \n        \n        float blend = smoothstep(similarity, similarity + smoothness, distance(vec2(Cr2, Cb2), vec2(Cr1, Cb1)));\n        gl_FragColor = vec4(videoColor.rgb, videoColor.a * blend); \n    }";
    constructor();
    /**
     * Returns THREE.ShaderMaterial that can be used for PlaneGeometry, Mesh, etc.
     */
    getShaderMaterial(): THREE.ShaderMaterial;
    /**
     * Creates a plane to display webcam stream
     */
    createWebCamPlane(width?: number, height?: number): THREE.Mesh;
    /**
     * This should be called in renderer's animate method
     */
    animate(): void;
}
