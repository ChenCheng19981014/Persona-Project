<template>
  <div class="my-input-search">
    <!-- <a-input v-model.trim="value" disabled /> -->
    <div class="my-input" :class="searchAbled?'my-input-disabled':''" v-if="!value">{{ value }}</div>
    <div v-else class="my-input" :class="searchAbled?'my-input-disabled':''">
      <a-tooltip>
        <template slot="title">
          {{ value }}
        </template>
        <div class="">
          {{ value }}
        </div>
      </a-tooltip>
      <span class="ant-input-suffix" @click="handleClear" v-if="!searchAbled">
        <i aria-label="图标: close-circle" tabindex="-1" class="anticon anticon-close-circle ant-input-clear-icon"><svg
          viewBox="64 64 896 896"
          data-icon="close-circle"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
          class=""><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg></i>
      </span>
    </div>
    <a-button type="primary" @click="openSearch" :disabled="searchAbled">
      <my-icon type="icon-sousuo" class="btn-icon-size"></my-icon>
    </a-button>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    searchAbled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    openSearch () {
      this.$emit('open-search')
    },
    handleClear () {
      this.$emit('clear-value')
    }
  }
}
</script>
<style lang="less">
  .my-input-search{
    display:flex;
    .my-input{
      width: 100%;
      height:32px;
      color: rgba(0,0,0,.65);
      font-size: 14px;
      line-height: 32px;
      padding: 0 11px;
      display: flex;
      justify-content:space-between;
      background-color: #fff;
      background-image: none;
      border: 1px solid #d9d9d9;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      transition: all .3s;
      white-space: nowrap;
      overflow: hidden;
      text-overflow:ellipsis;
    }
    .my-input-disabled{
      background-color:#f5f5f5
    }
    .ant-input{
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
      border-right:none !important;
    }
    // textarea.ant-input{
    //   height:32px !important;
    //   resize:none !important;
    // }
    .ant-btn{
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
      border-left: none !important;
    }
  }
</style>
