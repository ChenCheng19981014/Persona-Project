// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
import { VueAxios } from './utils/request'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig'
import uploader from 'vue-simple-uploader'
import * as filters from './utils/filter' // global filters
import './utils/constants.js'
import { Icon, Collapse } from 'ant-design-vue'
import '@/utils/flexible'

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use' // use lazy load components
// import './permission' // permission control
// import './utils/filter' // global filter
import './global.less' // global style
import 'xe-utils' // 表格
// import VXETable from 'vxe-table'
// import 'vxe-table/lib/style.css'

// 这个iconfont.js就是从iconfont.cn网站上下载后的解压JS文件
import iconFront from './assets/iconfonts/iconfont.js'

//  截图工具
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)
Vue.component(Collapse.name, Collapse)
Vue.component(Collapse.Panel.name, Collapse.Panel)

// Vue.use(VXETable)
Vue.config.productionTip = false
Vue.use(uploader)

// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
// use pro-layout components
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)

window.umi_plugin_ant_themeVar = themePluginConfig.theme

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
const myicon = Icon.createFromIconfontCN({
  scriptUrl: iconFront
})
// 引用
Vue.component('my-icon', myicon)

new Vue({
  router,
  store,
  i18n,
  // init localstorage, vuex
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
