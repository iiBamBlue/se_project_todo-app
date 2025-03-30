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

  updateCompleted(increment) {
    this._completed += increment ? 1 : -1;
    this._completed = Math.max(this._completed, 0); // Prevent negative values
    this._updateText();
  }

  updateTotal(increment) {
    this._total += increment ? 1 : -1;
    this._total = Math.max(this._total, 0); // Prevent negative values
    this._updateText();
  }

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}
