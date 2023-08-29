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
        this.parentContainer = viewer.widgetContainer;
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

            const toolbar = this.viewer.findPlugin("DxfViewerToolbarPlugin");
            if (toolbar) {
                toolbar.setActive("Settings", false);
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
        header.classList.add("panel-header", "draggable");
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

        const measurePlugin = this.viewer.findPlugin("MeasurementPlugin");
        const scale = measurePlugin.getScale();

        const div = document.createElement("div");
        div.classList.add("panel-body");
        div.innerHTML = `
            <table>
                <tr>
                    <td style="width: 40%">背景色</td>
                    <td>${colorHtml}</td>
                </tr>
                <tr><td>&nbsp;</td></tr>
                <tr>
                    <td title="PDF图纸需要设置正确的缩放率才能测量准确！">
                        缩放率(当前值:<span id="txtCurrScale">${scale || '<无>'}</span>)
                    </td>
                    <td style="font-size: 11px;">
                        已知长度:
                        <input type="text" id="txtActualDist" style="width: 50px"></input>
                        的距离测量结果为:
                        <input type="text" id="txtDistMeasureResult" style="width: 50px"></input>
                        <div>
                            得出scale为: <span id="txtScale"></span>
                        </div>
                        <div>
                            <input type="button" id="btnSetScale" value="确认"></input>
                            <input type="button" id="btnClearScale" value="重置"></input>
                        </div>
                    </td>
                </tr>
            </table>
        `;
        this.panel.appendChild(div);
        this.parentContainer.appendChild(this.panel);
    }

    addEventHandlers() {
        this.closeBtn?.addEventListener("click", this.hide.bind(this));

        this.panel?.addEventListener("pointerdown", this.onPointerDown);

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

        const measurePlugin = this.viewer.findPlugin("MeasurementPlugin");
        const txtActualDist = document.getElementById("txtActualDist");
        const txtDistMeasureResult = document.getElementById("txtDistMeasureResult");
        const txtScale = document.getElementById("txtScale");;
        const txtCurrScale = document.getElementById("txtCurrScale");;
        const btnSetScale = document.getElementById("btnSetScale");
        const btnClearScale = document.getElementById("btnClearScale");

        const calcScale = () => {
            const scale = txtActualDist.value / txtDistMeasureResult.value;
            txtScale.innerText = this.numberToString(scale);
        };
        txtActualDist.oninput = calcScale;
        txtDistMeasureResult.oninput = calcScale;

        btnSetScale.onclick = () => {
            const scale = txtActualDist.value / txtDistMeasureResult.value;
            if (Number.isFinite(scale) && !Number.isNaN(scale) && scale > 0) {
                measurePlugin.setScale(scale);
                txtCurrScale.innerText = this.numberToString(scale);
            }
        };
        btnClearScale.onclick = () => {
            measurePlugin.setScale(1);
            txtCurrScale.innerText = "1";
        };
    }

    onPointerDown = (e) => {
        const t = e.target;
        if (t?.classList.contains("draggable") && e.button === 0/* MouseButton.Left */) {
            this.mouseDownPositionX = e.x;
            this.mouseDownPositionY = e.y;
            document.addEventListener("pointermove", this.onPointerMove);
            document.addEventListener("pointerup", this.onPointerUp);
        }
    };

    onPointerMove = (e) => {
        const panel = this.panel;
        const viewerContainer = this.viewer.viewerContainer;
        if (!panel || !viewerContainer) {
            return;
        }
        const viewerRight = viewerContainer.clientLeft + viewerContainer.clientWidth;
        const viewerBottom = viewerContainer.clientTop + viewerContainer.clientHeight;
        const deltaX = e.x - this.mouseDownPositionX;
        const deltaY = e.y - this.mouseDownPositionY;
        let targetX = panel.offsetLeft + deltaX;
        let targetY = panel.offsetTop + deltaY;
        if (targetX < 0) {
            targetX = 0; // panel left exceeds boundary
        }
        if (targetX > 0 && targetX + panel.clientWidth > viewerRight) {
            // deltaY > 0 means move right, only allow to move left in this case.
            if (deltaX > 0) {
                targetX = panel.offsetLeft; // panel right exceeds boundary
            }
        }
        if (targetY < 0) {
            targetY = 0; // panel top exceeds boundary
        }
        if (targetY > 0 && targetY + panel.clientHeight > viewerBottom) {
            // deltaY > 0 means move down, only allow to move up in this case.
            if (deltaY > 0) {
                targetY = panel.offsetTop; // panel bottom exceeds boundary
            }
        }
        panel.style.left = `${targetX}px`;
        panel.style.top = `${targetY}px`;
        this.mouseDownPositionX = e.x;
        this.mouseDownPositionY = e.y;
    };

    onPointerUp = () => {
        document.removeEventListener("pointermove", this.onPointerMove);
        document.removeEventListener("pointerup", this.onPointerUp);
    };

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

    numberToString(num) {
        let fractionDigits = 2;
        if (Math.abs(num) < 0.000001) {
            fractionDigits = 2; // too small! take it as 0
        } else if (Math.abs(num) < 0.00001) {
            fractionDigits = 7;
        } else if (Math.abs(num) < 0.0001) {
            fractionDigits = 6;
        } else if (Math.abs(num) < 0.001) {
            fractionDigits = 5;
        } else if (Math.abs(num) < 0.01) {
            fractionDigits = 4;
        } else if (Math.abs(num) < 0.1) {
            fractionDigits = 3;
        }
        return num.toFixed(fractionDigits);
    }
}
