export default class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items; // Array of data to render
    this._renderer = renderer; // Function to create and add a single item
    this._container = document.querySelector(containerSelector); // Target container

    if (!this._container) {
      throw new Error(
        `Container not found with selector: ${containerSelector}`
      );
    }
  }

  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this._container.append(element); // Adds new item to the container
  }
}
