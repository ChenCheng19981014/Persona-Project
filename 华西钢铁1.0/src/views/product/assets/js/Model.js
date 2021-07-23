import { Vector3 } from "three";
import Public from "./Pubilc";
// 声明类
export class ChangeInterface extends Public {
  constructor(assets) {
    super(assets);
    this.fn = new ChangeFn(assets);
  }
  change() {
    // this.CameraAnimate([97.38, 51.04, -112], [3.03, -3, -6.8], 3);
    this.fn.truckMoving();
  }
  add() {
    document.body.addEventListener("dblclick", (e) => {
      //   this.fn.initCameraPosition();
      this.fn.showSprite(e);
      console.log("ok");
    });
  }
}
// 声明构造函数
var ChangeFn = function(assets) {
  let { camera, controls, scene, renderer, events, dispatch } = assets;
  let prevTime;
  var flag = false;
  this.initCameraPosition = () => {
    // console.log(camera.position, "camera.position");
    // console.log(controls.target, "controls.target");
    // camera.position.set(97.38, 51.04, -112);
    // controls.target.set(3.03, -3, -6.8);
  };
  this.animation = () => {
    let time = performance.now();
    try {
      dispatch(events.update, { time: time, delta: time - prevTime });
    } catch (e) {
      console.error(e.message || e, e.stack || "");
    }
    //动画更新
    if (controls) controls.update();
    // if (scene.mixer && scene.clock) scene.mixer.update(scene.clock.getDelta());
    prevTime = time;
    //渲染
    if (window.bloomComposer) {
      window.bloomComposer.render(scene, camera);
    } else {
      renderer.render(scene, camera);
    }
  };
  this.showSprite = (event) => {
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children, true);
    console.log(intersects[0].object, "intersects");
    var liaocang = scene.getObjectByName("liaocang");
    console.log(liaocang, "liaocang");
    if (intersects[0].object.name == "gaolu") {
      console.log("成功");
      liaocang.visible = !flag;
      flag = !flag;
    }
  };
  this.truckMoving = () => {
    // console.log("ok");
    var Truck = scene.getObjectByName("Truck");
    // let times = [];

    // for (var i in [...Array(5)]) {
    //   times.push(i * 10);
    //   let v3 = [i * 10, 0, i * 10];
    // }
    const position = {
      begin: [-4130, 0, 0],
      middle: [5020, 0, 0],
      end: [5020, 0, -7878],
    };
    let values = [
      ...position.begin,
      ...position.middle,
      ...position.end,
      ...position.middle,
      ...position.begin,
    ];

    // 通过类CatmullRomCurve3创建一个3D样条曲线
    var curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(position.begin.x, position.begin.y, position.begin.z),
      new THREE.Vector3(
        position.middle.x,
        position.middle.y,
        position.middle.z
      ),
      new THREE.Vector3(position.end.x, position.end.y, position.end.z),
      new THREE.Vector3(position.begin.x),
      new THREE.Vector3(position.begin.x, position.begin.y, position.begin.z),
    ]);
    // 样条曲线均匀分割100分，返回51个顶点坐标
    var points = curve.getPoints(100);
    console.log("points", points); //控制台查看返回的顶点坐标
    var geometry = new THREE.Geometry();
    // 把从曲线轨迹上获得的顶点坐标赋值给几何体
    geometry.vertices = points;
    var material = new THREE.LineBasicMaterial({
      color: 0x4488ff,
    });
    var line = new THREE.Line(geometry, material);
    scene.add(line);

    // 通过Threejs的帧动画相关API播放网格模型沿着曲线做动画运动

    // 声明一个数组用于存储时间序列
    let arr = [];
    for (let i = 0; i < 101; i++) {
      arr.push(i);
    }
    // 生成一个时间序列
    var times = new Float32Array(arr);

    var posArr = [];
    points.forEach((elem) => {
      posArr.push(elem.x, elem.y, elem.z);
    });
    // 创建一个和时间序列相对应的位置坐标系列
    var values = new Float32Array(posArr);

    // 创建一个和时间序列相对应的位置坐标系列
    // 创建一个帧动画的关键帧数据，曲线上的位置序列对应一个时间序列
    var posTrack = new THREE.KeyframeTrack(".position", times, values);
    let duration = 1000;
    let clip = new THREE.AnimationClip("default", duration, [posTrack]);
    var mixer = new THREE.AnimationMixer(Truck);
    let AnimationAction = mixer.clipAction(clip);
    AnimationAction.timeScale = 20;
    AnimationAction.play();

    var clock = new THREE.Clock(); //声明一个时钟对象
    function render() {
      renderer.render(scene, camera);
      requestAnimationFrame(render);
      // 更新帧动画的时间
      mixer.update(clock.getDelta());
    }
    render();
  };
};
export { ChangeFn };
