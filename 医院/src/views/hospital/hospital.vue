<template>
  <div>
    <div v-show="!$route.meta.run" class="hospital">
      <div class="logo"></div>
      <div class="text"></div>
      <router-link to="/scene"
        ><div @click="initScene" id="experience">
          <p>点击体验</p>
        </div></router-link
      >
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    initScene() {
      // console.log(!this.$store.state.isLoad, "!this.$store.state.isLoad");
      // true执行 false抛出
      if (!this.$store.state.isLoad) return;
      // console.log(this.$store.state.isLoad, "load---two");
      this.$EventBus.$emit("eventName", true);
    },
  },
};
</script>
<style lang="less" scoped>
.hospital {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: url("../../assets/images/hospital1.jpg") no-repeat;
  background-size: 100% 100%;
  .logo {
    z-index: 100;
    top: 5%;
    left: 5%;
    width: 13.28%;
    height: 4.07%;
    background: url("../../assets/images/logo001.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
  }
  .text {
    width: 18.91%;
    height: 13.89%;
    left: 73.39%;
    top: 53.24%;
    background: url("../../assets/images/text.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
  }
  #experience {
    width: 6.09%;
    height: 3.52%;
    top: 70.56%;
    left: 73.59%;
    position: absolute;
    background-color: rgb(255, 138, 0);
    border-radius: 5%;
    p {
      width: 100%;
      height: 100%;
      line-height: 200%;
      color: white;
      letter-spacing: 4.5px;
      position: absolute;
      text-align: center;
    }
  }
}
</style>
