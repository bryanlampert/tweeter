/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  function renderTweets(tweets) {
    tweets.forEach(function(tweet) {
      $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
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

  // Test / driver code (temporary). Eventually will get this from the server.
  var tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  renderTweets(tweetData);
});