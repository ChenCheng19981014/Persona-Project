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
      <div class="outside_scroll">
        <div class="inside_scroll">
          <ul>
            <li
              ondragstart="return false"
              onselectstart="return false;"
              @click="changePlayVideo(index)"
              v-for="(i, index) in videoList"
              :key="index"
            ></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { log } from "three";
export default {
  data() {
    return {
      floor: 0,
      videoList: [...Array(10)].map(
        _ =>
          "https://test-1303915342.cos.ap-nanjing.myqcloud.com/eLinkShow/bandicam%202020-11-13%2013-07-09-648.mp4"
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
              "https://test-1303915342.cos.ap-nanjing.myqcloud.com/eLinkShow/bandicam%202020-11-13%2013-07-09-648.mp4"
          }
        ],
        //你的封面地址
        poster: "../assets/images/BGImage.png",
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
    let video = document.querySelector(".video_list");
    var height = document.querySelector(".video").childNodes[0].clientHeight;
    video.style.height = height + "px";
    if (document.body.clientWidth < 768) {
      let list = document.querySelector(".video_list");
      list.className = "photo_video_list";
      console.log([list]);
    }
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
@media (min-width: 0px) and (max-width: 768px) {
  .case_info {
    .video {
      height: 60vh !important;
      width: 95vw !important;
      top: 70px !important;
      left: 0 !important;
      margin: 0 2.5vw;
    }
    .photo_video_list,
    .video_list {
      z-index: 10000;
      position: absolute;
      bottom: 67px !important;
      right: 0 !important;
      height: 15vh !important;
      width: 100vw !important;
      .outside_scroll {
        width: 95vw !important;
        margin: 0 2.5vw;
        .inside_scroll {
          width: 100vw;
          overflow-x: scroll;
          ul {
            width: 320vw !important;
            height: 10vh !important;
            li {
              min-height: 65px !important;
              width: 25vw !important;
              margin: 2.5vw;
              box-sizing: border-box;
              height: 10vh !important;
              float: left;
            }
          }
        }
      }
    }
  }
}
.case_info {
  width: 100vw;
  height: 100vh;
  background-color: rgb(230, 230, 230);
  position: relative;
  min-height: 300px !important;

  .video {
    width: 65%;
    height: 70%;
    position: absolute;
    top: 200px;
    left: 10%;
  }
  .photo_video_list {
    .outside_scroll {
      width: 207px;
      height: 100%;
      overflow: hidden;
    }
    .inside_scroll {
      width: 240px;
      height: 100%;
      overflow-y: scroll;
    }
    ul {
      width: 207px;
      position: relative;
      transition: all 0.3s;
      li {
        height: 119px;
        width: 207px;
        background-color: #777;
        background: url(../assets/images/BGImage.png) no-repeat;
        background-size: 100% 100%;
        margin-bottom: 35px;
      }
    }
  }
  .video_list {
    width: 240px;
    height: 70%;
    position: absolute;
    top: 200px;
    right: 100px;
    .outside_scroll {
      width: 207px;
      height: 100%;
      overflow: hidden;
    }
    .inside_scroll {
      width: 240px;
      height: 100%;
      overflow-y: scroll;
    }
    ul {
      width: 207px;
      position: relative;
      transition: all 0.3s;
      li {
        height: 119px;
        width: 207px;
        background-color: #777;
        background: url(../assets/images/BGImage.png) no-repeat;
        background-size: 100% 100%;
        margin-bottom: 35px;
      }
    }
  }
}
</style>
