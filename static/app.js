"use strict";

const $boggleForm = $("#guess-word");
const $submit = $("#submit");
const $guess = $("#guess");
const $guessMessage = $("#guess-message");
const $score = $("#score");
const $timer = $("#timer");
const $gameOverForm = $("#game-over-form")

let GUESSES = [];
$boggleForm.on("submit", guessWord);

async function guessWord(evt) {
  evt.preventDefault();
  const $guess = $("#guess").val();
  if (GUESSES.includes($guess)) {
    $guessMessage.text("You have already guessed that word").fadeOut(1000);
  } else {
    const response = await axios({
      url: "/process-guess",
      method: "POST",
      data: { $guess },
    });
    handleResponse(response.data.result);
  }
  GUESSES.push($guess);
  $("#guess").val(""); // reset input after a submission
}

function handleResponse(response) {
  switch (response) {
    case "ok":
      let score = Number($score.text());
      score += Number($guess.val().length);
      $score.text(score);
      if ($guessMessage.css("display") === "none") {
        $guessMessage.css("display", "block");
        $guessMessage.text("Good Guess!").fadeOut(1000);
      } else {
        $guessMessage.text("Good Guess!").fadeOut(1000);
      }
      break;
    case "not-on-board":
      if ($guessMessage.css("display") === "none") {
        $guessMessage.css("display", "block");
        $guessMessage.text("That word is not on the board").fadeOut(1000);
      } else {
        $guessMessage.text("That word is not on the board").fadeOut(1000);
      }
      break;
    case "not-word":
      if ($guessMessage.css("display") === "none") {
        $guessMessage.css("display", "block");
        $guessMessage.text("That is not a word").fadeOut(1000);
      } else {
        $guessMessage.text("That is not a word").fadeOut(1000);
      }
      break;
  }
}

function countDown() {
  let intervalId = setInterval(() => {
    if ($timer.text() === "1") {
      disableSubmit();
      updateStats();
      clearInterval(intervalId);
    }
    const subtractByOne = Number($timer.text()) - 1;
    $timer.text(subtractByOne);
  }, 1000);
}

function disableSubmit() {
  $guess.prop("disabled", true);
  $submit.prop("disabled", true);
  $guessMessage.text("GAME OVER");
}

async function updateStats() {
  const response = await axios({
    url: "/process-game-over",
    method: "POST",
    data: { score: Number($('#score').text()) },
  });
  console.log(response)
  window.location = "/show_game_over"
}

$gameOverForm.on('submit', function (evt) {
  evt.preventDefault();
  window.location = "/"
})

countDown();
