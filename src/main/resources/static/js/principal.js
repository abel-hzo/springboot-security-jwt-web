import {requestHTTP} from "./commons.js";

let options = document.querySelectorAll(".sidebar ul li");
let main = document.querySelector("main");
let head = document.querySelector("head");
let items = document.querySelectorAll("aside .sidebar ul li .sub-menu");

async function redirect(e) {
    options.forEach(opt => opt.classList.remove("active"));
    e.currentTarget.classList.add("active");

    let src = e.currentTarget.dataset.script;
    let page  = e.currentTarget.dataset.page;

    await loadPage(page);
    insertScript(src);
};

async function loadPage(page) {

    if(page === "./logout") {
        await fetch(page);
        location.href = "./mylogin";
        return;
    }

    let response = await fetch(page);
    let data = await response.text();
    
    main.innerHTML = data;

}

function insertScript(src) {

    if(document.scripts[1] != undefined && document.scripts[1].src.includes("/js/")) {
        head.removeChild(document.scripts[1]);
    }

    let script = document.createElement('script');
    script.defer = true;
    script.type = "module";
    // script.src = "../../static/js/" + src + "?" + new Date().getMilliseconds();
    script.src = "/js/" + src + "?" + new Date().getMilliseconds();

    head.appendChild(script);
}

options.forEach(opt => {
    opt.addEventListener("click", (e) => redirect(e));
});

// SHOW AND HIDE MENU

let open = document.querySelector(".bx-menu");
let aside = document.querySelector("aside"); 

items.forEach(item => {
    item.addEventListener("mouseover", () => aside.style.width = "11rem");
    item.addEventListener("mouseout", () => aside.style.width = "35px");
});

window.onload = () => {
    // let page = "./dibujar.html";
    let page = "./inicio";
    loadPage(page);
    getCurrentUser();

    //Es importante dar un pequeño lapso de tiempo a que se inserte el javascript.
    setTimeout(() => {
        let src = "inicio.js";
        insertScript(src);
    }, 200);
}

const userInfoP = document.querySelector(".user-info p"); 
const userInfoSmall = document.querySelector(".user-info small");
const profileImage = document.getElementById("profileImage");

async function getCurrentUser() {

    const data = await requestHTTP("http://localhost:8079/users/currentUser", "GET", null);

    // console.log(data);
    userInfoP.innerHTML = "Binevenido, " + data.userDTO.username;
    userInfoSmall.innerHTML = data.userDTO.roles[0];
    profileImage.src = "data:image/png;base64," + data.userDTO.photo;

    localStorage.setItem("token", data.userDTO.token);
}