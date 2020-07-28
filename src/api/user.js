/*
* 用户登录接口
*/
import { request } from '../utils/request'

/**
 * 登录接口
 * @param {*} params 传入参数
 */
export const requestLogin = (params) => {
  return request('/api/user/login', params)
}

/**
 * 注册接口
 * @param {*} params 传入参数
 */
export const requestRegister = (params) => {
  return request('/api/user/register', params)
}
