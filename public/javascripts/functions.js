$(document).ready(function() {
  $('#sign_up_button, #done_button').click(function(e) {
    e.preventDefault();
    $(this).closest('form').submit();
  })
});
