// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import wysiwyg from 'vue-wysiwyg'
import VeeValidate from 'vee-validate'
import App from './App'
import store from './store'
import Axios from 'axios'
import Moment from 'moment'
import swal from 'sweetalert'
import router from './router'
import {sync} from 'vuex-router-sync'
import VuesticPlugin from 'src/components/vuestic-components/vuestic-components-plugin'
import BootstrapVue from 'bootstrap-vue'
import VuePaginate from 'vue-paginate'
import './i18n'
import User from './model/User'

Vue.use(VuesticPlugin)
Vue.use(BootstrapVue)
Vue.use(VuePaginate)

// NOTE: workaround for VeeValidate + vuetable-2
Vue.use(VeeValidate, {fieldsBagName: 'formFields'})
Vue.use(wysiwyg, {})

sync(store, router)

let mediaHandler = () => {
  if (window.matchMedia(store.getters.config.windowMatchSizeLg).matches) {
    store.dispatch('toggleSidebar', true)
  } else {
    store.dispatch('toggleSidebar', false)
  }
}

router.beforeEach((to, from, next) => {
  store.commit('setLoading', true)
  next()
})

router.afterEach((to, from) => {
  mediaHandler()
  store.commit('setLoading', false)
})

/* import moment js */
window.moment = Moment

/* import axios for request */
window.axios = Axios

const token = sessionStorage.getItem('token')
if (token) {
  const payload = User.LOGIN(JSON.parse(sessionStorage.getItem('user')))
  store.commit('USER_LOGADO', payload)
  store.commit('USER_LOGIN')
  console.log('tem token')
  window.axios.defaults.headers.common = {
    'Authorization': 'Bearer ' + token
  }
} else {
  console.log('não tem token')
}

/* import sweetalert for request */
window.swal = swal

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
