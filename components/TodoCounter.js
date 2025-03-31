export default class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);

    if (!this._element) {
      throw new Error(
        `Todo counter element not found with selector: ${selector}`
      );
    }

    this._todos = todos; // Store todos internally
    this._completed = todos.filter((todo) => todo.completed).length;
    this._total = todos.length;

    this._updateText();
  }

  addTodo(newTodo) {
    this._todos.push(newTodo); // Add new todo to internal list
    this._total++;
    if (newTodo.completed) {
      this._completed++;
    }
    this._updateText();
  }

  removeTodo(todoId) {
    this._todos = this._todos.filter((todo) => todo.id !== todoId); // Remove todo from list
    this._total = this._todos.length;
    this._completed = this._todos.filter((todo) => todo.completed).length; // Recalculate completed count
    this._updateText(); // Update counter display
  }

  getCompletedCount() {
    return this._completed; // Return completed todos count
  }

  getTotalCount() {
    return this._total; // Return total todos count
  }

  updateCompleted(completedCount) {
    this._completed = completedCount; // Update completed count
    this._updateText();
  }

  updateTotal(totalCount) {
    this._total = totalCount; // Update total count
    this._updateText();
  }

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}
