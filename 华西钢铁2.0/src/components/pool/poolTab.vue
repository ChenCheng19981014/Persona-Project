<template>
  <div class="poolTab">
    <div class="poolRight">
      <ul>
        <li v-for="(i, index) in routeData" @click="selectedIndex = index">
          <a
            @click="changeRoute(i.route)"
            :style="
              selectedIndex === index
                ? 'color:rgb(248, 187, 77) !important;'
                : 'color:white !important;'
            "
            >{{ i.name }}</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgChange: false,
      routeData: [
        {
          route: "equipment",
          name: "设备库",
        },
        {
          route: "testing",
          name: "检测报告",
        },
      ],
      selectedIndex: 0,
    };
  },
  mounted() {
    // this.initImg();
    // this.initCenterImg();
    // console.log(this.$route, "route");
    this.selectedIndex = this.routeData.findIndex(
      (i) => this.$route.name === i.route
    );
    // window.sessionStorage.setItem("token", "aaa");
    // console.log(window.sessionStorage.getItem("token"));
  },
  methods: {
    initImg() {
      this.imgIndex = !this.imgIndex;
      var Img = document.querySelector(".poolRight");
      var a = require("../../assets/images/poolRight1.png");
      var b = require("../../assets/images/poolRight2.png");
      if (this.imgIndex == true) {
        Img.style =
          "background:url(" +
          a +
          ")no-repeat !important;background-size: 100% 100% !important;";
      } else if (this.imgIndex == false) {
        Img.style =
          "background:url(" +
          b +
          ")no-repeat !important;background-size: 100% 100% !important;";
      }
    },
    initCenterImg() {
      this.imgChange = !this.imgChange;
      var poolCenter = document.querySelector(".pool_center");
      var a = require("../../assets/images/pool1.png");
      var b = require("../../assets/images/pool2.png");
      if (this.imgChange == true) {
        poolCenter.style =
          "background:url(" +
          a +
          ")no-repeat !important ;background-size: 100% 100% !important";
      } else {
        poolCenter.style =
          "background:url(" +
          b +
          ")no-repeat !important ;background-size: 100% 100% !important";
      }
    },
    changeRoute(routeName) {
      console.log(this.$route.fullPath);
      this.$router.push(routeName);
    },
  },
  watch: {
    $route() {
      this.selectedIndex = this.routeData.findIndex(
        (i) => this.$route.name === i.route
      );
    },
  },
};
</script>
<style lang="less" scoped>
.poolTab {
  .poolRight {
    bottom: 74px;
    left: 78.97%;
    width: 99px;
    height: 44px;
    position: absolute;
    // border: 1px solid red;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      // border: 1px solid red;
      background: url("../../assets/images/poolRight.png") no-repeat;
      background-size: 100% 100%;
      li {
        flex: 1;
        min-height: 22px;
        // border: 1px solid pink;
        text-align: center;
        font-size: 13px;
        a {
          color: rgb(248, 187, 77);
          font-weight: bold;
        }
      }
      li:nth-child(2) {
        flex: 1;
        min-height: 22px;
        // border: 1px solid pink;
        text-align: center;
        margin-bottom: 100px;
        a {
          color: white;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
