<template>
  <div>
    <div class="company">
      <div class="swiper">
        <ul
          @touchstart="mouseenter"
          @touchmove="mousemove"
          @touchend="mouseleave"
        >
          <li
            @touchstart="slider = index"
            :class="slider === index ? 'swiper_active' : ''"
            @click="changeSlider(index)"
            v-for="(i, index) in imagesList"
            :style="
              'background:url(' + i + ') no-repeat;background-size:100% 100%'
            "
            :key="index"
          ></li>
        </ul>
      </div>
      <div class="swiper_slider">
        <ul>
          <li
            :class="slider == index ? 'slider_active' : ''"
            @click="changeSlider(index)"
            v-for="(i, index) in 3"
            :key="index"
          ></li>
        </ul>
      </div>
    </div>
    <div class="word_area"></div>
  </div>
</template>
<script>
import { log } from "three";
export default {
  data() {
    return {
      slider: 1,
      imagesList: [...Array(3)].map((i, index) => {
        return require("../assets/images/image" + (index + 1) + ".jpg");
      }),
      enter: false,
      enterLocal: 0,
      lastSeconds: "",
      lastMilliseconds: ""
    };
  },
  mounted() {
    this.changeSlider(1);
  },
  methods: {
    changeSlider(index) {
      var ul = document.querySelector(".swiper>ul");
      if (document.body.clientWidth < 730) {
        var nowlocal = ul.childNodes[0].clientWidth * index;
        ul.style.transform = "translateX(" + -nowlocal + "px)";
      } else {
        ul.style.transform = "translateX(" + -73 * index + "vw)";
      }
      this.slider = index;
    },
    mousemove(e) {
      var ul = document.querySelector(".swiper>ul");
      //现在的索引 需要是负值
      var nowlocal = ul.childNodes[0].clientWidth * -this.slider;
      console.log(nowlocal + e.changedTouches[0].pageX + -this.enterLocal);
      // this.enterLocal 是手指点击的位置
      // pageX是手指的位置
      ul.style.transform =
        "translateX(" +
        (nowlocal + e.changedTouches[0].pageX + -this.enterLocal) +
        "px)";
    },
    mouseenter(e) {
      let time = new Date();
      this.lastSeconds = time.getSeconds();
      this.lastMilliseconds = time.getMilliseconds();
      this.enterLocal = e.changedTouches[0].pageX;
      // this.slider = index;
      this.enter = true;
    },
    mouseleave(e) {
      var ul = document.querySelector(".swiper>ul");
      var nowlocal = ul.childNodes[0].clientWidth;
      let flag = e.changedTouches[0].pageX > this.enterLocal;
      let time = new Date();
      if (time.getSeconds() === this.lastSeconds) {
        if (time.getMilliseconds() - this.lastSeconds <= 600) {
          console.log("okooooooooooo");
          move.call(this);
          return;
        }
      } else if (time.getSeconds() - this.lastSeconds === 1) {
        console.log(time.getSeconds(), this.lastSeconds, "cccccccccccccccccc");
        let all = time.getMilliseconds() + 1000;
        console.log(all, this.lastSeconds, 600, "aaaaaaaaaaaaaaa");
        if (all - this.lastSeconds <= 600) {
          console.log("okkkkkkkkkkkkk");
          move.call(this);
          return;
        }
      }
      if (
        Math.abs(e.changedTouches[0].pageX - this.enterLocal) >
        nowlocal / 5
      ) {
        move.call(this);
      } else {
        this.changeSlider(this.slider);
      }
      function move() {
        console.log(this);
        if (flag) {
          if (this.slider == 0) {
            this.changeSlider(this.slider);
            return;
          }
          this.changeSlider(this.slider - 1);
        } else {
          if (this.slider == 2) {
            this.changeSlider(this.slider);
            return;
          }
          this.changeSlider(this.slider + 1);
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.seleced_color {
  strong {
    color: #000 !important;
  }
  i {
    color: #000 !important;
  }
}
@media (min-width: 0px) and (max-width: 768px) {
  .company {
    width: 95vw !important;
    height: 336px !important;
    box-sizing: border-box;
    position: absolute;
    top: 70px !important;
    min-width: 313px;
    background-color: pink;
    margin: 0 2.5vw !important;
    .swiper {
      width: 400vw;
      height: 100%;
      ul {
        height: 100%;
        transition: all 0.3s;
        li {
          width: 100vw !important;
          margin: 0 !important;
          height: 336px !important;
          float: left;
          background-color: #777;
          opacity: 0.5;
          transition: all 0.3s;
        }
        li:first-child {
          margin-left: 0 !important;
        }
      }
    }
    .swiper_slider {
      display: none;
    }
  }
  .word_area {
    width: 95vw;
    height: 126px;
    margin: 0 2.5vw;
    background-color: skyblue;
    position: absolute;
    top: 70px + 330px + 17px;
  }
}
.slider_active {
  background-color: rgb(160, 160, 160) !important;
  transition: all 0.5s;
}
.swiper_active {
  opacity: 1 !important;
}
.company {
  width: 100%;
  height: 800px;
  position: absolute;
  overflow: hidden;
  top: 200px;
  .swiper {
    width: 400vw;
    height: 66vh;
    ul {
      height: 100%;
      transition: all 0.3s;
      li {
        width: 64vw;
        margin: 0 100px;
        height: 100%;
        float: left;
        background-color: #777;
        opacity: 0.5;
        transition: all 0.3s;
      }
      li:first-child {
        margin-left: 17vw;
      }
    }
  }
  .swiper_slider {
    margin-top: 7vh;
    height: 50px;
    box-sizing: border-box;
    ul {
      width: 225px;
      margin: 0 auto;
      li {
        float: left;
        width: 55px;
        margin-right: 30px;
        height: 6px;
        background-color: #fff;
        cursor: pointer;
      }
      li:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
