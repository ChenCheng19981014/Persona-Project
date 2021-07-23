<template>
  <div class="earth">
    <div class="g-wraper">
      <div class="m-part">
        <mapDrag class="mapbox"></mapDrag>
      </div>
    </div>
    <div class="rightbottom">
      <div class="rightbottom1">正常运行 261/300</div>
      <div class="rightbottom2">在建 35/300</div>
      <div class="rightbottom3">异常 4/300</div>
      <div class="moreinfo" v-show="this.showInfo">
        <span>电站名称：XXX5.4KW分布式光伏电站<br /></span>
        <span>电站状态：<span class="green">正常</span><br /></span>
        <span>日发电量：48.5KWH<br /></span>
        <span>总发电量：37427.0KWH<br /></span>
        <span>交流功率：41KW<br /></span>
      </div>
    </div>
    <div class="earth_left"></div>
    <router-link to="/park/scene/three/factory">
      <div class="earth_main">
        去园区
      </div>
    </router-link>
    <div class="earth_right">
      <div class="earth_right_fn">
        <p>全球</p>
        <p>国家</p>
        <p>大区</p>
        <p>省份 <i class="iconfont icon-jiantou-copy"></i></p>
        <p>城市 <i class="iconfont icon-jiantou-copy"></i></p>
        <div class="earth_search">
          <i class="iconfont icon-fangdajing"></i>
        </div>
      </div>
      <div class="earth_right_bgc"></div>
    </div>
  </div>
</template>

<script>
import mapDrag from "../components/mapDrag/mapDrag.vue";
export default {
  components: {
    mapDrag,
  },
  data() {
    return {
      showInfo: false,
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.earth {
  width: 100%;
  height: 100vh;
  background-color: rgb(15, 20, 54);
  position: relative;
}
.earth_left {
  position: absolute;
  left: 1.82%;
  top: 15.96%;
  width: 310px;
  height: 80.93%;
  background: url("../assets/images/earth_left.png");
  background-size: 100% 100%;
}
.earth_main {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: white;
}
.earth_right {
  right: 35px;
  top: 120px;
  height: 86%;
  position: absolute;
  // border: 1px solid red;
}
.earth_right_fn {
  width: 580px;
  height: 30px;
  margin-bottom: 30px;
  color: white;
  // border: 1px solid red;

  p {
    padding: 5px 10px;
    box-sizing: border-box;
    height: 100%;
    text-align: center;
    width: 60px;
    margin-right: 5px;
    float: left;
    border: 1px solid #fff;
    color: white;
  }
  .earth_search {
    width: 250px;
    height: 30px;
    float: right;
    border: 1px solid #fff;
    box-sizing: border-box;
    i {
      float: right;
      line-height: 30px;
      margin-right: 10px;
    }
  }
}
.earth_right_bgc {
  top: 5%;
  width: 58%;
  height: 92.93%;
  position: absolute;
  right: 10px;
  background: url("../assets/images/earth_right.png");
  background-size: 100% 100%;
}

.g-wraper {
  width: 1000px;
  margin: 0;
  color: #666;
  font-size: 16px;
  line-height: 30px;
}
.m-part {
  margin: 0px;
  padding: 0px;
}
.m-part .mapbox {
  width: 100vw;
  height: 100vh;
  float: left;
  z-index: 0;
}

.rightbottom1 {
  position: absolute;
  bottom: 70px;
  right: 620px;
  color: #fff;
  font-size: 12.5px;
  line-height: 30px;
  letter-spacing: 0.2rem;
  background: url("https://test-1303915342.cos.ap-nanjing.myqcloud.com/nengyuan/green.png")
    no-repeat;
  padding-left: 20px;
  background-position-y: 6.5px;
  transform: scale(0.8);
}
.rightbottom2 {
  position: absolute;
  bottom: 70px;
  right: 510px;
  color: #fff;
  font-size: 12.5px;
  line-height: 30px;
  letter-spacing: 0.2rem;
  background: url("https://test-1303915342.cos.ap-nanjing.myqcloud.com/nengyuan/blue.png")
    no-repeat;
  padding-left: 20px;
  background-position-y: 6.5px;
  transform: scale(0.8);
}
.rightbottom3 {
  position: absolute;
  bottom: 70px;
  right: 400px;
  color: #fff;
  font-size: 12.5px;
  line-height: 30px;
  letter-spacing: 0.2rem;
  background: url("https://test-1303915342.cos.ap-nanjing.myqcloud.com/nengyuan/red.png")
    no-repeat;
  padding-left: 20px;
  background-position-y: 6.5px;
  transform: scale(0.8);
}
.moreinfo {
  position: absolute;
  width: 332px;
  height: 150px;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  background: url("../assets/images/dakuang.png") no-repeat;
  z-index: 0px;
  line-height: 30px;
}
.moreinfo span {
  margin: 20px;
  color: #fff;
}
.moreinfo .green {
  margin: 0px;
  color: #04e1e3;
}
</style>
