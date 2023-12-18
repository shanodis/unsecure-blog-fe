import axios from 'axios';
import { appendUrlSearchParams } from "./utils.ts";
import { UserResponse } from "./models.ts";

const loginUser = async (username: string, password: string): Promise<UserResponse> => {
  const requestData = appendUrlSearchParams({ username, password });
  const { headers, data } = await axios.post<UserResponse>('/login', requestData);
  axios.defaults.headers.common.Authorization = headers.authorization;
  localStorage.setItem('JWT_TOKEN', headers.authorization);
  localStorage.setItem('USER', JSON.stringify(data));
  return data;
};

const form = document.getElementById('login-form');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const [usernameInput, passwordInput] = event.target as unknown as HTMLInputElement[];
    try {
      const user = await loginUser(usernameInput.value, passwordInput.value);
      window.location.href = user.role === 'ADMIN' ? '/admin.html' : '/user.html';
    } catch (error) {
      console.error(error);
    }
  });
}
