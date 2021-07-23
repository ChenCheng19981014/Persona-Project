<template>
  <div class="box" ref="box">
    <div class="top">
      <slot name="top"></slot>
    </div>
    <div class="resize" title="拉伸高度">
      <!-- <span>...</span> -->
    </div>
    <div class="bottom">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.dragControllerDiv()
  },
  methods: {
    dragControllerDiv () {
        var resize = document.getElementsByClassName('resize')[0]
        var top = document.getElementsByClassName('top')[0]
        var bottom = document.getElementsByClassName('bottom')[0]
        var box = document.getElementsByClassName('box')[0]
        resize.onmousedown = function (e) {
          // 颜色改变提醒
          resize.style.background = '#818181'
          // console.log(e, 'e')
          // console.log(resize.offsetTop, 'resize')
          var startH = e.clientY
          resize.top = resize.offsetTop
          // 鼠标拖动事件
          document.onmousemove = function (e) {
            var endH = e.clientY
            var moveLen = resize.top + (endH - startH) // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
            var maxT = box.clientHeight - resize.offsetHeight // 容器宽度 - 左边区域的宽度 = 右边区域的宽度

            if (moveLen < 150) moveLen = 150 // 左边区域的最小宽度为32px
            if (moveLen > maxT - 150) moveLen = maxT - 150 // 右边区域最小宽度为150px

            resize.style.top = moveLen // 设置左侧区域的宽度

            top.style.height = moveLen + 'px'
            bottom.style.height = (box.clientHeight - moveLen - 10) + 'px'
          }
          // 鼠标松开事件
          document.onmouseup = function (evt) {
            // 颜色恢复
            resize.style.background = '#f0f2f5'
            document.onmousemove = null
            document.onmouseup = null
            resize.releaseCapture && resize.releaseCapture() // 当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
          }
          resize.setCapture && resize.setCapture() // 该函数在属于当前线程的指定窗口里设置鼠标捕获
          return false
      }
    }
  }
}
</script>

<style scoped>
  .box {
    width: 100%;
    height: 100%;
    /* margin: 1% 0px; */
    background: #fff;
    overflow: auto;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  }
  /*上侧div样式*/
  .top {
    width:100%;
    height: 48.9%; /*左侧初始化高度*/
    background: #FFFFFF;
    overflow: auto;
    padding: 15px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  }
  /*拖拽区div样式*/
  .resize {
    cursor: row-resize;
    /* background-color: #d6d6d6; */
    background-color: #f0f2f5;
    /* border-radius: 5px; */
    height: 10px;
    line-height: 10px;
    text-align: center;
    /* font-size: 32px; */
    color: red;
  }
  /*拖拽区鼠标悬停样式*/
  .resize:hover {
    color: #444444;
  }
  /*下侧div'样式*/
  .bottom {
    width: 100%;
    min-height: 50%;
    background: #fff;
    /* overflow-y: auto; */
    padding: 15px;
    /* box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1); */
  }
</style>
