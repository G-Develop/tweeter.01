$(document).ready(function() {
  console.log('document is ready')
  $("textarea").keyup(function() {
    let TextareaLength = $(this).val().length;
    let dotCounter = $(this).siblings(".counter");
    let maxChar = 140 - TextareaLength;
    dotCounter.text(maxChar);
    if (maxChar < 0 ) {
      dotCounter.css("color", "red");
    } else {
      dotCounter.css("color", "black");
    }
  })

console.log($(".counter").text())


});
