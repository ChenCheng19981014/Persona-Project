<template>
  <div id="app">
    <keep-alive>
      <router-view ref="scene" v-if="$route.meta.keep"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keep"></router-view>
  </div>
</template>
<style></style>
