<template>
  <div class="flex flex-wrap">
    <div
      v-for="(item, index) in imageList"
      :key="index"
    >
      <div v-if="item.imageFullUrl!==''" class="img-box" @mouseover="changeIconShow('in',index)" @mouseleave="changeIconShow('out',index)">
        <img
          :src="item.imageFullUrl"
          alt="avatar"
          class="img"/>
        <div class="default-img" v-show="index===0 && showPictureMaskIndex!==0">默认图</div>
        <div v-show="showPictureMaskIndex===index" class="img-mask">
          <div @click="setDefault(index,item)">设为默认</div>
          <div @click="deleteImg(index)">删除</div>
          <!-- <a-icon type="check-circle" />
                        <a-icon type="delete" /> -->
        </div>
      </div>
      <a-upload
        v-else
        list-type="picture-card"
        class="avatar-uploader"
        :show-upload-list="false"
        :before-upload="beforeUpload"
        :customRequest="(event)=>handleUpload(event,index)"
      >
        <div >
          <a-icon type="plus" />
          <div class="ant-upload-text">
            上传图片
          </div>
        </div>
      </a-upload>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageList: {
      type: Array,
      default: () => []
    },
    maxImageLength: {
      type: Number,
      default: 5
    },
    isAbled: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      showPictureMaskIndex: null
    }
  },
  methods: {
    changeIconShow (type, i) {
      if (this.isAbled) {
        if (type === 'in') {
          this.showPictureMaskIndex = i
        } else {
          this.showPictureMaskIndex = null
        }
      }
    },
    beforeUpload (file) {
      const fileType = file.type
      const isLt2M = file.size / 1024 / 1024 < 3
      let flag = true
      if (fileType !== 'image/png' && fileType !== 'image/jpeg' && fileType !== 'image/jpg' && fileType !== 'image/gif') {
        this.$message.error('上传图片只能是 JPG/JPEG/PNG/GIF 格式!')
        flag = false
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过3MB')
      }
      return isLt2M && flag
    },
    async handleUpload (e, i) {
      // console.log(i, 'i')

      this.$emit('handle-upload', { file: e, index: i })
      // let res = await fetchUploadUrl({ fileName: e.file.name, bucket: this.uploadBucket })
      // await uploadImages({ url: res.data.uploadUrl, data: e.file, bucket: this.uploadBucket })
      // let res3 = await getUploadUrl([{ filePath: res.data.filePath, fileName: e.file.name }])
      // // console.log(res, 'res')
      // // console.log(res2, 'res2')
      // // console.log(res3, 'res3')
      // this.materialImgs[i].filePath = res.data.filePath
      // this.materialImgs[i].url = res3.data[0]
      // this.materialImgs = [...this.materialImgs]
      // if (this.materialImgs.length < this.maxImageLength) {
      //   this.materialImgs.push({
      //     filePath: '',
      //     url: ''
      //   })
      // }
      // console.log(this.materialImgs, 'res')
    },
    setDefault (index, item) {
      if (index !== 0) {
        this.$emit('set-default', { index, image: item })
        // this.materialImgs.splice(index, 1)
        // this.materialImgs.unshift(item)
      }
    },
    deleteImg (index) {
      this.showPictureMaskIndex = null
      this.$emit('delete-img', index)
      // this.materialImgs.splice(index, 1)
      // let len = 0
      // this.materialImgs.forEach(item => {
      //   if (item !== '') {
      //     len++
      //   }
      // })
      // if (len === this.maxImageLength - 1) {
      //   this.materialImgs.push({
      //     filePath: '',
      //     url: ''
      //   })
      // }
    }
  }
}
</script>

<style lang="less" scoped>
  .img-box{
    width: 104px;
    height: 104px;
    margin: 0 8px 8px 0;
    // padding: 8px;
    border: 1px solid #d9d9d9;
    position: relative;
    overflow: hidden;
    border-radius: 4px;
    .default-img{
      line-height: 24px;
      padding:0 4px;
      // border-radius: 4px;
      position: absolute;
      top: 0;
      right: 0;
      background-color: rgba(0,0,0,.5);
      color: #fff
    }
    .img{
      // width: 100%;
      position: absolute;
      height:100%;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
    .img-mask{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content:center;
      align-items: center;
      color:#fff;
      border-radius: 4px;
      // color:red;
      // font-size:30px;
      transition-property:background-color;
      transition-duration:0.3s;
      &:hover{
        background-color: rgba(0,0,0,.5);
      }
      div{
        cursor: pointer;
      }
    }
  }
</style>
