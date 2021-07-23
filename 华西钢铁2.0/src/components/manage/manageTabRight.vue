<template>
  <div class="manageTabRight">
    <div class="manageTabRight_img">
      <ul>
        <li v-for="(i, index) in routeData" @click="selectedIndex = index">
          <a
            @click="changeRoute(i.route, index)"
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
      imgIndex: true,
      routeData: [
        { route: "video", name: "视频监控" },
        { route: "Environmental", name: "环境监测" },
      ],
      selectedIndex: 0,
    };
  },
  mounted() {
    // this.initImg();
    this.selectedIndex = this.routeData.findIndex(
      (i) => this.$route.fullPath.indexOf(i.route) !== -1
    );
  },
  methods: {
    initImg() {
      this.imgIndex = !this.imgIndex;
      var Img = document.querySelector(".manageTabRight_img");
      var a = require("../../assets/images/manageTabRight1.png");
      var b = require("../../assets/images/manageTabRight2.png");
      if (this.imgIndex == true) {
        Img.style =
          "background:url(" +
          b +
          ")no-repeat !important;background-size: 100% 100% !important;";
      } else if (this.imgIndex == false) {
        Img.style =
          "background:url(" +
          a +
          ")no-repeat !important;background-size: 100% 100% !important;";
      }
    },
    changeRoute(routeName, index) {
      this.$router.push(routeName);

      console.log(routeName, "routeName");
      if (index == 0) {
        // this.$Bus.$emit("initCamera");
        // this.$Bus.$emit("changeCamera");
      } else if (index == 1) {
        // this.$Bus.$emit("initmonitor");
      }
    },
  },
  watch: {
    $route: function(ne, old) {
      if (ne.fullPath === "/product/scene/three") {
        this.$Bus.$emit("initSprite");
      } else if (ne.fullPath === "/product/scene/manage/video") {
        this.$Bus.$emit("initCamera");
      } else if (ne.fullPath === "/product/scene/manage/Environmental") {
        this.$Bus.$emit("initmonitor");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.manageTabRight {
  z-index: 100;
  .manageTabRight_img {
    top: 26.94%;
    left: 11.1%;
    width: 87px;
    height: 45px;
    position: absolute;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      background: url("../../assets/images/manageTabRight_img.png") no-repeat;
      background-size: 100% 100%;
      // border: 1px solid pink;
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
      li:nth-child(1) {
        margin-top: 10px;
        font-weight: bold;
      }
    }
  }
}
</style>
