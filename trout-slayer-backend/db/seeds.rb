# Clean slate
User.delete_all
Marker.delete_all

michael = User.create(username: 'mkopsho', email: 'michael.kopsho@gmail.com', password: 'blah')
marker1 = Marker.create(title: "Lebanon, Kansas", description: "Where dreams are made", lat: 39.809, long: -98.555, user_id: michael.id)
marker2 = Marker.create(title: "Las Vegas, Nevada", description: "Where money is paid", lat: 36.114, long: -115.172, user_id: michael.id)
marker3 = Marker.create(title: "Joshua Tree, California", description: "Where sanity is frayed", lat: 33.881, long: -115.900, user_id: michael.id)
