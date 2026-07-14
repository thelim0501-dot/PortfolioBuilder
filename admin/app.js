// ======================================
// Portfolio CMS
// ======================================

const uploadArea = document.getElementById("uploadArea");
const fileInput = document.getElementById("fileInput");
const imageList = document.getElementById("imageList");

let images = [];

// ======================================
// Upload Click
// ======================================

uploadArea.addEventListener("click", () => {

    fileInput.click();

});

// ======================================
// File Select
// ======================================

fileInput.addEventListener("change", (e) => {

    addFiles(e.target.files);

});

// ======================================
// Drag & Drop
// ======================================

uploadArea.addEventListener("dragover", (e) => {

    e.preventDefault();

    uploadArea.style.borderColor = "#ffffff";

});

uploadArea.addEventListener("dragleave", () => {

    uploadArea.style.borderColor = "rgba(255,255,255,.15)";

});

uploadArea.addEventListener("drop", (e) => {

    e.preventDefault();

    uploadArea.style.borderColor = "rgba(255,255,255,.15)";

    addFiles(e.dataTransfer.files);

});

// ======================================
// Add Images
// ======================================

function addFiles(files){

    [...files].forEach(file=>{

        if(!file.type.startsWith("image")) return;

        images.push(file);

        createThumbnail(file);

    });

}

// ======================================
// Thumbnail
// ======================================

function createThumbnail(file){

    const reader = new FileReader();

    reader.onload = function(e){

        const card = document.createElement("div");

        card.className = "image-card";

        card.innerHTML = `
            <img src="${e.target.result}">
            <div class="filename">${file.name}</div>
        `;

        imageList.appendChild(card);

    }

    reader.readAsDataURL(file);

}

// ======================================
// SAVE
// ======================================

document.getElementById("saveBtn").addEventListener("click",()=>{

    alert("다음 단계에서 JSON 저장 기능을 연결합니다.");

});
