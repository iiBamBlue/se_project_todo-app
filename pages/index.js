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

// Initialize TodoCounter
const todoCounter = new TodoCounter(initialTodos, ".todo-counter");

// Counter update callbacks
const updateCounterOnChange = () => {
  todoCounter.updateCompleted(
    todoCounter._todos.filter((todo) => todo.completed).length
  );
};

const updateCounterOnDelete = (todoId) => {
  todoCounter.removeTodo(todoId); // Update internal state in TodoCounter
  todoCounter.updateTotal(todoCounter.getTotalCount());
  todoCounter.updateCompleted(todoCounter.getCompletedCount());
};

// Render function to create and add a Todo element to the section
const renderTodo = (item) => {
  const todo = generateTodo(item, updateCounterOnChange, updateCounterOnDelete);
  section.addItem(todo);
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
  todoCounter.addTodo(newTodo); // Add the new todo to TodoCounter
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
