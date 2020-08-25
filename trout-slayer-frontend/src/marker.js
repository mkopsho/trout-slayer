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
}

Marker.all = []
