/* eslint-disable */

import Pb from './pb'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
let changeBloomComposer = ''
function ChangeInterface(assets) {
  let { scene, camera, controls, eventBus, renderer, dom, player } = assets
  // 测试的模型
  // let shoesModel
  // 鞋子模型
  let shoesModel = scene.getObjectByName('group1')
  //  鞋子影子
  let yinzi = scene.getObjectByName('yinzi')
  // 时间标记
  let markTime = 0
  // 标记
  let mark
  // 是否爆炸开
  let isbreak = true
  // 初始位置
  let OldPs
  // 速度
  let speed = 1
  // 设置全局定时器
  let rend
  // 拆解标记符
  let Boom
  // 鞋子部件6块
  let focusList
  // 选中的鞋子模块
  let selectShoesModel
  // 点击选中的模块
  let clickShoesModel = scene.getObjectByName('qianpian')
  //后处理
  let bloomComposer
  //是否进行点击事件
  let clicked = false
  // 是否移入鞋面
  let shoesMoving
  //
  let houshangpiannowSelectedBgc = ''
  // 部件中文对照英文
  let webModelList = [
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
  //输入的文字
  let inputTxt
  // 公共函数 合并对象
  this.houshangpianoldMaterial = ''
  this.__proto__ = new Pb(
    Object.assign(assets, {
      THREE
    })
  )
  //初始化场景
  this.initTheScene = () => {
    // 控制器start事件需要关闭的动画的集合
    this.startCloseMap = {
      focusModel: '',
      foucsXieDai: '',
      foucsHouPian: '',
      firstPosition: ''
    }

    // 控制缓动
    controls.enableDamping = true
    // 初始化文字
    this.ininWenZi()
    // this.initFBX()
    // 初始化摄像机
    this.ininCamera()
    //初始化背景
    this.revertBgc()
    //初始化控制范围
    this.initcontrol()
    //初始化鞋面
    this.initShoes()
    // 爆炸
    eventBus.$on('onBreak', this.onBreak)
    //旋转
    eventBus.$on('onRotate', this.onRotate)
    //截图
    eventBus.$on('shot', this.shot)
    //添加字
    eventBus.$on('changeTxt', this.changeTxt)
    //切换颜色
    eventBus.$on('changeColorMaterial', this.changeColorMaterial)
    //切换背景--木地板
    eventBus.$on('changeBgcFloor', this.changeBgcFloor)
    //切换背景--瓷砖
    eventBus.$on('changeBgcVitrolite', this.changeBgcVitrolite)
    //切换背景--草地
    eventBus.$on('changeBgcGrass', this.changeBgcGrass)
    // 恢复场景
    eventBus.$on('revertBgc', this.revertBgc)
    // 切换鞋带
    eventBus.$on('Shoelaces', this.Shoelaces)
    //鞋带聚焦
    eventBus.$on('foucsXieDai', this.foucsXieDai)
    //聚集后跟
    eventBus.$on('foucsHouPian', this.foucsHouPian)
    //相机缩放大
    eventBus.$on('cameraZoomBiger', this.cameraZoomBiger)
    //相机缩缩小
    eventBus.$on('cameraZoomSmaller', this.cameraZoomSmaller)
    //换贴图
    eventBus.$on('replaceMaterial', this.replaceMaterial)
    //换贴图
    eventBus.$on('localTexture', this.localTexture)
    //随机
    eventBus.$on('random', this.random)
    //重置状态(本地贴图、颜色、后跟皮质)
    eventBus.$on('Reset', () => {
      this.RestoreColor(), this.resetTietu(), this.revertTieTu()
    })
    // 页面聚焦
    eventBus.$on('clickFocus', model => {
      this.clickFocus(model)
    })
    //测试随机
    eventBus.$on('cunTest', saveModulesColorList => {
      this.cunTest(saveModulesColorList)
    })
    //点击事件
    dom.addEventListener('click', this.click)
    //鼠标点击按下事件
    dom.addEventListener('pointerdown', this.pointerdown)
    // 鼠标移入事件
    dom.addEventListener('mousemove', e => {
      this.mousemove(e)
    })
    // 控制器控制关闭的动画
    controls.addEventListener('start', () => {
      this.closeAnimaList()
      controls.autoRotate = false
    })
    // 接受调用外边框的返回值
    // this.ouLine = this.initOutLineAndBloom()
    // 每秒调用
    this.animate = () => {
      if (bloomComposer) {
        bloomComposer.render(scene, camera)
      } else {
        renderer.render(scene, camera)
      }
    }
    //进行克隆材质
    this.houshangpianoldMaterial = this.getModel('houshangpian').material.clone()
    //
    this.xieMianOldMaterial = this.getModel('zhuxiemian').material.clone()
  }
  // 初始化摄像机
  this.ininCamera = () => {
    camera.position.set(3.421437205796236, 51.09910676909351, 171.1854886253536)
    controls.target.set(7.0807708563144285, 18.783239378783858, 5.608605977755107)
  }
  // 初始化鞋子
  this.initShoes = () => {
    let shoes = scene.getObjectByName('group1')
    shoes.children.forEach(item => {
      if (item.type === 'Group') {
        item.children.forEach((i, index) => {
          i.oldModelColorEmissive = i.material.emissive
          i.oldModelColor = i.material.color
        })
      } else {
        item.oldModelColorEmissive = item.material.emissive
        item.oldModelColor = item.material.color
      }
    })
  }
  //初始化摄像机控制范围
  this.initcontrol = () => {
    console.log('控制范围收到控制~~')
    controls.minDistance = 100
    controls.maxDistance = 400
  }
  // 关闭需要关闭的动画
  this.closeAnimaList = () => {
    // 选择key
    let keyList = Object.keys(this.startCloseMap)
    // 选择值
    Object.values(this.startCloseMap).forEach((item, index) => {
      if (!item) return
      // 暂停动画 并清空内容 item就是那个动画
      item.pause()
      this.startCloseMap[keyList[index]] = null
    })
  }
  // 移入事件
  this.mousemove = e => {
    //恢复颜色
    this.recoveryColor()
    if (clicked) return
    shoesMoving = false
    let shoes = scene.getObjectByName('group1')
    let needCLickList = [...shoes.children]
    let clickList = this.getClickEventObj(e, needCLickList)
    if (!clickList || !clickList.length) return
    let firstObject = clickList[0].object
    if (this.deepFindParent(firstObject, 'group1')) {
      // this.ouLine.selectedObjects = [firstObject]
      this.mouseMoveModel(firstObject)
    }
  }
  // 移入变色
  this.mouseMoveModel = firstObject => {
    shoesMoving = true
    if (firstObject.name === 'xiedaikou') return
    if (selectShoesModel) {
      // selectShoesModel.material.color = selectShoesModel.material.oldColor
      // selectShoesModel.material.emissive = selectShoesModel.material.oldEmissive
      let Old = selectShoesModel.material.oldEmissive.clone()
      selectShoesModel.material.emissive = Old
    }

    selectShoesModel = firstObject
    // selectShoesModel.material.oldColor = selectShoesModel.material.color
    // selectShoesModel.material.color = new THREE.Color('rgba(56,75,131,0.5)')
    selectShoesModel.material.oldEmissive = selectShoesModel.material.emissive.clone()

    // selectShoesModel.material.emissive.set({ r: 70, g: 77, b: 85 })

    selectShoesModel.material.emissive = new THREE.Color('rgba(	0,255,127,0.5)')

    //-------------------------------------------------------------------------------------
    // 鞋后帮的高光
    this.getModel('houpian2').material.emissive = this.getModel('houpian').material.emissive
    //-------------------------------------------------------------------------------------
    //鞋舌的高光
    this.getModel('xieshe1').material.emissive = this.getModel('xieshe2').material.emissive
    this.getModel('xieshe').material.emissive = this.getModel('xieshe1').material.emissive
    //------------------------------------------
    // 鞋底的高光
    this.getModel('polySurface2').material.emissive = this.getModel('polySurface1').material.emissive
    this.getModel('polySurface1').material.emissive = this.getModel('polySurface2').material.emissive
    //-------------------------------------------------------------------------------------
  }
  // 恢复鞋面颜色
  this.recoveryColor = () => {
    if (shoesMoving) return
    scene.getObjectByName('group1').children.forEach(item => {
      if (item.type === 'Group') {
        item.children.forEach(i => {
          // i.material.emissive = i.material.oldEmissive
          i.material.emissive = i.oldModelColorEmissive.clone()
        })
      } else {
        // item.material.emissive = item.material.oldEmissive
        item.material.emissive = item.oldModelColorEmissive.clone()
      }
    })
  }
  //随机鞋面配色
  this.random = xieModulesList => {
    console.log(xieModulesList, 'xieModulesList----')
    let information = []
    xieModulesList[0].forEach(item => {
      webModelList.forEach(i => {
        if (i.chinese === item.name) {
          if (item.name === '后上片文字') {
            let textList = []
            let randomColorTxt = '#' + item.color[Math.floor(Math.random() * item.color.length)].value
            textList.push(inputTxt, randomColorTxt)
            this.changeTxt(textList)
            information.push('部位是:' + item.name + '  颜色是:' + randomColorTxt.replace('#', ''))
          } else {
            let randomColor = '#' + item.color[Math.floor(Math.random() * item.color.length)].value
            this.getModel(i.english).material.color = new THREE.Color(randomColor)
            information.push('部位是:' + item.name + '  颜色是:' + randomColor)
          }
        }
      })
    })
    this.theSameColor()
    return information
  }
  // 页面发送颜色代码直接返回到模型
  this.cunTest = saveModulesColorList => {
    saveModulesColorList[0].forEach(item => {
      webModelList.forEach((i, index) => {
        if (i.chinese === item.name) {
          if (item.name === '后上片文字') {
            let textList = []
            let randomColorTxt = '#' + item.color
            textList.push(inputTxt, randomColorTxt)
            this.changeTxt(textList)
          } else {
            let randomColor = '#' + item.color
            this.getModel(i.english).material.color = new THREE.Color(randomColor)
          }
        }
      })
    })
    controls.autoRotate = false
    //回到最初的位置动画
    let end = this.getCameraAnimaBaseData(
      false,
      3.421437205796236,
      51.09910676909351,
      171.1854886253536,
      7.0807708563144285,
      18.783239378783858,
      5.608605977755107
    )
    this.startCloseMap.firstPosition = this.cameraAnima(true, end, 1)
  }
  //鼠标按下事件
  this.pointerdown = () => {
    mark = setInterval(() => {
      markTime += 1
    })
    if (markTime >= 51) {
      clearInterval(mark)
      markTime = 0
    }
  }
  // 点击模型
  this.click = e => {
    // console.log(camera.position.x, camera.position.y, camera.position.z)
    // console.log(controls.target.x, controls.target.y, controls.target.z)
    if (markTime >= 50) return
    let shoes = scene.getObjectByName('group1')
    let needCLickList = [...shoes.children]
    let clickList = this.getClickEventObj(e, needCLickList)
    if (!clickList || !clickList.length) return
    let firstObject = clickList[0].object
    if (this.deepFindParent(firstObject, 'group1')) {
      this.clickFocus(firstObject)
      clickShoesModel = firstObject
      // clicked = true
      console.log(firstObject, 'firstObject')
    }
  }
  // 点击聚焦
  this.clickFocus = model => {
    //部位动画数组
    focusList = [
      {
        name: 'qianpian',
        x: -122.70944858765665,
        y: 79.54105301960385,
        z: 2.983396323238672
      },
      {
        name: 'zhuxiemian',
        x: 12.345149027434577,
        y: 127.46474042892916,
        z: -88.73159713162799
      },
      {
        name: 'cechexian',
        x: 76.96320452697789,
        y: 45.97234431628337,
        z: -121.00765998270101
      },
      {
        name: 'polySurface1',
        x: 88.17800289621027,
        y: 17.86886151403003,
        z: 82.47569346941609
      },
      {
        name: 'polySurface2',
        x: 88.17800289621027,
        y: 17.86886151403003,
        z: 82.47569346941609
      },
      {
        name: 'houpian',
        x: 132.6325938478371,
        y: 31.36593223635883,
        z: 10.773767792907648
      },
      {
        name: 'houshangpian',
        x: 120.39555686911713,
        y: 72.11252473543989,
        z: 9.08368554520008
      },
      {
        name: 'qianpian2',
        x: 12.345149027434577,
        y: 127.46474042892916,
        z: -88.73159713162799
      },
      {
        name: 'xieshe2',
        x: 43.3848,
        y: 128.9676,
        z: -38.382096
      },
      {
        name: 'xieshe1',
        x: 43.3848,
        y: 128.9676,
        z: -38.382096
      },
      {
        name: 'xiedai3',
        x: -122.70944858765665,
        y: 79.54105301960385,
        z: 2.983396323238672
      },
      {
        name: 'xiedai4',
        x: -122.70944858765665,
        y: 79.54105301960385,
        z: 2.983396323238672
      },
      {
        name: 'wenzi',
        x: 120.39555686911713,
        y: 72.11252473543989,
        z: 9.08368554520008
      }
    ]
    // 后上片文字的处理情况
    if (model.toString() === 'wenzi') {
      clickShoesModel = ''
      let end = this.getCameraAnimaBaseData(false, 120.395, 72.1125247, 9.083685545, 0, 0, 0)
      this.startCloseMap.focusModel = this.cameraAnima(true, end, 1)
    } else if (!model.length) {
      // 直接点击的情况 模型的长度是undefind
      focusList.forEach(item => {
        if (item.name === model.name) {
          let end = this.getCameraAnimaBaseData(false, item.x, item.y, item.z, 0, 0, 0)
          this.startCloseMap.focusModel = this.cameraAnima(true, end, 1)
        }
      })
      clickShoesModel = model
    } else {
      // 除了后上片文字的情况 直接是模型
      let FoucsModel
      FoucsModel = this.getModel(model.toString())
      focusList.forEach(item => {
        if (item.name === FoucsModel.name) {
          let end = this.getCameraAnimaBaseData(false, item.x, item.y, item.z, 0, 0, 0)
          this.startCloseMap.focusModel = this.cameraAnima(true, end, 1)
        }
      })
      //当前对象为点击的对象
      clickShoesModel = FoucsModel
    }
  }
  // 爆炸事件---拆解
  this.onBreak = () => {
    let boomList = {
      biaoqiantuan: {
        x: 0,
        y: 281.909,
        z: 0
      },
      cechexian: {
        x: 133.299,
        y: 81.749,
        z: 0
      },
      group2: {
        x: 0,
        y: 0,
        z: 0
      },
      houpian: {
        x: 227.563,
        y: 0,
        z: 0
      },
      houpian2: {
        x: 228.991,
        y: 0,
        z: 0
      },
      houshangpian: {
        x: 162.215,
        y: 149.947,
        z: 0
      },
      kou: {
        x: 0,
        y: 0,
        z: 0
      },
      neichen: {
        x: 0,
        y: 3.223,
        z: 3.126
      },
      neipi: {
        x: 168.139,
        y: 144.37,
        z: 0
      },
      qianpian: {
        x: 0,
        y: 0,
        z: 0
      },
      qianpian2: {
        x: 126.516,
        y: 86.841,
        z: 0
      },
      xiedai1: {
        x: 0,
        y: 0,
        z: 0
      },
      xiedai2: {
        x: 0,
        y: 0,
        z: 0
      },
      xiedai3: {
        x: 0,
        y: 0,
        z: 0
      },
      xiedai4: {
        x: 0,
        y: 361.757,
        z: 0
      },
      xiedaikou: {
        x: -3.199,
        y: 784.272,
        z: -8.633
      },
      xiedian1q: {
        x: 0,
        y: 0,
        z: 0
      },
      xiedian2: {
        x: 0,
        y: 0,
        z: 0
      },
      xieshe1: {
        x: 0,
        y: 277.254,
        z: 0
      },
      xieshe2: {
        x: 0,
        y: 277.254,
        z: 0
      },
      yingguo: {
        x: 0,
        y: 0,
        z: 0
      },
      zhuxiemian: {
        x: 134.78,
        y: 81.958,
        z: 0
      },
      polySurface1: {
        x: 133.484,
        y: 0,
        z: -115.576
      },
      polySurface2: {
        x: 134.725,
        y: 0,
        z: -115.395
      },
      yingguo: {
        x: 135,
        y: 90.668,
        z: 0
      },
      kou: {
        x: 0,
        y: 278.802,
        z: 0
      },
      yinzi: {
        x: 16.864,
        y: -11.213,
        z: 0
      }
    }
    if (Boom) return
    // 鞋子模块到达的位置
    if (isbreak) {
      console.log('展开~')
      shoesModel.children.forEach((item, index) => {
        if (item.type === 'Group') {
          item.children.forEach((i, index) => {
            // 初始位置
            let OldPs = {
              x: i.position.x,
              y: i.position.y,
              z: i.position.z
            }
            i.OldPs = {
              x: OldPs.x,
              y: OldPs.y,
              z: OldPs.z
            }
            this.anima(
              {
                Cx: i.OldPs.x,
                Cy: i.OldPs.y,
                Cz: i.OldPs.z
              },
              {
                Cx: boomList[i.name].x,
                Cy: boomList[i.name].y,
                Cz: boomList[i.name].z
              },
              1,
              data => {
                i.position.x = data.Cx
                i.position.y = data.Cy
                i.position.z = data.Cz
                Boom = data
              },
              () => {
                Boom = null
              }
            )
          })
        } else {
          // 初始位置
          let OldPs = {
            x: item.position.x,
            y: item.position.y,
            z: item.position.z
          }
          item.OldPs = {
            x: OldPs.x,
            y: OldPs.y,
            z: OldPs.z
          }
          this.anima(
            {
              Cx: item.OldPs.x,
              Cy: item.OldPs.y,
              Cz: item.OldPs.z
            },
            {
              Cx: boomList[item.name].x,
              Cy: boomList[item.name].y,
              Cz: boomList[item.name].z
            },
            1,
            data => {
              item.position.x = data.Cx
              item.position.y = data.Cy
              item.position.z = data.Cz
              Boom = data
            },
            () => {
              Boom = null
            }
          )
        }
      })
      // 初始位置
      let OldPs = {
        x: yinzi.position.x,
        y: yinzi.position.y,
        z: yinzi.position.z
      }
      yinzi.OldPs = {
        x: OldPs.x,
        y: OldPs.y,
        z: OldPs.z
      }
      this.anima(
        {
          Cx: yinzi.OldPs.x,
          Cy: yinzi.OldPs.y,
          Cz: yinzi.OldPs.z
        },
        {
          Cx: boomList[yinzi.name].x,
          Cy: boomList[yinzi.name].y,
          Cz: boomList[yinzi.name].z
        },
        1,
        data => {
          yinzi.position.x = data.Cx
          yinzi.position.y = data.Cy
          yinzi.position.z = data.Cz
          Boom = data
        },
        () => {
          Boom = null
        }
      )
    } else {
      this.revertOnBreak()
    }
    isbreak = !isbreak
  }
  //恢复爆炸
  this.revertOnBreak = () => {
    console.log('恢复操作')
    if (Boom) return
    // 鞋子 鞋面
    shoesModel.children.forEach(item => {
      if (item.type === 'Group') {
        item.children.forEach((i, index) => {
          // 初始位置
          let nowPs = {
            x: i.position.x,
            y: i.position.y,
            z: i.position.z
          }
          this.anima(
            {
              Cx: nowPs.x,
              Cy: nowPs.y,
              Cz: nowPs.z
            },
            {
              Cx: i.OldPs.x,
              Cy: i.OldPs.y,
              Cz: i.OldPs.z
            },
            1,
            data => {
              i.position.x = data.Cx
              i.position.y = data.Cy
              i.position.z = data.Cz
              Boom = data
            },
            () => {
              Boom = null
            }
          )
        })
      } else {
        let nowPs = {
          x: item.position.x,
          y: item.position.y,
          z: item.position.z
        }
        this.anima(
          {
            Cx: nowPs.x,
            Cy: nowPs.y,
            Cz: nowPs.z
          },
          {
            Cx: item.OldPs.x,
            Cy: item.OldPs.y,
            Cz: item.OldPs.z
          },
          1,
          data => {
            item.position.x = data.Cx
            item.position.y = data.Cy
            item.position.z = data.Cz
            Boom = data
          },
          () => {
            Boom = null
          }
        )
      }
    })
    //影子
    let nowPs = {
      x: yinzi.position.x,
      y: yinzi.position.y,
      z: yinzi.position.z
    }
    this.anima(
      {
        Cx: nowPs.x,
        Cy: nowPs.y,
        Cz: nowPs.z
      },
      {
        Cx: yinzi.OldPs.x,
        Cy: yinzi.OldPs.y,
        Cz: yinzi.OldPs.z
      },
      1,
      data => {
        yinzi.position.x = data.Cx
        yinzi.position.y = data.Cy
        yinzi.position.z = data.Cz
        Boom = data
      },
      () => {
        Boom = null
      }
    )
  }
  //控制旋转
  this.onRotate = () => {
    controls.autoRotate = !controls.autoRotate
    controls.autoRotateSpeed = 10.0
  }
  //初始化截图
  this.initCameras = shoes => {
    for (var index = 0; shoes.length; index++) {}
  }
  //截图
  this.shot = () => {
    let ShoesList = []
    for (var index = 0; index < 6; index++) {
      let List = this.shotByCamera(this.getModel('cam0' + (index + 1).toString()))
      ShoesList.push(List)
    }
    return ShoesList
  }
  // 截图功能
  this.shotByCamera = paramcamera => {
    renderer.render(scene, paramcamera)
    return renderer.domElement.toDataURL()
  }
  // 初始化文字
  this.ininWenZi = () => {
    let wenzi = shoesModel.getObjectByName('houshangpian')
    wenzi.material.map = new THREE.CanvasTexture(this.getTextCanvas('WALSH', '#ffffff'))
    wenzi.material.color = new THREE.Color('#ffffff')
    wenzi.material.needsUpdate = true
  }
  // 加字
  this.changeTxt = (inputText = 'walsh') => {
    inputTxt = inputText[0]
    let wenzi = shoesModel.getObjectByName('houshangpian')
    //文字的内容 颜色
    wenzi.material.map = new THREE.CanvasTexture(this.getTextCanvas(inputText[0] || 'WALSh', inputText[1]))
    // wenzi.material.color = new THREE.Color('#ffffff')
    //更新贴图颜色
    wenzi.material.needsUpdate = true
  }
  // 绘制文字的内容
  this.getTextCanvas = (text, color) => {
    let txt = text.toString()
    let width = 2048,
      height = 2048
    let canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    let ctx = canvas.getContext('2d')
    ctx.fillStyle = 'rgb(213,193,149)'
    ctx.fillRect(0, 0, width, height)
    ctx.font = 260 + 'px " bold'
    ctx.fillStyle = color
    ctx.textAlign = 'center'
    ctx.fillText(text, 1020, 1200)
    return canvas
  }
  // 换颜色
  this.changeColorMaterial = color => {
    let colorContent = '#' + color.toString().trim()
    houshangpiannowSelectedBgc = colorContent
    this.changeColor(colorContent)
    this.theSameColor()
  }
  //改颜色第一步
  this.changeColor = color => {
    clickShoesModel.material.color = new THREE.Color(color)
  }
  // 鞋带
  this.Shoelaces = btn =>
    [...Array(4)]
      .map((i, index) => this.getModel(`xiedai${index + 1}`))
      .forEach((i, index) => {
        i.visible = btn[0] === index + 1 ? true : false
      })

  //聚焦鞋带
  this.foucsXieDai = () => {
    controls.autoRotate = false
    let end = this.getCameraAnimaBaseData(false, -122.70944858, 79.541053, 2.983396323, 0, 0, 0)
    this.startCloseMap.foucsXieDai = this.cameraAnima(true, end, 1)
  }
  //聚集后跟
  this.foucsHouPian = () => {
    controls.autoRotate = false
    let end = this.getCameraAnimaBaseData(
      false,
      120.39555686911713,
      72.11252473543989,
      9.08368554520008,
      9.6990875834531,
      8.724416245932801,
      -3.7814479282224958
    )
    this.startCloseMap.foucsHouPian = this.cameraAnima(true, end, 1)
  }
  // 摄像机缩放大
  this.cameraZoomBiger = () => {
    console.log('放大！！！')
    //改变fov值，并更新场景的渲染
    console.log(camera.fov, 'camera.fov')
    camera.fov -= 10
    camera.fov < 20 ? (camera.fov = 20) : null
    camera.updateProjectionMatrix()
    renderer.render(scene, camera)
  }
  // 摄像机缩缩小
  this.cameraZoomSmaller = () => {
    console.log('缩小！！！')
    //改变fov值，并更新场景的渲染
    console.log(camera.fov, 'camera.fov')
    camera.fov += 10
    camera.fov > 70 ? (camera.fov = 70) : null
    camera.updateProjectionMatrix()
    renderer.render(scene, camera)
  }
  // 换贴图
  this.replaceMaterial = () => {
    let textureLoader = new THREE.TextureLoader()
    let model = this.getModel('houshangpian')
    let map = textureLoader.load('./static/img/emissive.jpg', texture => {
      model.material.normalMap = map //法线贴图
      model.material.normalScale = new THREE.Vector2(3, -3)
      model.material.roughness = 0.4
      model.material.needsUpdate = true
    })
    // console.log(model.material, 'model.material.normalMap+++')
  }
  // 重置贴图
  this.resetTietu = () => {
    console.log('重置贴图')
    let model = this.getModel('houshangpian')
    model.material = this.houshangpianoldMaterial.clone()
    model.material.needsUpdate = true
  }
  // 导入本地贴图
  this.localTexture = Url => {
    // 生产一个文字加载器
    let textureLoader = new THREE.TextureLoader()
    //主鞋面
    let model = this.getModel('zhuxiemian')
    //生成一个canvas
    let canvas = document.createElement('canvas')
    textureLoader.load(Url[0], texture => {
      canvas.height = texture.image.naturalHeight
      canvas.width = texture.image.naturalWidth
      let ctx = canvas.getContext('2d')
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(texture.image, 0, 0, canvas.width, canvas.height)
      //讲贴好的文字放在canvas中 再次贴在主鞋面上
      model.material.map = new THREE.CanvasTexture(canvas)
      //更新材质
      model.material.needsUpdate = true
    })
  }
  // 恢复颜色
  this.RestoreColor = () => {
    scene.getObjectByName('group1').children.forEach(item => {
      if (item.type === 'Group') {
        item.children.forEach(i => {
          i.material.color = i.oldModelColor
        })
      } else {
        item.material.color = item.oldModelColor
      }
    })
  }
  //颜色同步(鞋舌、鞋底、后跟)
  this.theSameColor = () => {
    let modelMap = {
      polySurface1: '',
      polySurface2: '',
      houpian: '',
      houpian2: '',
      xieshe2: '',
      xieshe1: ''
    }
    Object.keys(modelMap).forEach(modelName => (modelMap[modelName] = this.getModel(modelName)))
    let { polySurface1, polySurface2, houpian, houpian2, xieshe2, xieshe1 } = modelMap
    //鞋底的颜色同步
    polySurface2.material.color = polySurface1.material.color
    // polySurface1.material.color = polySurface2.material.color
    // 后跟颜色同步
    houpian2.material.color = houpian.material.color
    // houpian.material.color = houpian2.material.color
    //鞋舌颜色同步
    xieshe2.material.color = xieshe1.material.color
    // xieshe1.material.color = xieshe2.material.color
  }
  // 木地板
  this.changeBgcFloor = () => {
    scene.background = ''
    let TextureLoader = new THREE.TextureLoader()
    let bgTexture = TextureLoader.load('./static/img/bgc1.jpg')
    bgTexture.name = '木地板'
    scene.background = bgTexture
  }
  // 瓷砖
  this.changeBgcVitrolite = () => {
    scene.background = ''
    let TextureLoader = new THREE.TextureLoader()
    let bgTexture = TextureLoader.load('./static/img/bgc2.jpg')
    bgTexture.name = '瓷砖'
    scene.background = bgTexture
  }
  // 草地
  this.changeBgcGrass = () => {
    scene.background = ''
    let TextureLoader = new THREE.TextureLoader()
    let bgTexture = TextureLoader.load('./static/img/bgc3.jpg')
    bgTexture.name = '草地'
    scene.background = bgTexture
  }
  // 恢复背景
  this.revertBgc = () => {
    console.log('恢复场景')
    scene.background = ''
    renderer.setClearColor(0xffffff, 1) //设置背景颜色
  }
  // 恢复主鞋面的贴图
  this.revertTieTu = () => {
    let zhuxiemian = this.getModel('zhuxiemian')
    zhuxiemian.material = this.xieMianOldMaterial.clone()
    zhuxiemian.material.needsUpdate = true
    scene.getObjectByName('group3').children.forEach(i => {
      if (i.name === 'zhuxiemian') {
        i.material = zhuxiemian.material
        i.material.needsUpdate = true
      }
    })
    scene.getObjectByName('group4').children.forEach(i => {
      if (i.name === 'zhuxiemian') {
        i.material = zhuxiemian.material
        i.material.needsUpdate = true
      }
    })
  }
  // 外边框后处理
  this.initOutLineAndBloom = () => {
    // 新建混合器;
    const parameters = {
      format: THREE.RGBFormat
    }
    const size = renderer.getDrawingBufferSize(new THREE.Vector2())
    const renderTarget = new THREE.WebGLMultisampleRenderTarget(size.width, size.height, parameters)
    bloomComposer = new EffectComposer(renderer, renderTarget)
    // 新建轮廓线后处理效果
    let outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera)
    // 轮廓线泛光参数
    var params2 = {
      edgeStrength: 5.0,
      edgeGlow: 0.25,
      edgeThickness: 1.0,
      pulsePeriod: 2.6,
      rotate: false,
      usePatternTexture: false
    }
    // 添加到轮廓线上
    outlinePass.edgeStrength = params2.edgeStrength
    outlinePass.edgeGlow = params2.edgeGlow
    outlinePass.edgeThickness = params2.edgeThickness
    outlinePass.pulsePeriod = params2.pulsePeriod
    // 轮廓线被遮挡及未被遮挡的效果
    outlinePass.visibleEdgeColor.set('#4169E1')
    outlinePass.hiddenEdgeColor.set('#4169E1')
    // 拿到当前帧
    let renderPass = new RenderPass(scene, camera)
    bloomComposer.addPass(renderPass)
    // 添加效果
    bloomComposer.addPass(outlinePass)

    bloomComposer.readBuffer.texture.encoding = renderer.outputEncoding

    changeBloomComposer = bloomComposer

    return outlinePass
  }
}

export { ChangeInterface, changeBloomComposer }
