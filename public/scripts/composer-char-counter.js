"use strict";

const charMax = 140;

// Function for the character counter on the compose new tweet form
function char() {
  let inputText = $(this).val().length;
  let counter = $(this).parent().find(".counter")[0];
  // Calculates the amount of characters remaining
  let charRemaining = charMax - inputText;
  // Sets the counter on the page to the amount of characters remaining
  counter.innerText = charRemaining;

  // Checks if the character count is more than 140, if so adds a class for css styling
  if (charRemaining < 0) {
    $(counter).addClass("negative-char-count");
  } else {
    $(counter).removeClass("negative-char-count");
  }

  // Checks if the blank text error message is true. Removes this message once another key is typed
  if ($('[name="blank-text"]')) {
    $('[name="blank-text"]').remove();
  }
  // Checks if the character counter is in the negative. If it is positive, removes the text too long error message
  if (charRemaining >= 0) {
    $('[name="text-too-long"]').remove();
  }

}

// When the document is ready performs the below code
$(document).ready(function() {

  // On input in the compose new tweet text area, calls the char function for the character counting
  $(".new-tweet textarea").on("input", char);

});
