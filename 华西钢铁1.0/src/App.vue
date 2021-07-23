<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <!-- <router-view v-slot="{ Component }"> </router-view> -->
  </div>
</template>

<script>
import product from "./views/product/product";
import Header from "./components/header.vue";
export default {
  components: {
    Header,
    product,
  },
  mounted() {},
  watch: {},
};
</script>
<style lang="less">
#app {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: rgb(12, 28, 47);
  // overflow: hidden;
  background: url("./assets/images/Allbgc.png") no-repeat;
  background-size: 100% 100%;
}
</style>
