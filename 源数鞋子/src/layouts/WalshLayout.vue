<template>
  <div>
    <div class="container">
      <div class="nav">
        <div class="logo">
          WALSH
        </div>
        <a-menu
          theme="dark"
          mode="horizontal"
          :default-selected-keys="['5']"
          :style="{ lineHeight: '64px',height: '64px',marginLeft: '150px' }"
        >
          <a-menu-item key="1">
            品牌新闻
          </a-menu-item>
          <a-menu-item key="2">
            女款
          </a-menu-item>
          <a-menu-item key="3">
            男款
          </a-menu-item>
          <a-menu-item key="4">
            配件
          </a-menu-item>
          <a-menu-item key="5">
            个性化定制
          </a-menu-item>
          <a-menu-item key="6">
            购物车
          </a-menu-item>
        </a-menu>
      </div>
    </div>
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>

export default {
  name: 'WalshView'
}

</script>

<style scoped lang="less">
.container {
  background: #001529;
  width: 100%;
}
.nav {
  // padding: 0px calc(50% - 900px);
  max-width: 1800px;
  margin: 0 auto;
  background: #001529;
  position: relative;
}
.logo {
  width: 120px;
  height: 36px;
  background: rgba(255, 255, 255, 0.2);
  // margin: 14px 0;
  float: left;
  font-size: 20px;
  color: #f0f2f5;
  line-height: 36px;
  text-align: center;
  font-style: italic;
  letter-spacing: 2px;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
// .ant-layout-header {
//   height: 64px !important;
// }
.main {
  min-height: calc(100vh - 84px);
  width: 100%;
  // max-width: 1800px;
  padding: 30px 60px;
  margin: 0 auto;
  background: #f0f2f5;
}
</style>
