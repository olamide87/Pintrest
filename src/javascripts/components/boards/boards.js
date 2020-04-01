
import './boards.scss';
import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import utils from '../../helpers/utils';
import boardData from '../../helpers/data/boardData';
import boardCard from '../boardCard/boardCard';
import pinsData from '../../helpers/data/pinData';
import pinsPrint from '../pinCard/pinCard';


const updatePinHandler = (e) => {
  const pinId = e.target.id.split('pin-')[1];
  $('saveUpdatePinButton').attr('id', `updatePin-${pinId}`);
};


const deleteABoard = (e) => {
  e.preventDefault();
  const { uid } = firebase.auth().currentUser;
  const boardId = e.target.id.split('board-')[1];
  boardData.deleteBoard(boardId)
    .then(() => {
      pinsData.getPinsByBoardId(boardId).then((pins) => {
        pins.forEach((pin) => pinsData.deletePin(pin.id));
      });
      // eslint-disable-next-line no-use-before-define
      buildBoards(uid);
    })
    .catch((error) => console.error(error));
};

const addNewBoard = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const newBoard = {
    name: $('#boardName').val(),
    boardImg: $('#boardImageUrl').val(),
    uid,
  };
  boardData.addBoard(newBoard)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      buildBoards(uid);
    })
    .catch((error) => console.error(error));
};

const showSingleBoard = (boardId) => {
  pinsData.getPinsByBoardId(boardId)
    .then((pins) => {
      // console.log('here are the pins', pins);
      // eslint-disable-next-line max-len
      let domString = '<div id="boardSection" class="container text-center"><button class="closeBtn">Close</button> <button type="button" id="newPinBtn" class="btn btn-outline-dark" data-toggle="modal" data-target="#pinModal"> Add New Pin</button></div>';
      domString += '<div class="container d-flex flex-wrap justify-content-between">';
      pins.forEach((pin) => {
        domString += pinsPrint.makePin(pin);
      });
      domString += '</div>';
      utils.printToDom('boards', domString);
      $('#boardSection').on('click', '.closeBtn', close);
      $('#addNewPin').attr('pinBoardId', boardId);
      $('.updatePinButton').click(updatePinHandler);
      $('#updatePinModal').on('click', '.saveUpdatePinButton', updatePin);
    })
    .catch((error) => console.error(error));
};

const deleteAPin = (e) => {
  e.preventDefault();
  pinsData.deletePin(e.target.id)
    .then(() => {
      const boardId = e.target.getAttribute('pinDataBoardId');
      showSingleBoard(boardId);
      // eslint-disable-next-line no-use-before-define
    })
    .catch((error) => console.error(error));
};

const createSingleBoard = (e) => {
  const boardId = e.target.id;
  showSingleBoard(boardId);
};

const buildBoards = (uid) => {
  boardData.getBoards(uid)
    .then((boards) => {
      let domString = `<div class="text-center" style="padding:50px"><button type="button" class="btn btn-outline-dark btn-lg" data-toggle="modal" data-target="#exampleModal">
      Add Board
    </button>`;
      domString += '<div id="boardSection" class="container d-flex flex-wrap justify-content-between">';
      boards.forEach((board) => {
        domString += boardCard.makeABoard(board);
      });
      let domString2 = '<div>';
      domString += '</div>';
      domString2 += '</div>';
      utils.printToDom('boards', domString);
      utils.printToDom('updatePinBoard', domString2);
      $('#boards').on('click', '.chosen-board', createSingleBoard);
      $('#boards').on('click', '.deletePinFromBoard', deleteAPin);
      $('#boards').on('click', '.deleteBoard', deleteABoard);
      $('#addNewBoardBtn').click(addNewBoard);
      $('#addNewPin').click(addNewPin);
    });
};

const close = () => {
  const { uid } = firebase.auth().currentUser;
  $(document).click((e) => {
    const buttonName = e.target.className;
    if (buttonName === 'closeBtn') {
      buildBoards(uid)
    }
  });
};

export default { buildBoards };
