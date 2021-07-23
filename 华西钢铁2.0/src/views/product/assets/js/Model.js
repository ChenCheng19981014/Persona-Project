// "use strict";
import { Vector3 } from "three";
import Public from "./Pubilc";
let that;
// 声明类
export class ChangeInterface extends Public {
  constructor(assets) {
    super(assets);
    this.fn = new ChangeFn(assets);
    that = this;
  }
  change() {
    this.CameraAnimate([154, 73, -14], [4.25, -10, -13], 3);
    this.fn.drive();
    this.fn.hideSprite();
    this.fn.zoom();
  }
  add() {
    document.body.addEventListener("click", (e) => {
      this.fn.initCameraPosition();
      this.fn.showSprite(e);
      this.fn.MoveToSprite(e);
    });
    document.body.addEventListener("keydown", this.fn.BackInitPosition);
  }
}

// 声明构造函数
var ChangeFn = function(assets) {
  let { camera, controls, scene, renderer, events, dispatch } = assets;
  let prevTime;
  this.drivableTruck = null;
  this.progress = 0;
  this.curve = null;

  this.BackInitPosition = (event) => {
    if (event.keyCode === 82) {
      that.CameraAnimate([154, 73, -14], [4.25, -10, -13], 1.5);
    }
  };
  this.MoveToSprite = (event) => {
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children, true);
    var SpriteList = [
      {
        name: "ggaolu",
        position: [109, 47, 43],
        target: [6.7, -12, 37],
        time: 1,
      },
      {
        name: "gdianhuolu",
        position: [105.7, 46.9, 7.9],
        target: [7.726, -9.98, 1.6],
        time: 1,
      },
      {
        name: "gliaochang",
        position: [76.96, 41.7, -38],
        target: [4.8, -0.13, -43],
        time: 1.2,
      },
      {
        name: "gshuichuli",
        position: [39.29, 39.19, 63.56],
        target: [-8.52, 11.4, 60.46],
        time: 1.5,
      },
      {
        name: "gqushuidian",
        position: [4, 37.7, 66],
        target: [-17, 25.5, 65],
        time: 1.5,
      },
      {
        name: "gerpei",
        position: [53.09, 53.68, 10.2],
        target: [-8.7, 17.76, 6.2],
        time: 1.5,
      },
      {
        name: "gyipei",
        position: [51.68, 50.06, -60.4],
        target: [-4.08, 17.65, -64.05],
        time: 1.5,
      },

      {
        name: "gjiankong1",
        position: [52.48, 50, 0.17],
        target: [-67.71, -57.89, -6.46],
        time: 1.5,
      },

      {
        name: "gjiankong2",
        position: [55.3, 52.43, -80.62],
        target: [-64.9, -56.94, -87.2],
        time: 1.5,
      },

      {
        name: "gjiankong3",
        position: [97.31, 39.38, 36.65],
        target: [-42.88, -88.18, 28.91],
        time: 1.5,
      },

      {
        name: "gjiankong4",
        position: [72.205, 44.094, -39.42],
        target: [-54.32, -71.03, -46.4],
        time: 1.5,
      },

      {
        name: "gjiankong5",
        position: [105.51, 49.74, -37.42],
        target: [-42.063, -84.54, -46.03],
        time: 1.5,
      },

      {
        name: "gjiance1",
        position: [25.935, 34.38, 36.06],
        target: [-14.023, 14.67, 34.12],
        time: 1.5,
      },

      {
        name: "gjiance2",
        position: [61.564, 33.92, -12.82],
        target: [-5.589, 2.594, -16.89],
        time: 1.5,
      },

      {
        name: "gjiance3",
        position: [104.21, 25.25, -56.81],
        target: [8.64, -21.88, -61.44],
        time: 1.5,
      },

      {
        name: "gjiance4",
        position: [69.09, 34.001, 23.09],
        target: [-4.85, -2.47, 19.51],
        time: 1.5,
      },

      {
        name: "gjiance5",
        position: [27.14, 34.89, -32.6],
        target: [-11.22, 17.07, -37.92],
        time: 1.5,
      },
    ];
    SpriteList.forEach((i, index) => {
      if (intersects[0].object.name === i.name) {
        that.CameraAnimate(i.position, i.target, i.time);
      }
    });
  };
  this.hideSprite = () => {
    scene.traverse((i, index) => {
      if (
        i.name === "ggaolu1" ||
        i.name === "gjiankong1" ||
        i.name === "gjiankong001" ||
        i.name === "gdianhuolu01" ||
        i.name === "gjiance1" ||
        i.name === "gjiance001" ||
        i.name === "gjiankong002" ||
        i.name === "gjiance2" ||
        i.name === "gliaochang01" ||
        i.name === "gjiankong3" ||
        i.name === "gjiankong003" ||
        i.name === "gshuichuli1" ||
        i.name === "gqushuidian1" ||
        i.name === "gjiance3" ||
        i.name === "gpeiliao02" ||
        i.name === "gpeiliao01" ||
        i.name === "gjiance003" ||
        i.name === "gjiance002" ||
        i.name === "gjiankong4" ||
        i.name === "gjiankong004" ||
        i.name === "gjiankong005" ||
        i.name === "gjiankong5" ||
        i.name === "gjiance4" ||
        i.name === "gjiance004" ||
        i.name === "gjiance5" ||
        i.name === "gjiance005" ||
        i.name === "gjiankong2"
      ) {
        i.visible = false;
      } else if (
        i.name === "ggaolu" ||
        i.name === "gshuichuli" ||
        i.name === "gqushuidian" ||
        i.name === "gerpei" ||
        i.name === "gdianhuolu" ||
        i.name === "gliaochang" ||
        i.name === "gyipei"
      ) {
        i.visible = true;
      }
    });
  };
  this.monitor = () => {
    scene.traverse((i, index) => {
      if (
        i.name === "gjiance5" ||
        i.name === "gjiance4" ||
        i.name === "gjiance3" ||
        i.name === "gjiance2" ||
        i.name === "gjiance1"
      ) {
        i.visible = true;
      } else if (
        i.name === "ggaolu1" ||
        i.name === "gjiankong1" ||
        i.name === "gjiankong001" ||
        i.name === "gdianhuolu01" ||
        i.name === "gjiance1" ||
        i.name === "gjiance001" ||
        i.name === "gjiankong002" ||
        i.name === "gjiance2" ||
        i.name === "gliaochang01" ||
        i.name === "gjiankong3" ||
        i.name === "gjiankong003" ||
        i.name === "gshuichuli1" ||
        i.name === "gqushuidian1" ||
        i.name === "gjiance3" ||
        i.name === "gpeiliao02" ||
        i.name === "gpeiliao01" ||
        i.name === "gjiance003" ||
        i.name === "gjiance002" ||
        i.name === "ggaolu" ||
        i.name === "gdianhuolu" ||
        i.name === "gshuichuli" ||
        i.name === "gqushuidian" ||
        i.name === "gerpei" ||
        i.name === "gliaochang" ||
        i.name === "gyipei" ||
        i.name === "gjiankong4" ||
        i.name === "gjiankong5" ||
        i.name === "gjiankong2"
      ) {
        i.visible = false;
      }
    });
  };
  this.showCamera = () => {
    scene.traverse((i, index) => {
      if (
        i.name === "gjiankong1" ||
        i.name === "gjiankong2" ||
        i.name === "gjiankong3" ||
        i.name === "gjiankong4" ||
        i.name === "gjiankong5"
      ) {
        i.visible = true;
      } else if (
        i.name === "ggaolu1" ||
        i.name === "gjiankong1" ||
        i.name === "gjiankong001" ||
        i.name === "gdianhuolu01" ||
        i.name === "gjiance1" ||
        i.name === "gjiance001" ||
        i.name === "gjiankong002" ||
        i.name === "gjiance2" ||
        i.name === "gliaochang01" ||
        i.name === "gjiankong3" ||
        i.name === "gjiankong003" ||
        i.name === "gshuichuli1" ||
        i.name === "gqushuidian1" ||
        i.name === "gjiance3" ||
        i.name === "gpeiliao02" ||
        i.name === "gpeiliao01" ||
        i.name === "gjiance003" ||
        i.name === "gjiance002" ||
        i.name === "gjiance4" ||
        i.name === "gjiance004" ||
        i.name === "gjiance5" ||
        i.name === "gjiance005" ||
        i.name === "ggaolu" ||
        i.name === "gjiankong004" ||
        i.name === "gjiankong005" ||
        i.name === "gdianhuolu" ||
        i.name === "gshuichuli" ||
        i.name === "gqushuidian" ||
        i.name === "gerpei" ||
        i.name === "gliaochang" ||
        i.name === "gyipei"
      ) {
        i.visible = false;
      }
    });
  };
  this.initCameraPosition = () => {
    console.log(camera.position, "camera.position");
    console.log(controls.target, "controls.target");
    // camera.position.set(97.38, 51.04, -112);
    // controls.target.set(3.03, -3, -6.8);
    // console.log(controls, "controls");
  };
  this.drive = () => {
    /*let path = scene.getObjectByName('path');
    let initialPoints = [];
    for(let child of path.children)
    {
      initialPoints.push(new THREE.Vector3(child.position.x, child.position.y, child.position.z));
    }*/
    let path = scene.getObjectByName("path2");
    let initialPoints = [];
    for (let child of path.children) {
      initialPoints.push(
        new THREE.Vector3(child.position.x, child.position.y, child.position.z)
      );
    }
    for (let i = path.children.length - 1; i > 0; i--) {
      let child = path.children[i];
      initialPoints.push(
        new THREE.Vector3(child.position.x, child.position.y, child.position.z)
      );
    }
    // console.log(initialPoints);
    this.curve = new THREE.CatmullRomCurve3(
      initialPoints,
      "true",
      "catmullrom",
      0.1
    );
    const points = this.curve.getPoints(500);

    const line = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineBasicMaterial({ color: 0x00ff00 })
    );
    //line.position.y += 5;
    scene.add(line);

    this.drivableTruck = scene.getObjectByName("Truck");
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

    /* 对于添加轨迹动画  */
    if (this.progress > 1.0) {
      this.progress -= 1.0;
    }
    this.progress += 0.0001;
    if (this.curve && this.drivableTruck) {
      let point = this.curve.getPoint(this.progress);
      if (point && point.x) {
        this.drivableTruck.position.set(point.x, point.y, point.z);
      }
      let point2 = this.curve.getPoint(this.progress + 0.0001);
      if (point2 && point2.x) {
        this.drivableTruck.lookAt(point2);
        this.drivableTruck.rotateY(-Math.PI / 2);
      }
    }

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
    // console.log(intersects[0].object.name, "intersects[0].object.name");
    let list = [
      { spriteName: "ggaolu1", modelName: "ggaolu" },
      { spriteName: "gdianhuolu01", modelName: "gdianhuolu" },
      { spriteName: "gliaochang01", modelName: "gliaochang" },
      { spriteName: "gshuichuli1", modelName: "gshuichuli" },
      { spriteName: "gpeiliao02", modelName: "gerpei" },
      { spriteName: "gpeiliao01", modelName: "gyipei" },
      { spriteName: "gqushuidian1", modelName: "gqushuidian" },
      { spriteName: "gjiankong001", modelName: "gjiankong1" },
      { spriteName: "gjiankong002", modelName: "gjiankong2" },
      { spriteName: "gjiankong003", modelName: "gjiankong3" },
      { spriteName: "gjiankong004", modelName: "gjiankong4" },
      { spriteName: "gjiankong005", modelName: "gjiankong5" },
      { spriteName: "gjiance004", modelName: "gjiance4" },
      { spriteName: "gjiance005", modelName: "gjiance5" },
      { spriteName: "gjiance003", modelName: "gjiance3" },
      { spriteName: "gjiance002", modelName: "gjiance2" },
      { spriteName: "gjiance001", modelName: "gjiance1" },
    ];
    list.forEach((i) => {
      i.spriteName = scene.getObjectByName(i.spriteName);
    });
    list.forEach((i) => {
      if (intersects[0].object.name === i.modelName) {
        i.spriteName.visible = !i.spriteName.visible;
      } else {
        i.spriteName.visible = false;
      }
    });
  };
  this.zoom = () => {
    controls.minDistance = 10;
    controls.maxDistance = 250;
  };
};
export { ChangeFn };
