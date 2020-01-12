// 把所有请求都集中在此处，对组件提供接口

import request from './request.js'
let token = wx.getStorageSync('ps_token')
console.log('token是', token)

class apis {
  constructor() {
    this._baseUrl = 'http://localhost:7001/' // 此处后续做环境区分
    this._request = new request
    this._request.setErrorHandler(this.errorHander)
    this._request._header = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }

  }

  /**
   * 统一的异常处理方法
   */
  errorHander(res) {
    console.error(res)
  }


  /**
   * 登录
   */
  login(wxcode){
    let data = wxcode
    return this._request.$post(this._baseUrl + 'api/v1/session', data)
  }
  getLoginStatus(uid) {
    let data = uid
    return this._request.$get(this._baseUrl + 'api/v1/session', data)
  }

  /**
   * 推荐列表
   */
  getList(type = 0, page = 1, size = 10) {
    let data = { type: type, page: page, size: size }
    return this._request.$get(this._baseUrl + 'api/v1/list', data).then(res => res.data)
  }

  /**
   * 获取所有课程
   */
  getCourseList(page = 1, size = 10, key = null) {
    let data = key != null ? { page: page, size: size, queryValue: key } : { page: page, size: size }
    return this._request.$get(this._baseUrl + '/course/mobile', data).then(res => res.data)
  }
}
export default apis