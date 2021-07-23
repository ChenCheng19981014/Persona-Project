<template>
  <div>
    <header>
      <div class="head_logo">
        <div></div>
      </div>
      <div class="head_main">
        <ul>
          <li
            @click="$router.push({ name: i.route }), (headListIndex = index)"
            :class="headListIndex == index ? 'seleced_color' : ''"
            v-for="(i, index) in headList"
            :key="index"
          >
            <!-- 菜单icon -->
            <p>
              <i :class="'iconfont ' + headListIcon[index]"></i>
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
    <div class="menu_area">
      <ul>
        <li
          @click="$router.push({ name: i.route }), (headListIndex = index)"
          :class="headListIndex == index ? 'seleced_color' : ''"
          v-for="(i, index) in headList"
          :key="index"
        >
          <!-- 菜单icon -->
          <p>
            <i
              :style="
                headListIcon[index] == 'icongongsi'
                  ? 'font-size:20px;margin:0 0 0 0;'
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 头部功能列表菜单及子菜单
      headList: [
        {
          title: "公司介绍",
          route: "company",
        },
        {
          title: "产品介绍",
          route: "introduce",
        },
        {
          title: "案例介绍",
          route: "case_info",
        },
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
      timer2: "",
    };
  },

  mounted() {
    // todo 获取天气
    this.setWeather();
    setInterval(() => {
      this.time = this.rtdate("time");
    }, 60 * 1000);
    this.headListIndex = this.headList.findIndex(
      (i) => i.route === this.$route.name
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
      let t = (str) => (str.toString().length == 1 ? (str = "0" + str) : str);
      if (type == "date") {
        return y + "-" + t(M) + "-" + t(d);
      }
      return t(h) + ":" + t(m);
    },
    clickaa(index) {
      console.log(event);
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

@media (min-width: 0px) and (max-width: 768px) {
  header {
    width: 100%;
    height: 50px !important;
    .head_logo {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      padding: 0 !important;
      width: 150px !important;
      div {
        margin: 10px 0;
        height: 30px !important;
      }
    }
    .head_main {
      display: none;
    }
    .head_weather {
      display: none;
    }
    margin: 0 auto;
  }
  .menu_area {
    display: block !important;
    position: fixed;
    z-index: 100000000;
    bottom: 0;
    width: 100vw;
    height: 50px;
    background-color: #fff;
    ul {
      display: flex;
      width: 100%;
      height: 100%;
      li {
        flex: 1;
        text-align: center;
        margin-top: 8px;
        color: rgb(160, 160, 160);
      }
    }
  }
}
header {
  .w;
  z-index: 1000;
  justify-content: space-between;
  position: absolute;
  height: 100px;
  background-color: #fff;
  color: #a0a0a0;
  .head_logo {
    position: relative;
    width: 220px;
    height: 38px;
    top:40px;
    left: 50px;
    //padding: 40px 50px 0 83px;
   // box-sizing: border-box;
    background-image: url("../assets/images/logo.png");
    background-size: 100% 100%;
  }
  .head_main {
    width: 520px;
    position: absolute;
    bottom: 15px;
    right: 18vw;
    box-sizing: border-box;
    ul {
      .w;
      display: flex;
      li {
        flex: 1;
        min-width: 120px;
        height: 20px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        // background-color: pink;
        margin-right: 75px;
        box-sizing: border-box;
        position: relative;
        cursor: pointer;
        > p {
          float: left;
          width: 33px;
          height: 33px;
          text-align: center;
          i {
            color: #a0a0a0;
            font-size: 24px;
          }
        }

        strong {
          float: left;
          font-size: 20px;
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
      li:last-child {
        margin-right: 0;
      }
    }
  }
  .head_weather {
    position: absolute;
    right: 0;
    top: 24px;
    width: 175px;
    height: 90px;
    // background-color: #999;
    box-sizing: border-box;
    color: #a0a0a0;

    > p {
      width: 28px;
      height: 23px;
      font-size: 23px;
      float: left;
      padding: 0 5px;
    }
    .weather_local {
      height: 15px;
      float: left;
      margin-right: 20px;
      text-align: center;
      p {
        padding-right: 5px;
        width: 45px;
        float: left;
        font-size: 16px;
      }
    }
    .weather_time {
      margin-top: 2px;
      height: 15px;
      text-align: center;
      float: left;
      p {
        margin-right: 14px;
        float: left;
        font-size: 16px;
        padding-bottom: 13px;
      }
    }
  }
}
.menu_area {
  display: none;
}
</style>
