<template>
  <div>
    <div class="container">
      <a-row type="flex" justify="space-around" class="card-container">
        <a-col :span="24" class="title">
          <h4>设计师推荐</h4>
        </a-col>
        <a-col :span="24" class="card">
          <img src="../img/1.jpeg" alt="" />
        </a-col>
        <a-col :span="24" class="card">
          <img src="../img/2.jpeg" alt="" />
        </a-col>
        <a-col :span="24" class="title">
          <h4>我的设计</h4>
        </a-col>
        <a-col :span="24" class="card">
          <img src="../img/1.jpeg" alt="" />
        </a-col>
        <a-col :span="24" class="card">
          <img src="../img/2.jpeg" alt="" />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Left',
  data() {
    return {
      msg: '123'
    }
  }
}
</script>

<style scoped lang="less">
.container {
  position: relative;
  overflow: hidden;
  .btns {
    display: block;
    width: 90%;
    height: 50px;
    margin: 10px 5%;
    text-align: center;
    font-size: 24px;
    line-height: 50px;
    span {
      margin: 0 10px;
    }
  }
  .slide-wrap {
    width: 90%;
    height: 100%;
    margin: 10px 5%;
    .slide-card {
      text-align: center;
      padding: 10px;
      // min-height: 300px;
      min-height: 90%;
      border: 1px solid #999;
      overflow: hidden;
    }
  }
  .card-container {
    padding: 20px 0;
    .title {
      height: 30px;
      text-align: center;
      h4 {
        // margin: 0 auto;
        // width: 20px;
        // height: 100%;
        height: 30px;
        text-align: left;
        font-size: 16px;
        font-weight: 600;
        line-height: 40px;
        // background: #7E8DB4;
      }
    }
    .card {
      // width: 200px;
      // background: #7E8DB4;
      height: calc(22vh - 80px);
      margin: 10px auto;
      overflow: hidden;
      img {
        // width: 200px;
        width: 100%;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
