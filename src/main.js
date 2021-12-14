import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import common from '@/commonjs/common'
Vue.use(common)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
