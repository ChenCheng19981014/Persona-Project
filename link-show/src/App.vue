<template>
  <div id="app">
    <Header></Header>
    <keep-alive>
      <router-view v-if="$route.meta.keep" />
    </keep-alive>
    <router-view v-if="!$route.meta.keep" />
  </div>
</template>
<script>
import Header from "./components/header";

export default {
  components: {
    Header
  }
};
</script>
<style>
body {
  width: 100vw;
  height: 100vh;
  background-color: rgb(230, 230, 230);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  overflow: hidden;
}
</style>
