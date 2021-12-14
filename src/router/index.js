import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Index from '@/components/Index'

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index,
        },
    ]
})
