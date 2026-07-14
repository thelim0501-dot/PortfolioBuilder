// ============================================
// Portfolio Builder
// Version 2.0
// ============================================

class PortfolioApp {

    constructor() {

        this.pages = document.querySelectorAll(".page");

        this.prevBtn = document.getElementById("prevBtn");
        this.nextBtn = document.getElementById("nextBtn");
        this.pageNumber = document.getElementById("pageNumber");

        this.gallery = document.getElementById("gallery");

        this.viewer = document.getElementById("viewer");
        this.viewerImage = document.getElementById("viewerImage");
        this.closeViewer = document.getElementById("closeViewer");

        this.currentPage = 0;

        this.projects = [];

        this.initialize();

    }

    async initialize() {

        this.bindEvents();

        await this.loadProjects();

        this.updatePage();

    }

    bindEvents() {

        this.prevBtn.addEventListener("click", () => this.previousPage());

        this.nextBtn.addEventListener("click", () => this.nextPage());

        document.addEventListener("keydown", (e) => this.handleKeyboard(e));

        this.closeViewer.addEventListener("click", () => this.closeImage());

        this.viewer.addEventListener("click", () => {

            this.closeImage();

      });

    }

    async loadProjects() {

        try {

            const response = await fetch("projects.json");

            this.projects = await response.json();

            console.log("Projects Loaded", this.projects);

            this.createGallery();

        }

        catch (error) {

            console.error(error);

        }

    }

    createGallery() {

        if (!this.gallery) return;

        this.gallery.innerHTML = "";

        if (this.projects.length === 0) return;

        const project = this.projects[0];

        project.images.forEach((imageName) => {

            const box = document.createElement("div");

            box.className = "image-box";

            const img = document.createElement("img");

            img.src = `images/${project.folder}/${imageName}`;

            img.alt = "";

            img.loading = "lazy";

            img.addEventListener("click", () => {

                this.openImage(img.src);

            });

            box.appendChild(img);

            this.gallery.appendChild(box);

        });

    }

    nextPage() {

        if (this.currentPage >= this.pages.length - 1) return;

        this.currentPage++;

        this.updatePage();

    }

    previousPage() {

        if (this.currentPage <= 0) return;

        this.currentPage--;

        this.updatePage();

    }

    updatePage() {

        this.pages.forEach((page, index) => {

            page.classList.toggle("active", index === this.currentPage);

        });

        this.pageNumber.textContent =
            `${String(this.currentPage + 1).padStart(2, "0")} / ${String(this.pages.length).padStart(2, "0")}`;

        this.prevBtn.disabled = this.currentPage === 0;

        this.nextBtn.disabled = this.currentPage === this.pages.length - 1;

    }

    handleKeyboard(e) {

        if (this.viewer.classList.contains("show")) {

            if (e.key === "Escape") {

                this.closeImage();

            }

            return;

        }

        switch (e.key) {

            case "ArrowRight":
            case "ArrowDown":

                this.nextPage();

                break;

            case "ArrowLeft":
            case "ArrowUp":

                this.previousPage();

                break;

        }

    }

    openImage(src) {

        this.viewerImage.src = src;

        this.viewer.classList.add("show");

    }

    closeImage() {

        this.viewer.classList.remove("show");

        this.viewerImage.src = "";

    }

}

document.addEventListener("DOMContentLoaded", () => {

    new PortfolioApp();

});
