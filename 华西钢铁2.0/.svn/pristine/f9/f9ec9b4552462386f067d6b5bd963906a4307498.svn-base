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
    <div class="data_Echarts"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      option: {
        tooltip: {
          transitionDuration: 0,
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: [
            "直接访问0",
            "邮件营销0",
            "联盟广告0",
            "视频广告0",
            "搜索引擎0",
            "百度0",
            "谷歌0",
            "必应0",
            "其他0",
          ],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["2015", "2016", "2017", "2018", "2019", "2020", "2021"],
            axisLine: {
              //这是X轴文字颜色
              lineStyle: {
                color: "#fff",
              },
            },
          },
        ],
        yAxis: {
          name: "吨",
          max: 2000,
          axisLine: {
            //这是y轴文字颜色
            lineStyle: {
              color: "#fff",
            },
          },
        },
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "10%",
            emphasis: {
              focus: "series",
            },
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "邮件营销",
            type: "bar",
            stack: "广告",
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "联盟广告",
            type: "bar",
            stack: "广告",
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "视频广告",
            type: "bar",
            stack: "广告",
            emphasis: {
              focus: "series",
            },
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "搜索引擎",
            type: "bar",
            barWidth: "10%",

            data: [862, 1018, 964, 1026, 1679, 1600, 1570],
            emphasis: {
              focus: "series",
            },
            markLine: {
              lineStyle: {
                type: "dashed",
              },
              data: [[{ type: "min" }, { type: "max" }]],
            },
          },
          {
            name: "百度",
            type: "bar",
            barWidth: 5,
            stack: "搜索引擎",
            emphasis: {
              focus: "series",
            },
            data: [620, 732, 701, 734, 1090, 1130, 1120],
          },
          {
            name: "谷歌",
            type: "bar",
            stack: "搜索引擎",
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 290, 230, 220],
          },
          {
            name: "必应",
            type: "bar",
            stack: "搜索引擎",
            emphasis: {
              focus: "series",
            },
            data: [60, 72, 71, 74, 190, 130, 110],
          },
          {
            name: "其他",
            type: "bar",
            stack: "搜索引擎",
            emphasis: {
              focus: "series",
            },
            data: [62, 82, 91, 84, 109, 110, 120],
          },
        ],
      },
    };
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    initEcharts() {
      var echarts = this.$echarts;
      //获取dom中图标加地方
      var myChart = echarts.init(document.querySelector(".data_Echarts"));
      this.customerEcharts = myChart;
      // 绘制图表
      myChart.setOption(this.option);
    },
  },
};
</script>
<style lang="less" scoped>
.data {
  .data_Echarts {
    width: 1654px;
    height: 639px;
    bottom: 15%;
    left: 137px;
    position: absolute;
    // border: 1px solid pink;
  }
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
    // border: 1px solid green;
  }
}
</style>
