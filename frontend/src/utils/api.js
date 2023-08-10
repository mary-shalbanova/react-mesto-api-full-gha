class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  async getInitialInfo() {
    return await Promise.all([this.getUserInfo(), this.getCardList()]);
  }

  async getCardList() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
    return this._handleResponse(res);
  }

  async getUserInfo() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
    return this._handleResponse(res);
  }

  async editProfileInfo(userData) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    });
    return this._handleResponse(res);
  }

  async addNewCard(data) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
    return this._handleResponse(res);
  }

  async deleteCard(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    });
    return this._handleResponse(res);
  }

  async putLike(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    });
    return this._handleResponse(res);
  }

  async deleteLike(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    });
    return this._handleResponse(res);
  }

  async changeLikeCardStatus(cardId, isLiked) {
    return !isLiked ? await this.putLike(cardId) : await this.deleteLike(cardId);
  }

  async changeAvatar(image) {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: image,
      }),
    });
    return this._handleResponse(res);
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: 'b732f751-073e-4fb6-8191-49059a9131b3',
    'Content-Type': 'application/json',
  },
});
