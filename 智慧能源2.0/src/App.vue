<template>
  <div id="app">
    <Header></Header>
    <router-view />
  </div>
</template>
<script>
import Header from "./components/header.vue";
export default {
  components: {
    Header,
  },
};
</script>
<style lang="less">
#app {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: #ccc;
  overflow: hidden;
}
</style>
