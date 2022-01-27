export default class UserInfo {
  constructor({nameSelector, infoSelector}) {
    this._nameSelector = nameSelector;
    this._infoSelector = infoSelector;
  }

  getUserInfo() {
    return {
      name: this._nameSelector.textContent,
      info: this._infoSelector.textContent
    }
  }

  setUserInfo({nickname, description}) {
    this._nameSelector.textContent = nickname;
    this._infoSelector.textContent = description;
  }
}
