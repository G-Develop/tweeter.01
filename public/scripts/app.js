/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 function loadTweets() {
   $.get("/tweets", function(data) {

     renderTweets(data);
   });
 }

$(document).ready(function() {
  $("#theForm").submit(function(event) {
    event.preventDefault();
    let str = $("form").serialize();
    console.log('str ==> ', str);
    $.post("/tweets", str)



  });

console.log('str ==> ');


  loadTweets();

});



function renderTweets(tweets) {
  for (let tweet of tweets) {
    let tweetElement = createTweetElement(tweet);
    $('#tweets-container').append(tweetElement);

  }
}


function createTweetElement(tweet) {
  let $tweet = $("<article>").addClass("tweet");
  let $header = $("<header>");
  let $img = $("<img>").attr("src", tweet.user.avatars.small);
  let $divAuthor = $("<div>").addClass("author").text(tweet.user.name);
  let $divHandle = $("<div>").addClass("handle").text(tweet.user.handle);
  let $divTweetBody = $("<div>").addClass("tweetBody");
  console.log('$divTweetBody ==> ', $divTweetBody)
  let $theTweet = $("<p>").text(tweet.content.text);
  let $footer = $("<footer>");
  $tweet.append($header);
  $tweet.append($divTweetBody);
  $tweet.append($footer);
  $header.append($img);
  $header.append($divAuthor);
  $header.append($divHandle);
  $divTweetBody.append($theTweet);
  console.log('tweet ==> ', $tweet)
  return $tweet;
}
