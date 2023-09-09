/********************* SHOW PASSWORD *********************/

const formLogin = document.getElementById("formLogin"); 
const formRegister = document.getElementById("formRegister");
const bxShowAll = document.querySelectorAll(".bx-show");

function showPassword(e) {

    if(e.currentTarget.dataset.form === "login") {

        if(e.currentTarget.classList.contains("bx-show")) {
            formLogin.password.type = "text";
            e.currentTarget.classList.replace("bx-show", "bx-hide");
        } else {
            formLogin.password.type = "password"; 
            e.currentTarget.classList.replace("bx-hide", "bx-show");
        }
    }

    if(e.currentTarget.dataset.form === "register") {

        if(e.currentTarget.classList.contains("bx-show")) {
            formRegister.password.type = "text";
            formRegister.confpassword.type = "text";
            e.currentTarget.classList.replace("bx-show", "bx-hide");
        } else {
            formRegister.password.type = "password";
            formRegister.confpassword.type = "password";
            e.currentTarget.classList.replace("bx-hide", "bx-show");
        }

    }

}

bxShowAll.forEach(bxShow => {
    bxShow.addEventListener("click", (e) => showPassword(e));
});

/********************* SEND LOGIN *********************/

// async function login(e) {
//     e.preventDefault();
//     let formData = new FormData(formLogin);

//     const response = await fetch("/public/authenticate", {
//         method: 'POST',
//         body: formData
//     });

//     if(response.status === 403) return;

//     const data = await response.json();

//     formLogin.reset();

//     localStorage.setItem("token", data.token);

// }

// formLogin.addEventListener("submit", (e) => login(e));


/********************* SEND REGISTER *********************/

async function register(e) {
    e.preventDefault();
    let formData = new FormData(formRegister);

    const response = await fetch("http://localhost:8080/users/register", {
        method: 'POST',
        body: formData
    });

    const data = await response.json();

    formRegister.reset();

    alert(data);
}

formRegister.addEventListener("submit", (e) => register(e));

/********************* TABS *********************/

const tabs = document.querySelector(".tabs");

function changeForm(e) {

    if(e.target.tagName !== "LI") return;

    tabs.childNodes.forEach(item => {
        if(item.tagName === "LI") 
            item.classList.remove("active");
    });

    e.target.classList.add("active");

    switch (e.target.textContent) {
        case "Login":
            formLogin.style.display = "block";
            formRegister.style.display = "none";
            break;
        case "Registrar":
            formLogin.style.display = "none";
            formRegister.style.display = "block";
        break;
    }

}

tabs.addEventListener("click", (e) => changeForm(e));