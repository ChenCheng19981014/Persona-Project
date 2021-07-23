<template>

  <div id="userLayout" :class="['user-layout-wrapper', isMobile && 'mobile']">
    <div class="container">
      <div class="logo-wrap">
        <img src="~@/assets/logo.svg" class="logo" alt="logo">
      </div>
      <div class="user-layout-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { deviceMixin } from '@/store/device-mixin'

export default {
  name: 'UserLayout',
  components: {
  },
  mixins: [deviceMixin],
  mounted () {
    document.body.classList.add('userLayout')
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
  height: 100%;

  &.mobile {
    .container {
      .main {
        max-width: 368px;
        width: 98%;
      }
    }
  }

  .container {
    width: 100%;
    min-height: 100%;
    // background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
    background: #f0f2f5 url(~@/assets/images/longin-bg.jpg) no-repeat 50%;
    background-size: 100% 100%;
    background-attachment:fixed;
    //padding: 50px 0 84px;
    position: relative;

    .logo-wrap {
        position: absolute;
        top: 40px;
        right: 48px;
        .logo {
          height: 44px;
          vertical-align: top;
          border-style: none;

        }
      }

    .user-layout-content {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;

      .main {
        min-width: 413px;
        min-height: 458px;
        width: 413px;
        margin: 0 auto;
        background-color: rgba(255, 255, 255, 0.5);
        padding: 55px 48px;
        border-radius: 5px;
      }

    }

    a {
      text-decoration: none;
    }

  }
}
</style>
