<template>
  <div class="manageTab">
    <div class="tab">
      <ul>
        <li
          v-for="(i, index) in [{ name: '3D' }, { name: '列表' }]"
          :key="index"
        >
          {{ i.name }}
        </li>
      </ul>
    </div>
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
.manageTab {
  .tab {
    left: 4.93%;
    top: 89.72%;
    width: 159px;
    height: 32px;
    position: absolute;
    ul {
      left: 4.93%;
      top: 89.72%;
      width: 100%;
      height: 100%;
      // flex-direction: column;
      flex-wrap: wrap;
      // border: 1px solid palevioletred;
      display: flex;
      li {
        text-align: center;
        flex: 1;
        max-width: 70px;
        height: 100%;
        line-height: 29px;
        border: 1px solid palegoldenrod;
        border-radius: 10%;
        color: rgb(249, 177, 50);
      }
      li:nth-child(2) {
        margin-left: 19px;
        border: 1px solid rgb(167, 239, 255);
        color: rgb(167, 239, 255);
      }
    }
  }
}
</style>
