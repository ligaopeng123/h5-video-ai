import Vue from 'vue'
import App from './App'
import store from './store'
import tags from '@/pages/component/tags/tags.vue'
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.component('app-tags', tags)
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()



