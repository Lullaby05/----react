import { qs } from 'qs'
import { message } from 'antd'
import { history } from 'umi'
const fetch = require('dva').fetch

// 创建响应状态处理函数
const checkStatus = res => {
  // 当请求大于等于200 小于300 成功
  if(res.status >= 200 && res.status < 300) {
    return res
  }

  message.error(`网络请求错误,${res.status}`)
  throw new Error(res.statusText)
}

// 判定本次请求内容是否成功
const judgeOkState = async (res) => {
  const cloneRes = await res.clone().json()
  if(cloneRes.code !== 0) {
    message.error(`${cloneRes.msg}${cloneRes.code}`)
    // 跳转到登录界面
    history.replace('/users/login')
    // 清空token
    sessionStorage.clear()
  }
  return res
}

// 获取错误信息
const handleError = error => {
  if(err instanceof TypeError) {
    message.error(`网络请求失败${error}`)
  }
  return {
    code: -1,
    data: false
  }
}

class Http {
  static async staticFetch(url='', options={}) {
    // 统一处理url
    url = '/api' + url
    const defaultOptions = {
      mode: 'cors', // 以cors进行跨域
      headers: {
        Authorization: sessionStorage.getItem('token') || null
      }
    }
    if(options.method === 'POST' || options.method === 'PUT') {
      defaultOptions.headers['Content-Type'] = 'application/json;charset=utf-8'
    }
    // 合并options
    const newOptions = {
      ...defaultOptions,
      ...options
    }

    return fetch(url, newOptions)
      .then(checkStatus)
      .then(judgeOkState)
      .then(res => {
        // 获取响应头的token
        const token = res.headers.get('Authorization')
        token && sessionStorage.setItem('token', token)
        return res
      })
      .catch(handleError)
  }

  // post请求处理
  post(url, params={}, option={}) {
    const options = Object.assign({method: 'POST'}, option)
    options.body = JSON.stringify(params)
    return Http.staticFetch(url, options)
  }

  // put请求处理
  put(url, params={}, option={}) {
    const options = Object.assign({method: 'PUT'}, option)
    options.body = JSON.stringify(params)
    return Http.staticFetch(url, options)
  }

  // delete请求处理
  delete(url, option={}) {
    const options = Object.assign({method: 'DELETE'}, option)
    Object.keys(options) && (url += '?' + qs.stringify(options))
    return Http.staticFetch(url, options)
  }

  // get请求处理
  get(url, option={}) {
    const options = Object.assign({method: 'GET'}, option)
    Object.keys(options) && (url += '?' + qs.stringify(options))
    return Http.staticFetch(url, options)
  }

}

const resFn = new Http();

export default resFn