import Api2d from './Api2d'

const timeout = 1000 * 60 // 60 seconds timeout
const key = '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'
const apiBaseUrl = 'https://api.openai-forward.com'
export default new Api2d(key, apiBaseUrl, timeout)
