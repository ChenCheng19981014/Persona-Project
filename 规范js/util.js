import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";

import { TweenMax } from "gsap";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer";
const Player = function (dom) {
  var loader = new THREE.ObjectLoader();
  var camera, scene, controls, renderer2, renderer;
  var events = {};
  let domSize = {
    width: dom.clientWidth,
    height: dom.clientHeight,
  };
  this.run = (json) => {
    initRenderer();
    load(json);
    // initEvent();
    this.setScene(loader.parse(json.scene));
    this.setCamera(loader.parse(json.camera));
    controls = new OrbitControls(camera, renderer2.domElement);
    this.setSize(dom.clientWidth, dom.clientHeight);
    this.play();
    return this;
  };
  const initRenderer = () => {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer2 = new CSS3DRenderer();
    renderer2.setSize(dom.clientWidth, dom.clientHeight);
    renderer2.domElement.style.position = "absolute";
    renderer2.domElement.style.top = 0;
    renderer2.domElement.className = "scene2";
    dom.appendChild(renderer.domElement);
    dom.appendChild(renderer2.domElement);
  };
  const initEvent = () => {
    window.addEventListener("resize", (_) => {
      let { clientWidth, clientHeight } = dom;
      this.setSize(clientWidth, clientHeight);
    });
  };

  const load = (json) => {
    var project = json.project;

    if (project.vr !== undefined) renderer.xr.enabled = project.vr;
    if (project.shadows !== undefined)
      renderer.shadowMap.enabled = project.shadows;
    if (project.shadowType !== undefined)
      renderer.shadowMap.type = project.shadowType;
    if (project.toneMapping !== undefined)
      renderer.toneMapping = project.toneMapping;
    if (project.toneMappingExposure !== undefined)
      renderer.toneMappingExposure = project.toneMappingExposure;
    if (project.physicallyCorrectLights !== undefined)
      renderer.physicallyCorrectLights = project.physicallyCorrectLights;

    events = {
      init: [],
      start: [],
      stop: [],
      keydown: [],
      keyup: [],
      mousedown: [],
      mouseup: [],
      mousemove: [],
      touchstart: [],
      touchend: [],
      touchmove: [],
      update: [],
    };

    var scriptWrapParams = "player,renderer,scene,camera";
    var scriptWrapResultObj = {};

    for (var eventKey in events) {
      scriptWrapParams += "," + eventKey;
      scriptWrapResultObj[eventKey] = eventKey;
    }

    var scriptWrapResult = JSON.stringify(scriptWrapResultObj).replace(
      /\"/g,
      ""
    );

    for (var uuid in json.scripts) {
      var object = scene.getObjectByProperty("uuid", uuid, true);

      if (object === undefined) {
        continue;
      }

      var scripts = json.scripts[uuid];

      for (var i = 0; i < scripts.length; i++) {
        var script = scripts[i];

        var functions = new Function(
          scriptWrapParams,
          script.source + "\nreturn " + scriptWrapResult + ";"
        ).bind(object)(this, renderer, scene, camera);

        for (var name in functions) {
          if (functions[name] === undefined) continue;

          if (events[name] === undefined) {
            continue;
          }

          events[name].push(functions[name].bind(object));
        }
      }
    }

    dispatch(events.init, arguments);
  };

  this.setCamera = function (value) {
    camera = value;
    camera.aspect = domSize.width / domSize.height;
    camera.updateProjectionMatrix();
  };

  this.setScene = (value) => {
    scene = value;
  };

  this.setSize = function (width, height) {
    if (camera) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
    if (renderer) {
      renderer.setSize(width, height);
    }
    if (renderer2) {
      renderer2.setSize(width, height);
    }
  };

  function dispatch(array, event) {
    for (var i = 0, l = array.length; i < l; i++) {
      array[i](event);
    }
  }

  this.animate = () => {
    if (controls) controls.update();
    this.change && this.change.animation && this.change.animation();
    renderer && renderer.render(scene, camera);
    renderer2 && renderer2.render(scene, camera);
  };

  this.play = function () {
    dom.addEventListener("keydown", onDocumentKeyDown);
    dom.addEventListener("keyup", onDocumentKeyUp);
    dom.addEventListener("mousedown", onDocumentMouseDown);
    dom.addEventListener("mouseup", onDocumentMouseUp);
    dom.addEventListener("mousemove", onDocumentMouseMove);
    dom.addEventListener("touchstart", onDocumentTouchStart);
    dom.addEventListener("touchend", onDocumentTouchEnd);
    dom.addEventListener("touchmove", onDocumentTouchMove);

    dispatch(events.start, arguments);
    renderer.setAnimationLoop(this.animate);
  };
  this.getAssets = () => {
    return {
      scene,
      camera,
      controls,
      renderer,
      renderer2,
      dom,
    };
  };
  this.dispose = function () {
    renderer.setAnimationLoop(null);
    renderer.dispose();
    renderer2.disposr();
    camera = undefined;
    scene = undefined;
    controls = undefined;
  };
  //

  function onDocumentKeyDown(event) {
    dispatch(events.keydown, event);
  }

  function onDocumentKeyUp(event) {
    dispatch(events.keyup, event);
  }

  function onDocumentMouseDown(event) {
    dispatch(events.mousedown, event);
  }

  function onDocumentMouseUp(event) {
    dispatch(events.mouseup, event);
  }

  function onDocumentMouseMove(event) {
    dispatch(events.mousemove, event);
  }

  function onDocumentTouchStart(event) {
    dispatch(events.touchstart, event);
  }

  function onDocumentTouchEnd(event) {
    dispatch(events.touchend, event);
  }

  function onDocumentTouchMove(event) {
    dispatch(events.touchmove, event);
  }

  /********************************************************************************************** */
  // 传出scene、camera、controls
};
class Bus {
  constructor() {
    this.fnMap = {};
  }
  $on(name, fn) {
    this.fnMap[name] = fn;
  }
  $emit() {
    if (this.fnMap[arguments[0]] === undefined) throw Error("请先挂载在使用");
    return this.fnMap[arguments[0]](
      ...[...arguments].filter((_, Id) => Id > 0)
    );
  }
  $off(name) {
    this.fnMap[name] && delete this.fnMap[name];
  }
}
function Gb(assets) {
  let { scene, camera, controls, eventBus, renderer, dom, THREE } = assets;
  /* 精灵图 */
  this.getSprite = (width, height) => {
    let spriteMaterial = new THREE.SpriteMaterial({});
    let sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(width || 2000, height || 1000);
    return sprite;
  };
  /* 加框背 */
  this.getCanvas = (
    fillTextConfig = ["test", 10, 10],
    translate = [0, 0],
    fontSize = 150,
    color = "#00ff00",
    fontType = "Arial",
    bgc = "rgba(255,255,255,0.5)"
  ) => {
    let canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 800;
    let ctx = canvas.getContext("2d");
    ctx.translate(...translate);
    ctx.fillStyle = bgc;
    ctx.fillRect(0, 0, 1000000000, 10000000000);
    ctx.fillStyle = color; //文本填充颜色
    ctx.font = "bolder " + fontSize + "px " + fontType + " ";
    ctx.fillText(...fillTextConfig);
    // 将画布生成的图片作为贴图给精灵使用，并将精灵创建在设定好的位置
    return canvas;
  };
  /* 加文字 */
  this.setTexture = async (obj, map, type = "url") => {
    let Texture;
    if (type === "file") {
      Texture = new THREE.Texture(map);
      Texture.needsUpdate = true;
    } else {
      let load = new THREE.TextureLoader();
      Texture = await load.load(map);
    }
    obj.material.map = Texture;

    return Texture;
  };
  this.getTansDomToModel = (dom) => new CSS3DObject(dom);
  /* 世界坐标 */
  this.getObjWorldPosition = (obj) => {
    scene.updateMatrixWorld(true);
    // 声明一个三维向量用来保存网格模型的世界坐标
    let worldPosition = new THREE.Vector3();
    // 获得世界坐标，执行getWorldPosition方法，提取网格模型的世界坐标结果保存到参数worldPosition中
    obj.getWorldPosition(worldPosition);
    return worldPosition;
  };
  /* 获取添加一个点击对象 */
  this.getClickEventObj = (e, accectClickList) => {
    // 确定位置使用
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    mouse.x = (e.offsetX / dom.clientWidth) * 2 - 1;
    mouse.y = -(e.offsetY / dom.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(
      accectClickList.length > 0 ? accectClickList : scene.children,
      true
    );
    if (intersects.length > 0) {
      return intersects;
    } else {
      return null;
    }
  };
  this.anima = (begin, end, time, onUpdate, onComplete) => {
    let newBegin = { ...begin };
    let tween = new TweenMax(newBegin, time, end)
      .eventCallback("onUpdate", (_) => onUpdate && onUpdate(newBegin))
      .eventCallback("onComplete", (_) => {
        onComplete && onComplete();
        TweenMax.killTweensOf(tween);
        tween = null;
      });

    return tween;
  };
  this.createMacroTask = (macroTaskFn, time = 0) => {
    let tempTimer = setTimeout(() => {
      clearTimeout(tempTimer);
      tempTimer = null;
      return macroTaskFn();
    }, time);
  };
  this.scalarBoom = (model, scalar) => {
    var modelCenter = new THREE.Vector3(0, 0, 0);

    model.traverse(function (value) {
      if (value.isMesh) {
        let meshBox3 = new THREE.Box3();
        meshBox3.setFromObject(value);
        //模型中心点
        var worldPs = new THREE.Vector3()
          .addVectors(meshBox3.max, meshBox3.min)
          .multiplyScalar(0.5);
        if (isNaN(worldPs.x)) return;
        //计算爆炸方向
        value.worldDir = new THREE.Vector3()
          .subVectors(worldPs, modelCenter)
          .normalize();
        //保存初始坐标
        value.userData.oldPs = new THREE.Vector3(
          value.position.x,
          value.position.y,
          value.position.z
        );
      }
    });
    model.traverse(function (value) {
      if (!value.isMesh || !value.worldDir) return;
      value.position.copy(
        new THREE.Vector3()
          .copy(value.userData.oldPs)
          .add(new THREE.Vector3().copy(value.worldDir).multiplyScalar(scalar))
      );
    });
  };
  this.deepFindParent = (model, parentName) => {
    if (!model.parent) return new Error("该模型没有父模型");
    let deep = (model) => {
      if (!model.parent || model.parent.name === "Scene") return false;
      if (model.parent.name === parentName) return true;
      return deep(model.parent);
    };
    return deep(model);
  };
  this.getModel = (objName) => scene.getObjectByName(objName);
  this.getMesh = (_) => {
    let g = new THREE.CubeGeometry(1, 1, 1);
    let m = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    return new THREE.Mesh(g, m);
  };
  this.getInstance = (model1, model2) => {
    let model1WorldPosition = this.getObjWorldPosition(model1);
    let model2WorldPosition = this.getObjWorldPosition(model2);
    // if(model1.position.x ===0)
    return model1WorldPosition.distanceTo(model2WorldPosition);
  };
  this.changeModelOpc = (model, opc = 0.5, toOld = false) => {
    if (model.type === "Group") throw TypeError("该模型为Group类型");
    if (!model.material) throw TypeError("该模型没有材质");
    let modelTransparent = model.material.transparent;
    if (model.material.oldOpc === undefined) {
      model.material.oldOpc =
        model.material.opacity === undefined ? 1 : model.material.opacity;
      model.material.oldTransparent =
        model.material.transparent === undefined
          ? false
          : model.material.transparent;
    }
    if (toOld) {
      model.material.opacity = model.material.oldOpc;
      model.material.transparent = model.material.oldTransparent;
      return;
    }
    if (opc === 1) {
      model.material.transparent = false;
      model.material.opacity = 1;
    } else {
      if (!modelTransparent) {
        model.material.transparent = true;
      }
      model.material.opacity = opc;
    }
  };
  this.deepChangeModelOpc = (model, opc, toOld) => {
    if (model.type === "Mesh") {
      this.changeModelOpc(model, opc, toOld);
    } else if (model.type === "Group") {
      model.children.forEach((i) => this.deepChangeModelOpc(i, opc, toOld));
    }
  };
  /**
   * 作用：
   * @param {*} now true 的话 返回当前的相机的位置和控制器的target，是个对象
   * @param {*} 2-4是相机的位置
   * @param {*} 5-7是control 的camera
   * @returns 相机动画需要的数据
   */
  this.getCameraAnimaBaseData = (
    now = false,
    cx,
    cy,
    cz,
    tx,
    ty,
    tz,
    anima = false
  ) => {
    if (now) {
      let { x, y, z } = camera.position;
      let tx = controls.target.x;
      let ty = controls.target.y;
      let tz = controls.target.z;
      return {
        cx: x,
        cy: y,
        cz: z,
        tx,
        ty,
        tz,
      };
    } else {
      return {
        cx,
        cy,
        cz,
        tx,
        ty,
        tz,
      };
    }
  };
  /**
   * 作用：
   * @param {*} begin map 开始的对象
   * @param {*} end map 结束的map
   * @param {*} time 时间， 默认1秒
   * @returns promise 动画结束回调res函数，返回动画实例
   *
   */
  this.cameraAnima = (begin, end, time = 1) => {
    let start = begin === true ? this.getCameraAnimaBaseData(true) : false;
    return this.anima(
      start || begin,
      end,
      time,
      (data) => {
        camera.position.set(data.cx, data.cy, data.cz);
        controls.target.set(data.tx, data.ty, data.tz);
      },
      (_) => {}
    );
  };
  this.deepFindInfo = (model, type) => {
    let deep = (model, type) => {
      if (model[type] !== undefined) {
        return model[type];
      } else if (model.parent.type === "Scene") {
        return undefined;
      } else {
        return deep(model.parent, type);
      }
    };
    return deep(model, type);
  };
  this.animaSequence = (list, time, onUpdate, onComplate, end) => {
    let count = 0;
    let ani = () => {
      list[count + 1].ease = "none";
      this.anima(
        list[count],
        list[count + 1],
        time,
        (data) => onUpdate(data),
        () => {
          if (count + 1 < list.length - 1) {
            count++;
            onComplate();
            ani();
          } else {
            end();
          }
        }
      );
    };
    ani();
  };
  this.clone = (obj) => {
    if (obj === null) return null;
    if (typeof obj !== "object") return obj;
    var newObj = new obj.constructor(); //保持继承链
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        //不遍历其原型链上的属性
        var val = obj[key];
        newObj[key] = val;
      }
    }
    return newObj;
  };
  this.pathAnima = (
    model,
    animaModel,
    endCall,
    isLookAt = false,
    speed = 0.001
  ) => {
    if (!model.children)
      throw TypeError("路径动画需要传入的模型children不为空");
    let curve = new THREE.CatmullRomCurve3(
      model.children.map((i) => i.position)
    );
    let geometry = new THREE.BufferGeometry(); //创建一个缓冲类型几何体

    //曲线上等间距返回多个顶点坐标
    let pointsArr = curve.getSpacedPoints(100); //分段数100，返回101个顶点

    geometry.setFromPoints(pointsArr);
    let material = new THREE.LineBasicMaterial({
      color: 0x006666,
    });
    let line = new THREE.Line(geometry, material);
    this.changeModelOpc(line, 0);
    scene.add(line);
    let percent = 0.0;
    let timer = setInterval(() => {
      if (percent > 0.99) return;
      let nowLocal = curve.getPointAt(percent); //曲线上一点
      let nowLocal1 = curve.getPointAt(percent + speed); //曲线上一点
      if (animaModel.name === "Camera") {
        isLookAt && controls.target.copy(nowLocal1);
        animaModel.position.copy(nowLocal); //更新光点位置
      } else {
        isLookAt && animaModel.lookAt(nowLocal1);
        animaModel.position.copy(nowLocal); //更新光点位置
      }
      percent += speed;
      // if (percent > 0.99) percent = 0.0;
      if (percent > 0.99) {
        clearInterval(timer);
        endCall();
        return;
      }
    }, 16);
    return timer;
  };
}

export default Player;
export { Gb, Bus };
