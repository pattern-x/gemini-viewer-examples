declare const _default: "\n    #if defined(USE_BC_OUTLINE)\n        // Restore barycentric coordinates\n        int barycentricX = int(barycentric) & 0x1;\n        int barycentricY = int(barycentric) & 0x2;\n        int barycentricZ = int(barycentric) & 0x4;\n        vBarycentric = vec3(float(barycentricX), float(barycentricY), float(barycentricZ));\n    #endif\n";
export default _default;
