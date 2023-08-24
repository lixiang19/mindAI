let userInfoChache = {}
export function getUserInfo() {
  return userInfoChache as UserInfo
}
export function setUserInfo(data) {
  userInfoChache = Object.assign({}, getUserInfo(), data)
}
