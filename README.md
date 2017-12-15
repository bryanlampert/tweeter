# Tweeter

##### LHL Twitter Clone Project

Tweeter is a single-page Twitter clone.

You are able to post new tweets using the compose tweets form ..but be careful! If you don't enter anything or if you go above the 140 character limit, you won't be able to post!

When you successfully create you tweet it will post it to the top of the tweet list along with a randomly generated name, handle and avatar.

You are also able to hide and show the compose tweet form using the compose new tweet button in the navigation bar. The button changes look when hovering with the mouse.

Finally you are able to highlight a tweet by hovering over with your mouse.

Enjoy!

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Start the sass compiler using the `npm run compile-sass` command.
4. Go to <http://localhost:8080/> in your browser to start tweeting!

## Dependencies

- Express
- Node 5.10.x or above
- Body Parser
- Chance
- MD5
- MongoDB
- node-sass
- nodemon (dev dependency)

## Final Product Screenshots
Initial Home Page:
!["Screenshot of Main Page"](https://github.com/bryanlampert/tweeter/blob/master/docs/main-page.png)

Compose New Tweet Button Clicked (hide the compose new tweet form):
!["Screenshot of Compose Clicked"](https://github.com/bryanlampert/tweeter/blob/master/docs/compose-button-clicked-and-highlighted.png)

Highlighting a Tweet (first tweet in the screenshot):
!["Screenshot of Tweet Highlight"](https://github.com/bryanlampert/tweeter/blob/master/docs/Tweet-highlighted.png)

Trying to Tweet an empty Tweet:
!["Screenshot of Trying to Tweet Empty Tweet"](https://github.com/bryanlampert/tweeter/blob/master/docs/empty-tweet.png)

Trying to Tweet more than 140 Characters:
!["Screenshot of Tweet too long"](https://github.com/bryanlampert/tweeter/blob/master/docs/tweet-too-long.png)

## Latest Updates
- CSS updated to using Sass SCSS
- Added responsive design for smaller screen viewing

