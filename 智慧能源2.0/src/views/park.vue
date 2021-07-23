<template>
  <div class="park">
    <Controller></Controller>
    <keep-alive>
      <router-view v-if="$route.meta.keep"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keep"></router-view>
  </div>
</template>

<script>
import Controller from "../components/park/controller";
export default {
  components: {
    Controller,
  },
  data() {
    return {
      selectedIndex: 0,
      selectedIndex2: 0,
    };
  },
};
</script>

<style>
.park {
  width: 100vw;
  height: 100vh;
  background-color: rgb(15, 20, 54);
  /* overflow: hidden; */
}
</style>
