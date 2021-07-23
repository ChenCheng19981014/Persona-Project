<template>
  <header>
    <div class="head_logo">
      <div></div>
    </div>
    <div class="head_main">
      <ul>
        <li
          @click="$router.push({ name: i.route })"
          :class="headListIndex == index ? 'seleced_color' : ''"
          v-for="(i, index) in headList"
          :key="index"
        >
          <!-- 外层tip大图 -->
          <div
            class="tip_bgc"
            @click="
              headListIndex == index
                ? (headListIndex = -1)
                : (headListIndex = index)
            "
          >
            <img
              v-if="headListIndex != index"
              src="../assets/images/tip.png"
              alt=""
            />
            <img v-else src="../assets/images/seleted_tip.png" alt="" />
          </div>
          <!-- 旋转图片 -->
          <div class="head_rotation_img">
            <img
              v-if="headListIndex != index"
              src="../assets/images/rotation_bgc.png"
              alt=""
            />
            <img
              v-else
              src="../assets/images/seleted_rotation_bgc.png"
              alt=""
            />
          </div>
          <!-- 菜单icon -->
          <p
            :style="
              headListIcon[index] == 'icongongsi'
                ? 'font-size:23px;margin:0px 0 0 7px;'
                : ''
            "
          >
            <i
              :style="
                headListIcon[index] == 'icongongsi'
                  ? 'font-size:23px;margin:-10px 0 0 20px;'
                  : ''
              "
              :class="'iconfont ' + headListIcon[index]"
            ></i>
          </p>
          <!-- 标题内容 -->
          <strong>
            {{ i.title }}
          </strong>
          <!-- 子菜单 -->
        </li>
      </ul>
    </div>
    <div class="head_weather">
      <p :class="'iconfont ' + stateOfWeather"></p>
      <div class="weather_local">
        <p>{{ this.temperature + "℃" }}</p>
        <p>无锡</p>
      </div>
      <div class="weather_time">
        <p>{{ date }}</p>
        <p>{{ time }}</p>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      // 头部功能列表菜单及子菜单
      headList: [
        {
          title: "公司介绍",
          route: "company"
        },
        {
          title: "产品介绍",
          route: "introduce"
        },
        {
          title: "案例介绍",
          route: "case_info"
        }
      ],
      // 头部功能列表索引
      headListIndex: -1,
      // 头部功能列表icon
      headListIcon: ["icongongsi", "iconchanpin", "iconanli"],
      // 温度
      temperature: 30,
      // 日期
      date: this.rtdate("date"),
      // 时间
      time: this.rtdate("time"),
      // 天气状态
      stateOfWeather: "icontianqing",
      moduleList: [],
      timer: "",
      timer2: ""
    };
  },

  mounted() {
    // todo 获取天气
    this.setWeather();
    setInterval(() => {
      this.time = this.rtdate("time");
    }, 60 * 1000);
    this.headListIndex = this.headList.findIndex(
      i => i.route === this.$route.name
    );
  },
  methods: {
    async setWeather() {
      var res = await this.$http.get(
        "https://restapi.amap.com/v3/weather/weatherInfo?key=57296cd15cf0e334f513706ad38a4f5f&city=320200"
      );
      this.temperature = res.data.lives[0].temperature;
      var weather = res.data.lives[0];
      console.log(res.data.lives[0], "温度");
      // this.rtdate();
      if (weather.weather == "阴") {
        this.stateOfWeather = "iconyintian1";
      } else if (weather.weather == "多云") {
        this.stateOfWeather = "iconicon-";
      } else if (weather.weather.indexOf("雨") != -1) {
        this.stateOfWeather = "icondayu";
      }
      return;
    },
    rtdate(type) {
      let time = new Date();
      let y = time.getFullYear(); //getFullYear方法以四位数字返回年份
      let M = time.getMonth() + 1; // getMonth方法从 Date 对象返回月份 (0 ~ 11)，返回结果需要手动加一
      let d = time.getDate(); // getDate方法从 Date 对象返回一个月中的某一天 (1 ~ 31)
      let h = time.getHours(); // getHours方法返回 Date 对象的小时 (0 ~ 23)
      let m = time.getMinutes(); // getMinutes方法返回 Date 对象的分钟 (0 ~ 59)
      // let s = time.getSeconds(); // getSeconds方法返回 Date 对象的秒数 (0 ~ 59)
      let t = str => (str.toString().length == 1 ? (str = "0" + str) : str);
      if (type == "date") {
        return y + "-" + t(M) + "-" + t(d);
      }
      return t(h) + ":" + t(m);
    },
    clickaa(index) {
      console.log(event);
    }
  },
  dispose() {
    console.log("dispose");
    if (this.timer) {
      clearInterval(timer);
    }
  }
};
</script>

