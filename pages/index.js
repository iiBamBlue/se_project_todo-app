// Import all necessary components and constants
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";
import { Todo } from "../components/Todo.js"; // If you have a Todo class for individual items
import { FormValidator } from "../components/FormValidator.js";

// Initialize TodoCounter
const todoCounter = new TodoCounter(initialTodos, ".todo-counter");

// Initialize Section
const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = new Todo(item, "#todo-template").getView(); // Generate todo item
    section.addItem(todoElement); // Add it to the DOM
  },
  containerSelector: ".todos__list",
});
section.renderItems(); // Render initial todos

// Initialize PopupWithForm
const popupWithForm = new PopupWithForm("#add-todo-popup", (formData) => {
  const todoData = {
    id: uuidv4(), // Generate a unique ID
    name: formData.name,
    date: new Date(formData.date),
    completed: false,
  };
  const todoElement = new Todo(todoData, "#todo-template").getView();
  section.addItem(todoElement); // Add the new todo
  todoCounter.updateTotal(true); // Update total count
});
popupWithForm.setEventListeners();

// Form validation
const formValidator = new FormValidator(
  validationConfig,
  document.forms["add-todo-form"]
);
formValidator.enableValidation();

// Event listener for opening the popup
document.querySelector(".button_action_add").addEventListener("click", () => {
  popupWithForm.open();
});
