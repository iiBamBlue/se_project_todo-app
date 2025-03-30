class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items; // Save the items array
    this._renderer = renderer; // Save the renderer function
    this._container = document.querySelector(containerSelector); // Select and save the container element
  }

  // Method to render all items to the DOM
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item); // Call the renderer function for each item
    });
  }

  // Method to add a single DOM element to the container
  addItem(element) {
    this._container.append(element); // Append the element to the container
  }
}

export default Section;
