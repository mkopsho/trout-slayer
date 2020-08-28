const markersAdapter = new MarkersAdapter()
const usersAdapter = new UsersAdapter()

const MAP_ICONS = 'http://maps.google.com/mapfiles/ms/icons/'

let session = {}
let googleMarkers = []
let map

function createMap() {
  // To do: try geolocation, marker heatmaps/clustering
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 39.809, lng: -98.555 },
    zoom: 5,
  })
  map.addListener('click', function (e) {
    if (session.id) {
      createNewMarker(e.latLng, map)
    } else {
      errorHandler('Create a user or log in first!')
    }
  })
}

function createNewMarker(latLng, map) {
  const marker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    position: latLng,
    label: session.id.toString(),
    icon: MAP_ICONS + 'fishing.png',
  })
  const markerForm = `
  <form id="infowindow">
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
  googleMarkers.push(marker)
  placeMarker(marker, latLng, map, infoWindow)
}

function placeMarker(marker, latLng, map, infoWindow) {
  map.panTo(latLng)
  marker.setMap(map)
  infoWindow.open(map, marker)
  marker.addListener('click', function () {
    infoWindow.open(map, marker)
  })
  formListenerAndContentGatherer(marker, latLng, infoWindow)
}

function formListenerAndContentGatherer(marker, latLng, infoWindow) {
  infoWindow.addListener('domready', function () {
    document.querySelector('form').addEventListener('submit', function (e) {
      const newMarkerTitle = document.getElementById('new-marker-title').value
      const newMarkerDesc = document.getElementById('new-marker-description').value
      const newMarkerFish = document.getElementById('new-marker-fish-type').value
      const newMarkerLure = document.getElementById('new-marker-lure-bait').value
      const newMarkerWeather = document.getElementById('new-marker-weather-conditions').value
      const formContent = `
      <div id="infowindow">
        <h2 style="color:black">${newMarkerTitle}</h2>
        <strong>Description:</strong> <p>${newMarkerDesc}</p>
        <strong>Fish:</strong> <p>${newMarkerFish}</p>
        <strong>Lure:</strong> <p>${newMarkerLure}</p>
        <strong>Weather:</strong> <p>${newMarkerWeather}</p>
        <button id="delete-button" type="button">Delete</button>
      </div>
      `
      infoWindow.setContent(formContent)
      let saveArgs = {
        newMarkerTitle,
        newMarkerDesc,
        newMarkerFish,
        newMarkerLure,
        newMarkerWeather,
      }
      markersAdapter.saveMarker(latLng, saveArgs, session)
      deleteButtonListener(marker, infoWindow)
      e.preventDefault()
    })
  })
}

function deleteButtonListener(marker, infoWindow) {
  infoWindow.addListener('domready', function () {
    const deleteButton = document.querySelector('#delete-button')
    deleteButton.addEventListener('click', function (e) {
      markersAdapter.deleteMarker(marker)
      marker.setMap(null)
      e.preventDefault()
    })
  })
}

function signupAndLoginButtonListeners() {
  const signupForm = document.getElementById('signup-form')
  const loginForm = document.getElementById('login-form')
  signupForm.addEventListener('submit', function (e) {
    let username = document.getElementById('signup-username').value
    let email = document.getElementById('signup-email').value
    let password = document.getElementById('signup-password').value
    usersAdapter.saveUser(username, email, password)
    closeForm()
    e.preventDefault()
  })
  loginForm.addEventListener('submit', function (e) {
    let username = document.getElementById('login-username').value
    let password = document.getElementById('login-password').value
    usersAdapter.logInUser(username, password)
    closeForm()
    e.preventDefault()
  })
  const signupButton = document.getElementById('signup-button')
  const loginButton = document.getElementById('login-button')
  const logoutButton = document.getElementById('logout-button')
  signupButton.addEventListener('click', function () {
    openSignupForm()
  })
  loginButton.addEventListener('click', function () {
    openLoginForm()
  })
  logoutButton.addEventListener('click', function () {
    let user = User.all.find((user) => user.id === session.id)
    user.logout()
  })
}

function openSignupForm() {
  document.getElementById('signup-form').style.visibility = 'visible'
}

function openLoginForm() {
  document.getElementById('login-form').style.visibility = 'visible'
}

function closeForm() {
  document.querySelectorAll('.form-popup').forEach((form) => {
    form.style.visibility = 'hidden'
  })
}

function toggleButtonListener() {
  const toggleButton = document.querySelector('#user-markers')
  toggleButton.addEventListener('change', function () {
    if (this.checked) {
      googleMarkers.forEach((marker) => {
        if (marker.label == session.id) {
          marker.setIcon(MAP_ICONS + 'red-dot.png')
        }
      })
    } else {
      googleMarkers.forEach((marker) => {
        marker.setIcon(MAP_ICONS + 'fishing.png')
      })
    }
  })
}

function errorHandler(error) {
  errorModal = document.getElementById('error-modal')
  errorModal.innerHTML = `<h2>Error!</h2><p id="error-modal-message">${error}</p>`
  errorModal.style.visibility = 'visible'
  setTimeout(function () {
    errorModal.style.visibility = 'hidden'
  }, 4000)
}

document.addEventListener('DOMContentLoaded', function (e) {
  createMap()
  markersAdapter.fetchSavedMarkers(map)
  signupAndLoginButtonListeners()
})
