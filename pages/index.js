import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";
import { FormValidator } from "../components/FormValidator.js";
import { Todo } from "../components/Todo.js";

// Utility function for creating a Todo element
function generateTodo(item, handleChange, handleDelete) {
  return new Todo(item, "#todo-template", handleChange, handleDelete).getView();
}

// Render function to create and add a Todo element to the section
const renderTodo = (item) => {
  const todo = generateTodo(item, updateCounterOnChange, updateCounterOnDelete);
  section.addItem(todo);
};

// Initialize TodoCounter
const todoCounter = new TodoCounter(initialTodos, ".todo-counter");

// Counter update callbacks
const updateCounterOnChange = () => {
  const allTodos = document.querySelectorAll(".todo__completed"); // All checkboxes
  const completedCount = Array.from(allTodos).filter(
    (checkbox) => checkbox.checked
  ).length;
  todoCounter.updateCompleted(completedCount); // Pass the actual number.
};

const updateCounterOnDelete = () => {
  const totalCount = document.querySelectorAll(".todo").length; // Total todos in the DOM.
  const completedCount = document.querySelectorAll(
    ".todo__completed:checked"
  ).length; // Checked todos.
  todoCounter.updateTotal(totalCount); // Pass the actual total count.
  todoCounter.updateCompleted(completedCount); // Pass the actual completed count.
};

// Initialize Section
const section = new Section({
  items: initialTodos,
  renderer: renderTodo,
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

  renderTodo(newTodo);
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
