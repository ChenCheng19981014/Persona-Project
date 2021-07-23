<template>
  <div class="controller">
    <div class="data_controller">
      <div class="controller_title">XXX5.4KW分布式光伏电站</div>
      <div class="controller_title_right">
        <p>全球</p>
        <p>国家</p>
        <p>大区</p>
        <p>省份 <i class="iconfont icon-jiantou-copy"></i></p>
        <p>城市 <i class="iconfont icon-jiantou-copy"></i></p>
        <div class="earth_search">
          <i class="iconfont icon-fangdajing"></i>
        </div>
      </div>
      <div class="time">
        <ul>
          <li
            v-for="(i, index) in [
              { name: '年' },
              { name: '月' },
              { name: '日' },
            ]"
            :key="index"
          >
            {{ i.name }}
          </li>
        </ul>
        <span>2020年1月-12月</span>
      </div>
      <div class="share">导出<i class="iconfont icon-fenxiang"></i></div>
    </div>
    <div class="data_title_left">
      <ul>
        <li
          @click="setDataPic(index), setEcharts()"
          :class="picIndex == index ? 'selectedindex' : ''"
          v-for="(i, index) in [
            { name: '发电量统计' },
            { name: '收益统计' },
            { name: '故障统计' },
            { name: '发电量预测' },
          ]"
          :key="index"
        >
          {{ i.name }}
        </li>
      </ul>
    </div>
    <div class="data_chart"></div>
    <div class="data_chart"></div>
    <div class="data_chart three"></div>
    <div class="data_chart"></div>
    <div class="three_right"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      dataList: [
        {
          name: "发电量统计",
          option: {
            tooltip: {
              transitionDuration: 0,
            },
            xAxis: {
              type: "category",
              data: [
                "1月",
                "2月",
                "3月",
                "4月",
                "5月",
                "6月",
                "7月",
                "8月",
                "9月",
                "10月",
                "11月",
                "12月",
              ],
              axisLine: {
                //这是X轴文字颜色
                lineStyle: {
                  color: "#fff",
                },
              },
            },
            yAxis: {
              name: "KWH",
              max: 120,
              axisLine: {
                //这是y轴文字颜色
                lineStyle: {
                  color: "#fff",
                },
              },
            },
            series: [
              {
                data: [40, 20, 50, 80, 70, 110, 90, 60, 100, 30, 40, 80],
                type: "bar",
                barWidth: "35%",
                itemStyle: {
                  barBorderRadius: [5, 4, 4, 4],
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#83bff6" },
                    { offset: 0.5, color: "#188df0" },
                    { offset: 1, color: "#188df0" },
                  ]),
                },
              },
            ],
          },
        },
        {
          name: "收益统计",
          option: {
            tooltip: {
              trigger: "item", // 然后eCharts3有默认的格式的。
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: [
                "1月",
                "2月",
                "3月",
                "4月",
                "5月",
                "6月",
                "7月",
                "8月",
                "9月",
                "10月",
                "11月",
                "12月",
              ],
              axisLine: {
                //这是X轴文字颜色
                lineStyle: {
                  color: "#fff",
                },
              },
            },
            yAxis: {
              name: "KWH",
              max: 120,
              axisLine: {
                //这是y轴文字颜色
                lineStyle: {
                  color: "#fff",
                },
              },
            },
            series: [
              {
                data: [60, 70, 65, 53, 40, 35, 55, 60, 58, 56, 50, 52],
                type: "line",
                areaStyle: {},
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "rgb(24,217,223)", // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "rgb(14,39,71)", // 100% 处的颜色
                      },
                    ],
                    global: false, // 缺省为 false
                  },
                },
              },
            ],
          },
        },
        {
          name: "故障统计",
          option: {
            tooltip: {
              transitionDuration: 0,
            },
            legend: {
              top: "bottom",
            },
            series: [
              {
                name: "面积模式",
                type: "pie",
                radius: [50, 250],
                center: ["50%", "50%"],
                roseType: "area",
                itemStyle: {
                  borderRadius: 8,
                },
                data: [
                  { value: 40, name: "故障1" },
                  { value: 38, name: "30%" },
                  { value: 32, name: "25%" },
                  { value: 30, name: "30%" },
                  { value: 28, name: "25%" },
                  { value: 26, name: "故障2" },
                  { value: 22, name: "20%" },
                  { value: 18, name: "30%" },
                ],
              },
            ],
          },
        },
        {
          name: "发电量预测",
          option: {
            tooltip: {
              trigger: "item", // 然后eCharts3有默认的格式的。
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: [
                "1月",
                "2月",
                "3月",
                "4月",
                "5月",
                "6月",
                "7月",
                "8月",
                "9月",
                "10月",
                "11月",
                "12月",
              ],
              axisLine: {
                //这是y轴文字颜色
                lineStyle: {
                  color: "#fff",
                },
              },
            },
            yAxis: {
              name: "KWH",
              max: 120,
              axisLine: {
                //这是y轴文字颜色
                lineStyle: {
                  color: "#fff",
                },
              },
            },
            series: [
              {
                data: [20, 30, 30, 40, 50, 60, 65, 70, 65, 60, 80, 70, 60, 80],
                type: "line",
                areaStyle: {},
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "rgb(24,141,240)", // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "rgb(16,27,63)", // 100% 处的颜色
                      },
                    ],
                    global: false, // 缺省为 false
                  },
                },
              },
            ],
          },
        },
      ],
      dataIndex: 0,
      picIndex: 0,
      chart: "",
    };
  },
  mounted() {
    this.setEcharts();
    this.setDataPic(0);
  },
  methods: {
    setDataPic(index) {
      this.dataIndex = index;
      this.picIndex = index;
      var three_right = document.querySelector(".three_right");
      var pic = document.querySelectorAll(".data_pic");
      if (index == 2) {
        three_right.style = "display:block!important;";
      } else {
        three_right.style = "display:none!important;";
      }
      pic.forEach((i, indexa) => {
        if (indexa == this.picIndex) {
          i.style = "display:block!important;";
        } else {
          i.style = "display:none;";
        }
      });
    },
    setEcharts() {
      var chart = echarts;
      var list = document.querySelectorAll(".data_chart");
      list.forEach((i, index) => {
        if (index == this.dataIndex) {
          i.style = "display:block;";
        } else {
          i.style = "display:none;";
        }
        console.log(i, "ii");
      });
      chart = chart.init(list[this.dataIndex]);
      chart.setOption(this.dataList[this.dataIndex].option);
    },
  },
};
</script>
<style lang="less" scoped>
.selectedindex {
  background: linear-gradient(
    rgb(25, 30, 63),
    rgb(77, 81, 106),
    rgb(177, 179, 190)
  );
}
.tab1 {
  background: url("../../assets/images/data2.png") no-repeat !important;
  background-size: 100% 100% !important;
}
.tab2 {
  background: url("../../assets/images/data3.png") no-repeat !important;
  background-size: 100% 100% !important;
}
.tab3 {
  background: url("../../assets/images/data4.png") no-repeat !important;
  background-size: 100% 100% !important;
}
.three {
  width: 50% !important;
  margin-left: -20%;
  // border: 1px solid red;
}
</style>
<style lang="less" scoped>
.controller {
  width: 100vw;
  height: 100vh;
  position: relative;
  .simple_chart {
    z-index: -1;
  }
  .selectedIndex {
    background-image: linear-gradient(
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5)
    ) !important;
  }
  .data_controller {
    position: absolute;
    top: 10%;
    left: 10%;
    .controller_title {
      width: 300px;
      height: 20px;
      color: white;
      font-size: 16px;
      letter-spacing: 3px;
      margin-top: 10px;
    }
    .controller_title_right {
      width: 580px;
      height: 30px;
      margin-bottom: 30px;
      color: white;
      margin-left: 1120px;
      p {
        padding: 5px 10px;
        box-sizing: border-box;
        height: 100%;
        text-align: center;
        width: 60px;
        margin-right: 5px;
        float: left;
        border: 1px solid #fff;
        color: white;
      }
      .earth_search {
        width: 250px;
        height: 30px;
        float: right;
        border: 1px solid #fff;
        box-sizing: border-box;
        i {
          float: right;
          line-height: 30px;
          margin-right: 10px;
        }
      }
    }
    > ul {
      margin-top: -30px;
      margin-left: 30px;
      li {
        float: left;
        margin-right: 5px;
        padding: 5px 10px;
        border: 1px solid #fff;
        cursor: pointer;
        color: white;
      }
    }
    .time {
      width: 100px;
      height: 20px;
      position: absolute;
      right: 400px;
      top: 80px;
      ul {
        display: flex;
        color: white;
        li {
          flex: 1;
          margin-left: 5px;
          border: 1px solid white;
          text-align: center;
        }
      }
      ul {
        li:nth-child(2) {
          background: linear-gradient(
            #4d516a,
            rgb(0, 187, 255),
            rgb(24, 141, 240)
          );
        }
      }
      span {
        top: 40px;
        left: -40px;
        width: 200px;
        height: 15px;
        position: absolute;
        color: white;
        // border: 1px solid red;
        letter-spacing: 5px;
      }
    }
    .share {
      width: 50px;
      height: 20px;
      position: absolute;
      right: 300px;
      top: 80px;
      color: white;
      a {
        width: 10px;
        height: 10px;
      }
    }
  }
  .data_title_left {
    width: 400px;
    height: 30px;
    margin-top: 150px;
    margin-left: 250px;
    position: absolute;
    ul {
      width: 400px;
      height: 30px;
      display: flex;
      li {
        margin-left: 10px;
        flex: 1;
        color: white;
        text-align: center;
        line-height: 25px;
        border: 1px solid white;
      }
    }
  }
  .data_pic {
    width: 70%;
    height: 55%;
    margin-top: 40px;
    min-height: 55vh;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    // border: 1px solid red;
    background: url("../../assets/images/data1.png") no-repeat;
    background-size: 100% 100%;
    display: none;
  }
  .data_chart {
    width: 80%;
    height: 70%;
    margin-top: 30px;
    min-height: 55vh;
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
  }
  .three_right {
    height: 50%;
    width: 30%;
    margin-left: 55%;
    margin-top: 13%;
    // border: 1px solid red;
    position: absolute;
    background: url("../../assets/images/three_right.png") no-repeat;
    background-size: 100% 100%;
    display: none;
  }
}
</style>
