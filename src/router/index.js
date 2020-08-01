import Vue from 'vue'
import axios from 'axios'
import Router from 'vue-router'
// import Home from '../views/Home.vue'
import staticRouter from './staticRouter'
import whiteList from './whiteList'

Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  routes: staticRouter,
})

/* 使用 router.meta 保存数据级权限 */
const routerInit = (permissions) => {
  permissions.forEach((v) => {
    let routeItem = router.match(v.name)
    if (routeItem) {
      routeItem.meta.permission = v.permission ? v.permission : []
    }
  })
}

/* 检测用户是否有权限访问页面 */
const pagePermission = (permissions, to, next) => {
  const allowPage = permissions.some(function(v) {
    console.log(v.name)

    return v.name === to.name
  })

  allowPage ? next() : next({ path: '/error/403' })
}

/* 权限控制 */
router.beforeEach((to, from, next) => {
  /* 取消旧请求 */
  const CancelToken = axios.CancelToken
  router.app.$options.store.state.source.cancel && router.app.$options.store.state.source.cancel()
  router.app.$options.store.commit('updateSource', { source: CancelToken.source() })
  /* 进入登录页面先注销用户的信息 */
  if (to.path === '/login') {
    router.app.$options.store.commit('deleteUser')
    localStorage.removeItem('user-token')
  }
  /* 免登录页面 */
  if (whiteList.indexOf(to.fullPath) >= 0) {
    return next()
  }
  let permissions = router.app.$options.store.state.user.permissions
  /* 上次会话结束,重新获取用户信息 */
  if (!permissions.legth) {
    /* 获取用户信息和权限 */
    router.app.$options.store
      .dispatch('requestUserInfo')
      .then(() => {
        permissions = router.app.$options.store.state.user.permissions || []
        routerInit(permissions)
        pagePermission(permissions, to, next)
      })
      .catch((err) => {
        /* 获取用户信息异常 */
        console.error(err)
        return next({ path: '/error/500' })
      })
  }
})
export default router
// export default new Router({

//   routes: [
//     // {
//     //   path: '/',
//     //   name: 'home',
//     //   component: Home,
//     // },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (about.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       // component: () => import(/* webpackChunkName: "about" */'../views/About.vue')
//     },
//   ],
// })
