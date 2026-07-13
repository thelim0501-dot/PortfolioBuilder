// ==========================================
// Portfolio Builder v1.2
// ==========================================

const pages = document.querySelectorAll(".page");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageNumber = document.getElementById("pageNumber");

const viewer = document.getElementById("viewer");
const viewerImage = document.getElementById("viewerImage");
const closeViewer = document.getElementById("closeViewer");

// ==========================================
// TEMP PROJECT
// ==========================================

const gallery = document.getElementById("gallery");

const tempImages = [

    "images/project01/01.jpg",
    "images/project01/02.jpg",
    "images/project01/03.jpg",
    "images/project01/04.jpg"

];

let currentPage = 0;


// ==========================================
// PAGE
// ==========================================

function updatePage(){

    pages.forEach((page,index)=>{

        page.classList.toggle("active",index===currentPage);

    });

    pageNumber.textContent =
        `${String(currentPage+1).padStart(2,"0")} / ${String(pages.length).padStart(2,"0")}`;

    prevBtn.disabled = currentPage===0;

    nextBtn.disabled = currentPage===pages.length-1;

}

function nextPage(){

    if(currentPage>=pages.length-1) return;

    currentPage++;

    updatePage();

}

function prevPage(){

    if(currentPage<=0) return;

    currentPage--;

    updatePage();

}


// ==========================================
// BUTTON
// ==========================================

nextBtn.addEventListener("click",nextPage);

prevBtn.addEventListener("click",prevPage);


// ==========================================
// KEYBOARD
// ==========================================

document.addEventListener("keydown",(e)=>{

    if(viewer.classList.contains("show")){

        if(e.key==="Escape"){

            closeViewerFn();

        }

        return;

    }

    switch(e.key){

        case "ArrowRight":
        case "ArrowDown":
            nextPage();
            break;

        case "ArrowLeft":
        case "ArrowUp":
            prevPage();
            break;

    }

});


// ==========================================
// GALLERY
// ==========================================

function createGallery(){

    gallery.innerHTML = "";

    tempImages.forEach((src)=>{

        const box = document.createElement("div");

        box.className = "image-box";

        const img = document.createElement("img");

        img.src = src;

        img.alt = "";

        img.addEventListener("click",()=>{

            openViewer(src);

        });

        box.appendChild(img);

        gallery.appendChild(box);

    });

}

// ==========================================
// IMAGE VIEWER
// ==========================================

function openViewer(src){

    viewerImage.src = src;

    viewer.classList.add("show");

}

function closeViewerFn(){

    viewer.classList.remove("show");

    viewerImage.src="";

}

imageBoxes.forEach((img)=>{

    img.addEventListener("click",()=>{

        if(!img.src) return;

        openViewer(img.src);

    });

});

closeViewer.addEventListener("click",closeViewerFn);

viewer.addEventListener("click",(e)=>{

    if(e.target===viewer){

        closeViewerFn();

    }

});


// ==========================================

createGallery();

updatePage();
