<template>
  <div class="equipment">
    <div class="equipment_choice">
      <select id="sel1">
        <option>&nbsp;&nbsp;&nbsp;&nbsp;混合车间</option>
        <option>&nbsp;&nbsp;&nbsp;&nbsp;初中</option>
        <option>&nbsp;&nbsp;&nbsp;&nbsp;高中</option>
      </select>
      <select id="sel2">
        <option>&nbsp;&nbsp;&nbsp;&nbsp;全部设备</option>
        <option>&nbsp;&nbsp;&nbsp;&nbsp;初中</option>
        <option>&nbsp;&nbsp;&nbsp;&nbsp;高中</option>
      </select>
    </div>
    <div class="equipment_center"></div>
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
.equipment {
  .equipment_center {
    width: 1654px;
    height: 639px;
    bottom: 16.5%;
    left: 137px;
    position: absolute;
    background: url("../../../assets/images/pool1.png") no-repeat;
    background-size: 100% 100%;
  }
  .equipment_choice {
    width: 225px;
    height: 27px;
    top: 125px;
    left: 170px;
    position: absolute;
    // border: 1px solid greenyellow;
    .w {
      border: 2px solid rgb(113, 87, 49);
      background: linear-gradient(
        rgb(17, 31, 47),
        rgb(63, 58, 48),
        rgb(113, 87, 49)
      );
      max-width: 106px;
      color: white;
      width: 106px;
      height: 27px;
    }
    #sel1 {
      .w;
      // border: 1px solid red;;
    }
    #sel2 {
      .w;
      margin-left: 13px;
      // border: 1px solid pink;
    }
  }
}
</style>
