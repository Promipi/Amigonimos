import axios from 'axios'
import { browserHistory } from 'react-router';


export const login = async () => {
  new Promise((resolve, reject) => {
    axios.get(`La concha de tu madre para cuando el backend`).get('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then(response => {
      setAuthToken(response.data.token, response.data.id, new Date());
      resolve(true);
    })
    .catch(error => reject(error));
  });
}

const setAuthToken = (token, id, date) => {
  date.setHours(0, 0, 0, 0)
  localStorage.setItem("auth_token", token);
  localStorage.setItem("id_token", id);
  localStorage.setItem("time_token", date);
}

const clearAuthToken = () => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("id_token");
  localStorage.removeItem("time_token");
}

export const logout = () => {
  clearAuthToken();
  browserHistory.push('/');
}

export const getIdToken = () => {
  return localStorage.getItem("id_token");
}

export const getAuthToken = () => {
  return localStorage.getItem("auth_token");
}

export const isLoggedIn = () => {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

const getTokenExpirationDate = () => {
  return localStorage.getItem("time_token");
}

const isTokenExpired = (token) => {
  const expirationDate = getTokenExpirationDate(token);

  var now = new Date();
  now.setHours(0,0,0,0);

  return expirationDate < now;
}