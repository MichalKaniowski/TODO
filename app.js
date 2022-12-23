const form = document.querySelector("form");
const list = document.querySelector("ul");
const itemInput = document.querySelector(".item-input");


const createListItem = (text, completed) => {
    const listItem = document.createElement("li");
    listItem.className = "list-item";

    if (text) {
        listItem.innerText = text;
    }

    if (completed) {
        listItem.classList.add("completed");
    }

    listItem.addEventListener("click", () => {
        listItem.classList.toggle("completed");
        updateLS();
    });

    listItem.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        listItem.remove();
    });

    return listItem;
}

const updateLS = () => {
    let listItems = document.querySelectorAll(".list-item");
    let itemsLS = [];

    listItems.forEach((item) => {
        item = {
            text: item.innerText,
            completed: item.classList.contains("completed"),
        }
        itemsLS.push(item);
    });

    localStorage.setItem("items", JSON.stringify(itemsLS));
}


form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (itemInput.value) {
        list.appendChild(createListItem(itemInput.value));
        updateLS();
    } else {
        console.log("You need to write sth in input.")
    }
    itemInput.value = "";
});


let items = JSON.parse(localStorage.getItem("items"));
if (items) {
    items.forEach((item) => {
        console.log(item.text, item.completed);
        list.appendChild(createListItem(item.text, item.completed));
    });
}
