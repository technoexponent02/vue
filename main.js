import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// import 'vuetify/dist/vuetify.min.css'


Vue.config.productionTip = false

import VueBlu from 'vue-blu'
import 'vue-blu/dist/css/vue-blu.min.css'
import 'vue-croppa/dist/vue-croppa.css'

import VueLazyLoad from 'vue-lazyload'

var SocialSharing = require('vue-social-sharing');

import VueImg from 'v-img';

import Croppa from 'vue-croppa';

Vue.use(Croppa);

Vue.use(VueImg);

Vue.use(SocialSharing);

Vue.use(VueBlu)

Vue.use(require('vue-moment'));

Vue.use(VueLazyLoad)

// import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';


// Vue.use(VuetifyGoogleAutocomplete, {
//   apiKey: 'AIzaSyDsT16Ck7HDs4y1sHFoJZoI8o9yzdb9t4g', // Can also be an object. E.g, for Google Maps Premium API, pass `{ client: <YOUR-CLIENT-ID> }`
// });

// import Vuetify from 'vuetify'
// Vue.use(Vuetify)

// external library
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate)

// after thoushand will be k format
Vue.filter('kFormatter', function (num) {
  return num > 999 ? (num/1000).toFixed(1) + 'k' : num
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


// router.beforeEach((to, from, next) => {
//   app.loading = true
//     // next()
// })

// router.afterEach((to, from, next) => {
//   setTimeout(() => app.loading = false, 1500) // timeout for demo purposes
//     // next()
// })
