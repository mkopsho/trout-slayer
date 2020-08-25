class MarkersAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/markers'
  }

  fetchSavedMarkers(map) {
    fetch(this.baseUrl)
      .then((response) => {
        return response.json()
      })
      .then((markers) => {
        markers.forEach((marker) => {
          new Marker(marker)
        })
        renderSavedMarkers(markers, map)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  saveMarker(latLng, saveArgs) {
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
        // test user_id -- update when ready
        user_id: 7,
        lat: latLng.lat(),
        long: latLng.lng(),
      }),
    }
    fetch(MARKERS_URL, configObj)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log('Success:', data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
