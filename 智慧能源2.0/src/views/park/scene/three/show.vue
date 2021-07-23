<template>
  <div>
    <div class="show_title">
      <ul>
        <li
          @click="threeshow(index)"
          v-for="(i, index) in [{ name: '3D场景' }, { name: '列表' }]"
          :key="index"
        >
          {{ i.name }}
          <p></p>
        </li>
      </ul>
    </div>
    <div v-show="isthreeExhibition" class="show_left"></div>
    <div v-show="isthreeExhibition" class="show_right"></div>
    <div v-show="!isthreeExhibition" class="show_item"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isthreeExhibition: true,
    };
  },
  mounted() {
    this.threeshow(0);
  },
  methods: {
    threeshow(index) {
      this.isthreeExhibition = !this.isthreeExhibition;
      console.log(this.isthreeExhibition);
      if (index == 0) {
        this.isthreeExhibition = true;
      } else if (index == 1) {
        this.isthreeExhibition = false;
      }
      var show = document.querySelectorAll(".show_title>ul>li>p");
      var showli = document.querySelectorAll(".show_title>ul>li");
      showli.forEach((i, indexs) => {
        if (indexs == index) {
          i.style = "color:rgb(2,120,204);";
          console.log(i.childNodes[1]);
          i.childNodes[1].style = "display:block!important;";
        } else {
          i.style = "color:rgb(10,18,90);";
          i.childNodes[1].style = "display:none!important;";
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.show_title {
  width: 400px;
  height: 30px;
  margin-left: 50%;
  transform: translate(-50%, 0);
  margin-top: 100px;
  position: absolute;
  ul {
    width: 400px;
    height: 30px;
    display: flex;
    border-bottom: 2px solid white;
    li {
      flex: 1;
      width: 200px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      // border: 1px solid red;
      // color: rgb(0, 142, 215);
      p {
        width: 100px;
        height: 2px;
        margin-left: 50px;
        background-color: rgb(7, 108, 185);
      }
    }
    li:nth-child(2) {
      p {
        display: none;
      }
    }
  }
}
.show_item {
  width: 1400px;
  height: 590px;
  background: url("../../../../assets/images/show.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 50%;
  top: 200px;
  transform: translateX(-50%);
}
.show_left {
  width: 315px;
  height: 660px;
  position: absolute;
  left: 35px;
  top: 190px;
  background: url("../../../../assets/images/show_left.png") no-repeat;
  background-size: 100% 100%;
}
.show_right {
  width: 315px;
  height: 660px;
  right: 35px;
  top: 190px;
  position: absolute;
  background: url("../../../../assets/images/show_right.png") no-repeat;
  background-size: 100% 100%;
}
</style>
