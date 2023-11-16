const list_el = document.getElementById("list");
const create_btn_el = document.getElementById("create")

let to_dos = [];

create_btn_el.addEventListener('click', CreateNewTodo);

function CreateNewTodo() {
    const item = {
        id: new Date().getTime(),
        text: "",
        complete: false
    }

    to_dos.unshift(item);

    const { item_el, input_el } = CreateTodoElement(item);

    list_el.prepend(item_el);

    input_el.removeAttribute("disabled");
    input_el.focus();

    Save();
}

/* <div class="item">
        <input type="checkbox">
        <input type="text" value="Todo-list content goes here" disabled>
        <div class="actions">
            <button class="material-icons">edit</button>
            <button class="materials-icons remove-btn">delete</button>
        </div>
    </div>*/

function CreateTodoElement(item) {
    const item_el = document.createElement("div");
    item_el.classList.add("item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.complete;

    if (item.complete) {
        item_el.classList.add("complete");
    }

    const input_el = document.createElement("input");
    input_el.type = "text";
    input_el.value = item.text;
    input_el.setAttribute("disabled", "");

    const actions_el = document.createElement("div")
    actions_el.classList.add("actions");

    const edit_btn_el = document.createElement("button");
    edit_btn_el.classList.add("material-icons");
    edit_btn_el.innerText = "edit";

    const remove_btn_el = document.createElement("button");
    remove_btn_el.classList.add("material-icons", "remove-btn");
    remove_btn_el.innerText = "delete";

    actions_el.append(edit_btn_el);
    actions_el.append(remove_btn_el);

    item_el.append(checkbox);
    item_el.append(input_el);
    item_el.append(actions_el);


    checkbox.addEventListener("change", () => {
        item.complete = checkbox.checked;

        if (item.complete) {
            item_el.classList.add("complete");
        } else {
            item_el.classList.remove("complete");
        }
        Save();
    });

    input_el.addEventListener('input', () => {
        item.text = input_el.value;
    });

    input_el.addEventListener("blur", () => {
        input_el.setAttribute("disabled", "");
        Save();
    });

    edit_btn_el.addEventListener("click", () => {
        input_el.removeAttribute("disabled");
        input_el.focus();
    });

    remove_btn_el.addEventListener("click", () => {
        to_dos = to_dos.filter(t => t.id != item.id);

        item_el.remove();

        Save();
    });

    return { item_el, input_el, edit_btn_el, remove_btn_el }

}

function Save() {
    const save = JSON.stringify(to_dos);

    localStorage.setItem("task", save);
}

function DisplayTo_dos() {
    load();

    for (let i = 0; i < to_dos.length; i++) {
        const item = to_dos[i];

        const { item_el } = CreateTodoElement(item);

        list_el.append(item_el);
    }
}

DisplayTo_dos();


function load() {
    const data = localStorage.getItem("task");

    if (data) {
        to_dos = JSON.parse(data);
    }
}