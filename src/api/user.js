/*
 * 用户登录接口
 */
import { request } from '../utils/request'
import staticRouter from '@/router/staticRouter'

/**
 * 登录接口
 * @param {*} params 传入参数
 */
export const requestLogin = (params) => {
  return request('/api/login', params).then((data) => {
    // console.log(data);
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
  return request('/api/user/info', params).then((res) => {
    // console.log('res:');
    // console.log(res);
    // 过滤菜单
    const filterUserMenu = function(menus, accessMenu) {
      menus.forEach((m) => {
        if (m.noMenu) {
          return
        }
        if (m.children) {
          let subMenu = []
          filterUserMenu(m.children, subMenu)
          if (subMenu.length > 0) {
            let _aMenu = Object.assign({}, m)
            _aMenu.children = subMenu
            accessMenu.push(_aMenu)
          }
        } else {
          res.data.authorities.some((p) =>
            p.authority === m.name
          ) && accessMenu.push(m)
          // res.permissions.some((p) => p.name === m.name) && accessMenu.push(m)
        }
      })
    }

    let accessMenu = []
    let menus = []
    staticRouter.forEach((r) => {
      menus = r.menu ? menus.concat(r.children) : menus
    })
    filterUserMenu(menus, accessMenu)
    res.accessMenu = accessMenu
    // res.permissions = res.data.authorities
    console.log(res);
    return res.data
  })
}
