<template>
  <div class="three">
    <div class="threeLeft"></div>
    <div class="threeTop"></div>
    <div class="threeRight"></div>
    <div class="threeBottom"></div>

    <div class="three_leftBottom"></div>
    <div class="three_right">
      <p>{{ data1 }}</p>
      <p>{{ data2 }}</p>
      <p>{{ data3 }}</p>
      <p>{{ data4 }}</p>
      <p>{{ data5 }}</p>
      <p>{{ data6 }}</p>
      <p>{{ data7 }}</p>
      <p>{{ data8 }}</p>
    </div>
    <div class="three_bottom"></div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data1: "",
    };
  },
  mounted() {
    setInterval(() => {
      this.data1 = (Math.random() + 10).toFixed(1);
      this.data2 = (Math.random() + 8).toFixed(1);
      this.data3 = (Math.random() + 10).toFixed(1);
      this.data4 = (Math.random() + 5).toFixed(1);
      this.data5 = (Math.random() + 7).toFixed(1);
      this.data6 = (Math.random() + 5).toFixed(1);
      this.data7 = (Math.random() + 8).toFixed(1);
      this.data8 = (Math.random() + 7).toFixed(1);
    }, 1500);
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.three {
  // width: 100vw;
  // height: 100vh;
  background: url("../../../assets/images/Allbgc.png") no-repeat;
  background-size: 100% 100%;
  .threeLeft {
    width: 18px;
    height: 70%;
    top: 15%;
    left: 0.8%;
    position: absolute;
    background: url("../../../assets/images/threeLeft.png") no-repeat;
    background-size: 100% 100%;
    // border: 1px solid red;
  }
  .threeTop {
    width: 98%;
    height: 10%;
    top: 2.45%;
    left: 1%;
    position: absolute;
    background: url("../../../assets/images/threeTop.png") no-repeat;
    background-size: 100% 100%;
    // border: 1px solid red;
  }
  .threeRight {
    width: 15px;
    height: 70%;
    top: 15%;
    right: 0.8%;
    position: absolute;
    background: url("../../../assets/images/threeRight.png") no-repeat;
    background-size: 100% 100%;
    // border: 1px solid red;
  }
  .threeBottom {
    width: 98%;
    height: 10%;
    bottom: 2.2%;
    left: 1%;
    position: absolute;
    background: url("../../../assets/images/threeBottom.png") no-repeat;
    background-size: 100% 100%;
    // border: 1px solid red;
  }
  .three_leftBottom {
    width: 289px;
    height: 289px;
    left: 3.32%;
    top: 65%;
    position: absolute;
    background: url("../../../assets/images/three_leftBottom.png") no-repeat;
    background-size: 100% 100%;
  }
  .three_right {
    width: 22.5%;
    height: 84.81%;
    top: 11%;
    // left: 29.36%;
    right: 2%;
    position: absolute;
    background: url("../../../assets/images/three_right.png") no-repeat;
    background-size: 100% 100%;
    .w {
      position: absolute;
    }
    p:nth-child(1) {
      color: rgb(226, 104, 135);
      top: 12.45%;
      left: 13%;
      .w;
    }
    p:nth-child(2) {
      color: rgb(29, 151, 245);
      .w;
      top: 12.45%;
      left: 36%;
    }
    p:nth-child(3) {
      color: rgb(226, 104, 135);
      .w;
      top: 11%;
      left: 60%;
    }
    p:nth-child(4) {
      color: rgb(29, 151, 245);
      .w;
      top: 11%;
      left: 78%;
    }
    p:nth-child(5) {
      color: rgb(205, 180, 82);
      .w;
      top: 20.3%;
      left: 14.5%;
    }
    p:nth-child(6) {
      color: rgb(142, 245, 119);
      .w;
      top: 20.3%;
      left: 36.5%;
    }
    p:nth-child(7) {
      color: rgb(205, 180, 82);
      .w;
      top: 17.5%;
      left: 60%;
    }
    p:nth-child(8) {
      color: rgb(142, 245, 119);
      .w;
      top: 17.5%;
      left: 78%;
    }
  }
  .three_bottom {
    width: 40%;
    height: 15%;
    bottom: 4%;
    left: 30%;
    position: absolute;
    background: url("../../../assets/images/three_bottom.png") no-repeat;
    background-size: 100% 100%;
    // border: 1px solid red;
  }
}
</style>
