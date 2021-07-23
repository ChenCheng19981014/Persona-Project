<template>
  <di class="manage">
    <div class="manage_right">
      <div class="manage_right_one"></div>
      <div class="manage_right_two"></div>
      <div class="manage_right_three"></div>
    </div>
    <manageTabRight></manageTabRight>
    <manageTab></manageTab>
    <router-view />
  </di>
</template>
<script>
import manageTab from "@/components/manage/manageTab.vue";
import manageTabRight from "@/components/manage/manageTabRight.vue";
export default {
  components: { manageTab, manageTabRight },
  data() {
    return {};
  },
  mounted() {
    this.initImg();
  },
  methods: {
    initImg() {
      var EquipmentImg = document.querySelectorAll(".manage_right>ul>li");
      EquipmentImg.forEach((i, index) => {
        var a = require("../../../assets/images/camera" + (index + 1) + ".png");
        i.style =
          "background:url(" +
          a +
          ")no-repeat !important;background-size: 100% 100% !important;";
      });
    },
  },
};
</script>
<style lang="less" scoped>
.manage {
  .manage_right {
    top: 13.15%;
    left: 77.23%;
    width: 20.23%;
    height: 827px;
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
    .manage_right_one {
      .w;
      top: 45px;
      background: url("../../../assets/images/camera1.jpg") no-repeat;
      background-size: 100% 100%;
    }
    .manage_right_two {
      .w;
      top: 325px;
      background: url("../../../assets/images/camera2.jpg") no-repeat;
      background-size: 100% 100%;
    }
    .manage_right_three {
      .w;
      top: 610px;
      background: url("../../../assets/images/camera3.jpg") no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
