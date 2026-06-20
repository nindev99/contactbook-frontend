import axios from 'axios'

const commonConfig = axios.create({
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
})

export default (baseURL) => {
  const api = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  })
  return api
}
