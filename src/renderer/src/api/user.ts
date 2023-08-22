let userInfo: UserInfo | null = null
export function getUserInfo() {
  return userInfo
}
export function setUserInfo(info) {
  userInfo = info
}
export function addUserInfo(data) {
  userInfo = Object.assign({}, getUserInfo(), data)
}
