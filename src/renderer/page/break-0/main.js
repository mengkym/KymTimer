import Vue from 'vue'
import Index from './Index'
import store from '../../store'

// if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

Vue.prototype.eventBus = new Vue()
Vue.prototype.$toast = function(msg) {
  console.log(msg)
}

/* eslint-disable no-new */
new Vue({
  components: { Index },
  store,
  template: '<Index/>'
}).$mount('#app')
