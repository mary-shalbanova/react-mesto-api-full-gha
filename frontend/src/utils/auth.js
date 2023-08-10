export const BASE_URL = 'https://auth.nomoreparties.co';

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
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      return res.json();
    }
  } catch (err) {
    console.error(err);
  }
}

export async function getContent(token) {
  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return res.json();
    }
  } catch (err) {
    console.error(err);
  }
}
