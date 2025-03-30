import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";
import { FormValidator } from "../components/FormValidator.js";
import { Todo } from "../components/Todo.js";

// Initialize TodoCounter
const todoCounter = new TodoCounter(initialTodos, ".todo-counter");

// Initialize Section
const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = new Todo(item, "#todo-template").getView();
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});
section.renderItems();

// Initialize PopupWithForm
const popupWithForm = new PopupWithForm("#add-todo-popup", (formData) => {
  const newTodo = {
    id: uuidv4(),
    name: formData.name,
    date: new Date(formData.date),
    completed: false,
  };

  const todoElement = new Todo(newTodo, "#todo-template").getView();
  section.addItem(todoElement);
  todoCounter.updateTotal(true);
});
popupWithForm.setEventListeners();

// Initialize FormValidator
const formValidator = new FormValidator(
  validationConfig,
  document.forms["add-todo-form"]
);
formValidator.enableValidation();

// Open popup on button click
document.querySelector(".button_action_add").addEventListener("click", () => {
  popupWithForm.open();
});

// Handle checkbox and delete button interactions
document.querySelector(".todos__list").addEventListener("change", (event) => {
  if (event.target.classList.contains("todo__completed")) {
    todoCounter.updateCompleted(event.target.checked);
  }
});

document.querySelector(".todos__list").addEventListener("click", (event) => {
  if (event.target.classList.contains("todo__delete-btn")) {
    const todoItem = event.target.closest(".todo");
    if (todoItem) {
      todoItem.remove();
      todoCounter.updateTotal(false);
    }
  }
});
