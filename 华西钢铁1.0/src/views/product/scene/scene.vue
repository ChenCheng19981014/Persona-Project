<template>
  <div class="scene">
    <div class="father">
      <span class="span">100%</span>
      <div class="son"></div>
    </div>
    <router-view></router-view>
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keep"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keep"></router-view> -->
  </div>
</template>
<script>
import * as THREE from "three";
import { APP } from "../assets/js/app.js";
import { VRButton } from "../assets/js/VRButton.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { ChangeInterface } from "../assets/js/Model.js";

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
    return {};
  },
  mounted() {
    this.initScene();
    // console.log(this.$route.meta.keep, "this.$route.meta.keep");
  },
  methods: {
    initScene() {
      if (
        document.querySelector(".scene") != null &&
        !document.querySelector(".scene").querySelector("canvas")
      )
        var loader = new THREE.FileLoader();
      let that = this;
      loader.load(
        this.$model,
        function(text) {
          var player = new APP.Player();
          player.load(JSON.parse(text));
          player.setSize(window.innerWidth, window.innerHeight);
          // 调用自定义的类下面的方法 change()以及add()
          var change = new ChangeInterface(player.assets());
          change.change();
          change.add();
          // console.log(that, "config");

          player.play(change.fn.animation);
          player.staticAssets = player.assets();

          that.$Bus.$on("changeCamera", change.fn.initCameraPosition);

          //   that.$EventBus.$on("eventName", () => {
          //     //需要执行的代码
          //     change.fn.CameraAnimate([97.38, 51.04, -112], [3.03, -3, -6.8], 3);
          //   });

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
.scene {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  // background: url("../../assets/images/Allbgc.png") no-repeat;
  // background-size: 100% 100%;
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
}
</style>
