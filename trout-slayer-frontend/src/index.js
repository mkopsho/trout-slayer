const BASE_URL = 'http://localhost:3000'
const MARKERS_URL = `${BASE_URL}/markers`
const USERS_URL = `${BASE_URL}/users`

// Map and markers
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
    const markerContent = `
      <h1>${marker.title}</h1>
      <strong>Description:</strong> <p>${marker.description}</p>
      <strong>Fish:</strong> <p>${marker.fish_type}</p>
      <strong>Lure:</strong> <p>${marker.lure_and_bait}</p>
      <strong>Weather:</strong> <p>${marker.weather_conditions}</p>
    `
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
  })
  const markerForm = `
  <form id="marker-form">
    <label for="title">Title:</label><br>
    <input type="text" id="new-marker-title" name="title">
    <label for="Description">Description:</label><br>
    <input type="text" id="new-marker-description" name="description">
    <label for="Fish">Fish Type:</label><br>
    <input type="text" id="new-marker-fish-type" name="fish-type">
    <label for="Fish">Lure and/or bait:</label><br>
    <input type="text" id="new-marker-lure-bait" name="lure-bait">
    <label for="Fish">Weather conditions:</label><br>
    <input type="text" id="new-marker-weather-conditions" name="weather-conditions">
    <input type="submit" value="Submit catch">
  </form>`
  const infoWindow = new google.maps.InfoWindow({
    content: markerForm,
    maxWidth: 200,
  })
  placeMarker(marker, latLng, map, infoWindow)
}

function placeMarker(marker, latLng, map, infoWindow) {
  map.panTo(latLng)
  marker.setMap(map)
  infoWindow.open(map, marker)
  marker.addListener('click', function () {
    infoWindow.open(map, marker)
  })
  formListenerAndValueGatherer(latLng, infoWindow)
}

function formListenerAndValueGatherer(latLng, infoWindow) {
  infoWindow.addListener('domready', function () {
    document.querySelector('form').addEventListener('submit', function (e) {
      const newMarkerTitle = document.getElementById('new-marker-title').value
      const newMarkerDesc = document.getElementById('new-marker-description').value
      const newMarkerFish = document.getElementById('new-marker-fish-type').value
      const newMarkerLure = document.getElementById('new-marker-lure-bait').value
      const newMarkerWeather = document.getElementById('new-marker-weather-conditions').value
      const newMarkerContent = `
        <h1>${newMarkerTitle}</h1>
        <strong>Description:</strong> <p>${newMarkerDesc}</p>
        <strong>Fish:</strong> <p>${newMarkerFish}</p>
        <strong>Lure:</strong> <p>${newMarkerLure}</p>
        <strong>Weather:</strong> <p>${newMarkerWeather}</p>
      `
      infoWindow.setContent(newMarkerContent)
      let saveArgs = {
        newMarkerTitle,
        newMarkerDesc,
        newMarkerFish,
        newMarkerLure,
        newMarkerWeather,
      }
      saveMarker(latLng, saveArgs)
      e.preventDefault()
    })
  })
}

function saveMarker(latLng, saveArgs) {
  debugger
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

// // Signup and login
// function signupAndLoginListeners() {
//   // Listen to the forms to submit associated data
//   const signupForm = document.getElementById('signup-form')
//   const loginForm = document.getElementById('login-form')
//   signupForm.addEventListener('submit', function (e) {
//     let username = document.getElementById('signup-username').value
//     let email = document.getElementById('signup-email').value
//     let password = document.getElementById('signup-password').value
//     saveUser(username, email, password)
//     e.preventDefault()
//   })
//   loginForm.addEventListener('submit', function (e) {
//     console.log('log-in form submitted but should not reload')
//     e.preventDefault()
//   })
//   // Listen to the buttons to show associated forms
//   const signupButton = document.getElementById('signup-button')
//   const loginButton = document.getElementById('login-button')
//   signupButton.addEventListener('click', function () {
//     openSignupForm()
//   })
//   loginButton.addEventListener('click', function () {
//     openLoginForm()
//   })
// }

// // Handle forms (in index.html; hidden by default)
// function openSignupForm() {
//   document.getElementById('signup-form').style.visibility = 'visible'
// }

// function openLoginForm() {
//   document.getElementById('login-form').style.visibility = 'visible'
// }

// function closeForm() {
//   document.querySelector('.form-popup').style.visibility = 'hidden'
// }

// function saveUser(username, email, password) {
//   let configObj = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//     },
//     body: JSON.stringify({
//       username,
//       email,
//       password,
//     }),
//   }
//   fetch(USERS_URL, configObj)
//     .then((response) => {
//       return response.json()
//     })
//     .then((data) => {
//       console.log('Success:', data)
//     })
//     .catch((error) => {
//       console.log(error)
//     })
// }

document.addEventListener('DOMContentLoaded', function () {
  createMap()
  //signupAndLoginListeners()
})
