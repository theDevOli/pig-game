/* eslint-disable no-undef */
//Global variables
let playing = true;
let current = 0;
let player = 1;
const finalScore = [0, 0];

//Functions
/**
 * Update the current score of the current player
 */
const updateCurrentScore = () => {
  document.querySelector(`#current-${player}`).textContent = current;
};

/**
 * This ftn will update current to 0, adn switch the player
 */
const changePlayer = () => {
  current = 0;
  updateCurrentScore();
  document.querySelector(`.player-${player}`).classList.toggle('player-active');
  player = player === 1 ? 2 : 1;
  document.querySelector(`.player-${player}`).classList.toggle('player-active');
};

const hiddenDice = () =>
  document.querySelector('.dice').classList.add('hidden');
/**
 * If the current player gets more than 100 on the final score, the template will be changed to winner, the variable playing will be set to false and the dice will be hidden
 */
const haveWon = () => {
  const score = +document.querySelector(`#score-${player}`).textContent;
  if (score >= 100) {
    const activePlayer = document.querySelector('.player-active');
    activePlayer.classList.remove('player-active');
    activePlayer.classList.add('player-winner');
    playing = false;
    hiddenDice();
  }
};
/**
 * Functions for window.onload
 */
const ftnOnload = {
  /**
   * Randomly sets the dice, if the dice number is 1, changes the player. Otherwise it will add the dice value to the current value.
   */
  rollDice() {
    const dice = Math.trunc(Math.random() * 6 + 1);
    const diceElement = document.querySelector('.dice');
    if (playing) {
      diceElement.classList.remove('hidden');
      diceElement.src = `dice-${dice}.png`;
      if (dice !== 1) {
        current += dice;
        updateCurrentScore();
      } else {
        changePlayer();
      }
    }
  },
  /**
   * Add the current score to the final score, switch the player, chack if the player has won, and finally change the player if the previous player has not won
   */
  hold() {
    if (playing) {
      const index = player - 1;
      finalScore[index] += current;
      document.querySelector(`#score-${player}`).textContent =
        finalScore[index];
      haveWon();
      changePlayer();
    }
  },
};

window.onload = function () {
  hiddenDice();
  document.querySelector('.btn-new').addEventListener('click', () => {
    location.reload();
  });
  document
    .querySelector('.btn-roll')
    .addEventListener('click', ftnOnload.rollDice);
  document.querySelector('.btn-hold').addEventListener('click', ftnOnload.hold);
};
