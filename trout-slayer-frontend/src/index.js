console.log('zug zug')
const BACKEND_URL = 'http://localhost:3000'

fetch(`${BACKEND_URL}/test`)
  .then((response) => response.json())
  .then((parsedResponse) => console.log(parsedResponse))
  .catch((error) => console.log(error))

function createMap() {
  let map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 39.809, lng: -98.555 },
    zoom: 5,
  })
  map.addListener('click', function (e) {
    createAndPlaceMarker(e.latLng, map)
    console.log(e)
  })
}

function createAndPlaceMarker(latLng, map) {
  console.log('placing marker')
  let marker = new google.maps.Marker({
    position: latLng,
    map: map,
  })
  map.panTo(latLng)
}

// To do: try geolocation

document.addEventListener('DOMContentLoaded', function () {
  createMap()
})
