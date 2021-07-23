<template>
  <div class="information">
    <div class="information_title">
      <ul>
        <li
          v-for="(i, index) in [
            { name: '平台', sele: '全部' },
            { name: '设备', sele: '全部' },
            { name: '型号', sele: '全部' },
            { name: '供应商', sele: '全部' },
          ]"
          :key="index"
        >
          {{ i.name }}
          <select autofocus>
            <option value="" disabled selected hidden>全部</option>
            <option class="option" value="guangfu">光伏</option>
            <option class="option" value="inverter">逆变器</option>
            <option class="option" value="charge">充电桩</option>
          </select>
        </li>
        <p class="serach">搜索供应商<i class="iconfont icon-fangdajing"></i></p>
      </ul>
      <span @click="showadd"></span>
    </div>
    <div class="information_center ">
      <div class="information_center_child"></div>
    </div>
    <div class="information_center tab2"></div>
    <div class="information_center tab3"></div>
    <div class="information_foot">
      <ul>
        <li
          @click="($parent.selectedIndex2 = index), showshebei(index)"
          :class="$parent.selectedIndex2 == index ? 'selectedIndex' : ''"
          v-for="(i, index) in [
            { name: '设计图' },
            { name: '设备库' },
            { name: '供应商' },
          ]"
          :key="index"
        >
          {{ i.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showcentercenter: "false",
    };
  },
  mounted() {
    this.showshebei(0);
  },
  methods: {
    showadd() {
      this.showcentercenter = !this.showcentercenter;
      var add = document.querySelector(".information_center_child");
      if (this.showcentercenter == false) {
        add.style = "display:none";
      } else {
        add.style = "display:block";
      }
    },
    showshebei(index) {
      var information_center = document.querySelectorAll(".information_center");
      var serach = document.querySelector(".serach");
      let flag = "block";
      if (index == 0) {
        flag = "none";
      }
      serach.style.display = flag;
      information_center.forEach((i, indexa) => {
        if (indexa == index) {
          i.style = "display:block!important;";
        } else {
          i.style.display = "none";
        }
      });
    },
  },
};
</script>
<style lang="less">
select {
  background-color: rgba(0, 0, 0, 0) !important;
  color: #fff !important;
}
option {
  width: 40px;
  height: 20px;
  background-color: rgba(15, 20, 54, 1);
  color: #fff;
}
.selectedIndex {
  background: linear-gradient(
    rgb(13, 31, 71),
    rgb(9, 62, 121),
    rgb(1, 112, 199)
  );
}
</style>
<style lang="less" scoped>
.tab2 {
  background: url("../../assets/images/information_center2.png") no-repeat !important;
  background-size: 100% 100% !important;
}
.tab3 {
  background: url("../../assets/images/information_center3.png") no-repeat !important;
  background-size: 100% 100% !important;
}
.information {
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  .information_title {
    width: 810px;
    // border: 1px solid red;
    height: 20px;
    margin-left: 100px;
    margin-top: 130px;
    ul {
      float: left;
      // border: 1px solid blue;
      width: 700px;
      display: flex;
      color: white;
      li {
        float: left;
        flex: 1;
        .sele {
          margin-top: -30px;
          margin-left: -2px;
          height: 10px;
          width: 100px;
          position: absolute;
          background-color: rgb(15, 20, 54);
          // border: 1px solid red;
        }
      }
      li:nth-child(2) {
        float: left;
        flex: 1;
        .sele {
          margin-top: -30px;
          margin-left: -2px;
          height: 10px;
          width: 100px;
          position: absolute;
          background-color: rgb(15, 20, 54);
          // border: 1px solid red;
        }
      }
      .serach {
        width: 200px;
        height: 20px;
        float: left;
        text-align: center;
        letter-spacing: 7px;
        border: 1px solid #fff;
        box-sizing: border-box;
        color: white;
        display: none;
        border: 1px solid red;

        i {
          float: right;
          line-height: 20px;
          margin-right: 10px;
          color: white;
        }
      }
    }

    span {
      width: 85px;
      height: 22px;
      text-align: center;
      float: right;
      right: 100px;
      top: 140px;
      position: absolute;
      background: url("../../assets/images/information_add.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .information_center {
    width: 90%;
    height: 65%;
    margin-top: 30px;
    margin-left: 5%;
    background: url("../../assets/images/information_center1.png") no-repeat;
    background-size: 100% 100%;
    display: none;
    .information_center_child {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 582px;
      height: 355px;
      background: url("../../assets/images/information_center_child.png")
        no-repeat;
      background-size: 100% 100%;
      display: none;
    }
  }

  .information_foot {
    width: 200px;
    height: 30px;
    position: absolute;
    margin-left: 700px;
    // border: 1px solid red;
    ul {
      display: flex;
      li {
        margin-top: 10px;
        line-height: 25px;
        margin-left: 5px;
        text-align: center;
        border: 1px solid white;
        color: white;
        flex: 1;
        height: 28px;
      }
    }
  }
}
</style>
