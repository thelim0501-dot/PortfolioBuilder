// ======================================
// Portfolio Builder
// app.js v0.1
// ======================================

const pages = document.querySelectorAll(".page");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageNumber = document.getElementById("pageNumber");

let currentPage = 0;

function updatePage() {

    pages.forEach((page, index) => {

        page.classList.remove("active");

        if(index === currentPage){

            page.classList.add("active");

        }

    });

    pageNumber.textContent =
        `${currentPage + 1} / ${pages.length}`;

    prevBtn.disabled = currentPage === 0;

    nextBtn.disabled = currentPage === pages.length - 1;

}

function nextPage(){

    if(currentPage >= pages.length-1) return;

    currentPage++;

    updatePage();

}

function prevPage(){

    if(currentPage <= 0) return;

    currentPage--;

    updatePage();

}

nextBtn.addEventListener("click",nextPage);

prevBtn.addEventListener("click",prevPage);

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowRight") nextPage();

    if(e.key==="ArrowDown") nextPage();

    if(e.key==="ArrowLeft") prevPage();

    if(e.key==="ArrowUp") prevPage();

});

updatePage();
