<template>
  <div class="container">
    <div class="left-box">
      <div class="left-bot">
        <left />
      </div>
    </div>
    <div class="center">
      <!-- 弹窗 -->
      <div class="popWin">
        <div>
          <div class="cropper">
            <vueCropper
              ref="cropper"
              :img="option.img"
              :outputSize="option.size"
              :outputType="option.outputType"
              :info="option.info"
              :full="option.full"
              :canMove="option.canMove"
              :canMoveBox="option.canMoveBox"
              :original="option.original"
              :autoCrop="option.autoCrop"
              :autoCropWidth="option.autoCropWidth"
              :autoCropHeight="option.autoCropHeight"
              :fixed="option.fixed"
              :fixedNumber="option.fixedNumber"
              :centerBox="option.centerBox"
              :infoTrue="option.infoTrue"
              :fixedBox="option.fixedBox"
            ></vueCropper>
          </div>
        </div>
      </div>
      <input
        type="text"
        id="inputfield"
        placeholder="后跟文字"
        @input="
          () => {
            myFunction()
          }
        "
      />
      <div class="Func">
        功能区
        <button
          @click="
            () => {
              onClick(1)
            }
          "
        >
          随机
        </button>
        <button
          @click="
            () => {
              onClick(2)
            }
          "
        >
          保存
        </button>
        <button
          @click="
            () => {
              onClick(3)
            }
          "
        >
          重置
        </button>
        <button
          @click="
            () => {
              onClick(4)
            }
          "
        >
          分享
        </button>
        <button
          @click="
            () => {
              onClick(5)
            }
          "
        >
          旋转
        </button>
        <button
          @click="
            () => {
              onClick(6)
            }
          "
        >
          放大
        </button>
        <button
          @click="
            () => {
              onClick(7)
            }
          "
        >
          缩小
        </button>
        <button
          @click="
            () => {
              onClick(8)
            }
          "
        >
          爆炸
        </button>
        <button
          @click="
            () => {
              onClick(9)
            }
          "
        >
          视图
        </button>
        <button
          @click="
            () => {
              switchBackgroundOne()
            }
          "
        >
          背景1
        </button>
        <button
          @click="
            () => {
              switchBackgroundTwo()
            }
          "
        >
          背景2
        </button>
        <button
          @click="
            () => {
              switchBackgroundThree()
            }
          "
        >
          背景3
        </button>
        <button
          @click="
            () => {
              revertBackground()
            }
          "
        >
          恢复背景
        </button>
        <button
          @click="
            () => {
              fncText()
            }
          "
        >
          字体
        </button>
        <button
          @click="
            () => {
              fncSwitchShoelaces(1)
            }
          "
        >
          鞋带1
        </button>
        <button
          @click="
            () => {
              fncSwitchShoelaces(2)
            }
          "
        >
          鞋带2
        </button>
        <button
          @click="
            () => {
              fncSwitchShoelaces(3)
            }
          "
        >
          鞋带3
        </button>
        <button
          @click="
            () => {
              fncSwitchShoelaces(4)
            }
          "
        >
          鞋带4
        </button>
        <button
          @click="
            () => {
              replaceMaterial()
            }
          "
        >
          替换材质
        </button>
        <button @click="cunTest">存储测试</button>
        <button
          @click="
            () => {
              save()
            }
          "
          class="submit"
          :plain="true"
        >
          本地贴图
        </button>

        <input
          type="file"
          @change="
            e => {
              change(e)
            }
          "
          @click="
            () => {
              showTieTu()
            }
          "
          style="z-index:100000000;position:absolute"
          name=""
          id="singleFile"
        />
      </div>

      <div class="img1"></div>
      <div class="img2"></div>
      <div class="img3"></div>
      <div class="img4"></div>
      <div class="img5"></div>
      <div class="img6"></div>
    </div>
    <div class="right-box">
      <right-slide :data="{ player, txt }" />
    </div>
    <div>
      <a-row class="bot-box" type="flex" justify="space-around">
        <a-col span="6">
          <span>尺寸：</span>
          <div class="size">
            <a-select default-value="38" style="width: 100px" size="large" @change="handleChange">
              <a-icon slot="suffixIcon" type="smile" size="20" />
              <a-select-option value="36">
                36
              </a-select-option>
              <a-select-option value="37">
                37
              </a-select-option>
              <a-select-option value="38">
                38
              </a-select-option>
              <a-select-option value="39">
                39
              </a-select-option>
            </a-select>
          </div>
        </a-col>
        <a-col span="6">总价：￥799</a-col>
        <a-col span="6">预计收货时间：2021-08-01</a-col>
        <a-col span="6">
          <a-button type="primary" size="large" class="cart" @click="addToCart">
            立即购买
            <a-icon type="right" />
          </a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import RightSlide from './components/slide.vue'
