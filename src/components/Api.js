export default class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers  = headers;
  }

  _isResOk(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(this._isResOk)
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(this._isResOk)
  }


  patchUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.nickname,
        about: data.description
      })
    })
      .then(this._isResOk)
  }

  postNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._isResOk)
  }

  deleteCard({_id}){
    return fetch(`${this._url}/cards/${_id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._isResOk)
  }

  putLike({_id}) {
    return fetch(`${this._url}/cards/likes/${_id}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._isResOk)
  }

  deleteLike({_id}) {
    debugger;
    return fetch(`${this._url}/cards/likes/${_id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._isResOk)
  }

  setUserAvatar({avatar}) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(this._isResOk)
  }




}
