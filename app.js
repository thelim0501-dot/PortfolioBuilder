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

const imageBoxes = document.querySelectorAll(".image-box img");

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

updatePage();
