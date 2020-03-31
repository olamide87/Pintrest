import axios from 'axios';
import apikeys from '../apikeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;


const getPinsByBoardId = (boardId) => new Promise((resolved, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
    .then((response) => {
      const getPins = response.data;
      const pins = [];
      Object.keys(getPins).forEach((fbId) => {
        getPins[fbId].id = fbId;
        pins.push(getPins[fbId]);
      });
      resolved(pins);
    })
    .catch((error) => reject(error));
});

const addPin = (newPin) => axios.post(`${baseUrl}/pins.json`, newPin);

const deletePin = (pinsId) => axios.delete(`${baseUrl}/pins/${pinsId}.json`, newPinBoard);

const updateNewPin = (pinsId, newBoard) => axios.put(`${baseUl}/pins/${pinsId}.json`, newPinBoard);

const getPin = (pinsId, newBoardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins/${pinsId}.json`)
    .then((result) => {
      const pinObject = result.data;
      pinObject.boardId = newBoardId;
      updateNewPin(pinsId, pinObject);
      resolve();
    })
    .catch((error) => reject(error));
});

export default {
  getPinsByBoardId,
  deletePin,
  addPin,
  updateNewPin,
  getPin,
};
