export default class UserInfo {
  constructor({nameSelector, infoSelector, photoSelector}) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._photo = document.querySelector(photoSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent
    }
  }

  setUserInfo({name, about, avatar, _id}) {
    this._name.textContent = name;
    this._info.textContent = about;
    this._photo.src = avatar;
    this._myId = _id;
  }

  getUserId() {
    return this._myId;
  }

  setUserPhoto(data) {
    this._photo.src = avatar;
  }
}
