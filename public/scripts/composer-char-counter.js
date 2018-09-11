console.log('char counter loaded')

$(document).ready(function() {
  console.log('document is ready')
  $("textarea").keypress(function() {
    alert($(this).val());
  })







});
