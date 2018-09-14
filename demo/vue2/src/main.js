import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
// })

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
}).$mount('#app')
