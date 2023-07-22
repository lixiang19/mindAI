import Api2d from './Api2d'

const timeout = 1000 * 60 // 60 seconds timeout
const key = 'fk205491-0Y3cmoNsKfXvlXiIiUak0wnkRiZWR90a'
const apiBaseUrl = 'https://openai.api2d.net'
export default new Api2d(key, apiBaseUrl, timeout)
