declare const _default: "\n        #ifdef USE_BC_OUTLINE\n            vec3 finWireframeColor =  outlineColor;\n            vec3 _tempColor = gl_FragColor.rgb;\n\n            gl_FragColor.rgb = mix(finWireframeColor, _tempColor, edgeFactor3());\n        #endif\n";
export default _default;
