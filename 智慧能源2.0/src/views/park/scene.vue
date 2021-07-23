<template>
  <!-- 3D场景 -->
  <div class="scene">
    <keep-alive>
      <router-view v-if="$route.meta.keep"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keep"></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.scene {
  width: 100vw;
  height: 100vh;
  position: relative;
  .canvas {
    position: absolute;
    display: block;
  }
}
</style>
