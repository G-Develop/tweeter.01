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
  loadTweets();
  $(".tweetInput").click(function() {
    $("#error").slideUp();
  });

  $("#theForm").submit(function(event) {
    event.preventDefault();

    if ($(".tweetInput").val().trim() === "") {
      $("#error").text("please put your tweet").slideDown();
    } else if (($(".tweetInput").val().length > 140)) {
      $("#error").text("your tweet is too long").slideDown();
    } else {
      let str = $("form").serialize();
      $("#tweets-container").empty();
      $(".tweetInput").val("");
      $(".counter").text("140");
      $.post("/tweets", str, function () {
        loadTweets();
      });
    }
  });

  $("#composeButton").click(function(event){
    $(".new-tweet").slideToggle();
    $(".tweetInput").focus();
  })

});



function renderTweets(tweets) {
  for (let tweet of tweets) {
    let tweetElement = createTweetElement(tweet);
    $('#tweets-container').append(tweetElement);

  }
}



//part of this function used from https://gist.github.com/flangofas/714f401b63a1c3d84aaa

function timeStamp(miliseconds) {
  let days, total_hours, total_minutes, total_seconds;
  let currentDate = new Date().getTime();
  let timeSince = currentDate - miliseconds;

  total_seconds = parseInt(Math.floor(timeSince / 1000));
  total_minutes = parseInt(Math.floor(total_seconds / 60));
  total_hours = parseInt(Math.floor(total_minutes / 60));
  days = parseInt(Math.floor(total_hours / 24));

  return days < 0 ? 0 : days;
}

function createTweetElement(tweet) {
  let $tweet = $("<article>").addClass("tweet");
  let $header = $("<header>");
  let $img = $("<img>").attr("src", tweet.user.avatars.small);
  let $divAuthor = $("<div>").addClass("author").text(tweet.user.name);
  let $divHandle = $("<div>").addClass("handle").text(tweet.user.handle);
  let $divTweetBody = $("<div>").addClass("tweetBody");
  let $theTweet = $("<p>").text(tweet.content.text);
  let $footer = $("<footer>");
  let $timeStamp = $("<span>").text(timeStamp(tweet.created_at) + " days ago");
  let $icons = $("<div>").addClass("icons");
  let $flag = $("<i>").addClass("fas fa-flag");
  let $retweet = $("<i>").addClass("fas fa-retweet");
  let $heart = $("<i>").addClass("fas fa-heart");

  $tweet.append($header);
  $tweet.append($divTweetBody);
  $tweet.append($footer);
  $header.append($img);
  $header.append($divAuthor);
  $header.append($divHandle);

  $divTweetBody.append($theTweet);

  $footer.append($timeStamp);
	$footer.append($icons);
  $icons.append($flag);
  $icons.append($retweet);
  $icons.append($heart);

  console.log('tweet ==> ', $tweet)
  return $tweet;
}
