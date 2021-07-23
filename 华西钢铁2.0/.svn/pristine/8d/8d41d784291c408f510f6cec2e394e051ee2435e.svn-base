<template>
  <div>
    <div v-if="$parent.showEcharts" class="data_Echarts"></div>
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
          textStyle: {
            color: "white",
          },
          data: ["铁水", "烧结矿", "高速线材", "连铸钢坯"],
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
            name: "铁水",
            type: "bar",
            barWidth: "20%",
            emphasis: {
              focus: "series",
            },
            data: [820, 1032, 501, 834, 990, 1330, 2000],
          },
          {
            name: "烧结矿",
            type: "bar",
            barWidth: "20%",
            stack: "广告",
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "高速线材",
            type: "bar",
            stack: "广告",
            emphasis: {
              focus: "series",
            },

            data: [220, 1182, 191, 1234, 290, 200, 1310],
          },
          {
            name: "连铸钢坯",
            type: "bar",
            stack: "广告",
            emphasis: {
              focus: "series",
            },
            markLine: {
              lineStyle: {
                type: "dashed",
              },
              data: [[{ type: "min" }, { type: "max" }]],
            },
            data: [150, 232, 201, 154, 190, 330, 410],
          },
        ],
      },
    };
  },
  mounted() {
    // this.initEcharts();
  },
  methods: {
    initEcharts() {
      var echarts = this.$echarts;
      //获取dom中图标加地方
      var myChart = echarts.init(document.querySelector(".data_Echarts"));
      // this.customerEcharts = myChart;
      // 绘制图表
      myChart.setOption(this.option);
    },
  },
};
</script>
<style lang="less" scoped>
.data_Echarts {
  width: 1654px;
  height: 639px;
  bottom: 15%;
  left: 137px;
  position: absolute;
  // border: 1px solid pink;
}
</style>
