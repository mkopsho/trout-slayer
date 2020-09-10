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
      <div>
        <button id="delete-button" type="button">Delete</button>
        <span class="unliked" id="like-button">| Like ♡</span>
      </div>
    </div>
      `
    const infoWindow = new google.maps.InfoWindow({
      content: markerContent,
      maxWidth: 250,
    })
    googleMarkers.push(newMarker)
    newMarker.setMap(map)
    deleteAndLikeButtonListener(newMarker, infoWindow)
    google.maps.event.addListener(newMarker, 'click', function () {
      infoWindow.open(map, newMarker)
    })
  }
}

Marker.all = []
