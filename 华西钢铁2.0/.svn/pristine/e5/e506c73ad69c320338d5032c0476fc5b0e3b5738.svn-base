<template>
  <div class="product">
    <Suspense>
      <template #default>
        <tab></tab>
      </template>
      <template #fallback>
        <div style="color:white">loading...</div>
      </template>
    </Suspense>
    <router-view v-slot="{ Component }">
      <component v-if="!$route.meta.keep" :is="Component" />
      <keep-alive>
        <component v-if="$route.meta.keep" :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
<script>
import { defineAsyncComponent } from "vue";
// import tab from "../../components/product/tab.vue";
const tab = defineAsyncComponent(() => import("../../components/product/tab"));
export default {
  components: {
    tab,
  },
  data() {
    return {};
  },
  mounted() {
    // console.log(this.$route);
    // console.log("load");
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.product {
  width: 100vw;
  height: 100vh;
  position: relative;
}
</style>
