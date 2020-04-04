import './boardCard.scss';

const boardRadioOptions = (board) => {
  //  pass board through
  //  create domString to build radio button options
  let domString2 = '';
  if (board.id) {
    domString2 += `
      <div class="form-check">
        <input class="form-check-input" type="radio" name="boardRadios" value=${board.id}>
        <label class="form-check-label" for="exampleRadios2">
          ${board.name}
        </label>
      </div>
      `;
  }
  return domString2;
};

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
