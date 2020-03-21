var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.752657, lng: -122.441311},
    zoom: 13
  });
}