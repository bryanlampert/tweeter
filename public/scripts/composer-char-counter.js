"use strict";

const charMax = 140;

function char() {
  let inputText = $(this).val().length;
  let counter = $(this).parent().find(".counter")[0];
  let charRemaining = charMax - inputText;
  counter.innerText = charRemaining;
  if (charRemaining < 0) {
    $(counter).addClass("negative-char-count");
  } else {
    $(counter).removeClass("negative-char-count");
  }
}


$(document).ready(function() {

  $(".new-tweet textarea").keyup(char).keydown(char);

});
