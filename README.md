# gemini-viewer-examples
Examples and demos for gemini-viewer sdk.

[Online examples](https://pattern-x.github.io/gemini-viewer-examples/)

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
- Undo/redo
