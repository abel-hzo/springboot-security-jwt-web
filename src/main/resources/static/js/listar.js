import {requestHTTP} from "./commons.js";

let table = document.querySelector(".table");
let pageable = document.querySelector(".pageable");

let page = 0;
loadTable();

async function loadTable() {

    const data = await requestHTTP("http://localhost:8080/users/list/3/" + page, "GET", null);

    if(data === undefined) return;

    //Se obtiene el primer elemento, que es la cabecera de la tabla y
    //posteriormente insertarla en la tabla.
    table.innerHTML = table.firstElementChild.outerHTML;
    data.body.forEach(user => {
       
    table.innerHTML +=
        `<div class="tr">
            <div class="td">${user[0]}</div>
            <div class="td">${user[1]}</div>
            <div class="td">${user[2]}</div>
            <div class="td">${user[3]}</div>
        </div>`;

    });
}

/**************************** PAGINADOR ****************************/

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

    for(let i = 0; i <= noPages; i++) {
        pageable.innerHTML += `<div class="page">${i}</div>`;
    }

    pageable.innerHTML += lastChild;

    //Establece la clase active al hijo numero 1 de .pageable
    pageable.children[1].classList.add("active");
}

function nextPage(e) {

    //Verifica que solo se de click sobre elementos .page
    if(!e.target.classList.contains("page")) return;  

    if(pageable.firstElementChild === e.target) {   //Boton NEXT
        if(page === 0) return;                      //Si la pagina es igual a cero
        page--;
        clearActivePage();
        pageable.children[page + 1].classList.add("active");
        loadTable();
        return;
    }

    if(pageable.lastElementChild === e.target) {      //Boton PREV
        if(page >= noPages) return;                   //Si la pagina es mayor al numero de paginas
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
        if(item.classList.contains("page")) {
            item.classList.remove("active");
        }
    });
}

pageable.addEventListener("click", (e) => nextPage(e));