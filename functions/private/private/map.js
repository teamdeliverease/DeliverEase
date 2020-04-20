var map;

async function initMap() {
  var markerLocation = { lat: 39.7559788, lng: -122.4140809 };
  map = new google.maps.Map(document.getElementById('map'), {
    center: markerLocation,
    zoom: 13,
    styles: [
      {
        featureType: 'poi',
        stylers: [{ visibility: 'off' }], // Turn off points of interest.
      },
      {
        featureType: 'transit.station',
        stylers: [{ visibility: 'off' }], // Turn off bus stations, train stations, etc.
      },
    ],
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      map.setCenter(pos);
    });
  }

  placeMarkers('volunteers');
}

async function placeMarkers(ref, icon = null) {
  const res = await fetch(`/${ref}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  Object.values(data).forEach((user) => {
    var marker = new google.maps.Marker({
      position: { lat: user.lat, lng: user.lng },
      map: map,
      icon: icon,
    });
    addInfoWindow(user, marker);
  });
}

function addInfoWindow(userData, marker) {
  var infowindow = new google.maps.InfoWindow({
    content:
      '<p>Name: ' +
      userData.name +
      '<br />Phone: ' +
      userData.phone +
      '<br />Address: ' +
      userData.address,
  });

  marker.addListener('click', () => {
    if (true) {
    }
    infowindow.open(map, marker);
  });
}
