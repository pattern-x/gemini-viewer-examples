/* eslint-disable no-undef */
export default class CompareSidePanel {
    compareDetail;
    container;
    viewer;

    constructor(viewer, container = document.body) {
        this.init(viewer, container);
    }

    init(viewer, container) {
        this.viewer = viewer;
        this.container = container;

        this.buildPanel();
        this.initEvents();
    }

    buildPanel() {
        const panelContainer = document.createElement("div");
        panelContainer.classList.add("compare-panel-container");

        const header = document.createElement("h3");
        panelContainer.appendChild(header);
        this.container.appendChild(panelContainer);

        const compareDetail = document.createElement("div");
        compareDetail.classList.add("compare-detail");
        panelContainer.appendChild(compareDetail);
        this.compareDetail = compareDetail;

        const changes = this.viewer.changes;
        const changesValues = Object.values(changes);

        header.innerHTML = `差异列表(${changesValues.length})`;

        const addedChangesValues = changesValues.filter((val) => val.type === "Added");
        const deletedChangeValues = changesValues.filter((val) => val.type === "Deleted");
        const modifiedChanageValues = changesValues.filter((val) => val.type === "Modified");

        if (addedChangesValues.length > 0) {
            this.buildList(addedChangesValues, "新增");
        }

        if (deletedChangeValues.length > 0) {
            this.buildList(deletedChangeValues, "删除");
        }

        if (modifiedChanageValues.length > 0) {
            this.buildList(modifiedChanageValues, "修改");
        }
    }

    buildList(changesValues, text) {
        const section = document.createElement("div");
        section.classList.add("compare-list", "compare-add");
        this.compareDetail.appendChild(section);
        this.buildListTitle(section, `${text}(<b>${changesValues.length}</b>)`);
        const listEle = document.createElement("ul");
        listEle.classList.add("list", "hide");
        section.appendChild(listEle);

        let listFragment = "";
        changesValues.forEach((val) => {
            listFragment += `<li class="list-item">${val.handle}</li>`;
        });
        listEle.innerHTML = listFragment;
    }

    buildListTitle(group, title) {
        const listTitle = document.createElement("div");
        listTitle.classList.add("list-title", "compare-collapse");
        group.appendChild(listTitle);

        const titleIcon = document.createElement("span");
        titleIcon.classList.add("title-icon");
        listTitle.appendChild(titleIcon);

        const titleContent = document.createElement("span");
        titleContent.classList.add("title-content");
        titleContent.innerHTML = title;
        listTitle.appendChild(titleContent);
    }

    initEvents() {
        const listTitles = document.querySelectorAll(".list-title");
        listTitles.forEach((listTitle) => {
            listTitle.addEventListener("click", () => {
                listTitle.classList.toggle("compare-collapse");
                listTitle.nextSibling?.classList.toggle("hide");
            });
        });

        const lists = document.querySelectorAll(".list");
        lists.forEach((list) => {
            list.addEventListener("click", (e) => {
                this.viewer.zoomToCompareChange(e.target.innerHTML);
            });
        });
    }
}
