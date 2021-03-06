import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Bus from './utils/Bus'
import "./assets/css/reset.css";
var echarts = require("echarts");


const app = createApp(App)
const local = "http://192.168.1.100:3004/huaxigangtie/huaxigangtietest.json";
const net = "https://test2-1303915342.cos.ap-shanghai.myqcloud.com/huaxigangtie/huaxigangtie.json";
app.config.globalProperties.$model = local;
app.config.globalProperties.$net = net;


app.config.globalProperties.$echarts = echarts
app.config.globalProperties.$http = axios
app.config.globalProperties.$Bus = new Bus()
app.use(store).use(router).mount('#app')
















