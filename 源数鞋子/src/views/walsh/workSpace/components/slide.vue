/* eslint-disable */
<template>
  <div>
    <div class="container">
      <div class="head" ref="headRef">
        <a-row type="flex" justify="space-around">
          <a-col :span="2">
            <a-icon type="left" @click="goNext()" />
          </a-col>
          <a-col :span="15">
            <p class="title" v-show="title">
              {{ title }}
              <span>{{ step }}/{{ shoesData.length }}</span>
            </p>
          </a-col>
          <a-col :span="2">
            <a-icon type="right" @click="goNext('NEXT')" />
          </a-col>
          <a-col :span="2">
            <a-icon type="menu" @click="shouMenu" />
          </a-col>
        </a-row>
      </div>
      <div>
        <transition name="fade">
          <a-carousel
            ref="slide"
            v-show="!visible"
            class="slide-wrap"
            :dots="false"
            dot-position="right"
            :beforeChange="onChange"
          >
            <div v-for="d in shoesData" :key="d.code" class="slide-card">
              <div class="title">颜色</div>
              <a-row type="flex" justify="start">
                <a-col v-for="(c, i) in d.color" :key="i" class="col-circle">
                  <span class="circle" :style="{ background: c }" @click="check(d.name, c, data.player)"></span>
                </a-col>
              </a-row>
            </div>
          </a-carousel>
        </transition>
        <div class="menu-wrap" v-show="visible">
          <div v-for="s in shoesData" :key="s.code" class="menu-li">
            <a-icon type="check" style="color: #027D60" />
            <span>{{ s.name }}</span>
          </div>
          <a-button class="back" type="link" icon="left" @click="shouMenu">
            返回
          </a-button>
        </div>
      </div>
    </div>
    <div class="right">
      右侧功能区
    </div>
  </div>
</template>

