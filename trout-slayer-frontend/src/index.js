console.log('zug zug')
const BACKEND_URL = 'http://localhost:3000'

fetch(`${BACKEND_URL}/test`)
  .then((response) => response.json())
  .then((parsedResponse) => console.log(parsedResponse))
  .catch((error) => console.log(error))
