class Api {
  constructor ({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
    this._authorization = headers.authorization;
  };

  _getResponseData (res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  }

  getUserInfo () {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._getResponseData)
  }

  getInitialCards () {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._getResponseData)
  }

  getData () {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }

  setUserInfo (dataObj) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: dataObj.userName,
        about: dataObj.userCaption,
      })
    })
    .then(this._getResponseData)
  }

  setUserAvatar (dataObj) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: dataObj.userAvatar,
      })
    })
    .then(this._getResponseData)
  }

  addNewCard (dataObj) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: dataObj.cardName,
        link: dataObj.cardLink,
      })
    })
    .then(this._getResponseData)
  }

  deleteCard (cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._getResponseData)
  }

  putLike (cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._getResponseData)
  }

  deleteLike (cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
    .then(this._getResponseData)
  }

};

// создание экземпляра класса API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: 'be886bc9-e319-4975-941a-d3278ff6ff0a',
    'Content-Type': 'application/json'
  }
});

export { api }