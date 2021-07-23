<template>
  <div class="home">
    <div class="home_left"></div>
    <div class="home_right"></div>
    <div @click="initScene()" class="home_right_huaxigangtie">
      <router-link to="/product/scene/three"></router-link>
    </div>
  </div>
</template>
<script lang="js">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {};
  },
  mounted() {},
  methods: {
    initScene() {
      // 使用vue-x的技术 当场景加载完毕后再执行之后的动画 在store的index中设置一个flag当场景加载为100% 传入的flag变为了true 后执行动画
      if(!this.$store.state.isLoad) return;
      this.$Bus.$emit("removeCamera");
    },
  },
});
</script>
<style lang="less" scoped>
.home {
  width: 100vw;
  height: 100vh;
  position: absolute;
  color: white;
  .home_left {
    width: 450px;
    height: 800px;
    left: 3.22%;
    top: 11.38%;
    position: absolute;
    background: url("../../assets/images/home_left.png") no-repeat;
    background-size: 100% 100%;
  }
  .home_right {
    left: 33.94%;
    top: 18.4%;
    width: 1100px;
    height: 747px;
    position: absolute;
    background: url("../../assets/images/chicken.png") no-repeat;
    background-size: 100% 100%;
  }
  .home_right_huaxigangtie {
    width: 8.91%;
    height: 5.16%;
    top: 63.29%;
    left: 79.88%;
    position: absolute;
    z-index: 10000;
    background: url("../../assets/images/huaxigangtie.png") no-repeat;
    background-size: 100% 100%;
    a {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
