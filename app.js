//Selectors
const clearElemnet = document.getElementById("icon-clear");
const dateElement = document.querySelector(".date");
const listElement = document.getElementById("list");
const inputElement = document.getElementById("input");
const btnAddElement = document.getElementById("btn-add");

//EventListeners
clearElemnet.addEventListener("click", clear);
document.addEventListener("DOMContentLoaded", updateDate);
document.addEventListener("DOMContentLoaded", loadList);
inputElement.addEventListener("keyup", updateList);
btnAddElement.addEventListener("click", updateList);
listElement.addEventListener("click", checkUncheck);
listElement.addEventListener("click", deleteItem);

// funtions

//variables
let localStoreData = localStorage.getItem("TAREAS");
let list = localStoreData == null ? [] : JSON.parse(localStoreData);
let id = list == null ? 0 : list.length;
console.log(list);

//clear de store
function clear() {
  if (list) {
    localStorage.clear();
    location.reload();
  }
}

//add date
function updateDate() {
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  let fecha = new Date();
  let d = fecha.getDate() < 10 ? "0" + fecha.getDate() : fecha.getDate();
  let m = meses[fecha.getMonth()];
  let y = fecha.getFullYear();
  dateElement.innerHTML = `${d} de ${m} de ${y}`;
}

//add item
function loadList() {
  listElement.innerHTML = "";
  if (list) {
    list.forEach((element) => {
      if (element.trash) {
        return;
      }
      createItem(element.name, element.id, element.done, element.trash);
    });
  }
}

//create html code for the list items
function createItem(itemName, id, done, trash) {
  const position = "beforeend";
  const check = "fa-check-circle";
  const uncheck = "fa-circle";
  const line = "lineThrough";
  const opacity = "item-checked";

  const iconStyle = done ? check : uncheck;
  const textStyle = done ? line : "";
  const itemOpacity = done ? opacity : "";

  const itemHtml = `<li class="item ${itemOpacity}">
      <i class="far ${iconStyle} complete" id="${id}"></i>
      <p class="text ${textStyle}">${itemName}</p>
      <i class="far fa-trash-alt delete" id="${id}"></i>
    </li>`;

  listElement.insertAdjacentHTML(position, itemHtml);
}

//add and update the list
function updateList(e) {
  if (e.keyCode == 13 || e.type == "click") {
    const inputValue = inputElement.value;
    list.push({
      name: inputValue,
      id: id,
      done: false,
      trash: false,
    });
    inputElement.value = "";
    id++;
    inputElement.focus();
    updateLocalStore();
    loadList();
  }
}

//check and uncheck item
function checkUncheck(e) {
  const itemId = e.target.id;

  if (list[itemId].done == false) {
    list[itemId].done = true;
  } else {
    list[itemId].done = false;
  }

  updateLocalStore();
  loadList();
}

// Delete item
function deleteItem(e) {
  const item = e.target;
  if (item.classList.contains("delete")) {
    list[item.id].trash = true;
    item.parentNode.remove();
  }
  updateLocalStore();
  loadList();
}

//update the local Storage
function updateLocalStore() {
  localStorage.setItem("TAREAS", JSON.stringify(list));
}
