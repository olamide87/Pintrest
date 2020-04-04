import './pinCard.scss';

const makePin = (pin) => {
  let domString = '';
  if (pin.id) {
    domString += `
    <div class="row">
      <div class="card col text-center" id="pinCard">
        <h5 class="card-title">${pin.title}</h5>
          <div class="card-body">
            <img src="${pin.imgUrl}" class="cardImg" height="400px" width= "400px" alt="...">
              <p class="card-text">${pin.description}</p>
              <button href="#" class=" btn btn-outline-dark deletePinFromBoard" id="${pin.id}" pinDataBoardId="${pin.boardId}">Remove</button>
              <button type="button" id="pin-${pin.id}" class="btn btn-outline-dark updatePinButton" data-toggle="modal" data-target="#updatePinModal">
              Update Pin
              </button>
          </div>
      </div>
    </div>
`;
  }
  return domString;
};

export default { makePin };
