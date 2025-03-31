class Todo {
  constructor(data, selector, handleChangeCallback, handleDeleteCallback) {
    this._data = data;
    this._selector = selector;
    this._handleChangeCallback = handleChangeCallback; // Callback for checkbox change
    this._handleDeleteCallback = handleDeleteCallback; // Callback for deletion

    // Define class fields in the constructor
    const todoTemplate = document.querySelector(this._selector);
    this._todoElement = todoTemplate.content
      .querySelector(".todo")
      .cloneNode(true);

    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = this._todoCheckboxEl.checked;
      this._handleChangeCallback(); // Trigger change callback
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      this._handleDeleteCallback(); // Trigger delete callback
    });
  }

  getView() {
    this._todoNameEl.textContent = this._data.name;
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);

    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    this._setEventListeners();
    return this._todoElement;
  }
}

export { Todo };
