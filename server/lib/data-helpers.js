"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to the database
    saveTweet: function(newTweet, callback) {

      db.collection("tweets").insertOne(newTweet);
      callback(null, true);

    },

    // Gets all the tweets in the database and sorts based on the newest tweets first
    getTweets: function(callback) {

        const sortNewestFirst = (a, b) => a.created_at - b.created_at;

        db.collection("tweets").find().toArray((err, tweets) => {
          callback(null, tweets.sort(sortNewestFirst));
        });

    }
  };
};
