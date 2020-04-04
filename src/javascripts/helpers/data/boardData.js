import axios from 'axios';
import apikeys from '../apikeys.json';

const baseUrl = apikeys.firebaseConfig.databaseURL;

const getBoards = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const demBoards = response.data;
      const boards = [];
      Object.keys(demBoards).forEach((fbId) => {
        demBoards[fbId].id = fbId;
        boards.push(demBoards[fbId]);
      });
      resolve(boards);
    })
    .catch((error) => reject(error));
});


const addBoard = (newBoard) => axios.post(`${baseUrl}/boards.json`, newBoard);

const deleteBoard = (boardId) => axios.delete(`${baseUrl}/boards/${boardId}.json`);

export default {
  getBoards,
  deleteBoard,
  addBoard,
};
