const addInfoWindow = (map, maps, userData, marker) => {
  const infoWindow = new maps.InfoWindow({
    content: `<p>Name: ${userData.name}<br />Phone: ${userData.phone}<br />Address: ${userData.address}`,
  });

  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });

  return infoWindow;
};

const createMarker = (map, maps, userData, icon = null) => {
  const marker = new maps.Marker({
    position: { lat: userData.lat, lng: userData.lng },
    map,
    icon,
  });
  const infoWindow = addInfoWindow(map, maps, userData, marker);

  return { marker, infoWindow };
};

export { createMarker };
