var geocoder;
$(document).ready(function() {
  $('#sign_up_button').click(function(e) {
    e.preventDefault();
    $(this).closest('form').submit();
  });

  $('#done_button').click(function(e) {
    e.preventDefault();
    var form = $(this).closest('form');
    geocoder.geocode( { 'address': $('#zip').val() }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        $('#lat').val(results[0].geometry.location.lat());
        $('#lng').val(results[0].geometry.location.lng());
      } else {
        console.log("Geocode was not successful for the following reason: " + status);
      }
      form.submit();
    });
  });

  $('.select').customSelect();
});

$(window).load(function() {
  if($('#map_canvas').length > 0)
    findMyLocation();
  geocoder = new google.maps.Geocoder();
});
