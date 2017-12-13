/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  $('.composeButton').click(function(){
    $('.new-tweet').slideToggle("slow", function() {
      $('textarea').select();
    });
  });

  function renderTweets(tweets) {
    tweets.forEach(function(tweet) {
      $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    });
  }

  function createTweetElement(tweet) {

    //Checks to make sure the inputted tweet is safe
    function escape(str) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

    return (
      `<article class="tweet">
          <header class="tweet-header">
            <img class="profile-pic" src="${tweet.user.avatars.regular}">
            <div>
              <h2 class="name">${escape(tweet.user.name)}</h2>
              <h3 class="handle">${escape(tweet.user.handle)}</h3>
            </div>

          </header>
          <section class="tweet-message">
            ${escape(tweet.content.text)}
          </section>
          <footer class="tweet-footer">
            <span>${tweet.created_at} days ago</span>
            <img class="footer-images" src="/images/heart.png">
            <img class="footer-images" src="/images/retweeter.png">
            <img class="footer-images" src="/images/flag.png">
          </footer>
      </article>`
    );
  }

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json'
    })
      .then(function(data){
        renderTweets(data);
      });

  }

  function postTweets() {
    let $tweetData = $('textarea').serialize();
    let $text = ($tweetData).replace('text=', '');
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $tweetData,
      success: function(data) {
        $.getJSON('/tweets', function (tweets) {
          let lastTweet = tweets[tweets.length - 1];
          $('#tweets-container').prepend(createTweetElement(lastTweet));
          $('form').each(function(){
              this.reset();
          });
          let counter = $('.counter')[0];
          counter.innerHTML = 140;
        });
      }
    });


  }

  $('form').submit(function(event) {
    event.preventDefault();
    let $text = ($('textarea').serialize()).replace('text=', '');
    let $removeErrMsg = $('.Tweet-error').remove();
    if ($text === '' || $text === null) {
      $removeErrMsg;
      $(this).append(`<p class="Tweet-error" style="color: red; text-align: center;">Please enter text!</p>`);
    } else if ($text.length > 140 ) {
      $removeErrMsg;
      $(this).append(`<p class="Tweet-error" style="color: red; text-align: center;">Tweet is too long! ..sorry</p>`);
    } else {
      $removeErrMsg;
      postTweets();
    }
  });

  loadTweets();

});