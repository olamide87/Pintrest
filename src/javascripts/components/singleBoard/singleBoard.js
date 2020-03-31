import './singleBoard.scss';
import utilities from '../../helpers/utils';
import pinsPrint from '../pinCard/pinCard';
import pinsData from '../../helpers/data/pinData';
import 'firebase/auth';


const buildSingleBoard = (boardId) => {
  pinsData.getPinsByBoardId(boardId)
    .then((pins) => {
      let domString = '<div id="boardSection">';
      domString += '<button class="closeBtn">Close</button>';
      pins.forEach((pin) => {
        domString += pinsPrint.makePin(pin);
      });
      domString += '</div>';
      utilities.printToDom('pins', domString);
    })
    .catch((error) => console.error(error));
};


export default { buildSingleBoard };
