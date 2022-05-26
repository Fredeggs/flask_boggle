"use strict";


const $boggleForm = $("#guess-word");
const $guessMessage = $("#guess-message");
const $score = $('#score');

$boggleForm.on("submit", guessWord);

async function guessWord(evt) {
  console.debug("guess word", evt);
  evt.preventDefault();
  const $guess = $("#guess").val();
  const response = await axios({
    url: "/process-guess",
    method: "POST",
    data: { $guess },
  });
  if (response.data.result === "ok") {
    let score = Number($score.text())
    score += Number($guess.length)
    $score.text(score)
    if ($guessMessage.css('display') === 'none') {
      $guessMessage.css('display', 'block');
      $guessMessage.text("Good Guess!").fadeOut(3000);
    }
    else {
      $guessMessage.text("Good Guess!").fadeOut(3000);
    }
  } else if (response.data.result === "not-on-board") {
    if ($guessMessage.css('display') === 'none') {
      $guessMessage.css('display', 'block');
      $guessMessage.text("That word is not on the board").fadeOut(3000);
    }
    else {
      $guessMessage.text("That word is not on the board").fadeOut(3000);
    }
  } else {
    if ($guessMessage.css('display') === 'none') {
      $guessMessage.css('display', 'block');
      $guessMessage.text("That is not a word").fadeOut(3000);
    }
    else {
      $guessMessage.text("That is not a word").fadeOut(3000);
    }
  }
}

function countDown() {
  setTimeout() // Disable the ability to submit guesses after 60 sec
  setInterval() // Subtract 1 from the timer after each second
}
