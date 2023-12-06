import axios, { AxiosError, AxiosResponse } from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

const localStorageUser = localStorage.getItem('USER');

export const user = localStorageUser ? JSON.parse(localStorageUser) : null;

const excludedPages = [
  '/index.html',
  '/sign-in.html',
  '/register.html',
];

const cleanUpAndRedirect = (): void => {
  localStorage.removeItem('JWT_TOKEN');
  localStorage.removeItem('USER');
  window.location.replace('/index.html');
};

const fulfillHandler = (response: AxiosResponse): AxiosResponse => response;

const rejectHandler = async (error: AxiosError): Promise<AxiosError> => {
  const status: number = error?.response?.status || -1;

  if ([401, 403, 406].includes(status)) {
    cleanUpAndRedirect();
  }

  return Promise.reject(error);
};

axios.interceptors.response.use(fulfillHandler, rejectHandler);

if (localStorage.getItem('JWT_TOKEN')) {
  axios.defaults.headers.common.Authorization = localStorage.getItem('JWT_TOKEN');
}

if (!user && !excludedPages.includes(window.location.pathname)) {
  cleanUpAndRedirect();
}

const logoutButton = document.getElementById('logout-button');

if (logoutButton) {
  logoutButton.addEventListener('click', cleanUpAndRedirect);
}
