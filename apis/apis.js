// 把所有请求都集中在此处，对组件提供接口

import request from './request.js'
let token = wx.getStorageSync('ps_token')

class apis {
  constructor() {
    // this._baseUrl = 'http://localhost:7001/' // 此处后续做环境区分
    this._baseUrl = 'https://molitown.cn:8090/' // 此处后续做环境区分
    
    // this._baseUrl = 'http://192.168.31.215:7001/' // 此处后续做环境区分
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
   * 主页大类
   */
  getList(type = 0, page = 1, size = 10) {
    let data = { type, page, size }
    return this._request.$get(this._baseUrl + 'api/v1/list', data).then(res => res.data)
  }
  // 新增评论
  addComment(data) {
    const {content, parents_id, list_id, imgs, is_editor} = data
    return this._request.$post(this._baseUrl + 'api/v1/comment', data).then(res => res.data)
  }
  // 获取评论
  getComment(page = 1, size = 10, list_id = '') {
    let data = { page, size, list_id }
    return this._request.$get(this._baseUrl + 'api/v1/comment', data).then(res => res.data)
  }
  // 新增提问条目
  addList(data) {
    return this._request.$post(this._baseUrl + 'api/v1/list', data).then(res => res.data)
  }

  /**
   * 个人中心大类
   */
  
  /** 获取我回答的列表 */
  // getMyCreation() {}

  /**
   * 获取qiniu云token
   */
  getQiniuToken() {
    return this._request.$get(this._baseUrl + 'api/v1/qiniu').then(res => res.data)
  }


  /**
   * 获取所有课程
   */

}
export default apis