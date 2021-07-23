<template>
  <div
    class="y-handle"
    @mousedown="mouseDown"
  >
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'YHandle',
  data () {
    return {
      lastY: ''
    }
  },

  created () {
    document.addEventListener('mouseup', this.mouseUp)
  },

  destroyed () {
    document.removeEventListener('mouseup', this.mouseUp)
  },

  methods: {
    mouseDown (event) {
      document.addEventListener('mousemove', this.mouseMove)
      this.lastY = event.screenY
    },
    mouseMove (event) {
      // console.log('move')
      this.$emit('heightChange', this.lastY - event.screenY)
      this.lastY = event.screenY
    },
    mouseUp (event) {
      this.lastY = ''
      document.removeEventListener('mousemove', this.mouseMove)
    }
  }
}
</script>

<style scoped lang="less">
  .y-handle{
    width: 100%;
    // padding:10px 0;

    /* z-index:100 */
    display: flex;
    justify-content:center;
    div{
      // width: 100%;
      width: 10px;
      height: 10px;
      background:#aaa;
      cursor: row-resize;
    }
  }

</style>
