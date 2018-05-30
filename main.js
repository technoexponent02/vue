import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

import VueBlu from 'vue-blu'
import 'vue-blu/dist/css/vue-blu.min.css'

Vue.use(VueBlu)


// import Vuetify from 'vuetify'
// Vue.use(Vuetify)

// external library
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
