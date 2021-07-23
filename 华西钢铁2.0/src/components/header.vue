<template>
  <header>
    <div class="logo1"></div>
    <router-link to="/"> <div class="logo2"></div></router-link>
    <div class="logo3"></div>
    <div class="head_weather">
      <p :class="'iconfont ' + stateOfWeather"></p>
      <p>{{ weather }}</p>
      <p></p>
      <p>{{ temperature + "℃" }}</p>
    </div>
    <div class="head_time">
      <p>{{ nowTime }}</p>
      <span>{{ nowDate }}</span>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      nowDate: "",
      nowTime: "",
      temperature: 30,
      // 日期
      date: this.rtdate("date"),
      // 时间
      time: this.rtdate("time"),
      // 天气状态
      stateOfWeather: "icon-taiyang1",
      weather: "晴",
    };
  },

  mounted() {
    this.setTime();
    // todo 获取天气
    this.setWeather();
    setInterval(() => {
      this.time = this.rtdate("time");
    }, 60 * 1000);
  },
  methods: {
    async setWeather() {
      var res = await this.$http.get(
        "https://restapi.amap.com/v3/weather/weatherInfo?key=57296cd15cf0e334f513706ad38a4f5f&city=320200"
      );
      this.temperature = res.data.lives[0].temperature;
      var weather = res.data.lives[0];
      this.weather = weather.weather;
      if (weather.weather == "阴") {
        this.stateOfWeather = "icon-yintian";
      } else if (weather.weather == "多云") {
        this.stateOfWeather = "icon-duoyun-copy";
      } else if (weather.weather.indexOf("雨") != -1) {
        this.stateOfWeather = "icon-yu";
      }
      return;
    },
    rtdate(type) {
      var time = new Date();
      var y = time.getFullYear(); //getFullYear方法以四位数字返回年份
      var M = time.getMonth() + 1; // getMonth方法从 Date 对象返回月份 (0 ~ 11)，返回结果需要手动加一
      var d = time.getDate(); // getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)
      var h = time.getHours(); // getHours方法返回 Date 对象的小时 (0 ~ 23)
      var m = time.getMinutes(); // getMinutes方法返回 Date 对象的分钟 (0 ~ 59)
      var s = time.getSeconds(); // getSeconds方法返回 Date 对象的秒数 (0 ~ 59)
      if (type == "date") {
        return y + "-" + M + "-" + d;
      } else {
        return h + ":" + m;
      }
    },
    setTime() {
      setInterval(() => {
        var time = new Date();
        var y = time.getFullYear();
        var M = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var m = time.getMinutes();
        var s = time.getSeconds();
        //console.log(new Date().getTime(), y, M, d, h, m, s);
        this.nowDate = y + "/" + M + "/" + d;
        if (h < 10) h = "0" + h;
        if (m < 10) m = "0" + m;
        if (s < 10) s = "0" + s;
        this.nowTime = h + ":" + m + ":" + s + "";
      }, 1000);
    },
  },
};
</script>
<style lang="less" scoped>
header {
  width: 100%;
  height: 50px;
  top: 5%;
  position: absolute;
  color: white;
  z-index: 100;
  // border: 1px solid pink;
  .logo1 {
    width: 70px;
    height: 44px;
    left: 63px;
    position: absolute;
    line-height: 50%;
    background: url("../assets/images/logo1.png") no-repeat;
    background-size: 100% 100%;
  }
  .logo2 {
    width: 330px;
    height: 100%;
    left: 164px;
    position: absolute;
    background: url("../assets/images/logo2.png") no-repeat;
    background-size: 100% 100%;
  }
  .logo3 {
    top: 4px;
    width: 173px;
    height: 32px;
    left: 526px;
    position: absolute;
    background: url("../assets/images/logo3.png") no-repeat;
    background-size: 100% 100%;
  }
  .head_weather {
    width: 60px;
    height: 80%;
    float: right;
    margin-right: 250px;
    p:nth-child(1) {
      margin-top: 15px;
      width: 20px;
      height: 20px;
      float: left;
      font-size: 18px;
      color: rgb(249, 198, 38);
    }
    p:nth-child(2) {
      margin-top: 7px;
      margin-left: 10px;
      font-size: 10px;
      float: left;
      color: white;
    }
    p:nth-child(3) {
      top: 30px;
      left: 60px;
      float: left;
      color: white;
    }
    p:nth-child(4) {
      margin-top: -5px;
      top: 30px;
      // left: 70px;
      float: left;
      margin-left: 27px;
      color: white;
    }
  }
  .head_time {
    float: right;
    height: 100%;
    width: 110px;
    margin-right: -230px;
    // border: 1px solid red;
    p {
      font-family: STXihei;
      font-weight: 400;
      color: #ffffff;
      font-size: 25px;
      margin-bottom: 5px;
    }
    span {
      margin-left: 10px;
      width: 1px;
      height: 30px;
      position: absolute;
    }
  }
}
</style>
