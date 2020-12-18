import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import HSUtil from "./utils/HSUtil"

Vue.config.productionTip = false
Vue.use(ElementUI)
HSUtil.initHsUtil();
new Vue({
    render: h => h(App),
}).$mount('#app')
