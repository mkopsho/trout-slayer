class User {
  constructor({ username, email, id }) {
    this.username = username
    this.email = email
    this.id = id
    User.all.push(this)
  }

  set() {
    session.id = this.id
    document.getElementById('signup-button').style.visibility = 'hidden'
    document.getElementById('login-button').style.visibility = 'hidden'
    document.getElementById('logout-button').style.visibility = 'visible'
    document.getElementsByName('user-markers').forEach((el) => {
      el.style.visibility = 'visible'
    })
    toggleButtonListener()
  }

  logout() {
    session = {}
    document.getElementById('signup-button').style.visibility = 'visible'
    document.getElementById('login-button').style.visibility = 'visible'
    document.getElementById('logout-button').style.visibility = 'hidden'
    document.getElementsByName('user-markers').forEach((el) => {
      el.style.visibility = 'hidden'
    })
  }
}

User.all = []
