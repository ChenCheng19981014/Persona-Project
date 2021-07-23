// 声明类
import Public from "./Pubilc";
export class ChangeInterface extends Public {
  constructor(assets) {
    super(assets);
    this.fn = new ChangeFn(assets);
  }
  change() {}
  add() {
    this.CameraAnimate([-668, 3771, 2959], [-730, 526, -165], 3);
    this.fn.addSprite1();
    this.fn.addSprite2();
    this.fn.addSprite3();
    this.fn.addSprite4();
    this.addBackground(
      "https://editor-1303915342.cos.ap-shanghai.myqcloud.com/hospital/shinei02.jpg"
    );
    this.fn.zoom();
    this.fn.showAllSprite();
    document.addEventListener("keyup", (e) => {
      if (e.keyCode === 82) {
        this.CameraAnimate([-668, 3771, 2959], [-730, 526, -165], 1);
      }
    });
    document.body.addEventListener("dblclick", (e) => {
      this.fn.showChairSpirit(e);
      this.fn.showLampSpirit(e);

      this.transformAnimate(
        e,
        "口腔科001",
        [-172, 172, 520],
        [-286, -44, -271],
        1
      );
    });
  }
}
// 声明构造函数
var ChangeFn = function(assets) {
  var flag = false;
  let { camera, controls, scene, renderer, events, dispatch } = assets;
  console.log(assets, "assets--------");
  let prevTime;
  this.showAllSprite = () => {
    var chair = scene.getObjectByName("Chair_zuodian2");
    setInterval(() => {
      var chairChildren = chair.children;
      chairChildren.forEach((i, index) => {
        if (camera.position.y - chair.position.y <= 800) {
          if (
            i.name == "口腔科001" ||
            i.name == "口腔科002" ||
            i.name == "口腔科003" ||
            i.name == "服务台001" ||
            i.name == "耳鼻喉科001" ||
            i.name == "眼科001"
          ) {
            i.visible = false;
          }
        } else if (camera.position.y - chair.position.y >= 800) {
          if (
            i.name == "口腔科001" ||
            i.name == "口腔科002" ||
            i.name == "口腔科003" ||
            i.name == "服务台001" ||
            i.name == "耳鼻喉科001" ||
            i.name == "眼科001"
          ) {
            i.visible = true;
          }
        }
      });
    }, 100);
  };
  this.position = () => {
    console.log(camera.position, "当前位置");
    console.log(controls.target, "当前视角");
  };
  this.addSprite1 = async () => {
    let text = new THREE.TextureLoader();
    var chair = scene.getObjectByName("Chair_zuodian2");
    var pngimg = [
      "https://test2-1303915342.cos.ap-shanghai.myqcloud.com/hospital/kanban.png",
      "https://test2-1303915342.cos.ap-shanghai.myqcloud.com/hospital/kanban2.png",
      "https://test2-1303915342.cos.ap-shanghai.myqcloud.com/hospital/kanban3.png",
      "https://test2-1303915342.cos.ap-shanghai.myqcloud.com/hospital/kanban4.png",
      "https://test2-1303915342.cos.ap-shanghai.myqcloud.com/hospital/kanban4.png",
      "https://test2-1303915342.cos.ap-shanghai.myqcloud.com/hospital/kanban5.png",
    ];
    var spiritPositonX = [-200, -900, -1700, -2700, 400, -600];
    var spiritPositonZ = [100, 100, 100, 300, -850, -850];
    var spiritname = [
      "口腔科001",
      "口腔科002",
      "口腔科003",
      "服务台001",
      "眼科001",
      "耳鼻喉科001",
    ];

    for (var i = 0; i < 6; i++) {
      var png = await text.load(pngimg[i]);
      var spriteMaterial = new THREE.SpriteMaterial({
        color: "rgb(211,227,238)",
        map: png, //设置精灵纹理贴图
      });

      var sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(400, 120, 100);
      sprite.name = spiritname[i];
      sprite.material.opacity = 1;
      chair.add(sprite);
      sprite.position.set(spiritPositonX[i], 500, spiritPositonZ[i]);
    }
  };
  this.addSprite2 = async () => {
    let text = new THREE.TextureLoader();
    var pngimg = [
      "https://test2-1303915342.cos.ap-shanghai.myqcloud.com/hospital/chair.png",
      "https://test2-1303915342.cos.ap-shanghai.myqcloud.com/hospital/lamp.png",
    ];

    var chair = scene.getObjectByName("Chair_zuodian2");

    for (var i = 0; i < 2; i++) {
      var spiritPositonX = [-180, 388.054];
      var spiritPositonY = [100, 212.2];
      var spiritPositonZ = [180, -229.8];
      var spiritname = ["牙科椅", "观片灯"];
      //388.054
      var png = await text.load(pngimg[i]);
      // sprite.position.set(232.743, 107.038, -173.928);
      var spriteMaterial = new THREE.SpriteMaterial({
        color: "rgb(211,227,238)",
        map: png, //设置精灵纹理贴图
      });
      var sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(65, 40, 10);
      sprite.name = spiritname[i];
      sprite.material.opacity = 1;
      chair.add(sprite);
      sprite.position.set(
        spiritPositonX[i],
        spiritPositonY[i],
        spiritPositonZ[i]
      );
      sprite.visible = false;
    }
  };
  this.addSprite3 = async () => {
    let text = new THREE.TextureLoader();
    var pngimg = [
      "https://test2-1303915342.cos.ap-shanghai.myqcloud.com/hospital/circle.png",
    ];

    var chair = scene.getObjectByName("Chair_zuodian2");
    var scaleX = 5;
    var scaleY = 5;

    var spiritname = ["rotate1"];
    var png = await text.load(pngimg[0]);

    var spriteMaterial = new THREE.SpriteMaterial({
      color: "rgb(255,166,24)",
      map: png, //设置精灵纹理贴图
    });
    var sprite = new THREE.Sprite(spriteMaterial);
    // sprite.scale.set(scaleX, scaleY, 100);
    // sprite.scale.set(50, 50, 10);
    sprite.name = "圆1";
    sprite.material.opacity = 1;
    chair.add(sprite);
    sprite.position.set(-300.388, 80.708, 130.356);
    let flag = true;
    let factor = 0;

    var time = setInterval(() => {
      factor += 0.01;
      factor = factor % Math.PI;
      let result = Math.sin(factor) * 5 + 5 + 8;

      sprite.scale.set(result, result, 100);
    });
  };
  this.addSprite4 = async () => {
    let text = new THREE.TextureLoader();
    var pngimg = [
      "https://test2-1303915342.cos.ap-shanghai.myqcloud.com/hospital/circle.png",
    ];

    var chair = scene.getObjectByName("Chair_zuodian2");
    var scaleX = 5;
    var scaleY = 5;

    var spiritname = ["rotate1"];
    var png = await text.load(pngimg[0]);

    var spriteMaterial = new THREE.SpriteMaterial({
      color: "rgb(255,166,24)",
      map: png, //设置精灵纹理贴图
    });
    var sprite = new THREE.Sprite(spriteMaterial);
    // sprite.scale.set(scaleX, scaleY, 100);
    // sprite.scale.set(50, 50, 10);
    sprite.name = "圆2";
    sprite.material.opacity = 1;
    chair.add(sprite);
    sprite.position.set(332.232, 165.337, -232.644);
    let flag = true;
    let factor = 0;
    var time = setInterval(() => {
      factor += 0.01;
      factor = factor % Math.PI;
      let result = Math.sin(factor) * 5 + 5 + 8;
      sprite.scale.set(result, result, 100);
    });
  };
  this.showChairSpirit = (event) => {
    var chairChildrenList = [];
    var chair = scene.getObjectByName("Chair_zuodian2");
    var chairChildren = chair.children;
    chairChildren.forEach((i, index) => {
      if (i.name == "圆1") {
        console.log(i, "I");
        chairChildrenList.push(i);
      } else return;
    });
    console.log(chairChildrenList[0].name, "chairChildrenList");
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    // var zhensuo = scene.getObjectByName("口腔科001");
    // 测试点击物体 检查对象
    var intersects = raycaster.intersectObjects(scene.children, true);
    var intersects1 = raycaster.intersectObjects(chairChildrenList, true);
    // console.log(intersects1);
    // if (intersects[0].object.name == "圆1") {
    //   console.log("特别");
    // }

    if (
      intersects[0].object.name == "Chair_zuodian2" ||
      intersects[0].object.name == "圆1"
    ) {
      var chairChildren = chair.children;
      chairChildren.forEach((i, index) => {
        if (i.name == "牙科椅") {
          i.visible = !flag;
          flag = !flag;
        }
      });
    }
  };
  this.showLampSpirit = (event) => {
    var chair = scene.getObjectByName("Chair_zuodian2");
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    // var zhensuo = scene.getObjectByName("口腔科001");
    // 测试点击物体 检查对象
    var intersects = raycaster.intersectObjects(scene.children, true);
    var intersects = raycaster.intersectObjects(scene.children, true);
    if (
      intersects[0].object.name == "SM_Negatoscope_01_LOD0" ||
      intersects[0].object.name == "圆2"
    ) {
      var chairChildren = chair.children;
      chairChildren.forEach((i, index) => {
        if (i.name == "观片灯") {
          i.visible = !flag;
          flag = !flag;
        }
      });
    }
  };
  this.zoom = () => {
    controls.minDistance = 10;
    controls.maxDistance = 4150;
  };
  this.animation = () => {
    let time = performance.now();
    if (controls) controls.update();
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
};
