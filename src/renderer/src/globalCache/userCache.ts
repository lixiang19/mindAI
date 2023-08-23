let userInfoChache: UserInfo | null = null
export function getUserInfo() {
  return userInfoChache as UserInfo
}
export function setUserInfo(info) {
  userInfoChache = info
}
export function addUserInfo(data) {
  userInfoChache = Object.assign({}, getUserInfo(), data)
}
