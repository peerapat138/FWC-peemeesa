let list = [];
const toDoEl = document.getElementById("ft_list");
const addBtn = document.getElementById("addBtn");

const render = () => {
  toDoEl.innerHTML = "";
  list.forEach((value, index) => {
    const toDoItem = createTodoElement(value);
    toDoItem.addEventListener("click", () => {
      removeTodo(index);
    });
    toDoEl.appendChild(toDoItem);
  });
};

const createTodoElement = (value) => {
  const button = document.createElement("button");
  button.classList.add("todoItem");
  button.textContent = value;
  return button;
};

const addTodo = (value) => {
  list.push(value);
  updateCookie(JSON.stringify(list));
  render();
};

const removeTodo = (index) => {
  list.splice(index, 1);
  updateCookie(JSON.stringify(list));
  render();
};

const updateCookie = (value) => {
  setCookie("toDo", value);
};

const setCookie = (key, value) => {
  document.cookie = `${key} = ${value};`;
};

const getCookie = (key) => {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];

    if (cookie.startsWith(key + "=")) return cookie.substring(key.length + 1);
    return null;
  }
};

addBtn.addEventListener("click", () => {
  const newTodo = prompt("New ToDo");
  if (newTodo.trim().length <= 0) return;
  addTodo(newTodo);
});

const oldToDo = getCookie("toDo");
if (oldToDo) {
  list = JSON.parse(oldToDo);
}

render();