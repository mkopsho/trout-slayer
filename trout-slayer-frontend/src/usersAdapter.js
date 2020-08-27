class UsersAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/users'
  }

  saveUser(username, email, password) {
    let userObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    }
    fetch(this.baseUrl, userObj)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        data.status == 'error' ? errorHandler(data.message) : this.setUser(data.id)
      })
      .catch((error) => {
        console.log(error)
        errorHandler(error)
      })
  }

  logInUser(username, password) {
    let sessionObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }
    fetch(SESSIONS_URL, sessionObj)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        data.status == 'error' ? errorHandler(data.message) : this.setUser(data.id)
      })
      .catch((error) => {
        console.log(error)
        errorHandler(error)
      })
  }

  setUser(id) {
    session.id = id
    document.getElementById('signup-button').style.visibility = 'hidden'
    document.getElementById('login-button').style.visibility = 'hidden'
    document.getElementById('logout-button').style.visibility = 'visible'
    document.getElementsByName('user-markers').forEach((el) => {
      el.style.visibility = 'visible'
    })
    toggleButtonListener()
  }
}
