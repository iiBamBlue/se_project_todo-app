class Todo {
  constructor(data, selector) {
    this._data = data;
    this._selector = selector;
  }

  // Private method to set event listeners
  _setEventListeners(todoElement) {
    const todoDeleteBtn = todoElement.querySelector(".todo__delete-btn");
    const todoCheckboxEl = todoElement.querySelector(".todo__completed");

    todoDeleteBtn.addEventListener("click", () => {
      todoElement.remove();
    });

    todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = todoCheckboxEl.checked;
    });
  }

  // Public method to generate and return the todo element
  getView() {
    const todoTemplate = document.querySelector(this._selector);
    const todoElement = todoTemplate.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = todoElement.querySelector(".todo__name");
    const todoCheckboxEl = todoElement.querySelector(".todo__completed");
    const todoLabel = todoElement.querySelector(".todo__label");
    const todoDate = todoElement.querySelector(".todo__date");

    todoNameEl.textContent = this._data.name;
    todoCheckboxEl.checked = this._data.completed;
    todoCheckboxEl.id = `todo-${this._data.id}`;
    todoLabel.setAttribute("for", `todo-${this._data.id}`);

    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    this._setEventListeners(todoElement);
    return todoElement;
  }
}

export { Todo };
