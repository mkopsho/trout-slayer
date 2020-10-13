class UsersAdapter {
  constructor() {
    this.baseUrl = 'https://peaceful-tor-06133.herokuapp.com/users'
    this.sessionsUrl = 'https://peaceful-tor-06133.herokuapp.com/sessions'
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
        let newUser = new User(data)
        data.status == 'error' ? errorHandler(data.message) : newUser.set()
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
    fetch(this.sessionsUrl, sessionObj)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        let newUser = new User(data)
        data.status == 'error' ? errorHandler(data.message) : newUser.set()
      })
      .catch((error) => {
        console.log(error)
        errorHandler(error)
      })
  }
}
