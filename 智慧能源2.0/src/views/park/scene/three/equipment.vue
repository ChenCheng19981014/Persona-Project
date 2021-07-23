<template>
  <div class="equipment">
    <div class="father">
      <span class="span">100%</span>
      <div class="son"></div>
    </div>

    <router-link to="/park/scene/three/factory">
      <div class="equipment_back">
        <i class="iconfont icon-shuangjiantou"></i>
        <p>返回</p>
      </div>
    </router-link>
    <div class="equipment_title">
      <span>设备名称</span>
      <select autofocus>
        <option value="" disabled selected hidden>厂商选择</option>
        <option class="option" value="manufacturer1">厂商1</option>
        <option class="option" value="manufacturer2">厂商2</option>
        <option class="option" value="manufacturer3">厂商3</option>
        <option class="option" value="manufacturer4">厂商4</option>
      </select>
    </div>
    <div class="equipment_right">
      <ul>
        <li
          :data-index="index"
          @click="rightshow(index)"
          :class="rightShowIndex == index ? 'show' : ''"
          v-for="(i, index) in [
            { iconfont: 'icon-chanpinguanli', value: '产品展示' },
            { iconfont: 'icon-chanpin', value: '产品尺寸' },
            {
              iconfont: 'icon-wangzhantubiaoji2_huaban1fuben26',
              value: '部件介绍',
            },
            {
              iconfont: 'icon-zhongguohangtiantubiaoheji-weizhuanlunkuo-',
              value: '结构拆解',
            },
          ]"
          :key="index"
        >
          <i :class="'iconfont ' + i.iconfont"></i>
          <p class="right">{{ i.value }}</p>
        </li>
      </ul>
    </div>
    <div class="equipment_left_bottom"></div>
  </div>
</template>

<script>
import * as THREE from "three";
import { APP } from "../../assets/js/app2.js";
import { VRButton } from "../../assets/js/VRButton.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { ChangeInterface } from "../../assets/js/showModel.js";

import { log } from "three";
window.THREE = THREE; // Used by APP Scripts.
window.VRButton = VRButton; // Used by APP Scripts.
window.EffectComposer = EffectComposer;
window.RenderPass = RenderPass;
window.ShaderPass = ShaderPass;
window.OutlinePass = OutlinePass;
window.FXAAShader = FXAAShader;
window.AfterimagePass = AfterimagePass;
window.OrbitControls = OrbitControls;
window.FBXLoader = FBXLoader;

export default {
  data() {
    return {
      imgList: [],
      rightShowIndex: 1,
    };
  },
  mounted() {
    // this.fn.test();
    // this.initEquipmentImg();
    this.rightshow(0);
    this.initScene();
  },
  methods: {
    initEquipmentImg() {
      var EquipmentImg = document.querySelectorAll(".equipment_right>ul>li");
      EquipmentImg.forEach((i, index) => {
        var a = require("../../../../assets/images/equipment" +
          (index + 1) +
          ".png");
        i.style =
          "background:url(" +
          a +
          ")no-repeat !important;background-size: 100% 100% !important;";
      });
    },
    rightshow(index) {
      this.rightShowIndex = index;
      //共多少P标签图片
      var centerImg = document.querySelectorAll(".equipment_right>ul>li");
      var p = document.querySelectorAll(".equipment_right>ul>li>p");

      p.forEach((i, indexa) => {
        if (index === indexa) {
          i.style = "color:rgb(18,227,242);";
        } else {
          i.style = "color:rgb(255,255,255);";
        }
      });

      centerImg.forEach((i, indexa) => {
        if (index === indexa) {
          i.style = "left: -120% !important;";
        } else {
          i.style = "left: -90% !important;";
        }
      });
    },
    initScene() {
      if (
        document.querySelector(".equipment") != null &&
        !document.querySelector(".equipment").querySelector("canvas")
      )
        var loader = new THREE.FileLoader();
      loader.load(
        "https://test-1303915342.cos.ap-nanjing.myqcloud.com/nengyuan/Model.json",
        function(text) {
          var player = new APP.Player();
          player.load(JSON.parse(text));
          player.setSize(window.innerWidth, window.innerHeight);
          // 调用自定义的类下面的方法 change()以及add()
          var change = new ChangeInterface(player.assets());
          change.change();
          change.add();
          player.play();

          player.staticAssets = player.assets();

          // let a = new ChangeFn(player.assets());
          // a.test();

          window.addEventListener("resize", function() {
            player.setSize(window.innerWidth, window.innerHeight);
          });
        },

        function(xhr) {
          var div = document.querySelector(".father");
          var diva = document.querySelector(".son");
          var span = document.querySelector(".span");
          var a =
            ((xhr.loaded / xhr.total) * 100).toString().substring(0, 4) - 0;
          if (a.toString().length < 4 && a > 10) {
            a = a + "" + ".0";
          }
          if (!diva) return;
          diva.style.width = a + "%";
          span.innerHTML = a + "%";
          if (a >= 100) {
            div.remove();
          }
        }
      );
    },
  },
};
</script>
<style lang="less" scoped>
// .show {
//   transform: translateX(-30%);
//   background: url("../../../../assets/images/equipment1-1.png") no-repeat !important;
// }
.right {
  color: rgb(18, 227, 242);
}
</style>

