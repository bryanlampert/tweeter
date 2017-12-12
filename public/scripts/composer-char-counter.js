"use strict";

$(document).ready(function() {

  $(".new-tweet textarea").keyup(char);
  const charMax = 140;

  function char() {
    let inputText = $(this).val().length;
    let counter = $(this).parent().children(".counter")[0];
    let charRemaining = charMax - inputText;
    counter.innerText = charRemaining;
    if (charRemaining < 0) {
      $(counter).css("color", "red");
    } else {
      $(counter).css("color", "#ffffff");
    }
  }

});
