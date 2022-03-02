export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setItem(element) {
    this._container.append(element);
  }

  _clear() {
    this._container.innerHTML = '';
  }

  renderItems() {

    this._clear();

    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}
