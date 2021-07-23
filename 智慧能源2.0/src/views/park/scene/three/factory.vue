<template>
  <!-- 3D场景 -->
  <div>
    <div class="changeTab">
      <ul @click="changeTab">
        <li v-for="(i, index) in tabData" :key="index">
          <i
            :style="selectedIndex === index ? 'color:yellow' : ''"
            :class="'iconfont ' + i.icon"
          ></i>
        </li>
      </ul>
    </div>
    <div class="factory_left" style="display:none;"></div>
    <div class="factory_center_left" style="display:none;">
      <i class="iconfont icon-xiangzuo"></i>
    </div>
    <div class="factory_center" style="display:none;">
      <router-link to="/park/scene/equipment"
        ><div class="factory_center_details"><p>详情</p></div></router-link
      >
      <ul>
        <li v-for="(i, index) in 5" :key="index"><div></div></li>
      </ul>
      <span id="focusBox">聚焦</span>
    </div>
    <div class="factory_center_right" style="display:none;">
      <i class="iconfont icon-liebiaoyoujiantou"></i>
    </div>
    <div class="factory_right" style="display:none;"></div>
  </div>
</template>
<script>
import { change } from "./three";
export default {
  data() {
    return {
      assets: {},
      imgList: [],
      isImg: "",
      tabData: [
        {
          icon: "icon-sunny",
        },
        {
          icon: "icon-cloudy",
        },
        {
          icon: "icon-sunny-night",
        },
        {
          icon: "icon-wudian-copy",
        },
      ],
      selectedIndex: 0,
    };
  },
  mounted() {
    // this.initImg();
    if (this.$route.name != "three") return;
    // this.initScene();
  },
  methods: {
    initImg() {
      return;
      var img = document.querySelectorAll(".factory_center>ul>li");
      img.forEach((i, index) => {
        console.log((i = i.childNodes[0]));
        var a = require("../../../../assets/images/center" +
          (index + 1) +
          ".png");
        i.style =
          "background:url(" +
          a +
          ")no-repeat !important;background-size: 100% 100% !important; ;";
      });
    },
    changeTab(e) {
      this.selectedIndex = this.tabData.findIndex(
        (i) => e.target.classList[1] === i.icon
      );
      change.fn.changeTabModel(this.selectedIndex);
    },
  },
};
</script>
<style lang="less" scoped>
.changeTab {
  color: white;
  position: absolute;
  left: 90px;
  top: 120px;
  z-index: 100;
  ul {
    li {
      float: left;
      i {
        font-size: 40px;
        margin-right: 20px;
      }
    }
  }
}
.factory_left {
  position: absolute;
  left: 35px;
  top: 16%;
  width: 330px;
  height: 80.8%;
  background: url("../../../../assets/images/3D_left.png") no-repeat;
  background-size: 100% 100%;
}
.factory_center_left {
  height: 80px;
  width: 30px;
  left: 31%;
  margin-top: 750px;
  position: absolute;
  i {
    top: 30%;
    position: absolute;
    width: 30px;
    color: white;
    font-size: 30px;
  }
}
.factory_center {
  height: 85px;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 140px;
  position: absolute;
  background-size: 100% 100%;
  ul {
    width: 600px;
    height: 85px;
    li {
      float: left;
      width: 110px !important;
      height: 87px;
      margin: 0 5px;
      box-sizing: border-box;
      border: 1px solid white;
      background-color: rgba(28, 37, 61, 0.5);
      div {
        margin: 0 auto;
        width: 110px;
        height: 85px;
      }
    }
  }
  #focusBox {
    color: white;
    left: 70px;
    top: 50px;
    position: absolute;
    width: 40px;
    height: 20px;
    border-radius: 10%;
    background-color: rgb(5, 122, 216);
    text-align: center;
    opacity: 0.7;
  }
  .factory_center_details {
    top: 50px;
    left: 15px;
    width: 40px;
    height: 20px;
    // border: 1px solid red;
    border-radius: 10%;
    background-color: rgb(5, 122, 216);
    position: absolute;
    opacity: 0.7;
    p {
      line-height: 20px;
      text-align: center;
      color: white;
    }
  }
}
.factory_center_right {
  height: 80px;
  width: 30px;
  left: 67.3%;
  margin-top: 750px;
  position: absolute;
  i {
    top: 30%;
    position: absolute;
    width: 30px;
    color: white;
    font-size: 30px;
  }
}
.factory_right {
  width: 330px;
  height: 81.3%;
  right: 35px;
  top: 15.8%;
  position: absolute;
  background: url("../../../../assets/images/3D_right.png") no-repeat;
  background-size: 100% 100%;
}
</style>
