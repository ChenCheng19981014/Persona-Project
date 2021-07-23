<template>
  <div class="introduce">
    <div class="kanban"></div>
    <div class="tab">
      <ul>
        <li
          @click="(selectedIndex = index), changeTab(i), changeRun()"
          :class="selectedIndex == index ? 'tab_active' : ''"
          v-for="(i, index) in introduceList"
          :key="index"
        >
          <i :class="'iconfont ' + i.icon"></i>
          <strong>{{ i.name }}</strong>
        </li>
      </ul>
    </div>
    <div
      class="run"
      v-show="selectedIndex == 0"
      @click="(isRun = !isRun), changeRun()"
      :style="isRun ? 'background-color:rgb(255,127,0);' : ''"
    >
      <i class="iconfont icon-fengji"></i> 运行
    </div>

    <div class="info">
      <div class="info_title">
        <strong>产品特点</strong>
      </div>
      <p>
        江苏华塔技术使用双进风HBY型闭式 冷却塔，运行时蒸发量降低到原来的
        1/3，耗电量降低一半，系统运行稳定 不结垢，为客户创造价值，嬴得客户
        赞赏。
      </p>
    </div>
    <div class="father">
      <span class="span">0%</span>
      <div class="son"></div>
    </div>
    <div v-show="lastSelect === '部件介绍'" class="fn_list">
      <ul>
        <li
          @click="(fnListSelected = index), hideOtherObj(i, index)"
          :class="fnListSelected === index ? 'fn_active' : ''"
          v-for="(i, index) in fnData"
          :key="index"
        >
          <p>
            <i :class="'iconfont ' + i.icon"></i>
            <img v-if="i.img" :src="i.img" alt="" />
          </p>
          <div>
            {{ i.name }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
//import * as THREE from "three";
import * as THREE from "../three.module.js";
import { APP } from "../assets/scene/app.js";
import { VRButton } from "../assets/scene/VRButton.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  CSS3DRenderer,
  CSS3DObject
} from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import { ChangeInterface } from "../assets/scene/Change.js";
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
window.CSS3DRenderer = CSS3DRenderer;
window.CSS3DObject = CSS3DObject;
window.TrackballControls = TrackballControls;
export default {
  data() {
    return {
      introduceList: [
        {
          name: "产品展示",
          icon: "iconziyuanzhuye"
        },
        {
          name: "产品尺寸",
          icon: "iconquanbu"
        },
        {
          name: "部件介绍",
          icon: "iconjieshaoxinxi"
        },
        {
          name: "结构拆解",
          icon: "iconfenjie"
        }
      ],
      selectedIndex: 0,
      boomLevel: 0,
      boomTimer: "",
      isRun: false,
      arrow: [],
      assets: {},
      lastSelect: "3D场景",
      change: {},
      // 功能区
      fnData: [
        {
          icon: "iconfengji",
          name: "风机"
        },
        {
          icon: "iconlongtouhuasa",
          name: "淋浴头"
        },
        {
          icon: "iconzhijiaoguandao",
          name: "喷淋管"
        },
        {
          icon: "",
          img: require("../assets/images/tianliao.png"),
          // activeImg: require("../assets/images/tianliao_active.png"),
          name: "填料"
        },
        {
          icon: "iconxiansuo",
          name: "盘管"
        },
        {
          icon: "iconshuibeng",
          name: "水泵"
        }
      ],
      fnListSelected: 0
    };
  },
  mounted() {
    var that = this;
    var loader = new THREE.FontLoader();
    loader.load(
      "https://test2-1303915342.cos.ap-shanghai.myqcloud.com/gentilis_regular.typeface.json",
      function(font) {
        window.font = font;
        that.initScene();
      }
    );
  },
  methods: {
    async initScene() {
      var loader = new THREE.FileLoader();
      let that = this;

      loader.load(
        this.$modelUrl,
        text => {
          window.player = new APP.Player();
          player.load(JSON.parse(text));
          player.setSize(window.innerWidth, window.innerHeight);
          // 调用自定义的类下面的方法 change()以及add()
          this.change = new ChangeInterface(player.assets());
          this.change.change();
          this.change.add();
          player.play();
          this.assets = player.assets();
          this.arrow = player.removeArrow();
          player.staticAssets = player.assets();
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
            div.style.display = "none";
            that.sceneNow = 1;
          }
        }
      );
    },
    changeTab(i) {
      let pPlane3 = this.assets.scene.getObjectByName("pPlane3").visible;
      if (!pPlane3) pPlane3 = true;
      this.showAllObj();
      if (document.body.clientWidth <= 768) {
        this.change.fn.photoBestPosition();
      } else {
        this.change.fn.windowBestPosition();
      }
      switch (i.name) {
        case "产品展示":
          this.changeScalar(true);
          this.assets.scene.getObjectByName("waike_grp").visible = true;
          break;
        case "产品尺寸":
          this.isRun = false;
          this.changeScalar(true);
          this.assets.scene.getObjectByName("waike_grp").visible = true;
          break;
        case "部件介绍":
          this.isRun = false;
          this.changeScalar(true);
          this.hideOtherObj({ name: "a" }, 0);
          this.assets.scene.getObjectByName("waike_grp").visible = false;
          break;
        case "结构拆解":
          this.isRun = false;
          this.changeScalar(false);
          this.assets.scene.getObjectByName("waike_grp").visible = true;
          break;
      }
      if (i.name === "产品尺寸") {
        this.change.fn.showRule();
      } else {
        this.change.fn.hideRule();
      }
      this.lastSelect = i.name;
    },
    hideRuler(showRules) {
      var eleList = [".element", ".element2", ".element3", ".element4"];
      if (!showRules) {
        eleList.forEach(i => {
          var a = document.querySelector(i);
          a.classList = i.substr(1) + " none";
        });
      } else {
        eleList.forEach(i => {
          var a = document.querySelector(i);
          a.classList = i.substr(1) + " block";
        });
      }
    },
    changeRun(state) {
      let fengjiList = [];
      this.assets.scene.traverse(i =>
        i.name.indexOf("fengji") != -1 ? fengjiList.push(i) : ""
      );
      let rotate = () => {
        fengjiList.forEach((i, index) => {
          i.rotation.y += 0.2;
        });
        if (!this.isRun) return;
        window.requestAnimationFrame(rotate);
      };
      rotate();

      this.arrow.forEach((i, index) => {
        if (this.isRun) i.visible = true;
        else i.visible = false;
      });
    },
    changeScalar(flag) {
      if (flag) {
        if (this.boomTimer) clearInterval(this.boomTimer);
        this.boomTimer = setInterval(() => {
          if (this.boomLevel <= 0) return clearInterval(this.boomTimer);
          this.boomLevel--;
          window.player.scalarBoom(this.boomLevel);
        }, 1);
      } else {
        if (this.boomTimer) clearInterval(this.boomTimer);
        this.boomTimer = setInterval(() => {
          if (this.boomLevel > 70) return clearInterval(this.boomTimer);
          this.boomLevel++;
          window.player.scalarBoom(this.boomLevel);
        }, 1);
      }
    },
    hideOtherObj(data, index) {
      let { name } = data;
      console.log("name");
      let objList = [
        "group35",
        "pengtou_grp",
        "pCylinder8",
        "polySurface3162",
        "pCylinder46",
        "pCylinder9"
      ];
      this.assets.scene.traverse((i, index) => {
        this.changeOpacity(i, true);
      });
      this.assets.scene.getObjectByName("pPlane3").visible = false;
      this.assets.scene.traverse(i => {
        if (i.name.indexOf(objList[index]) !== -1) {
          if (i.type === "Group") {
            this.changeOpacity(i, false);
          } else if (i.type === "Mesh") {
            i.material.opacity = 1;
          }
        }
      });
    },
    changeOpacity(data, flag) {
      data.children.forEach(i => {
        if (i.type == "Group") {
          this.changeOpacity(i, flag);
        } else if (
          i.type == "Mesh" &&
          i.name != "background-image" &&
          i.name !== "pPlane4"
        ) {
          i.material.transparent = flag;
          i.material.opacity = 0.3;
        }
      });
    },
    showAllObj() {
      this.assets.scene.traverse((i, index) => {
        this.changeOpacity(i, false);
      });
    }
  }
};
</script>
<style>
.none {
  display: none !important;
}
.block {
  display: block !important;
}
</style>
<style lang="less">
.introduce {
  .element {
    color: #fff;
    width: 100px;
    //height:200px;
    position: absolute;
    left: -21px;
    opacity: 0.5;
    background-color: rgb(230, 230, 230);
  }
  .smallerThan {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: translateY(0%) translateX(-100%);
    display: block;
  }
  .biggerThan {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: translateY(0%) translateX(100%);
    //transform: translateY(-50px);
    display: block;
  }
  .number {
    position: absolute;
    width: 100%;
    font-size: 6px;
    display: block;
    transform: translateX(0%);
  }

  .element2 {
    color: #fff;
    width: 43px;
    //height:200px;
    position: absolute;
    left: 30px;
    opacity: 0.5;
  }
  .smallerThan2 {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: translateY(0%) translateX(-100%);
    display: block;
  }
  .biggerThan2 {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: translateY(0%) translateX(100%);
    //transform: translateY(-50px);
    display: block;
  }
  .number2 {
    position: absolute;
    width: 100%;
    font-size: 6px;
    display: block;
    transform: translateX(-25%);
  }

  .element3 {
    color: #fff;
    width: 60px;
    //height:200px;
    position: absolute;
    left: 30px;
    top: 65px;
    opacity: 0.5;
  }
  .smallerThan3 {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: translateY(0%) translateX(-100%);
    display: block;
  }
  .biggerThan3 {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: translateY(0%) translateX(100%);
    //transform: translateY(-50px);
    display: block;
  }
  .number3 {
    position: absolute;
    width: 100%;
    transform: rotateZ(-90deg) translateY(-100%) translateX(-40%);
    display: block;
  }
}
.element4 {
  color: #fff;
  width: 60px;
  //height:200px;
  position: absolute;
  left: 30px;
  top: 65px;
}
.smallerThan4 {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translateY(0%) translateX(-100%);
  display: none;
}
.biggerThan4 {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translateY(0%) translateX(100%);
  display: none;
  //transform: translateY(-50px);
}
.number4 {
  position: absolute;
  width: 100%;
  font-size: 6px;
  transform: rotateZ(-90deg) translateY(-100%) translateX(50%);
  display: none;
}
</style>
<style lang="less" scoped>
@media (min-width: 0px) and (max-width: 768px) {
  .introduce {
    min-width: 350px !important;
    .tab {
      width: 100vw !important;
      top: 32px + 50px !important;
      left: 0 !important;
      padding: 0 20px;
      height: 60px !important;
      box-sizing: border-box;
      ul {
        width: 100%;
        height: 100%;
        display: flex;
        li {
          text-align: center;
          height: 60px !important;
          background: url("/") !important;
          flex: 1;
          padding: 0 !important;
          margin: 0 5px !important;
          transform: translate(0, 0) !important;
          i {
            padding: 0 !important;
            margin: 0 auto !important;
            line-height: 40px;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            background-color: rgb(159, 159, 159);
            box-sizing: border-box;
            font-size: 16px !important;
            display: block;
          }
          strong {
            color: rgb(159, 159, 159);
            font-size: 16px;
          }
        }
      }
    }
    .run {
      bottom: 220px !important;
      left: 50%;
      transform: translate(-50%, 0);
      background-color: rgba(0, 0, 0, 0) !important;
      color: #fff !important;
    }
    .info {
      left: 0 !important;
      width: 95vw !important;
      padding: 0 2.5vw !important;
      bottom: 81px !important;
      .info_title {
        box-sizing: border-box;
      }
    }
    .fn_list {
      display: none;
    }
  }
}
.fn_active {
  color: #ff7f00 !important;
  border: 1px solid #ff7f00 !important;
  p {
    i {
      color: #ff7f00 !important;
    }
  }
}
.tab_active {
  color: #ff7f00 !important;
  background: url("../assets/images/introduce_active_bgc.png") no-repeat !important;
  background-size: 100% 100% !important;
  transform: translate(0, 0) !important;
  strong {
    color: #ff7f00 !important;
  }
}
.introduce {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  .tab {
    z-index: 1;
    position: absolute;
    right: 0;
    top: 240px;
    width: 248px;
    height: 500px;
    > ul {
      li {
        height: 45px;
        width: 100%;
        margin-bottom: 50px;
        font-size: 20px;
        padding-left: 20px;
        box-sizing: border-box;
        color: #fff;
        background: url("../assets/images/introduce_bgc.png") no-repeat;
        background-size: 100% 100%;
        position: relative;
        cursor: pointer;
        transform: translate(37px, 0);
        transition: all 0.3s;
        i {
          font-size: 30px;
          line-height: 45px;
          margin: 2px 20px;
        }
        strong {
          line-height: 30px !important;
        }
      }
    }
  }
  .run {
    position: absolute;
    z-index: 1000;
    right: 130px;
    bottom: 85px;
    width: 80px;
    height: 30px;
    color: #fff;
    text-align: center;
    line-height: 30px;
    transition: all 0.3s;
    background-color: rgb(136, 136, 136);
    border-radius: 5px;
    cursor: pointer;
  }
  .info {
    width: 290px;
    position: absolute;
    left: 40px;
    bottom: 90px;
    .info_title {
      height: 25px;
      width: 100%;
      border-bottom: 1px solid rgb(136, 136, 136);
      strong {
        color: #ff7f00;
      }
      margin-bottom: 8px;
    }
    p {
      line-height: 30px;
    }
  }
  .fn_list {
    position: absolute;
    z-index: 10000;
    top: 160px;
    left: 35px;
    ul {
      width: 130px;
      li {
        height: 40px;
        margin-bottom: 25px;
        border: 1px solid #000;
        box-sizing: border-box;
        cursor: pointer;
        p {
          line-height: 38px;
          width: 38px;
          height: 38px;
          background-color: #fff;
          text-align: center;
          float: left;
          i {
            color: rgb(112, 112, 112);
            font-size: 26px;
            line-height: 38px;
          }
          img {
            margin-top: 6px;
            width: 26px;
            height: 26px;
          }
        }
        div {
          float: right;
          width: 130px - 38px - 2px;
          text-align: center;
          line-height: 38px;
          font-size: 18px;
        }
      }
    }
  }
  .father {
    min-width: 300px;
    height: 10px;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    span {
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
  }
}
</style>
<style lang="less">
.three {
  position: absolute;
  //margin: auto;
  top: 52%;
  left: 52%;
  width: 1300px;
  height: 800px;
  transform: translate(-50%, -50%);
}
</style>
