// export const BASE_URL = 'http://localhost:4000';
export const BASE_URL = 'http://api.mesto.mary.nomoreparties.co';

export async function register(email, password) {
  try {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      return res.json();
    }
  } catch (err) {
    console.error(err);
  }
}

export async function authorize(email, password) {
  try {
    const res = await fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      return res.json();
    }
  } catch (err) {
    console.error(err);
  }
}

export async function getContent() {
  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (res.ok) {
      return res.json();
    }
  } catch (err) {
    console.error(err);
  }
}

export async function logout () {
  try {
    const res = await fetch(`${BASE_URL}/logout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (res.ok) {
      return res.json();
    }
  } catch (err) {
    console.error(err);
  }
}
