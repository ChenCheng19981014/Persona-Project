<template>
  <div class="Environmental">
    <div class="Environmental_right">
      <!-- <div class="Environmental_right_one"></div>
      <div class="Environmental_right_two"></div>
      <div class="Environmental_right_three"></div> -->
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
.Environmental {
  top: 11.15%;
  left: 77.23%;
  width: 20.23%;
  height: 827px;
  position: absolute;
  // border: 1px solid red;
  .Environmental_right {
    width: 100%;
    height: 100%;
    position: absolute;
    // border: 1px solid red;
    background: url("../../../assets/images/camera_right.png") no-repeat;
    background-size: 100% 100%;
    .w {
      width: 348px;
      height: 220px;
      left: 25px;
      position: absolute;
    }
    .Environmental_right_one {
      .w;
      top: 45px;
      background: url("../../../assets/images/camera1-1.jpg") no-repeat;
      background-size: 100% 100%;
    }
    .Environmental_right_two {
      .w;
      top: 325px;
      background: url("../../../assets/images/camera2-2.jpg") no-repeat;
      background-size: 100% 100%;
    }
    .Environmental_right_three {
      .w;
      top: 605px;
      background: url("../../../assets/images/camera3-3.jpg") no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
