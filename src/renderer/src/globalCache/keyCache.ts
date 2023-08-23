const keyConfig = {
  key: '',
  baseUrl: ''
}
export function getKeyConfig() {
  return keyConfig
}
export function setKeyConfig(data) {
  keyConfig.key = data.key
  keyConfig.baseUrl = data.baseUrl
}
