import { api } from "../config"

const urlConfig = (secure = false, host = 'localhost') => {
  const proto = secure ? 'https://' : 'http://'
  let url = `${proto}${host}`
  url += '/'
  return url
}

const useUrlBuilder = (resource = null) => {
  // Get configuration
  const secure = api.secure
  const host = api.host
  const port = api.port
  const path = api.path
  const apiKey = api.apiKey

  let url = urlConfig(secure, host, port, path)

  if (resource) url += `${resource}/?apiKey=${apiKey}`

  return `${url}?apiKey=${apiKey}`
}

export default useUrlBuilder