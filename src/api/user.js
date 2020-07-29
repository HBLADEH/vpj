/*
 * 用户登录接口
 */
import { request } from '../utils/request'

/**
 * 登录接口
 * @param {*} params 传入参数
 */
export const requestLogin = (params) => {
  return request('/api/user/login', params).then((data) => {
    localStorage.setItem('user-token', JSON.stringify(data.token))
    return data
  })
}

/**
 * 注册接口
 * @param {*} params 传入参数
 */
export const requestRegister = (params) => {
  return request('/api/user/register', params)
}


/**
 * 获取用户信息接口
 * @param {*} params 
 */
export const requestUserInfo = (params) => {
  return request('/api/user/info', params)
}
