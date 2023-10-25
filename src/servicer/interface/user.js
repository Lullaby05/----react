import ajax from '../http'

// 用户登录接口
export const userLogin = params => ajax.post('/login', params)

// 获取手机验证码
export const getSmCode = params => ajax.get('/getCode', params)

// 检查验证码是否正确，重置密码时使用
export const checkedCode = params => ajax.get('/checkSmCode', params)

// 修改密码
export const resetPassword = params => ajax.post('/resetPassword', params)
