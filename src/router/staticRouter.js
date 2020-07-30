/* 静态路由页面 */
const staticRouter = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/login',
    name: '登录',
    component: () => import('@/views/login/AppLogin'),
  },
  {
    path: '/register',
    name: '注册',
    component: () => import('@/views/login/AppRegister'),
  },
  {
    path: '/error/403',
    name: '错误403',
    component: () => import('@/views/error/AppError403'),
  },
  {
    path: '/error/404',
    name: '错误404',
    component: () => import('@/views/error/AppError404'),
  },
  {
    path: '/error/500',
    name: '错误500',
    component: () => import('@/views/error/AppError500'),
  },
  {
    path: '/',
    menu: true,
    name: 'layout',
    component: () => import('@/views/layout/TheLayout'),
    children: [
      { path: '/index', name: 'index', title: '首页', icon: 'el-icon-s-home', component: () => import('@/views/pages/PageHome') },
      {
        path: '/level1',
        name: 'level1',
        title: '一级目录',
        icon: 'el-icon-s-operation',
        component: () => import('@/views/layout/TheLayoutEmpty'),
        children: [
          {
            path: '/level1/level2',
            name: 'level2',
            title: '二级目录',
            component: () => import('@/views/layout/TheLayoutEmpty'),
            children: [
              {
                path: '/level1/level2/level3',
                name: 'level3',
                title: '三级目录',
                component: () => import('@/views/layout/TheLayoutEmpty'),
                children: [
                  { path: '/level1/level2/level3/level4', name: 'level4', title: '四级目录', component: () => import('@/views/pages/PageLevel4') },
                  {
                    path: '/level1/level2/level3/level4/:id',
                    name: 'level4Detail',
                    title: '四级目录详情',
                    component: () => import('@/views/pages/PageLevel4Detail'),
                    noMenu: true,
                    meta: {
                      menuPath: '/level1/level2/level3/level4',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]

export default staticRouter
