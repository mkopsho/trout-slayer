# Clean the slate
User.delete_all
Marker.delete_all

michael = User.create(username: 'mkopsho', email: 'michael.kopsho@gmail.com', password: 'blah')
marker1 = Marker.create(title: "Lebanon, Kansas", description: "Where dreams are made", fish_type: "Rainbow Trout", weather_conditions: "Overcast", lure_and_bait: "Wooly Bugger", lat: 39.809, long: -98.555, user_id: michael.id)
marker2 = Marker.create(title: "Las Vegas, Nevada", description: "Where money is paid", fish_type: "Cutthroat Trout", weather_conditions: "Cloudy", lure_and_bait: "Elk Hair Caddis",lat: 36.114, long: -115.172, user_id: michael.id)
marker3 = Marker.create(title: "Joshua Tree, California", description: "Where sanity is frayed", fish_type: "Brown Trout", weather_conditions: "Rainy", lure_and_bait: "Griffith's Gnat", lat: 33.881, long: -115.900, user_id: michael.id)
