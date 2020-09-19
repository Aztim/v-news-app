import Vue from 'vue'
// import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import AOS from 'aos'
import 'aos/dist/aos.css' // You can also use <link> for styles

Vue.config.productionTip = false

new Vue({
  vuetify,
  created () {
    AOS.init({ disable: 'phone' })// add this to initialize AOS
  },
  render: h => h(App)
}).$mount('#app')
