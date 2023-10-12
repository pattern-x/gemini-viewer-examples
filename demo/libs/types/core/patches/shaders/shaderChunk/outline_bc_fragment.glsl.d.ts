declare const _default: "\n        #if defined(USE_BC_OUTLINE)\n            vec3 finWireFrameColor =  outlineColor;\n            vec3 _tempColor = gl_FragColor.rgb;\n\n            gl_FragColor.rgb = mix(finWireFrameColor, _tempColor, edgeFactor3());\n        #endif\n";
export default _default;
