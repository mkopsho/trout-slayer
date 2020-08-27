class User {
  constructor({ username, email, id }) {
    this.username = username
    this.email = email
    this.id = id
    User.all.push(this)
  }
}

User.all = []
