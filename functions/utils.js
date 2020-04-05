async function submitFormPostRequest(ref, req, res, prepare) {
  const data = req.body;
  try {
    await prepareAndAddToFirebase(ref, data, prepare);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function prepareAndAddToFirebase(ref, data, prepare) {
  try {
    const result = await geocode(data.address);
    const { results, status } = result.data;
    if (status === 'OK') {
      prepare(results[0], data);
      addToFirebase(ref, data);
    } else {
      const mapsError = new Error('Geocode was not successful for the following reason: ' + status);
      console.error(mapsError);
      addToFirebase(ref, data);
    }
  } catch (err) {
    throw new Error(GENERIC_ERROR_MESSAGE);
  }
}

function geocode(address) {
  return mapsClient.geocode({
    params: {
      address: address,
      key: functions.config().apikeys.maps,
    },
  });
}

function addToFirebase(ref, data) {
  try {
    data.timestamp = firebase.database.ServerValue.TIMESTAMP;
    firebase
      .database()
      .ref(ref)
      .push(data, err => {
        if (err) {
          throw new Error('error writing to database');
        }
      });
  } catch (err) {
    console.error(err);
    throw new Error();
  }
}

function addLocationPayload(geocodeResult, data) {
  const location = geocodeResult.geometry.location;
  data.address = geocodeResult.formatted_address;
  data.lat = location.lat;
  data.lng = location.lng;
}

function addFulfillmentStatusPayload(data) {
  data.fulfillment_status = fulfillment_status.NEW;
  data.fulfillment_status_timestamp = firebase.database.ServerValue.TIMESTAMP;
}

function getRequest(ref, req, res) {
  try {
    firebase
      .database()
      .ref(ref)
      .once('value', snapshot => {
        res.status(200).send(snapshot.val());
      });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

module.exports = {
  submitFormPostRequest,
  prepareAndAddToFirebase,
  geocode,
  addToFirebase,
  addLocationPayload,
  addFulfillmentStatusPayload,
  getRequest,
};
