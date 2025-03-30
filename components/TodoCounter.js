class TodoCounter {
  // Constructor takes an array of todos and a selector for the counter text element
  constructor(todos, selector) {
    // Select the counter text element from the DOM
    this._element = document.querySelector(selector);
    if (!this._element) {
      throw new Error(
        `Todo counter element not found with selector: ${selector}`
      );
    }

    // Initialize the number of completed and total todos
    this._completed = todos.filter((todo) => todo.completed).length;
    this._total = todos.length;

    // Update the counter text on initialization
    this._updateText();
  }

  // Method to update the count of completed todos
  updateCompleted = (increment) => {
    this._completed += increment ? 1 : -1;
    if (this._completed < 0) this._completed = 0; // Ensure no negative values
    this._updateText();
  };

  // Method to update the total number of todos
  updateTotal = (increment) => {
    this._total += increment ? 1 : -1;
    if (this._total < 0) this._total = 0; // Ensure no negative values
    this._updateText();
  };

  // Private method to update the displayed text
  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
