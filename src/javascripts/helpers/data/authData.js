import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import boards from '../../components/boards/boards';

const logoutButton = $('#navbar-logout-button');
const loginButton = $('#auth');
const boardsDiv = $('#boards');
const pinsDiv = $('#pins');
const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // someone is logged in - we should NOT see auth component
      pinsDiv.removeClass('hide');
      logoutButton.removeClass('hide');
      loginButton.addClass('hide');
      boardsDiv.removeClass('hide');
      boards.buildBoards(user.uid);
      console.error(user);
    } else {
      // nobody logged in SHOW auth component
      pinsDiv.addClass('hide');
      logoutButton.addClass('hide');
      loginButton.removeClass('hide');
      boardsDiv.addClass('hide');
      console.error('no user');
    }
  });
};
export default {
  checkLoginStatus,
};
