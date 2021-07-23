<template>
  <div class="controller">
    <div v-show="this.$route.name != 'equipment'" class="controller_son">
      <!-- 鼠标移开调用函数 执行向下操作 -->
      <!-- 鼠标移入状态改为true不执行向下操作 -->
      <ul>
        <li
          @click="$parent.selectedIndex = index"
          :class="$parent.selectedIndex == index ? 'selectedindex' : ''"
          v-for="(i, index) in controllerList"
          :key="index"
        >
          <router-link :to="{ name: i.route }">
            <p :class="'iconfont ' + i.icon"></p>
            <span>{{ i.name }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { log } from "three";
export default {
  data() {
    return {
      controllerList: [
        { route: "data", name: "数据", icon: "icon-xinhao" },
        // { route: "information", name: "信息库", icon: "icon-d" },
        { route: "factory", name: "3D场景", icon: "icon-boxxiangzi" },
        {
          route: "show",
          name: "监控",
          icon: "icon-icon_xinyong_xianxing_jijin-",
        },
        // { route: "monitor", name: "3D演示", icon: "icon-shipin" },
      ],
      // 初设置状态为false
      showController: false,
    };
  },
  mounted() {
    this.inintOrde();
    // this.init();
  },
  methods: {
    inintOrde() {
      // 当前页面的路由名 $parent.selectedIndex定义到park中
      // 数组中对应的路由名对应上
      this.$parent.selectedIndex = this.controllerList.findIndex(
        (i) => i.route === this.$route.name
      );
    },
    initController() {
      var controller = document.querySelector(".controller_son");
      var controllerChild = document.querySelector(".controller_boy");
      console.log(controllerChild);

      if (this.controllerstate == true) {
        var time1 = setTimeout(() => {
          controller.style = "bottom: -110px;";
          controllerChild.style = "bottom: 100px;";
        }, 3000);
      }

      controllerChild.addEventListener("click", () => {
        controller.style = "bottom: -10px;";
        controllerChild.style = "bottom: -110px;";
        setTimeout(() => {
          controller.style = "bottom: -110px;";
          controllerChild.style = "bottom: 100px;";
        }, 3000);
      });

      controller.addEventListener("mouseover", () => {
        controller.style = "bottom: -10px;";
        controllerChild.style = "bottom: -10px;";
      });

      var time2 = controller.addEventListener("mouseleave", () => {
        setTimeout(() => {
          controller.style = "bottom: -110px;";
          controllerChild.style = "bottom: 200px;";
        }, 3000);
      });
    },
    init(flag) {
      var controller = document.querySelector(".controller_son");
      var controllerChild = document.querySelector(".controller_boy");
      // 点击上浮操作
      if (flag == "up") {
        controller.style.bottom = "-10px";
        controllerChild.style.bottom = "-100px";
      } else {
        setTimeout(() => {
          // 条件满足为false则执行return之后的代码
          if (this.showController) return;
          controller.style.bottom = "-120px";
          controllerChild.style.bottom = "80px";
        }, 3000);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.selectedindex {
  // background-image: linear-gradient(
  //   rgba(255, 255, 255, 0),
  //   rgba(3, 161, 233, 0.5)
  // ) !important;
  // a {
  //   color: rgb(24, 141, 240) !important;
  // }
  span {
    color: rgb(13, 240, 254) !important;
  }
}
.controller {
  .controller_son {
    height: 120px;
    width: 70%;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    bottom: -10px;
    z-index: 1;
    transition: all 0.3s;
    ul {
      height: 100%;
      width: 540px;
      display: flex;
      margin: auto;
      li {
        margin-left: 25px;
        flex: 1;
        height: 50px;
        min-width: 120px;
        text-align: center;
        background: url("../../assets/images/controller_kuang.png") no-repeat;
        background-size: 100% 100%;
        a {
          font-family: "宋体";
          font-weight: bold;
          color: #fff;
          text-decoration: none;
          display: block;
          width: 100%;
          height: 100%;
          margin-left: -54px;
          margin-top: 17px;
        }
        span {
          margin-left: 40px;
          margin-top: -16px;
          letter-spacing: 6px;
          position: absolute;
          color: white;
        }
      }
    }
  }
  .controller_boy {
    bottom: -10%;
    left: 50%;
    transform: translateX(-25%);
    width: 100px;
    height: 50px;
    background-color: rgb(0, 142, 215);
    border-radius: 5%;
    position: absolute;
    text-align: center;
    color: white;
    transition: all 0.3s;
    z-index: 200;
    i {
      font-size: 50px;
      color: rgb(221, 221, 221);
    }
  }
}
</style>
