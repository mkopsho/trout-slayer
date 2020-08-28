class MarkersAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/markers'
  }

  fetchSavedMarkers() {
    console.log('render called!')
    fetch(this.baseUrl)
      .then((response) => {
        return response.json()
      })
      .then((markers) => {
        markers.forEach((marker) => {
          let newMarker = new Marker(marker)
          console.log(marker)
          newMarker.render()
        })
      })
      .catch((error) => {
        console.log(error)
        errorHandler(error)
      })
  }

  saveMarker(latLng, saveArgs, session) {
    let configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        title: saveArgs.newMarkerTitle,
        description: saveArgs.newMarkerDesc,
        fish_type: saveArgs.newMarkerFish,
        lure_and_bait: saveArgs.newMarkerLure,
        weather_conditions: saveArgs.newMarkerWeather,
        user_id: session.id,
        lat: latLng.lat(),
        long: latLng.lng(),
      }),
    }
    fetch(this.baseUrl, configObj)
      .then((response) => {
        return response.json()
      })
      .then((marker) => {
        console.log('Success:', marker)
        new Marker(marker)
      })
      .catch((error) => {
        console.log(error)
        errorHandler(error)
      })
  }

  deleteMarker(marker) {
    if (session.id === parseInt(marker.label)) {
      console.log('can be deleted by user')
      let markerObj = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ id: marker.id }),
      }
      fetch(`${this.baseUrl}/${marker.id}`, markerObj)
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
          console.log('Success:', data)
        })
        .catch(function (error) {
          console.log(error)
          errorHandler(error)
        })
    } else {
      errorHandler('You do not have the correct permissions to do that.')
    }
  }
}
