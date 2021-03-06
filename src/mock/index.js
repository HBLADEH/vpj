/* 虚拟数据 */
import Mock from 'mockjs'

export default {
  mockData() {
    /* 本地根目录 (检测根目录最后面不能有'/') */
    const BASE_PATH = process.env.BASE_URL.endsWith('/') ? process.env.BASE_URL.substr(0, process.env.BASE_URL.length - 1) : process.env.BASE_URL

    Mock.mock(BASE_PATH + '/api/login', {
      code: 1,
      token: 'fdsjfhjkdshfkldsajfjasdfbjsdkfhsdajfj',
      result: {
        id: '100001',
        name: 'blade',
        roles: ['admin'],
      },
    })

    Mock.mock(BASE_PATH + '/api/user/register', {
      code: 1,
    })

    Mock.mock('/api/user/info', {
      code: 1,
      id: '100001',
      name: 'blade',
      roles: ['admin'],
      permissions: [
        {
          // 一个页面权限一个对象，name为静态路由表里面的name
          name: 'index',
        },
        {
          name: 'level4',
        },
        {
          name: 'level4Detail',
          // permission存储数据级权限控制
          permission: ['modify', 'delete'],
        },
      ],
    })
  },
}
