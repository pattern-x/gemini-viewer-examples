/* eslint-disable no-undef */
export default class LayerManager {
    viewer;
    container;
    listWrapper;
    listContainer;
    confirmBtn;
    cancelBtn;
    headerText;
    closeBtn;
    layers;
    checkboxes;
    colorInputs;

    constructor(viewer, container = document.body) {
        this.init(viewer, container);
    }

    init(viewer, container) {
        this.viewer = viewer;
        this.container = viewer.viewerContainer;
        this.layers = this.viewer.getLayers();
        this.buildPage();
        this.addContent();
        this.addEventHandlers();
    }

    show() {
        if (this.listContainer?.classList.contains("popup-hide")) {
            this.listContainer.classList.remove("popup-hide");
            this.updatePage();
        }
    }

    hide() {
        if (!this.listContainer?.classList.contains("popup-hide")) {
            this.listContainer?.classList.add("popup-hide");

            // when click the close button, trigger the layers button's click event
            const layersBtn = document.querySelector("#Layers");
            if (layersBtn.classList.contains("active")) {
                layersBtn.click();
            }
        }
    }

    destroy() {
        this.closeBtn?.removeEventListener("click", this.hide);

        this.checkboxes?.forEach((checkbox, i) => {
            checkbox.removeEventListener("change", () => {
                this.checkboxHandler(checkbox, i);
            });
        });
        this.listContainer.remove();
    }

    buildPage() {
        this.listContainer = document.createElement("div");
        this.listContainer.classList.add("popup-container", "popup-hide");

        const header = document.createElement("div");
        header.classList.add("popup-header");
        this.headerText = document.createElement("span");
        this.headerText.innerHTML = "图层管理";
        this.closeBtn = document.createElement("span");
        this.closeBtn.classList.add("popup-close");
        this.closeBtn.innerHTML = "X";
        header.appendChild(this.headerText);
        header.appendChild(this.closeBtn);
        this.listContainer.appendChild(header);

        this.listWrapper = document.createElement("div");
        this.listWrapper.classList.add("popup-wrapper");
        this.listContainer.appendChild(this.listWrapper);

        this.container.appendChild(this.listContainer);
        this.updateHeaderText();
    }

    addContent() {
        let fragment = `
        <div class="popup-list-item">
            <input type="checkbox" id="toggleAllLayers" checked class="checkbox"></input>
            <span class="popup-layer-color">颜色</span>
            <span class="popup-layer-name">图层名称</span>
        </div>
        `;

        const bAppendModelId = this.layers.length > 1;
        for (let i = 0; i < this.layers.length; ++i) {
            const layers = this.layers[i].layers;
            let layerNames = Object.keys(layers);
            layerNames = layerNames.sort();
            for (const layerName of layerNames) {
                const dxfLayer = layers[layerName];
                // add "<modelId>" as layer name prefix when there is more than one models
                const tmpLayerName = bAppendModelId ? `&lt;${this.layers[i].modelId}&gt; ${layerName}` : layerName;
                const color = convertDecimalToHex(dxfLayer.color);
                const listItem = this.generateListItem(tmpLayerName, dxfLayer.visible, color);
                fragment += listItem;
            }
        }

        if (this.listWrapper) {
            this.listWrapper.innerHTML = fragment;
        }

        // add checkboxes events
        const checkboxEles = this.listContainer.querySelectorAll("input[type=checkbox]");
        this.checkboxes = [].slice.call(checkboxEles, 0);
        const colorInputsEles = this.listContainer.querySelectorAll("input[type=color]");
        this.colorInputs = [].slice.call(colorInputsEles, 0);

        // input[type=checkbox]
        this.checkboxes.forEach((checkbox, i) => {
            checkbox.addEventListener("change", () => {
                this.checkboxHandler(checkbox, i);
            });
        });
    }

    generateListItem(layer, visible, color) {
        const listItem = `
            <div class="popup-list-item">
                <input type="checkbox" value="${layer}" ${visible ? "checked" : ""} class="checkbox">
                <div class="popup-color" style="background-color: ${color}"></div>
                <span class="popup-layer-name">${layer}</span>
            </div>
            `;

        return listItem;
    }

    addEventHandlers() {
        this.closeBtn?.addEventListener("click", this.hide.bind(this));

        // const layersBtn = document.querySelector("#Layers");
        // layersBtn &&
        //     layersBtn.addEventListener("click", () => {
        //         if (layersBtn.classList.contains("active")) {
        //             if (!this.viewer.layerManager) {
        //                 this.viewer.layerManager = new LayerManager(this.viewer);
        //             } else {
        //                 this.viewer.layerManager.show();
        //             }
        //         } else {
        //             this.hide();
        //         }
        //     });
    }

    checkboxHandler(checkbox, index) {
        if (checkbox.id === "toggleAllLayers") {
            for (let i = 0; i < this.layers.length; ++i) {
                const modelId = this.layers[i].modelId;
                const layers = this.layers[i].layers;
                Object.keys(layers).forEach((layerName) => {
                    this.viewer.setLayerVisibility(layerName, checkbox.checked, modelId);
                });
            }

            this.checkboxes?.forEach((cb) => (cb.checked = checkbox.checked));
            return;
        }

        let modelId = "";
        let layerName = checkbox.value;
        let layerHandle = undefined;
        if (index === this.checkboxes.length - 1) {
            layerHandle = Object.values(this.layers.at(-1).layers)[0].handle;
        }

        const idx = layerName.indexOf(">");
        if (idx !== -1) {
            modelId = layerName.slice(1, idx);
            layerName = layerName.slice(idx + 2);
        }
        if (!modelId) {
            modelId = this.layers[0].modelId;
        }
        this.viewer.setLayerVisibility(layerName, checkbox.checked, modelId);
    }

    updatePage() {
        const layers = this.viewer.getLayers();
        // if layers.length is the same, there is no change to loaded models
        if (layers.length === this.layers.length) {
            return;
        }

        this.layers = layers;
        this.addContent();
        this.updateHeaderText();
    }

    updateHeaderText() {
        let layerCount = 0;
        for (let i = 0; i < this.layers.length; ++i) {
            const layers = this.layers[i].layers;
            layerCount += Object.keys(layers).length;
        }
        this.headerText.innerHTML = `图层管理 (共 ${layerCount} 个图层)`;
    }
}

function convertDecimalToHex(decimal) {
    if (decimal === undefined) {
        return "#ffffff";
    }

    const hex = decimal.toString(16);

    return `#${hex.padStart(6, "0")}`;
}
