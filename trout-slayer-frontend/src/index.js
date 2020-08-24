const BASE_URL = 'http://localhost:3000'
const MARKERS_URL = `${BASE_URL}/markers`

function createMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 39.809, lng: -98.555 },
    zoom: 5,
  })
  map.addListener('click', function (e) {
    createAndPlaceMarker(e.latLng, map)
    console.log(e)
  })
  fetchSavedMarkers(map)
}

function fetchSavedMarkers(map) {
  fetch(MARKERS_URL)
    .then((response) => {
      return response.json()
    })
    .then((markers) => {
      renderSavedMarkers(markers, map)
    })
    .catch((error) => {
      console.log(error)
    })
}

function renderSavedMarkers(markers, map) {
  console.log('Rendering saved markers')
  markers.forEach((marker) => {
    const latLng = { lat: parseFloat(marker.lat), lng: parseFloat(marker.long) }
    const newMarker = new google.maps.Marker({
      position: latLng,
    })
    const markerContent = `<h1>${marker.title}<h1>` + `<p>${marker.description}</p>`
    const infowindow = new google.maps.InfoWindow({
      content: markerContent,
      maxWidth: 200,
    })
    newMarker.setMap(map)
    google.maps.event.addListener(newMarker, 'click', function () {
      infowindow.open(map, newMarker)
    })
  })
}

function createAndPlaceMarker(latLng, map) {
  // console.log('Placing new marker')
  const marker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    draggable: true,
    position: latLng,
    title: 'Marker Title',
  })
  const markerContent = `Marker Content`
  const infowindow = new google.maps.InfoWindow({
    content: markerContent,
    maxWidth: 200,
  })
  map.panTo(latLng)
  marker.setMap(map)
  google.maps.event.addListener(marker, 'click', function () {
    infowindow.open(map, marker)
  })
}

// To do: try geolocation

document.addEventListener('DOMContentLoaded', function () {
  createMap()
  fetchSavedMarkers()
})
