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
  // console.log(permissions)
  permissions.forEach((v) => {
    let routeItem = router.match(v.authority)
    // console.log(routeItem)

    // if (routeItem) {
    //   routeItem.meta.authority = v.authority ? v.authority : []
    // }
  })
}

/* 检测用户是否有权限访问页面 */
const pagePermission = (permissions, to, next) => {
  const allowPage = permissions.some(function(v) {
    return v.authority === to.name
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
  let authorities = router.app.$options.store.state.user.authorities
  // console.log(router.app.$options.store);
  /* 上次会话结束,重新获取用户信息 */
  if (!authorities.length) {
    /* 获取用户信息和权限 */
    router.app.$options.store
      .dispatch('requestUserInfo')
      .then(() => {
        authorities = router.app.$options.store.state.user.authorities || []
        routerInit(authorities)
        // console.log(authorities)

        pagePermission(authorities, to, next)
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
