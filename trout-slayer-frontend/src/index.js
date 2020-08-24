const BASE_URL = 'http://localhost:3000'
const MARKERS_URL = `${BASE_URL}/markers`

function createMap() {
  // To do: try geolocation
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 39.809, lng: -98.555 },
    zoom: 5,
  })
  map.addListener('click', function (e) {
    createNewMarker(e.latLng, map)
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
  markers.forEach((marker) => {
    const latLng = { lat: parseFloat(marker.lat), lng: parseFloat(marker.long) }
    const newMarker = new google.maps.Marker({
      position: latLng,
    })
    const markerContent = `<h1>${marker.title}</h1>` + `<p>${marker.description}</p>`
    const infoWindow = new google.maps.InfoWindow({
      content: markerContent,
      maxWidth: 200,
    })
    newMarker.setMap(map)
    google.maps.event.addListener(newMarker, 'click', function () {
      infoWindow.open(map, newMarker)
    })
  })
}

function createNewMarker(latLng, map) {
  const marker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    draggable: true,
    position: latLng,
    title: 'Marker Title',
  })
  placeMarker(marker, latLng, map)
  saveMarker(marker, latLng)
}

function placeMarker(marker, latLng, map) {
  // To do: change to form
  const markerForm = `
  <form id="marker-form" action="#" method="post">
    <label for="title">Title:</label><br>
    <input type="text" id="new-marker-title" name="title">
    <label for="Description">Description:</label><br>
    <input type="text" id="new-marker-description" name="description">
    <input type="submit" value="Submit catch">
  </form>`
  const infoWindow = new google.maps.InfoWindow({
    content: markerForm,
    maxWidth: 200,
  })
  map.panTo(latLng)
  marker.setMap(map)
  infoWindow.open(map, marker)
  google.maps.event.addListener(marker, 'click', function () {
    infoWindow.open(map, marker)
  })
}

// To do: figure out race condition with this form var:
// var newForm = document.querySelector('form')
//   debugger
//   newForm.addDomListener('submit', function (e) {
//     console.log('form submitted but should not reload')
//     let formInputTitle = document.getElementById('new-marker-title').value
//     let formInputDescription = document.getElementById('new-marker-description').value
//     let newMarker = '<li>' + formInputDescription + '</li>'
//     infoWindow.content += newMarker
//     e.preventDefault()
//   })

function saveMarker(marker, latLng) {
  let configObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    // To do: add correct attrs (description, *actual* user_id (once signup is built), etc.)
    body: JSON.stringify({
      title: marker.title,
      // description: xxx,
      user_id: 1,
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

document.addEventListener('DOMContentLoaded', function () {
  createMap()
})
