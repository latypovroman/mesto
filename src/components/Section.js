export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  appendItem(item) {
    const card = this._renderer(item);
    this._container.append(card);
  }

  prependItem(item) {
    const card = this._renderer(item);
    this._container.prepend(card);
  }

  _clear() {
    this._container.innerHTML = '';
  }

  renderItems(cards) {
    this._clear();

    cards.forEach(item => {
      this.appendItem(item);
    });
  }
}
