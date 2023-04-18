export default class DxfSettingsPanel {
    viewer;
    parentContainer;
    panel; // settings panel
    closeBtn;
    colorInputs;

    /* eslint-disable no-undef */
    constructor(viewer, parentContainer = document.body) {
        this.init(viewer, parentContainer);
    }

    init(viewer, parentContainer) {
        this.viewer = viewer;
        this.parentContainer = viewer.viewerContainer;
        this.buildPage();
        this.addEventHandlers();
    }

    show() {
        if (this.panel?.classList.contains("panel-hide")) {
            this.panel.classList.remove("panel-hide");
        }
    }

    hide() {
        if (!this.panel?.classList.contains("panel-hide")) {
            this.panel?.classList.add("panel-hide");

            // when click the close button, trigger the layers button's click event
            const layersBtn = document.querySelector("#Settings");
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
        this.panel.remove();
    }

    buildPage() {
        this.panel = document.createElement("div");
        this.panel.classList.add("panel-container", "panel-hide");

        const header = document.createElement("div");
        header.innerText = "设置";
        header.classList.add("panel-header");
        this.panel.appendChild(header);

        this.closeBtn = document.createElement("span");
        this.closeBtn.classList.add("panel-close-btn");
        this.closeBtn.innerHTML = "X";
        header.appendChild(this.closeBtn);

        const bgColors = [
            { name: "默认", rgb: [0.082, 0.11, 0.117], color: "#212830" },
            { name: "黑色", rgb: [0, 0, 0], color: "#000000" },
            { name: "白色", rgb: [1, 1, 1], color: "#ffffff" },
            { name: "灰色", rgb: [0.6, 0.6, 0.6], color: "#888888" },
        ];
        let colorHtml = "";
        bgColors.forEach((item) => {
            colorHtml += `
                <div>${item.name}
                    <input type="button" class="color-input" style="background-color: ${item.color}" value=${item.color}></input>
                </div>
            `;
        });
        const bgColorDiv = document.createElement("div");
        bgColorDiv.classList.add("panel-body");
        bgColorDiv.innerHTML = `
            <table>
                <tr>
                    <td style="width: 40%">背景色</td>
                    <td>${colorHtml}</td>
                </tr>
            </table>
        `;
        this.panel.appendChild(bgColorDiv);
        this.parentContainer.appendChild(this.panel);
    }

    addEventHandlers() {
        this.closeBtn?.addEventListener("click", this.hide.bind(this));

        const bgColorInputs = document.querySelectorAll("input[type=button]");
        this.colorInputs = [].slice.call(bgColorInputs, 0);
        this.colorInputs.forEach((input) => {
            input.addEventListener("click", () => {
                const rgb = this.convertHexToRGB(input.value);
                this.setBackgroundColor(rgb);
            });
            // input.onclick = () => {
            //     const rgb = this.convertHexToRGB(input.value);
            //     this.setBackgroundColor(rgb);
            // };
        });

        // const settingsToolbarBtn = document.querySelector("#Settings");
        // settingsToolbarBtn && settingsToolbarBtn.addEventListener("click", () => {
        //     if (settingsToolbarBtn.classList.contains("active")) {
        //         if (!window.dxfSettingsPanel) {
        //             window.dxfSettingsPanel = new DxfSettingsPanel(this.viewer);
        //         } else {
        //             window.dxfSettingsPanel.show();
        //         }
        //     } else {
        //         this.hide();
        //     }
        // });
    }

    // convert "#rrggbb" to { r, g, b }
    convertHexToRGB(hex) {
        const color = {};
        hex = `0x${hex.slice(1)}`;
        color.r = ((hex >> 16) & 255) / 255;
        color.g = ((hex >> 8) & 255) / 255;
        color.b = (hex & 255) / 255;
        return color;
    }

    setBackgroundColor(rgb) {
        this.viewer.setBackgroundColor(rgb.r, rgb.g, rgb.b);
    }
}
