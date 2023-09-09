let tool = "brush";
let color = "#000";

let options = document.querySelectorAll(".container-options ul .option");

let selectOption = (e) => {

    clearSelectOption();
    e.currentTarget.classList.add("active");
    tool = e.currentTarget.dataset.option;

    console.log(tool);
};

function clearSelectOption() {
    options.forEach((option) => {
        option.classList.remove("active");
    });
}

options.forEach(option => {
    option.addEventListener("click", (e) => selectOption(e));
});

/************************************* COLORS *************************************/

let colors = document.querySelector(".colors");
let fill = document.querySelector("#fill");

let selectColor = (e) => {

    if(e.target.tagName === "SPAN" || e.target.tagName === "LABEL") {
        clearSelectColor();
        e.target.classList.add("active");
        // color = getComputedStyle(e.target).backgroundColor;
        color = getComputedStyle(e.target).getPropertyValue("background-color");
    }
};

function clearSelectColor() {

    colors.childNodes.forEach(element => {
        if(element.firstElementChild != undefined)
            element.firstElementChild.classList.remove("active");
    });
    
}

colors.addEventListener("click", (e) => selectColor(e)); 

/************************************* PALETTE COLOR *************************************/

let palette = document.getElementById("palette");
let labelPalette = document.getElementById("labelPalette");

let selectPalette = () => {
    labelPalette.style.backgroundColor = palette.value;
    color = palette.value;
}

palette.addEventListener("change", () => selectPalette());

/************************************* DIBUJAR *************************************/
let canva = document.getElementById("canva");
let ctx = canva.getContext("2d");

let pressMouse = false;
let initX, initY;
let snapshot;

function startDraw(e) {

    initX = e.offsetX;
    initY = e.offsetY;
    
    ctx.strokeStyle = color;
    ctx.lineWidth = thick.value;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    
    ctx.beginPath();
    ctx.moveTo(initX, initY);

    pressMouse = true;
    snapshot = ctx.getImageData(0, 0, canva.width, canva.height);
}

function moveDraw(e) {
    if(pressMouse) {
        shapes(e);
    } 
}

function shapes(e) {
    
    ctx.putImageData(snapshot, 0, 0);
    
    if(tool === "brush") {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke(); 
    }

    if(tool === "line") {
        ctx.beginPath();
        ctx.moveTo(initX, initY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }

    if(tool === "rectangle") {
        ctx.beginPath();
        ctx.rect(initX, initY, e.offsetX - initX, e.offsetY - initY);
    }

    if(tool === "circle") {
        ctx.beginPath();
        let radius = Math.sqrt(Math.pow((initX - e.offsetX), 2) + Math.pow((initY - e.offsetY), 2));
        ctx.arc(initX, initY, radius, 0, Math.PI * 2);
    }

    if(tool === "triangle") {
        ctx.beginPath();
        ctx.moveTo(initX, initY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.lineTo(initX * 2 - e.offsetX, e.offsetY);  
        ctx.closePath();
    }

    if(tool === "erase") {
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineTo(e.offsetX, e.offsetY);
    }

    if(fill.checked) {
        ctx.fillStyle = color;
        ctx.fill();
    }

    ctx.stroke();
    
}

canva.addEventListener("mousedown", (e) => startDraw(e));
canva.addEventListener("mousemove", (e) => moveDraw(e));
canva.addEventListener("mouseup", () => pressMouse = false);
canva.addEventListener("mouseout", () => pressMouse = false);


let clearCanva = document.querySelector(".clearCanvas");

clearCanva.addEventListener("click", () => ctx.clearRect(0, 0, canva.width, canva.height));

let saveCanva = document.querySelector(".saveImage");

saveCanva.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = `${Date.now()}.png`;
    link.href = canva.toDataURL();
    link.click();
});