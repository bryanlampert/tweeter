// Wait until the document is loaded before executing the code
$(document).ready(function() {

  // Compose New Tweet button funtionality in the Nav bar
  // Whel clicked the compose new tweet form slides to show or hide.
  // After it is opened again the cursor starts in the text box
  $('.composeButton').click(function(){
    $('.new-tweet').slideToggle("slow", function() {
      $('textarea').select();
      $('[name="blank-text"]').remove();
    });
  });

  // Function to render all of the tweets on the page
  function renderTweets(tweets) {
    tweets.forEach(function(tweet) {
      $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    });
  }

  // Function that creates a new tweet post at the top of the list of tweets
  function createTweetElement(tweet) {

    //Checks to make sure the inputted tweet is safe
    function escape(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

    //Calculates the date timestamp in the individual tweet footer
    function timeSince(date) {
      let seconds = Math.floor((new Date() - date) / 1000);
      let interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
        return interval + " years";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        return interval + " months";
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
        return interval + " days";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        return interval + " hours";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        return interval + " minutes";
      }
      return Math.floor(seconds) + " seconds";
    }

    // Function returns a new tweet in the following html format
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
            <span>${timeSince(new Date(tweet.created_at))} ago</span>
            <img class="footer-images" src="/images/heart.png">
            <img class="footer-images" src="/images/retweeter.png">
            <img class="footer-images" src="/images/flag.png">
          </footer>
      </article>`
    );
  }

  // Function for loading the tweets from the database
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

  // Functino for posting new tweets to the database.
  // Serializes the data and on a successfull call posts the tweet to the top
  //    of the tweet list page
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
          $('main').select();
          let counter = $('.counter')[0];
          counter.innerHTML = 140;
        });
      }
    });


  }

  // When the submit button is clicked in the compose tweet form
  // Has two checks for errors in inputs. --> For trying to submit a blank field and
  //    if the post has more than 140 characters.
  // If neither of the above conditions are true, then it calls the postTweets function
  $('form').submit(function(event) {
    event.preventDefault();
    const text = ($('textarea').serialize()).replace('text=', '');
    const $removeErrMsg = $('.Tweet-error').remove();
    const textLength = $('textarea').val();
    if (text === '' || text === null) {
      $removeErrMsg;
      $(this).append(`<p class="Tweet-error" name="blank-text" style="color: red; text-align: center;">You forgot to tweet something!</p>`);
    } else if (textLength.length > 140 ) {
      $removeErrMsg;
      $(this).append(`<p class="Tweet-error" name="text-too-long" style="color: red; text-align: center;">Tweet is too long! ..sorry</p>`);
    } else {
      $removeErrMsg;
      postTweets();
    }
  });

  // Calls the loadTweets function
  loadTweets();

});