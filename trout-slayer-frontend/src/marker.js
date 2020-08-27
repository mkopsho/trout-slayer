class Marker {
  constructor({
    title,
    description,
    fish_type,
    weather_conditions,
    lure_and_bait,
    lat,
    long,
    id,
    user_id,
  }) {
    this.title = title
    this.description = description
    this.fish_type = fish_type
    this.weather_conditions = weather_conditions
    this.lure_and_bait = lure_and_bait
    this.lat = lat
    this.long = long
    this.id = id
    this.user_id = user_id
    Marker.all.push(this)
  }

  render() {
    const latLng = { lat: parseFloat(this.lat), lng: parseFloat(this.long) }
    const newMarker = new google.maps.Marker({
      position: latLng,
      label: this.user_id.toString(),
      id: this.id,
      icon: MAP_ICONS + 'fishing.png',
    })
    const markerContent = `
    <div id="infowindow">
      <h2 style="color:black">${this.title}</h2>
      <strong>Description:</strong> <p>${this.description}</p>
      <strong>Fish:</strong> <p>${this.fish_type}</p>
      <strong>Lure:</strong> <p>${this.lure_and_bait}</p>
      <strong>Weather:</strong> <p>${this.weather_conditions}</p>
      <button id="delete-button" type="button">Delete</button>
    </div>
      `
    const infoWindow = new google.maps.InfoWindow({
      content: markerContent,
      maxWidth: 250,
    })
    googleMarkers.push(newMarker)
    newMarker.setMap(map)
    deleteButtonListener(newMarker, infoWindow)
    google.maps.event.addListener(newMarker, 'click', function () {
      infoWindow.open(map, newMarker)
    })
  }

  create() {
    const marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position: e.latLng,
      label: session.id.toString(),
      icon: MAP_ICONS + 'fishing.png',
    })
    googleMarkers.push(marker)
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
    placeMarker(marker, latLng, map, infoWindow)
  }
}

Marker.all = []
