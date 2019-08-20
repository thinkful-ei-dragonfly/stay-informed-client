import config from '../config'

const RepresentativeService = {
  getReps(addressInput) {
    return fetch(`${config.API_ENDPOINT}/representatives`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        address: addressInput
      })
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },

  getNews(senator1, senator2, representative1) {
    return fetch(`${config.API_ENDPOINT}/news`, {
      method: 'POST',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        senator1, 
        senator2, 
        representative1
      })
    })
    .then(res => 
      (!res.ok) 
        ? res.json().then(e=>Promise.reject(e))
        : res.json()
    )
  }
}

export default RepresentativeService

// This could be imported into both the Search.js component, as well as the Dashboard.js component
// For the dashboard, we could run this fetch on componentdidmount() or something
