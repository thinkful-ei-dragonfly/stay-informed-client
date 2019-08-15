import config from '../config'

const RepresentativeService = {
  getReps(address) {
    return fetch(`${config.API_ENDPOINT}/representatives`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(address)
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  }
}

export default RepresentativeService
