var firebase = new Firebase("https://deliverease-f9eec.firebaseio.com/");
firebase.initializeApp(config);

/**
 * Data object to be written to Firebase.
 */
var data = {timestamp: null, lat: null, lng: null};

function initMap() {
  var ourHouse = {lat: 39.7559788, lng: -122.4140809};
  var map = new google.maps.Map(document.getElementById('map'), {
    center: ourHouse,
    zoom: 13,
    styles: [{
      featureType: 'poi',
      stylers: [{ visibility: 'off' }]  // Turn off points of interest.
    }, {
      featureType: 'transit.station',
      stylers: [{ visibility: 'off' }]  // Turn off bus stations, train stations, etc.
    }],
  });

  var marker = new google.maps.Marker({position: ourHouse, map: map});

  var infoWindow = new google.maps.InfoWindow;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
    });
  }

  data.lat = pos.lat;
  data.lng = pos.lng;
  addToFirebase(data);
}

function addToFirebase(data) {
  getTimestamp(function(timestamp) {
    // Add the new timestamp to the record data.
    data.timestamp = timestamp;
    var ref = firebase.database().ref('volunteers').push(data, function(err) {
      if (err) {  // Data was not written to firebase.
        console.warn(err);
      }
    });
  });
}