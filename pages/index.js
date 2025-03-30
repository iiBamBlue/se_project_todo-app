import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { Todo } from "../components/Todo.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialTodos, validationConfig } from "../utils/constants.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

// Initialize form validation
const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

const generateTodo = (item) => {
  const todo = new Todo(item, "#todo-template");
  return todo.getView();
};

const renderTodo = (item) => {
  const todoElement = generateTodo(item);
  todosList.append(todoElement);
};

initialTodos.forEach((item) => {
  renderTodo(item);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4(); // Generate unique ID
  const values = { id, name, date };
  renderTodo(values);

  closeModal(addTodoPopup);
  formValidator.resetValidation();
});
