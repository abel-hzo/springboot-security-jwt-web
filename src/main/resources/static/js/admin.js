import { requestHTTP } from "./commons.js";

let containerPhoto = document.querySelector(".container-photo");
let photoField = document.querySelector("#photo");
let photo = document.querySelector(".photo");
let formSave = document.getElementById("formSave");
let submitBtn = document.getElementById("submit");
let clearBtn = document.getElementById("clear");

/********************** LOAD AND SAVE IMAGE **********************/

let openFileDialog = (e) => {
    if (e.target.tagName === "DIV")
        photoField.click();
    if (e.target.tagName === "I")
        uploadPhoto();
};

let viewImage = () => {
    // let value = file.files[0].name;
    // file_name.innerHTML = value;

    const url = URL.createObjectURL(photoField.files[0]);
    containerPhoto.style.backgroundImage = "url('" + url + "')";

    // alert(photoField.files[0].name);
    // image.src = url;			
};

async function uploadPhoto() {

    if (formSave.idUser.value === "" ||
        photoField.files[0] === undefined) return;

    let formData = new FormData();
    formData.append("idUser", formSave.idUser.value);
    formData.append("file", photoField.files[0]);

    const data = await requestHTTP("http://localhost:8080/users/uphoto", "PUT", formData);

    if(data === undefined) return;

    alert(data.body);

}

function clearForm() {
    formSave.reset();
    containerPhoto.style.backgroundImage = "";
    submitBtn.value = "Agregar";
}

containerPhoto.addEventListener("click", (e) => openFileDialog(e));
photoField.addEventListener("change", () => viewImage());
clearBtn.addEventListener("click", () => clearForm());

/********************** SHOW PASSWORD **********************/

let bxShow = document.querySelector(".bx-show");
let password = document.getElementById("password");
let confpassword = document.getElementById("confpassword");

function showPassword() {
    if (bxShow.classList.contains("bx-show")) {
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

/********************** LOAD TABLE **********************/

let table = document.querySelector(".table");
let pageable = document.querySelector(".pageable");

let page = 0;
loadTable();

async function loadTable() {

    table.innerHTML = table.firstElementChild.outerHTML;

    const data = await requestHTTP("http://localhost:8080/users/list/3/" + page, "GET", null);

    if(data === undefined) return;

    data.body.forEach(user => {

        table.innerHTML +=
            `<div class="tr">
            <div class="td">${user[1]}</div>
            <div class="td">${user[2]}</div>
            <div class="td">${user[3]}</div>
            <div class="td"><i class='bx bxs-edit' id="${user[0]}"></i></div>
        </div>`;

    });
}

/********************** PAGINADOR **********************/

let noPages = 0;
loadNoPages();

async function loadNoPages() {

    const data = await requestHTTP("http://localhost:8080/users/noPages/3", "GET", null);

    if(data === undefined) return;

    //Se almacenan temporalmente el primer y ultimo elemento
    //para posteriormente insertarlos en el objeto pageable. 
    let firstChild = pageable.firstElementChild.outerHTML;
    let lastChild = pageable.lastElementChild.outerHTML;

    noPages = data.body;
    pageable.innerHTML = firstChild;

    for (let i = 0; i <= noPages; i++) {
        pageable.innerHTML += `<div class="page">${i}</div>`;
    }

    pageable.innerHTML += lastChild;

    //Establece la clase active al hijo numero 1 de .pageable
    pageable.children[1].classList.add("active");
}

function nextPage(e) {

    //Verifica que solo se de click sobre elementos .page
    if (!e.target.classList.contains("page")) return;

    if (pageable.firstElementChild === e.target) {   //Boton NEXT
        if (page === 0) return;                      //Si la pagina es igual a cero
        page--;
        clearActivePage();
        pageable.children[page + 1].classList.add("active");
        loadTable();
        return;
    }

    if (pageable.lastElementChild === e.target) {      //Boton PREV
        if (page >= noPages) return;                   //Si la pagina es mayor al numero de paginas
        page++;
        clearActivePage();
        pageable.children[page + 1].classList.add("active");
        loadTable();
        return;
    }

    page = parseInt(e.target.textContent);

    clearActivePage();

    e.target.classList.add("active");

    loadTable();
}

/**Funcion que quita la clase active de los elementos .page */
function clearActivePage() {
    pageable.childNodes.forEach(item => {
        if (item.classList.contains("page")) {
            item.classList.remove("active");
        }
    });
}

pageable.addEventListener("click", (e) => nextPage(e));


table.addEventListener("click", (e) => getUser(e));

async function getUser(e) {

    if (e.target.tagName !== "I") return;

    const data = await requestHTTP("http://localhost:8080/users/get/" + e.target.id, "GET", null);

    if(data === undefined) return;

    formSave.idUser.value = e.target.id;
    formSave.username.value = data.body.username;
    formSave.password.value = data.body.password;
    formSave.confpassword.value = data.body.password;
    formSave.email.value = data.body.email;
    formSave.birthday.value = data.body.birthday;
    document.getElementById("idRol").value = data.body.userRolsDTO[0].rolDTO.idRol;

    const dataPhoto = await requestHTTP("http://localhost:8080/users/photo/" + e.target.id, "GET", null);

    containerPhoto.style.backgroundImage = "url('data:image/png;base64," + dataPhoto.body + "')";

    submitBtn.value = "Modificar";
}

/********************** SAVE AND EDIT USER **********************/

async function saveAndEditUser(e) {

    e.preventDefault();

    let url = "";

    if (submitBtn.value === "Agregar") url = "/users/save";
    if (submitBtn.value === "Modificar") url = "/users/update";

    console.log(submitBtn.value + " " + url);

    let formData = new FormData(formSave);

    if (photoField.files[0] !== undefined)
        formData.append("file", photoField.files[0]);

    const data = await requestHTTP("http://localhost:8080" + url, "POST", formData);

    if(data === undefined) return;

    alert(data.body);

    loadTable();
    clearForm();
}

formSave.addEventListener("submit", (e) => saveAndEditUser(e));