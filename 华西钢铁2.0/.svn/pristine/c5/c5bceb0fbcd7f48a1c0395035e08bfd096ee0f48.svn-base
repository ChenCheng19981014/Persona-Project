<template>
  <div class="data">
    <div class="data_title">
      <ul>
        <li
          v-for="(i, index) in [
            { name: '产量统计' },
            { name: '产值统计' },
            { name: '原料存储' },
            { name: '工业水处理' },
            { name: '废弃处理' },
          ]"
          :key="index"
        >
          {{ i.name }}
        </li>
      </ul>
    </div>
    <div class="data_date">
      <ul>
        <li
          v-for="(i, index) in [{ name: '年' }, { name: '月' }, { name: '日' }]"
          :key="index"
        >
          {{ i.name }}
        </li>
      </ul>
    </div>
    <div class="data_year">2020▼年3▼月3▼日--2020▼年5▼月3▼日</div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  // watch: {
  //   $route: function(ne, old) {
  //     console.log("测试");
  //     if (ne.fullPath == "/product/data") {
  //       console.log("??");
  //       this.initEcharts();
  //     }
  //   },
  // },
};
</script>
<style lang="less" scoped>
.data {
  .data_title {
    width: 605px;
    height: 27px;
    top: 150px;
    left: 146px;
    position: absolute;
    // border: 1px solid pink;
    > ul {
      display: flex;
      > li {
        max-width: 105px;
        height: 27px;
        flex: 1;
        // border: 1px solid green;
        margin-left: 20px;
        color: white;
        text-align: center;
        line-height: 25px;
      }
      > li:nth-child(1) {
        margin-left: 0px;
        border: 2px solid rgb(113, 87, 49);
        background: linear-gradient(
          rgb(17, 31, 47),
          rgb(63, 58, 48),
          rgb(113, 87, 49)
        );
      }
    }
  }
  .data_date {
    width: 116px;
    height: 30px;
    left: 1561px;
    top: 120px;
    position: absolute;
    // border: 1px solid pink;
    ul {
      display: flex;
      li {
        flex: 1;
        text-align: center;
        margin-left: 13px;
        max-width: 30px;
        height: 28px;
        color: white;
        // border: 1px solid green;
        line-height: 25px;
      }
      > li:nth-child(1) {
        margin-left: 0px;
      }
      > li:nth-child(3) {
        border: 2px solid rgb(113, 87, 49);
        background: linear-gradient(
          rgb(17, 31, 47),
          rgb(63, 58, 48),
          rgb(113, 87, 49)
        );
      }
    }
  }
  .data_year {
    width: 320px;
    height: 15px;
    position: absolute;
    top: 160px;
    right: 100px;
    color: white;
    // border: 1px solid green;
  }
}
</style>
