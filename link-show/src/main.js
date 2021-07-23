import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "reset-css";
import VideoPlayer from "vue-video-player";
import "vue-video-player/src/custom-theme.css";
import "video.js/dist/video-js.css";
Vue.use(VideoPlayer);
const net =
  "https://test-1303915342.cos.ap-nanjing.myqcloud.com/link-show/boom.json";
// const local = "http://192.168.1.100:3004/linkShow/boom1.json";
const local = "http://192.168.5.99:3004/boom/boom1.json";

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$modelUrl = local;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
