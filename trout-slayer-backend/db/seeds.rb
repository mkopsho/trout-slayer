# Clean the slate
User.delete_all
Marker.delete_all

alpha = User.create(username: 'alpha', email: 'michael.kopsho@gmail.com', password: 'alpha')
bravo = User.create(username: 'bravo', email: 'michael.kopsho@gmail.com', password: 'bravo')

marker1 = Marker.create(title: "Big Honkin' catfish in Lebanon KS!", description: "Huge catfish caught in the urban pond behind the Taco Bell", fish_type: "Catfish", weather_conditions: "Overcast", lure_and_bait: "Wooly Bugger", lat: 39.809, long: -98.555, user_id: alpha.id)
marker2 = Marker.create(title: "Sandfish in Las Vegas", description: "I lost all my money at the craps so I'm seeking my revenge on the carp", fish_type: "Carp", weather_conditions: "Cloudy", lure_and_bait: "Elk Hair Caddis",lat: 36.114, long: -115.172, user_id: alpha.id)
marker3 = Marker.create(title: "Joshua Tree, California", description: "Amongst the cactii", fish_type: "Sandfish", weather_conditions: "Clear", lure_and_bait: "Griffith's Gnat", lat: 33.881, long: -115.900, user_id: alpha.id)

marker4 = Marker.create(title: "Three Dollar Bridge, MT", description: "Huge honey hole here!", fish_type: "Rainbow Trout", weather_conditions: "Rainy", lure_and_bait: "Red Hopper Caddis", lat: 44.830886, long: -111.514931, user_id: bravo.id)
marker5 = Marker.create(title: "Raynolds Pass", description: "Good fishin', just get there early to avoid crowds", fish_type: "Cutthroat Trout", weather_conditions: "Cloudy", lure_and_bait: "Elk Hair Caddis", lat: 44.901605, long: -111.593086, user_id: bravo.id)
marker6 = Marker.create(title: "Firehole! West Yellowstone!", description: "Huuuuuge!", fish_type: "Brown Trout", weather_conditions: "Overcast", lure_and_bait: "Jelly Worm", lat: 44.632890, long: -110.865478, user_id: bravo.id)
