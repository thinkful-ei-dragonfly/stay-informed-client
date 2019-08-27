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
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ 
        senator1_first: senator1.first_name, 
        senator1_last: senator1.last_name, 
        senator2_first: senator2.first_name, 
        senator2_last: senator2.last_name, 
        representative1_first: representative1.first_name,
        representative1_last: representative1.last_name,
      })
    })
    .then(res => 
      (!res.ok) 
        ? res.json().then(e=>Promise.reject(e))
        : res.json()
    )
  },

  getFinances(cid){
    return fetch(`${config.API_ENDPOINT}/finances`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        cid
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

