const volunteerMarkerIcon = null;
const requesterMarkerIcon = "/assets/felixMarker.png";

const config = {
  apiKey: "AIzaSyCdINEXNyFJrqzAlIG06Xd5XhT6Q-iZ0-c",
  authDomain: "deliverease-f9eec.firebaseapp.com",
  databaseURL: "https://deliverease-f9eec.firebaseio.com",
  projectId: "deliverease-f9eec",
  storageBucket: "deliverease-f9eec.appspot.com",
  messagingSenderId: "436542528471",
  appId: "1:436542528471:web:90e09ee2379187a34c4992",
  measurementId: "G-KVEMXD2KHE"
};

firebase.initializeApp(config);

var map;

function initMap() {
  var markerLocation = {lat: 39.7559788, lng: -122.4140809};
  map = new google.maps.Map(document.getElementById('map'), {
    center: markerLocation,
    zoom: 13,
    styles: [{
      featureType: 'poi',
      stylers: [{ visibility: 'off' }]  // Turn off points of interest.
    }, {
      featureType: 'transit.station',
      stylers: [{ visibility: 'off' }]  // Turn off bus stations, train stations, etc.
    }],
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
    });
  }

  placeVolunteerMarkers();
}

// function addToFirebase(data) {
//   var ref = firebase.database().ref('volunteers').push(data, function(err) {
//     if (err) {
//       console.warn(err);
//     }
//   });
// }

function placeVolunteerMarkers() {
  var volunteersRef = firebase.database().ref('volunteers');
  placeMarkers(volunteersRef, volunteerMarkerIcon);
  // volunteersRef.on('value', function(snapshot) {
  //   placeMarkers();
  // });
}

function placeRequesterMarkers() {
  var requestersRef = firebase.database().ref('requesters');
  placeMarkers(requestersRef, requesterMarkerIcon);
}

function placeMarkers(ref, icon) {
  ref.once('value', function(snapshot) {
    snapshot.forEach(function(user) {
      var userData = user.val();
      new google.maps.Marker({position: {lat: userData.lat, lng: userData.lng}, map: map, icon: icon});
    });
  });
}