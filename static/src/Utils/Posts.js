import axios from 'axios'

export const getAll = async () => {
  new Promise((resolve, reject) => {
    axios.get(`La concha de tu madre para cuando el backend`)
    .then(response => {
      resolve(response.data);
    })
    .catch(error => reject(error));
  });
}

export const getId = async (id) => {
  new Promise((resolve, reject) => {
    axios.get(`La concha de tu madre para cuando el backend`, {
      params: {
        id: id
      }
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(error => reject(error));
  });
}