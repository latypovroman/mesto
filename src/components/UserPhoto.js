export default class UserPhoto {
  constructor(photoSelector) {
    this._photoSelector = photoSelector;
  }

  // getUserInfo() {
  //   return {
  //     name: this._nameSelector.textContent,
  //     info: this._infoSelector.textContent
  //   }
  // }

  setUserPhoto(data) {
    this._photoSelector.src = data.avatar;
  }
}
