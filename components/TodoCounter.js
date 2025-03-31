export default class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);

    if (!this._element) {
      throw new Error(
        `Todo counter element not found with selector: ${selector}`
      );
    }

    this._completed = todos.filter((todo) => todo.completed).length;
    this._total = todos.length;

    this._updateText();
  }

  updateCompleted(completedCount) {
    this._completed = completedCount; // Use a number to set the completed count.
    this._updateText();
  }

  updateTotal(totalCount) {
    this._total = totalCount; // Use a number to set the total count.
    this._updateText();
  }

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}
