"use strict";

const $boggleForm = $("#guess-word");
const $guessMessage = $("#guess-message");
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
    $guessMessage.text("Good Guess!");
  } else if (response.data.result === "not-on-board") {
    $guessMessage.text("That word is not on the board");
  } else {
    $guessMessage.text("That is not a word");
  }
}