<style lang="less" scoped>
.seleced_color {
  strong {
    color: #000 !important;
  }
  i {
    color: #000 !important;
  }
}
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
  background-color: #fff;
  color: #a0a0a0;
  // background-color: rgba(0, 0, 0, 0.5);
  .head_logo {
    width: 222px;

    padding: 40px 0 0 83px;
    box-sizing: border-box;
    > div {
      width: 220px;
      height: 38px;
      margin-right: 14px;
      float: left;
      background-image: url("../assets/images/logo.png");
      background-size: 100% 100%;
    }
    p {
      margin-top: 11px;
      strong {
        margin-top: 11px;
        font-size: 25px;
        font-weight: 400;
      }
    }
  }
  .head_main {
    padding-top: 45px;
    box-sizing: border-box;
    ul {
      .w;
      display: flex;
      li {
        flex: 1;
        min-width: 225px;
        min-height: 75px;

        background-size: 100% 100%;
        background-repeat: no-repeat;
        // background-color: pink;
        margin-right: 140px;
        padding: 26px 34px 0 0;
        box-sizing: border-box;
        position: relative;
        cursor: pointer;
        .tip_bgc {
          float: left;
          position: absolute;
          top: 0;
        }
        .head_rotation_img {
          width: 75px;
          height: 75px;
          float: left;
          position: absolute;
          left: 3.5px;
          top: 3.5px;
          img {
            transform: rotateZ(100deg);
            animation: rotate 4s 0.2s linear infinite;
            @keyframes rotate {
              from {
                transform: rotateZ(0);
              }
              to {
                transform: rotateZ(360deg);
              }
            }
          }
        }
        > p {
          float: left;
          margin-left: 21px;
          margin-top: -5px;
          width: 33px;
          height: 33px;
          text-align: center;
          i {
            color: #a0a0a0;
            font-size: 34px;
          }
        }
        strong {
          float: right;
          font-size: 23px;
          color: #a0a0a0;

          letter-spacing: 2px;
        }
        .head_list_submenu {
          width: 195px;
          text-align: center;
          position: absolute;
          top: 65px;
          right: 0;
          img {
            margin: 0 29px;
          }
          .submenu_item {
            margin-top: 5px;
            display: flex;
            text-align: center;

            p {
              flex: 1;
              color: #a0a0a0;

              font-size: 14px;
            }
          }
        }
      }
    }
  }
  .head_weather {
    width: 282px;
    height: 90px;
    // background-color: #999;
    padding: 37px 27px 0 0;
    box-sizing: border-box;
    color: #a0a0a0;

    > p {
      width: 45px;
      height: 36px;
      font-size: 42px;
      margin-right: 17px;
      float: left;
      margin-top: 6px;
    }
    .weather_local {
      width: 45px;
      height: 60px;
      float: left;
      margin-right: 20px;
      text-align: center;
      p {
        font-size: 18px;
        padding-bottom: 13px;
      }
    }
    .weather_time {
      text-align: center;
      float: left;
      p {
        font-size: 18px;
        padding-bottom: 13px;
      }
    }
  }
}
</style>
