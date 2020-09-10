class User {
  constructor({ username, email, id }) {
    this.username = username
    this.email = email
    this.id = id
    User.all.push(this)
  }

  set() {
    session.id = this.id
    let username = this.username
    document.getElementById('signup-button').style.visibility = 'hidden'
    document.getElementById('login-button').style.visibility = 'hidden'
    document.getElementById('logout-button').style.visibility = 'visible'
    document.getElementById('logged-in-as').innerText = `(Logged in as ${username})`
    document.getElementById('logged-in-as').style.visibility = 'visible'
    document.getElementById('toggle-button').style.visibility = 'visible'
    document.getElementById('toggle-text').style.visibility = 'visible'
    toggleButtonListener()
  }

  logout() {
    session = {}
    document.getElementById('signup-button').style.visibility = 'visible'
    document.getElementById('login-button').style.visibility = 'visible'
    document.getElementById('logout-button').style.visibility = 'hidden'
    document.getElementById('logged-in-as').style.visibility = 'hidden'
    document.getElementById('toggle-button').style.visibility = 'hidden'
    document.getElementById('toggle-text').style.visibility = 'hidden'
  }
}

User.all = []
