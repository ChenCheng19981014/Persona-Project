<template>
  <div class="case_info">
    <div class="video">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
      >
      </video-player>
    </div>
    <div class="video_list">
      <i @click="changeList('up')" class="iconfont iconxiala-copy"></i>
      <ul>
        <li
          @click="changePlayVideo(index)"
          v-for="(i, index) in videoList"
          :key="index"
        ></li>
      </ul>
      <i @click="changeList()" class="iconfont iconxiala"></i>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      floor: 0,
      videoList: [...Array(10)].map(
        _ =>
          "http://video.linktwins.com/sv/2fedad7e-177382c1754/2fedad7e-177382c1754.mp4"
      ),
      playerOptions: {
        //播放速度
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        //如果true,浏览器准备好时开始回放。
        autoplay: false,
        // 默认情况下将会消除任何音频。
        muted: false,
        // 导致视频一结束就重新开始。
        loop: false,
        // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        preload: "auto",
        language: "zh-CN",
        // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        aspectRatio: "16:9",
        // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        fluid: true,
        sources: [
          {
            //类型
            type: "video/mp4",
            //url地址
            src:
              "http://video.linktwins.com/sv/2fedad7e-177382c1754/2fedad7e-177382c1754.mp4"
          }
        ],
        //你的封面地址
        poster: "../assets/images/bgc.png",
        //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        notSupportedMessage: "此视频暂无法播放，请稍后再试",
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          //全屏按钮
          fullscreenToggle: true
        }
      }
    };
  },
  mounted() {
    console.log(this.videoList);
  },
  methods: {
    changeList(type) {
      var ul = document.querySelector(".video_list > ul");
      var li = ul.childNodes[0].clientHeight + 20;
      console.log(this.floor);
      if (type == "up") {
        if (this.floor == 0) return;
        ul.style.transform = "translateY(" + -li * --this.floor + "px)";
      } else {
        if (this.floor == this.videoList.length - 4) return;
        ul.style.transform = "translateY(" + -li * ++this.floor + "px)";
      }
    },
    changePlayVideo(index) {
      this.playerOptions.sources[0].src = this.videoList[index];
      console.log(index);
    }
  }
};
</script>
<style lang="less" scoped>
.case_info {
  width: 100vw;
  height: 100vh;
  background-color: rgb(230, 230, 230);
  position: relative;
  .video {
    width: 65%;
    height: 70%;
    background-color: #444;
    position: absolute;
    top: 200px;
    left: 10%;
  }
  .video_list {
    width: 18%;
    height: 81%;
    background-color: #666;
    position: absolute;
    right: 50px;
    top: 140px;
    overflow: hidden;
    i {
      display: block;
      text-align: center;
      height: 10%;
      line-height: 100vh * 0.7 * 0.1;
      font-size: 30px;
      background-color: #000;
      color: #fff;
      cursor: pointer;
      transition: all 0.3s;
      position: relative;
      z-index: 10;
    }
    i:hover {
      background-color: #333;
    }
    ul {
      height: 80%;
      width: 100%;
      position: relative;
      transition: all 0.3s;
      margin-top: 20px;
      li {
        margin: 0 10% 15px 10%;
        height: 153px;
        width: 80%;
        background-color: #777;
        background: url(../assets/images/bgc.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
