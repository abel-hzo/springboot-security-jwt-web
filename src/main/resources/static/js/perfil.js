import { requestHTTP } from "./commons.js";

let profilePhoto = document.querySelector(".profile-photo");
let photoField = document.getElementById("photoField");

profilePhoto.addEventListener("click", () => {
    photoField.click();
});

photoField.addEventListener("change", () => {
    const url = URL.createObjectURL(photoField.files[0]);
    profilePhoto.style.backgroundImage = "url('" + url + "')";
});

let bxShow = document.querySelector(".bx-show");
let password = document.getElementById("password");
let confpassword = document.getElementById("confpassword");

function showPassword() {
    if(bxShow.classList.contains("bx-show")) {
        password.type = "text";
        confpassword.type = "text";
        bxShow.classList.replace("bx-show", "bx-hide");
    } else {
        password.type = "password";
        confpassword.type = "password";
        bxShow.classList.replace("bx-hide", "bx-show");
    }
}

bxShow.addEventListener("click", () => showPassword());


const formSave = document.getElementById("formSave");

async function getCurrentUser() {

    const data = await requestHTTP("http://localhost:8079/users/currentUser", "GET", null);

    if(data === undefined) return;

    formSave.idUser.value = data.userDTO.idUser;
    formSave.username.value = data.userDTO.username;
    formSave.password.value = data.userDTO.password;
    formSave.confpassword.value = data.userDTO.password;
    formSave.email.value = data.userDTO.email;
    formSave.birthday.value = data.userDTO.birthday;

    // console.log(data);

    profilePhoto.style.backgroundImage = "url('data:image/png;base64," + data.userDTO.photo + "')";
}

getCurrentUser();

async function saveProfile(e) {

    e.preventDefault();

    let formData = new FormData(formSave);

    if(photoField.files[0] != undefined)
        formData.append("file", photoField.files[0]);

    const data = await requestHTTP("http://localhost:8080/users/update", "POST", formData);

    if(data === undefined) return;

    alert(data.body);
}

formSave.addEventListener("submit", (e) => saveProfile(e));