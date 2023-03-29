# gemini-viewer-examples
Examples and demos for gemini-viewer sdk.

- [Online examples](https://pattern-x.github.io/gemini-viewer-examples/)
- [Online demos](https://pattern-x.github.io/gemini-viewer-examples/#/demo/)

# Set up the example project
npm install

npm start

http://localhost:3000/



# gemini-viewer
gemini-viewer is a WebGL based JS SDK, it is built on top of three.js. It provides following viewers:

#### 1. BimViewer
Used to view 3d BIM models. It supports formats including gltf, obj, fbx, ifc, dae, etc. Its features including measurement, section, display outline, orthographic camera, selection, etc.

#### 2. DxfViewer
Used to view 2d drawings. Only dxf format is supported, so user needs to convert dwg files to dxf. It supports most common entity types, it supports OLE and region via dwg2dxf; It supports common line types; It supports common hatch styles; It doesn't support line width;

#### 3. VRViewer
Used to view panoramas. It supports viewing a panorama with 1 image, 6 images, or 24 images; It supports viewing a serials of panoramas; It supports hotpoints;

## Installation
To install from npm:
```
npm install @pattern-x/gemini-viewer-threejs
```

## Examples for DxfViewer
``` typescript
import { DxfViewer, DxfViewerConfig, ModelConfig } from "@pattern-x/gemini-viewer-threejs";

const viewerCfg: DxfViewerConfig = {
    containerId: "myCanvas",
    enableToolbar: true,
    enableSpinner: true,
    enableLayoutBar: true,
};
const modelCfg: ModelConfig = {
    modelId: "id_0",
    name: "sample",
    src: "http://www.abc.com/sample.dxf",
}
const fontFiles = ["http://www.abc.com/hztxt.shx", "http://www.abc.com/simplex.shx"];
const viewer = new DxfViewer(viewerCfg);
await viewer.setFont(fontFiles);
await viewer.loadModelAsync(modelCfg, (event) => {
    const progress = (event.loaded * 100) / event.total;
    console.log(`${event.type}: ${progress}%`);
});
console.log("Loaded");
viewer.goToHomeView();
```

## Features for BimViewer
- Load and view BIM model
![load_and_view.gif](public/demo/images/snapshots/bim_view_model.png)
- Orthographic view
![bim_ortho_camera.png](public/demo/images/snapshots/bim_ortho_camera.png)
- Selection
![bim_selection.gif](public/demo/images/snapshots/bim_selection.gif)
- X-Ray
![bim_xray.gif](public/demo/images/snapshots/bim_xray.gif)
- Distance measurement
![bim_dist_measure.gif](public/demo/images/snapshots/bim_dist_measure.gif)
- Section
![bim_section_plane.png](public/demo/images/snapshots/bim_section_plane.png)

## Features for DxfViewer
- Load and view dxf file
![load_and_view.gif](public/demo/images/snapshots/load_and_view.gif)
- Switch between layouts
![layouts.gif](public/demo/images/snapshots/layouts.gif)
- Distance measurement
![measure_dist.gif](public/demo/images/snapshots/measure_dist.gif)
- Area measurement
- Angle measurement
- Markups
![markups.gif](public/demo/images/snapshots/markups.gif)
- Comparision
![markups.gif](public/demo/images/snapshots/dxf_compare.png)
- Undo/redo

## How to integrate DxfViewer into your system
- Physical structure diagram:
![physical_structure.png](public/demo/images/physical_structure.png)
- Logical structure diagram:
![logical_structure.png](public/demo/images/logical_structure.png)
