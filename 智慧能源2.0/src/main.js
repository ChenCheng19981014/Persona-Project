import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VideoPlayer from "vue-video-player";

import "./assets/css/reset.css";
import "./plugins/element.js";
require("video.js/dist/video-js.css");
require("vue-video-player/src/custom-theme.css");

Vue.use(VideoPlayer);

Vue.config.productionTip = false;

// Vue.directive(id:'upper-word',definition:(el,binding)=>{

// });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
