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
        this.viewerImageCurrent = document.getElementById("viewerImageCurrent");
        this.viewerImageNext = document.getElementById("viewerImageNext");
        this.viewerPrev = document.getElementById("viewerPrev");
        this.viewerNext = document.getElementById("viewerNext");
        this.viewerCount = document.getElementById("viewerCount");

        this.currentImageIndex = 0;
        this.closeViewer = document.getElementById("closeViewer");

        this.currentPage = 0;

        this.projects = [];

        this.initialize();

    }

    async initialize() {

    this.bindEvents();

    await this.loadProjects();

    this.updatePage();

    // =========================
// Loader Animation
// =========================

// 0.3초 동안 검정 화면 유지
setTimeout(() => {

    document.getElementById("loaderTitle").style.animationPlayState = "running";

}, 300);


// 형광등이 켜진 후 Selected Works 표시
setTimeout(() => {

    document.getElementById("loaderSelected").classList.add("show");

}, 3100);


// Loader 종료
setTimeout(() => {

    document.getElementById("loader").classList.add("hide");

    document.getElementById("app").classList.add("show");

}, 4300);
        
}

    bindEvents() {

        this.prevBtn.addEventListener("click", () => this.previousPage());

        this.nextBtn.addEventListener("click", () => this.nextPage());

        document.addEventListener("keydown", (e) => this.handleKeyboard(e));

        this.closeViewer.addEventListener("click", () => this.closeImage());

        this.viewer.addEventListener("click", () => {

            this.closeImage();

      });

        this.viewerPrev.addEventListener("click", (e) => {

            e.stopPropagation();

            this.previousImage();

      });

        this.viewerNext.addEventListener("click", (e) => {

            e.stopPropagation();

            this.nextImage();

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

        this.currentProjectImages = project.images;

        project.images.forEach((imageName, index) => {

            const box = document.createElement("div");

            box.className = "image-box";

            const img = document.createElement("img");

            img.src = `images/${project.folder}/${imageName}`;

            img.alt = "";

            img.loading = "lazy";

            img.addEventListener("click", () => {

    this.openImage(index);

});

            box.appendChild(img);

// Hover Overlay
const overlay = document.createElement("div");
overlay.className = "image-overlay";

overlay.innerHTML = `
    <span>VIEW</span>
    <span class="arrow">↗</span>
`;

box.appendChild(overlay);

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

    // 갤러리 페이지 애니메이션
    if (this.currentPage === 2) {

        const boxes = document.querySelectorAll(".image-box");

        boxes.forEach((box) => {

            box.classList.remove("show");

        });

        boxes.forEach((box, index) => {

            setTimeout(() => {

                box.classList.add("show");

            }, index * 120);

        });

    }

}
    handleKeyboard(e) {

        if (this.viewer.classList.contains("show")) {

    if (e.key === "Escape") {

        this.closeImage();

    }

    if (e.key === "ArrowRight") {

        this.nextImage();

    }

    if (e.key === "ArrowLeft") {

        this.previousImage();

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

    openImage(index) {

    this.currentImageIndex = index;

    const project = this.projects[0];

    this.viewerImageCurrent.src =
        `images/${project.folder}/${project.images[index]}`;

    this.viewerImageCurrent.className = "viewer-image";
    this.viewerImageNext.className = "viewer-image";

    this.viewerImageCurrent.style.opacity = "1";
    this.viewerImageNext.style.opacity = "0";

    this.viewerCount.textContent =
        `${index + 1} / ${project.images.length}`;

    this.viewer.classList.add("show");

}

    previousImage() {

    const project = this.projects[0];

    const prevIndex =
        (this.currentImageIndex - 1 + project.images.length) %
        project.images.length;

    this.viewerImageNext.src =
        `images/${project.folder}/${project.images[prevIndex]}`;

    this.viewerImageNext.className =
        "viewer-image viewer-next-in";

    this.viewerImageCurrent.className =
        "viewer-image viewer-current-out";

    setTimeout(() => {

        this.currentImageIndex = prevIndex;

        const temp = this.viewerImageCurrent;
        this.viewerImageCurrent = this.viewerImageNext;
        this.viewerImageNext = temp;

        this.viewerImageCurrent.id = "viewerImageCurrent";
        this.viewerImageNext.id = "viewerImageNext";

        this.viewerImageCurrent.className = "viewer-image";
        this.viewerImageCurrent.style.opacity = "1";

        this.viewerImageNext.className = "viewer-image";
        this.viewerImageNext.style.opacity = "0";

        this.viewerCount.textContent =
            `${this.currentImageIndex + 1} / ${project.images.length}`;

    }, 350);

}

    nextImage() {

    const project = this.projects[0];

    const nextIndex =
        (this.currentImageIndex + 1) % project.images.length;

    // 다음 이미지 미리 준비
    this.viewerImageNext.src =
        `images/${project.folder}/${project.images[nextIndex]}`;

    this.viewerImageNext.className =
        "viewer-image viewer-next-in";

    this.viewerImageCurrent.className =
        "viewer-image viewer-current-out";

    setTimeout(() => {

        // 이미지 교체
        this.currentImageIndex = nextIndex;

        const temp = this.viewerImageCurrent;
        this.viewerImageCurrent = this.viewerImageNext;
        this.viewerImageNext = temp;

        this.viewerImageCurrent.id = "viewerImageCurrent";
        this.viewerImageNext.id = "viewerImageNext";

        this.viewerImageCurrent.className = "viewer-image";
        this.viewerImageCurrent.style.opacity = "1";

        this.viewerImageNext.className = "viewer-image";
        this.viewerImageNext.style.opacity = "0";

        this.viewerCount.textContent =
            `${this.currentImageIndex + 1} / ${project.images.length}`;

    }, 350);

}
    
    closeImage() {

    this.viewer.classList.remove("show");

    this.viewerImage.src = "";

}

}

document.addEventListener("DOMContentLoaded", () => {

    new PortfolioApp();

});
