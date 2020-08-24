console.log('zug zug')
const BACKEND_URL = 'http://localhost:3000'

fetch(`${BACKEND_URL}/test`)
  .then((response) => response.json())
  .then((parsedResponse) => console.log(parsedResponse))
  .catch((error) => console.log(error))

// Testing maps
let map

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  })
}