<script>
export default {
  name: 'RightSlide',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      testModel: '#0000FF',
      title: '',
      step: 1,
      visible: false,
      headHeight: '',
      bs: '0px 0px 20px gray',
      shoesData: [
        {
          name: '前片',
          code: '001',
          color: [
            '#306563',
            '#54645A',
            '#222933',
            '#4B4138',
            '#B1916A',
            '#9A7354',
            '#384B83',
            '#7E8DB4',
            '#4F4F51',
            '#93989E'
          ]
        },
        {
          name: '主鞋面',
          code: '002',
          color: ['#54645A', '#222933', '#4B4138', '#B1916A', '#9A7354', '#384B83', '#7E8DB4']
        },
        {
          name: '侧车线',
          code: '003',
          color: ['#306563', '#54645A', '#222933', '#4B4138', '#9A7354', '#7E8DB4', '#4F4F51', '#93989E']
        },
        {
          name: '后片',
          code: '004',
          color: ['#306563', '#222933', '#4B4138', '#B1916A', '#9A7354']
        },
        {
          name: '后上片',
          code: '005',
          color: ['#306563', '#222933', '#4B4138', '#B1916A', '#9A7354']
        },
        {
          name: '后上片文字',
          code: '006',
          color: ['#306563', '#222933', '#4B4138', '#B1916A', '#9A7354']
        },
        {
          name: '大底',
          code: '007',
          color: ['#306563', '#54645A', '#222933', '#B1916A']
        },
        {
          name: '鞋舌',
          code: '008',
          color: ['#306563', '#54645A', '#4B4138', '#B1916A', '#9A7354', '#384B83']
        },
        {
          name: '鞋带',
          code: '009',
          color: ['#306563', '#54645A', '#4B4138', '#B1916A', '#9A7354', '#384B83', '#4F4F51']
        }
      ],
      changeColor: '',
      text: '',
      bus: '',
      webModelList: [
        { chinese: '前片', english: 'qianpian' },
        { chinese: '主鞋面', english: 'zhuxiemian' },
        { chinese: '侧车线', english: 'cechexian' },
        { chinese: '大底', english: 'polySurface1' },
        { chinese: '后片', english: 'houpian' },
        { chinese: '后上片', english: 'houshangpian' },
        { chinese: '后上片文字', english: 'wenzi' },
        { chinese: '鞋舌', english: 'xieshe1' },
        { chinese: '鞋带', english: 'xiedai3' }
      ]
    }
  },
  created() {
    const s = this.shoesData
    this.title = s.length > 0 ? s[0].name : ''
  },
  mounted() {},
  methods: {
    test() {
      console.log('aaa')
    },
    goNext(val) {
      val === 'NEXT' ? this.$refs.slide.next() : this.$refs.slide.prev()
    },
    onChangeOut(a) {},
    onChange(from, to) {
      const sd = this.shoesData
      this.step = to
      this.title = sd[to].name
      this.testModel = this.title
      this.webModelList.forEach((i, index) => {
        if (i.chinese === this.title) {
          console.log(i.english, 'i')
          this.$props.data.player.eventBus.$emit('clickFocus', i.english)
        }
      })
    },
    check(n, c, Bus) {
      if (this.title === '后上片文字') {
        Bus.eventBus.$emit('changeTxt', this.txt, c)
      } else {
        Bus.eventBus.$emit('changeColorMaterial', c.replace('#', ''))
      }
    },
    shouMenu() {
      console.log('show menu')
      // this.$refs.slideOut.next()
      this.visible = !this.visible
    }
  }
}
</script>
<style scoped lang="less">
.container {
  position: relative;
  .head {
    width: 94%;
    height: 120px;
    margin: 0 3%;
    padding: 30px 10px;
    font-size: 40px;
    font-weight: 500;
    .title {
      display: inline-block;
      width: 100%;
      text-align: center;
      overflow: hidden;
      span {
        color: #999;
        font-size: 32px;
        font-weight: 100;
      }
    }
  }
  .pop {
    width: 90%;
    margin: 10px 5%;
  }
  .slide-wrap {
    width: 90%;
    margin: 10px 5%;
    .slide-card {
      text-align: center;
      padding: 10px;
      min-height: calc(90vh - 460px);
      // border: 1px solid #999;
      overflow: hidden;
      .title {
        font-size: 20px;
        font-weight: 600;
        color: #333;
        text-align: left;
        margin: 20px 10px;
      }
      .col-circle {
        cursor: pointer;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        .circle {
          display: inline-block;
          width: 50px;
          height: 50px;
          border-radius: 25px;
          margin: 10px;
          &:hover {
            width: 56px;
            height: 56px;
            border-radius: 28px;
            margin: 7px;
            box-shadow: 0px 0px 20px gray;
          }
        }
      }
    }
    h3 {
      color: #333;
      font-size: 50px;
    }
  }
  .menu-wrap {
    width: 90%;
    margin: 10px 5%;
    position: absolute;
    top: 120px;
    // left: ;
    .menu-li {
      display: block;
      height: 40px;
      line-height: 40px;
      padding-left: 20px;
      font-size: 20px;
      color: #666;
      font-weight: 500;
      span {
        margin-left: 20px;
      }
      &:hover {
        background: #c4e1ff;
        color: #fff;
      }
    }
    .back {
      margin: 40px 20px;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 10.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.right {
  z-index: 100000;
  width: 100%;
  min-height: calc(100vh - 190px);
  border: 2px solid #999;
  .ColorBoard {
    bottom: 0%;
    position: absolute;
    width: 100%;
    height: 50%;
    margin-left: 50%;
    transform: translate(-50%, 0);
    .title {
      width: 100%;
      > ul {
        width: 100%;
        height: 100%;
        display: flex;
        padding: 0;
        list-style-type: none;
        flex-direction: wrap;
        > li {
          flex: 1;
          text-align: center;
          border: 1px solid rgb(143, 188, 188);
        }
      }
    }
    .content {
      width: 100%;
      height: 100%;
      > ul {
        width: 100%;
        padding: 0;
        display: flex;
        list-style-type: none;
        flex-direction: wrap;
        border: 1px solid rgb(143, 188, 188);
        > li {
          flex: 1;
          text-align: center;
          div {
            > ul {
              > li {
                border: 1px solid rgb(143, 188, 188);
              }
            }
          }
        }
      }
    }
  }
}
</style>
