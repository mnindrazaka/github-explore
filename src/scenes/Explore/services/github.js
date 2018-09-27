import axios from 'axios'

function getData(key, query) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.github.com/search/${key}?q=${query}`)
      .then(response => {
        resolve(response.data.items)
      })
  })
}

export { getData }
