import './boardCard.scss';

const makeABoard = (board) => {
  let domString = '';
  if (board.id) {
    domString += `
    <div class="row">
        <div class="card col" id="pinCard">
        <h5 class="title">${board.name}</h5>
          <img src="${board.boardImg}" class="cardImg" height="400px" width= "400px" alt="...">
            <div class="card-body">
              <button id="${board.id}" class="btn btn-outline-dark chosen-board">View Me</button>
              <button href="#" class="btn btn-outline-dark deleteBoard" id="board-${board.id}">Delete</button>
            </div>
        </div>
    </div>
    `;
  }
  return domString;
};

export default { makeABoard, boardRadioOptions };
