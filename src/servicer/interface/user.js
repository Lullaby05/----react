import ajax from '../http'

// 用户登录接口
export const userLogin = params => ajax.post('/login', params)