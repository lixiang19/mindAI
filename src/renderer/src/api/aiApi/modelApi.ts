import Api2d from './Api2d'
const timeout = 1000 * 60 // 60 seconds timeout
const key = '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'
const apiBaseUrl = 'https://api.openai-forward.com'
export default new Api2d(key, apiBaseUrl, timeout)