<style lang="less" scoped>
.equipment {
  width: 100vw;
  height: 100vh;
  .father {
    width: 500px;
    height: 10px;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
  }
  .father span {
    color: #fff;
    position: absolute;
    right: -55px;
    top: 0;
    line-height: 10px;
    display: block;
    z-index: 1000;
  }
  .son {
    width: 0px;
    height: 10px;
    border-radius: 5px;
    background-color: #07a8eb;
  }
  .equipment_back {
    width: 200px;
    height: 40px;
    left: 80px;
    top: 40px;
    position: absolute;
    text-align: center;
    // background-color: rgb(15, 20, 54);
    z-index: 1000;
    i {
      width: 50px;
      height: 40px;
      font-size: 30px;
      float: left;
      color: rgb(9, 81, 152);
      margin-left: 20px;
      //   border: 1px solid red;
    }
    p {
      width: 60px;
      height: 40px;
      font-size: 30px;
      float: left;
      color: rgb(9, 81, 152);
    }
  }
  .equipment_title {
    width: 200px;
    height: 30px;
    position: absolute;
    left: 8%;
    top: 15%;
    span {
      color: white;
      text-align: center;
    }
    select {
      width: 90px;
      height: 25px;
      margin-left: 20px;
    }
  }
  .equipment_center {
    width: 718px;
    height: 508px;
    position: absolute;
    left: 31%;
    top: 26%;
    // border: 1px solid pink;
    overflow: hidden;
    p {
      width: 80%;
      height: 80%;
      // display: none;
      left: -90%;
      transition: all 0.5s !important;
      transform: translateY(12%);
      // transform: translateY(125%);
      position: absolute;
      // border: 1px solid red;
      left: 10% !important;
      background: url("../../../../assets/images/equipmentImg2.jpg") no-repeat !important;
      background-size: 100% 100% !important;
    }
  }
  .equipment_right {
    width: 250px;
    height: 500px;
    position: absolute;
    top: 20%;
    right: 2%;
    // border: 1px solid red;
    ul {
      width: 250px;
      height: 500px;
      display: flex;
      flex-direction: column;
      // border: 1px solid pink;
      li {
        width: 250px;
        height: 45px;
        flex: 1;
        transition: all 0.5s !important;
        margin-top: 40px;
        background: url("../../../../assets/images/equipment_new.png") no-repeat;
        background-size: 100% 100%;
        margin-left: 225px;
        position: relative;
        z-index: 100;
        // border: 1px solid red;
        i {
          position: absolute;
          margin-top: 28px;
          margin-left: 23px;
          width: 30px;
          height: 30px;
          font-size: 30px;
          color: white;
          transition: all 0.5s !important;
        }
        p {
          font-weight: bold;
          position: absolute;
          left: 80px;
          margin-top: 20px;
          font-size: 30px;
          color: white;
          font-family: "宋体";
          transition: all 0.5s !important;
          z-index: -100000;
          width: 150px;
          height: 50px;
          text-align: center;
          line-height: 50px;
          // border: 1px solid red;
        }
      }
      li:nth-child(1) p {
        color: rgb(18, 227, 242);
      }
    }
  }
  .equipment_left_bottom {
    width: 300px;
    height: 200px;
    bottom: 100px;
    left: 80px;
    position: absolute;
    background: url("../../../../assets/images/equipment_bottom.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>
