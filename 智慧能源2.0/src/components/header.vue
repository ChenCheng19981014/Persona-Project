<template>
  <header>
    <div v-show="this.$route.name !== 'equipment'" class="head_logo">
      <router-link to="/">
        <p><strong></strong></p>
      </router-link>
    </div>
    <div class="head_main">智慧能源平台</div>
    <div class="head_weather">
      <div class="weather_time">
        <span>{{ date }}</span>
        <span>{{ week }}</span>
        <span>{{ time }}</span>
        <span class="iconfont icon-yonghu"></span>
        <p class="img"></p>
        <span class="user">用户名</span>
      </div>
    </div>
  </header>
</template>
<script>
import { log } from "three";
// import { FBXLoader } from "../../../public/threejs/examples/jsm/loaders/FBXLoader.js";

export default {
  data() {
    return {
      date: this.rtdate("date"),
      // 时间
      time: this.rtdate("time"),
      week: this.rtdate("week"),
    };
  },

  mounted() {
    // todo 获取天气
    // this.setWeather();
    console.log(this.$route);
    setInterval(() => {
      this.time = this.rtdate("time");
    }, 1000);
  },
  methods: {
    rtdate(type) {
      var time = new Date();
      var y = time.getFullYear(); //getFullYear方法以四位数字返回年份
      var M = time.getMonth() + 1; // getMonth方法从 Date 对象返回月份 (0 ~ 11)，返回结果需要手动加一
      var d = time.getDate(); // getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)
      var h = time.getHours(); // getHours方法返回 Date 对象的小时 (0 ~ 23)
      var m = time.getMinutes(); // getMinutes方法返回 Date 对象的分钟 (0 ~ 59)
      var s = time.getSeconds(); // getSeconds方法返回 Date 对象的秒数 (0 ~ 59)
      var weekList = ["日", "一", "二", "三", "四", "五", "六"];
      let t = (str) => (str.toString().length == 1 ? (str = "0" + str) : str);
      if (type == "date") {
        return y + "-" + t(M) + "-" + t(d);
      } else if (type == "time") {
        return t(h) + ":" + t(m) + ":" + t(s) + "";
      } else {
        console.log(time.getDay(), "time.getDay()");
        return "星期" + weekList[time.getDay()];
      }
    },
  },
  dispose() {
    console.log("dispose");
    if (this.timer) {
      clearInterval(timer);
    }
  },
};
</script>
<style lang="less" scoped>
.w {
  width: 100%;
}
header {
  .w;
  display: flex;
  z-index: 1000;
  justify-content: space-between;
  min-height: 110px;
  position: absolute;
  // background-color: rgba(0, 0, 0, 0.5);
  .head_logo {
    width: 340px;
    padding: 30px 0 0 83px;
    box-sizing: border-box;
    > div {
      width: 108px;
      height: 49px;
      margin-right: 14px;
      float: left;
      background-size: 100% 100%;
    }
    p {
      margin-top: 11px;
      strong {
        width: 150px;
        height: 40px;
        position: absolute;
        background: url("../assets/img/logo1.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .head_main {
    padding-top: 50px;
    box-sizing: border-box;
    font-size: 35px;
    color: #fff;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
  }
  .head_weather {
    height: 90px;
    padding: 90px 27px 0 0;
    box-sizing: border-box;
    color: #fff;
    position: absolute;
    left: 75%;
    span {
      font-size: 21px;
      margin-left: 20px;
      float: left;
    }
    .weather_time {
      width: 500px;
      height: 30px;
      // border: 1px solid red;
      float: left;
      .img {
        float: left;
        margin-left: 23px;
        width: 25px;
        height: 25px;
        // border: 1px solid blue;
        background: url("../assets/images/user.png") no-repeat;
        background-size: 100% 100%;
      }
      .user {
        margin-left: 8px;
        float: left;
      }
    }
  }
}
</style>
