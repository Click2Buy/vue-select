import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSelect from '@/components/VueSelect.vue'

Vue.config.productionTip = false

Vue.component(VueSelect.name, VueSelect)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
