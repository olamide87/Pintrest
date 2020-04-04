import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import boards from '../../components/boards/boards';

const authDiv = $('#auth');
const stockDiv = $('#stock');
const logoutNavbar = $('#google-auth');
const boardsDiv = $('#boards');
const pinsDiv = $('#pins');


const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // someone is logged in - we should NOT see auth component
      pinsDiv.removeClass('hide');
      stockDiv.removeClass('hide');
      logoutNavbar.removeClass('hide');
      authDiv.addClass('hide');
      boardsDiv.removeClass('hide');
      boards.buildBoards(user.uid);
      console.error(user);
    } else {
      // nobody logged in SHOW auth component
      pinsDiv.addClass('hide');
      stockDiv.addClass('hide');
      logoutNavbar.addClass('hide');
      authDiv.removeClass('hide');
      boardsDiv.addClass('hide');
    }
  });
};

export default { checkLoginStatus };
