import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import './plugins/element.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/css/common.scss'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false
// console.log(process.env);
// 根据环境变量来决定是否引入 mock (测试数据)
// if (process.env.NODE_ENV !== 'production' && !process.env.VUE_APP_BACK_END_URL) {
//   const Mock = require('./mock/index').default
//   Mock.mockData()
// }

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