import Left from './components/left.vue'
import ColorBoard from './components/ColorBoard.vue'
import initScene from './../../../three/initScene'

export default {
  name: 'Workplace',
  components: {
    RightSlide,
    Left,
    ColorBoard
  },
  data() {
    return {
      txtColor: '',
      player: '',
      state: '',
      currentIndex: '-1',
      shoesMethod: [
        { name: '拆解' },
        { name: '旋转' },
        { name: '文字' },
        { name: '截图' },
        { name: '换颜色' },
        { name: '换贴图' }
      ],
      txt: '',
      changeColor: '',
      option: {
        img: 'https://img2.baidu.com/it/u=2635610526,2535111858&fm=26&fmt=auto&gp=0.jpg', // 裁剪图片的地址
        info: false, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'jpg', // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 256, // 默认生成截图框宽度
        autoCropHeight: 256, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: false, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: false // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      xieModulesList: [
        {
          name: '前片',
          categoryId: 'b402bff8d7984565b0fb385d2c8c628b',
          color: [
            { value: 'D0C8C1', ids: ['52ef4d9eef084b83a44763092de7c3ac'] },
            { value: '93989E', ids: ['cf9dc3f29cb647c3b49f7db8ca4a7cc1'] },
            { value: '306563', ids: ['711b4a33a27e4172b55b35a3f18570f9'] },
            { value: '54645A', ids: ['69a644366230447ab8a12fde4f64176b'] },
            { value: 'B1916A', ids: ['595eb78001c14ddf8342a18945c5af73'] },
            { value: '4B4138', ids: ['ef133d7521994c41ab51ce68d028b467'] },
            { value: '222933', ids: ['597a11192dad4549b20adcd35877f4e4'] },
            { value: 'F7F4EC', ids: ['e1204337dc8b480c9eacce7eba1b60b4'] },
            { value: '4F4F51', ids: ['242202abc55048cb814258da93c90ee4'] },
            { value: '7E8DB4', ids: ['b374275470c643bd8401c2667d7a9b9f'] },
            { value: '9A7354', ids: ['159c4d2c4c1646e99f92d394a356cbd2'] },
            { value: '384B83', ids: ['049de7506eb34df6879eddae5fada8b0'] }
          ],
          met: []
        },
        {
          name: '主鞋面',
          categoryId: '061f5b1452d24f7ebc42f2951247fe37',
          color: [
            { value: 'BDA990', ids: ['f75e84df839d49079740cb1564ae0562'] },
            { value: '2A3E35', ids: ['9c9770d764eb490baef331c190ea9eb2'] },
            { value: '93889E', ids: ['f04d73a058cb4e27b8e45b550a82bbc2'] },
            { value: 'E6E3CE', ids: ['e484043672a648bbaef1371722976545'] },
            { value: 'D0C8C1', ids: ['b7177f48d1d74a3fbee12736537cb504'] },
            { value: '4F4F51', ids: ['0a3c6148909a415fa1931e0a75418213'] },
            { value: 'F7F4EC', ids: ['3233392fabdd443db61f7c6555c99213'] }
          ],
          met: []
        },
        {
          name: '侧车线',
          categoryId: '214f47c825d643ae990d757e2e33268b',
          color: [
            { value: '1D222D', ids: ['0c075dbb25b6426db8cb09bfaade92bf'] },
            { value: '384B83', ids: ['b8ddb6f94f88448ba3f8ae212b127ca7'] },
            { value: 'AA2427', ids: ['b9bfc29d2a1c4cb79b4b74cabaeb171f'] },
            { value: '7E8DB4', ids: ['9eb609d0f49f475b89dba3dd3a70ce87'] },
            { value: '027D60', ids: ['18e00558c336408ab53d80ae7a961c36'] }
          ],
          met: []
        },
        {
          name: '后片',
          categoryId: '386db1ef6251446796412c2f974faecd',
          color: [
            { value: '4B4138', ids: ['b0b5bcbb8e21402c80e428dc19e9dee1'] },
            { value: '306663', ids: ['c5e6b36cd58c406f8c4b028eef8e17b9'] },
            { value: 'B1916A', ids: ['09d0ee0ae4104bbda80e240099e9bb62'] },
            { value: '222933', ids: ['d6adbf7a6251486fa83e89f2030e260c'] },
            { value: '54645A', ids: ['e8b6dc6b540841fb906182a258ca9daf'] }
          ],
          met: []
        },
        {
          name: '后上片',
          categoryId: 'a2bde76fd87c4005a2b817b26a4082f4',
          color: [
            { value: '1D222D', ids: ['cac9e344ccb64389ad3d47fbd8479d21'] },
            { value: 'AA2427', ids: ['b695a5bbb8c54b8cb10caae05356173f'] },
            { value: '027D60', ids: ['39b22debb3854a3fa6f1292fc09c2cba'] },
            { value: '54645A', ids: ['cdb9afd632894cb19c461863f7ce1096'] },
            { value: 'E6E3CE', ids: ['80270f6e4d964a1fa77e1c51be0e9cbf'] },
            { value: '7E8DB4', ids: ['7250cf6a7e084be8924393bcb69d185f'] },
            { value: '384B83', ids: ['f2c66deb112345ee86294f7b0d6339df'] },
            { value: '222933', ids: ['76d8922e01ca40b1b55dde2bc6b18dba'] },
            { value: '837F7C', ids: ['b7e9918f81c9481ea3e0579dbb22a04b'] }
          ],
          met: [
            {
              value: '反毛皮',
              ids: [
                '9deba0591ae747efbe71c5964231fe38',
                '46b873bf93fd4c1dbfc4aa537fdee7d5',
                '339a8a15256a4c85b62cd21437e928c2',
                '55519994b1f04334bba0b6cdd9ad803e',
                '9be4bdb2830540d7917d6acea3a269b7'
              ]
            },
            {
              value: '光面皮革',
              ids: [
                '09a9fef3394c4e658715c07fa92c1aba',
                '0130f3a0c67a4810a1f8c9b97bf0b420',
                'e2e8e6e1056547beab42e2f8f0bd5c49',
                '882e3a8ef1d14175a3f1e223c6dac2b4'
              ]
            }
          ]
        },
        {
          name: '后上片文字',
          categoryId: 'eb9ae861f85d458290331a34225f1496',
          color: [
            { value: '837F7C', ids: ['132a19190e724d098865b4834bc92f1b'] },
            { value: '7E8DB4', ids: ['dab1e097c6764a3a8fd7a4a37f5c33c6'] },
            { value: '384B83', ids: ['9c3eccd7b0da4ad1a7ee89c8a0ace473'] },
            { value: '027D60', ids: ['ca765f29ffb243ac83edacd68bd82a2e'] },
            { value: 'AA2427', ids: ['920a901b935643e0bf6cf303e60721e5'] },
            { value: '1D222D', ids: ['9ed14f30a98f438686f5e7d6fac5edbb'] }
          ],
          met: []
        },
        {
          name: '大底',
          categoryId: '4e57b41f239d4504afc6be14a91fd5e9',
          color: [
            { value: 'C5BEAD', ids: ['d1934c792de24bacabe5b8c5d0b04803'] },
            { value: '5F5C57', ids: ['27e1cb4e680242d9a05872ce7035e5cf'] },
            { value: '9F7C6E', ids: ['e5ba5143f4954406b776c9cb96f02f04'] },
            { value: '8A8E8C', ids: ['9420f5bebc734215aa0b52a5cbf7717b'] },
            { value: 'ACA39C', ids: ['cf536cbbe4f04c61a4ac6423c34982a7'] },
            { value: '6F6961', ids: ['ff9dbf5c928746dda0baa907c22ede6b'] }
          ],
          met: []
        },
        {
          name: '鞋舌',
          categoryId: '8938f80e64a940bd8797ea8a1267083b',
          color: [
            { value: '58513E', ids: ['dfcc312b26724cbc99c6f1a676fef818'] },
            { value: '4B4138', ids: ['b5c14f1890904140a1f56312a54dd1e9'] },
            { value: '306563', ids: ['2cadb4accf734e0e8fa137ec0f0c7bd3'] },
            { value: '54645A', ids: ['aa7e08d13204453d87daf7c754b3aee4'] },
            { value: 'B1916A', ids: ['6c9de3fd589c47f9b33bcd94298869d3'] }
          ],
          met: []
        },
        {
          name: '鞋带',
          categoryId: '358b21fd1792449f9389f25bc6864437',
          color: [
            { value: 'B1916A', ids: ['07447f9918b34e19b3c3deb1e6f6b3a9'] },
            { value: '4B4138', ids: ['a74ec09e6e2b4b2a9d5804270649840b'] },
            { value: '222933', ids: ['3acb47a322f443baa5f749b19093893b'] },
            { value: '54645A', ids: ['74c8906271224843b3cd145769dead66'] },
            { value: '306563', ids: ['a65d677f51dd4e7da1f7113809642b84'] }
          ],
          met: []
        }
      ],
      saveModulesColorList: [
        {
          name: '前片',
          color: 'D0C8C1'
        },
        {
          name: '主鞋面',
          color: 'BDA990'
        },
        {
          name: '侧车线',
          color: '1D222D'
        },
        {
          name: '后片',
          color: '4B4138'
        },
        {
          name: '后上片',
          color: '1D222D'
        },
        {
          name: '后上片文字',
          color: '837F7C'
        },
        {
          name: '大底',
          color: 'C5BEAD'
        },
        {
          name: '鞋舌',
          color: 'value'
        },
        {
          name: '鞋带',
          color: 'B1916A'
        }
      ]
    }
  },
  async mounted() {
    this.init()
    //  cropper改变图片透明度
    let value = 0.1
    setTimeout(() => {
      let a = document.getElementsByClassName('cropper-box')[0].getElementsByTagName('img')[0]
      a.style.opacity = value
      let b = document.getElementsByClassName('cropper-view-box')[0].getElementsByTagName('img')[0]
      b.style.opacity = value
    }, 1000)
  },
  methods: {
    click() {
      console.log('aaa')
    },
    // 初始化场景
    init() {
      initScene('./static/Json/app.json', document.querySelector('.center')).then(player => {
        this.player = player
        player.initChange()
        player.change.initTheScene()
      })
    },
    // 文字框输入内容
    myFunction() {
      this.txt = document.getElementById('inputfield').value
      console.log(this.txt, 'this.txt')
    },
    addToCart() {
      console.log('加入购物车')
    },
    handleChange(value) {
      console.log(`selected ${value}`)
    },
    onClick(val) {
      switch (val) {
        case 1:
          this.fncRandom()
          break
        case 2:
          this.fncSave()
          break
        case 3:
          this.fncReset()
          break
        case 4:
          this.fncShare()
          break
        case 5:
          this.fncRotating()
          break
        case 6:
          this.fncBiger()
          break
        case 7:
          this.fncSmaller()
          break
        case 8:
          this.fncBoom()
          break
        case 9:
          this.fncView()
          break
      }
    },
    fncRandom() {
      console.log('随机')
      console.log(this.player.eventBus.$emit('random', this.xieModulesList))
    },
    cunTest() {
      console.log('测试随机')
      this.player.eventBus.$emit('cunTest', this.saveModulesColorList)
    },
    fncSave() {
      console.log('保存')
    },
    fncReset() {
      console.log('重置')
      this.player.eventBus.$emit('revertBgc')
      this.player.eventBus.$emit('Reset')
    },
    fncShare() {
      console.log('分享')
    },
    fncRotating() {
      console.log('旋转')
      this.player.eventBus.$emit('onRotate')
    },
    fncBiger() {
      console.log('放大')
      this.player.eventBus.$emit('cameraZoomBiger')
    },
    fncSmaller() {
      console.log('缩小')
      this.player.eventBus.$emit('cameraZoomSmaller')
    },
    //爆炸
    fncBoom() {
      console.log('爆炸')
      this.player.eventBus.$emit('onBreak')
    },
    //视图
    fncView() {
      console.log('视图')
      if (document.querySelector('.img1').children[0]) {
        for (var i = 1; i < 7; i++) {
          document.querySelector('.img' + i).removeChild(document.querySelector('.img' + i).children[0])
        }
      }
      let imgData = this.player.eventBus.$emit('shot')
      imgData.forEach((item, index) => {
        let img = document.createElement('img')

        img.style = 'width: 251px;height: auto;top: 20px;position: absolute;'

        // console.log(img)
        img.src = imgData[index]
        document.querySelector(`.img${index + 1}`).appendChild(img)
      })
    },
    fncBackground() {
      console.log('背景')
    },
    fncText() {
      console.log('字体')
      //动画
      this.player.eventBus.$emit('foucsHouPian')
      //输入文字的颜色选项接口
      this.txtColor = '#0000FF'
      this.player.eventBus.$emit('changeTxt', this.txt, this.txtColor)
    },
    // 切换鞋带
    fncSwitchShoelaces(btn) {
      console.log('换鞋带')
      //动画
      this.player.eventBus.$emit('foucsXieDai')
      this.player.eventBus.$emit('Shoelaces', btn)
    },
    //切换背景1
    switchBackgroundOne(EventBus) {
      this.player.eventBus.$emit('changeBgcFloor')
    },
    //切换背景2
    switchBackgroundTwo(EventBus) {
      this.player.eventBus.$emit('changeBgcVitrolite')
    },
    //切换背景3
    switchBackgroundThree(EventBus) {
      this.player.eventBus.$emit('changeBgcGrass')
    },
    //恢复背景
    revertBackground() {
      this.player.eventBus.$emit('revertBgc')
    },
    //替换材质
    replaceMaterial() {
      this.player.eventBus.$emit('replaceMaterial')
    },
    //图片选择完毕
    change(e) {
      let file = e.target.files[0]
      //转化为url
      this.option.img = window.URL.createObjectURL(file)
      console.log(this.option.img, '本地的---')
      console.log(this.option.img, 'this.option.img')
    },
    save() {
      this.$refs.cropper.getCropBlob(data => {
        console.log(data, 'data')
        const url = window.URL.createObjectURL(data)
        console.log(url, '准备进行上传的url')
        this.player.eventBus.$emit('localTexture', url)
      })
    },

    showTieTu() {
      console.log('展示贴图！！！')
    }
  },
  update() {
    console.log('update')
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex: 1;
  box-sizing: border-box;
  // background: #F0F0F0;
  background: #f0f2f5;
  min-height: calc(100vh - 150px);
  max-width: 1800px;
  margin: 0 auto;
  position: relative;
  .left-box {
    width: 240px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 140px;
    text-align: center;
    background: #fff;
    .left-bot {
      width: 220px;
      height: 100%;
      margin: 0 auto;
      overflow: hidden;
    }
  }
  .center {
    z-index: 0;
    position: absolute;
    top: 0;
    left: 255px;
    right: calc(28% + 15px);
    bottom: 140px;
    background: #fff;
    font-size: 24px;
    font-weight: 500;
    overflow: hidden;
    .popWin {
      display: none;
      position: absolute;
      width: 256px;
      height: 256px;
      left: 40%;
      top: 30%;
      .vue-cropper {
        background-image: url('/static/img/xuanqutu.png') !important;
        // background-color: red !important;
        position: absolute;
        z-index: 100000000;
        .cropper-crop-box {
          background-color: rgb(92, 10, 10);
        }
      }
    }
    button {
      outline: none;
    }
    > ul {
      padding: 0;
      top: 250px;
      right: 0%;
      width: 150px;
      height: 300px;
      z-index: 10000;
      flex-direction: column;
      list-style-type: none;
      position: absolute;
      display: flex;
      > li {
        flex: 1;
        width: 100%;
        text-align: left;
        color: white;
        margin-top: 30px;
        span {
          position: absolute;
        }
      }
    }
    .right_fn {
      width: 150px;
      background: url('./../../../../src/assets/img/onclick.png') no-repeat;
      background-size: 100%;
      background-position: 0 100%;
      color: #eeeeee;
      transform: translate(0, 0);
      transition: all 0.3s;
    }
    .openStateStyle {
      width: 200px;
      background: url('./../../../../src/assets/img/onclick.png') no-repeat;
      background-size: 100%;
      background-position: 0 100%;
      color: #eeeeee;
      transform: translate(-2vw, 0);
      transition: all 0.3s;
      color: rebeccapurple;
    }
    #inputfield {
      width: 200px;
      height: 25px;
      z-index: 10000;
      position: absolute;
    }
    .Func {
      margin-left: 50%;
      top: 75%;
      transform: translate(-50%, 0);
      width: 90%;
      height: 30%;
      border: 1px solid red;
      position: absolute;
      z-index: 1000;
      .singleFile {
        position: absolute;
        z-index: 10000;
      }
    }

    .img1 {
      background: #fff;
      overflow: hidden;
      position: absolute;
      width: 251px;
      height: 235px;
      bottom: 25%;
      left: 0%;
      border: 1px solid red;
    }
    .img2 {
      background: #fff;
      overflow: hidden;
      position: absolute;
      width: 251px;
      height: 235px;
      bottom: 50%;
      left: 30%;
      border: 1px solid red;
      display: none;
    }
    .img3 {
      background: #fff;
      overflow: hidden;
      position: absolute;
      width: 251px;
      height: 235px;
      bottom: 50%;
      left: 60%;
      display: none;
      border: 1px solid red;
    }
    .img4 {
      background: #fff;
      overflow: hidden;
      position: absolute;
      width: 251px;
      height: 235px;
      bottom: 80%;
      display: none;
      left: 50%;
      border: 1px solid red;
    }
    .img5 {
      background: #fff;
      overflow: hidden;
      position: absolute;
      width: 251px;
      height: 235px;
      bottom: 20%;
      display: none;
      left: 50%;
      border: 1px solid red;
    }
    .img6 {
      background: #fff;
      overflow: hidden;
      position: absolute;
      width: 251px;
      height: 235px;
      bottom: 20%;
      display: none;
      left: 20%;
      border: 1px solid red;
    }
  }
  .ColorBoard {
    position: absolute;
    width: 50%;
    height: 50%;
    margin-left: 50%;
    transform: translate(-50%, 0);
  }
  .right-box {
    width: 28%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 140px;
    background: #fff;
    overflow: hidden;
  }
  .bot-box {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 130px;
    padding: 35px 0px;
    background: #333333;
    color: #ffffff;
    font-size: 24px;
    letter-spacing: 2px;
    line-height: 54px;
    text-align: center;
    .size {
      display: inline-block;
      height: 30px;
      text-align: left;
      padding-bottom: 30px;
      line-height: 20px;
      position: absolute;
      top: 8px;
      left: 60%;
    }
    .cart {
      width: 200px;
      height: 60px;
      font-size: 20px;
      margin-right: 30px;
    }
  }
}

/deep/ .ant-select .ant-select-selection-selected-value {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0;
}
</style>
