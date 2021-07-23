// 声明类
export class ChangeInterface {
  constructor(assets) {
    this.fn = new ChangeFn(assets);
    this.assets = assets;
  }
  change() {
    this.fn.initCamera();
    this.fn.changeTabModel(0);
    this.fn.FanRotation();
  }
  add() {
    document.body.addEventListener("dblclick", (e) => {
      console.log("ok?");
      this.fn.testFunction();
    });
    return;
    document.querySelector("#focusBox").addEventListener("click", (e) => {
      this.fn.focusBox(e, "01");
    });
    document.body.addEventListener("dblclick", (e) => {
      this.fn.showSprite(e);
      this.fn.factoryTwoTests();
    });
    this.fn.initBox();
    this.fn.moveScene();
    this.fn.addBackground();
    this.fn.addSprite1();
    this.fn.addSprite2();
    this.fn.addSprite3();
    this.fn.addSheXiangTo();
    this.fn.addParkSprite1();
    this.fn.addParkSprite2();
    this.fn.returnScene();
    this.fn.showFactoryBothSides();
    // this.fn.addKeyup();
  }
}
// 声明构造函数
var ChangeFn = function(assets) {
  let { camera, controls, scene } = assets;
  var jidianxiang_list = [];
  var jidianxiangSprite_list = [];
  var jidianxiangShow = [];
  var sheXiangTo = [];
  var box = [];
  var ParkSprite1 = [];
  var box2 = [];
  var showSpriteother = [];
  var showkanban = true;
  var zhuzi_list = [];
  var cameraPosition, cameraLookAt;
  var firstkanban = false;

  this.FanRotation = () => {
    scene.traverse((i) => {
      if (i.name.indexOf("fengji_ye") != -1) {
        console.log(i, "i");
        let a = 0.01;
        setInterval(() => {
          i.rotation.z = i.rotation.z - a;
        }, 10);
      }
    });
  };
  this.testFunction = () => {
    // console.log("ok");
    // console.log(camera.position, "camera.position");
    // console.log(controls.target, "controls.target");
  };
  this.initCamera = () => {
    console.log("ok");
    let nowLocl = [-241, 142, 350];
    let target = [-249, 13.9, 136.9];
    camera.position.set(...nowLocl);
    controls.target.set(...target);
    // camera.position.set(-241, 142, 350);
    // controls.target.set(-249, 13.9, 136.9);
  };
  this.initBox = () => {
    scene.traverse((i) => {
      if (i.name.indexOf("Box1") != -1) {
        i.visible = false;
      }
    });
    scene.traverse((i) => {
      if (i.name.indexOf("zhuzi") != -1) {
        i.visible = false;
      }
    });
    scene.traverse((i) => {
      if (i.name.indexOf("Box2") != -1) {
        i.visible = false;
      }
    });
  };
  this.focusBox = (event, seleted) => {
    scene.traverse((i) => {
      if (
        i.name.indexOf("jidianxiang") != -1 &&
        i.name.replace(/[^0-9]/gi, "")
      ) {
        jidianxiang_list.push(i);
        // console.log(jidianxiang_list, "jidianxiang_list");
      }
    });
    // 确定位置使用
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(jidianxiang_list, true);
    // console.log(intersects);
    if ((intersects.length > 0 && intersects[0].object) || seleted) {
      var index;
      if (seleted) {
        index = seleted;
      } else {
        index = intersects[0].object.name.replace(/[^0-9]/gi, "") || seleted;
      }

      if (index == "01") {
        cameraPosition = new THREE.Vector3(-178, 8.68, -0.28);
        cameraLookAt = new THREE.Vector3(-293, -21, -2.07);
        // console.log("111");
      } else if (index == "02") {
        cameraPosition = new THREE.Vector3(-184, 7.8, -19);
        cameraLookAt = new THREE.Vector3(-292, -20, -20);
        // console.log("222");
      } else if (index == "03") {
        cameraPosition = new THREE.Vector3(-184, 7.2, -36);
        cameraLookAt = new THREE.Vector3(-292, -21, -38);
        // console.log("333");
      }

      camera.position0 = controls.target;
      //摄像机视角
      var vector3_lookat_origin = new THREE.Vector3(
        camera.position0.x,
        camera.position0.y,
        camera.position0.z
      );

      var posTrack1 = new THREE.KeyframeTrack(
        "controls.object.position",
        [0, 1],
        [
          camera.position.x,
          camera.position.y,
          camera.position.z,
          cameraPosition.x,
          cameraPosition.y,
          cameraPosition.z,
        ]
      );
      var posTrack2 = new THREE.KeyframeTrack(
        "camera.position0",
        [0, 1],
        [
          vector3_lookat_origin.x,
          vector3_lookat_origin.y,
          vector3_lookat_origin.z,
          cameraLookAt.x,
          cameraLookAt.y,
          cameraLookAt.z,
        ]
      );
      // 创建一个剪辑clip对象，命名"default"，持续时间4
      let clip1 = new THREE.AnimationClip("chanpinyundong2", 2, [posTrack1]);
      let clip2 = new THREE.AnimationClip("chanpinyundong3", 2, [posTrack2]);
      var mixer = new THREE.AnimationMixer(camera);
      scene.mixer = mixer;

      var action = mixer.clipAction(clip1);

      action.loop = THREE.LoopOnce; //不循环播放
      action.clampWhenFinished = true; //暂停在最后一帧播放的状态
      action.play();

      var action2 = mixer.clipAction(clip2);
      action2.loop = THREE.LoopOnce; //不循环播放
      action2.clampWhenFinished = true; //暂停在最后一帧播放的状态
      action2.play();

      var clock = new THREE.Clock();
      scene.clock = clock;
      animate();
      function animate() {
        if (mixer.time > 2.5) return;
        window.requestAnimationFrame(animate);
        mixer.update(clock.getDelta());
      }

      // if (event.keyCode === 82) {
      //   camera.position0 = controls.target;
      //   //摄像机视角
      //   var vector3_lookat_origin = new THREE.Vector3(
      //     camera.position0.x,
      //     camera.position0.y,
      //     camera.position0.z
      //   );

      //   posTrack = new THREE.KeyframeTrack(
      //     "camera.position",
      //     [0, 1],
      //     [
      //       camera.position.x,
      //       camera.position.y,
      //       camera.position.z,
      //       -350.747,
      //       52.76,
      //       120.22,
      //     ],
      //     THREE.InterpolateSmooth
      //   );
      //   posTrack2 = new THREE.KeyframeTrack(
      //     "camera.position0",
      //     [0, 1],
      //     [
      //       camera.position0.x,
      //       camera.position0.y,
      //       camera.position0.z,
      //       0.0,
      //       0.0,
      //       0.0,
      //     ],
      //     THREE.InterpolateSmooth
      //   );

      //   // 创建一个剪辑clip对象，命名"default"，持续时间4
      //   let clip = new THREE.AnimationClip("chanpinyundong2", 2, [posTrack]);
      //   let clip2 = new THREE.AnimationClip("chanpinyundong3", 2, [posTrack2]);
      //   mixer = new THREE.AnimationMixer(camera);
      //   scene.mixer = mixer;
      //   // console.log(obj.animations);
      //   var action = mixer.clipAction(clip);
      //   action.loop = THREE.LoopOnce; //不循环播放
      //   action.clampWhenFinished = true; //暂停在最后一帧播放的状态
      //   action.play();

      //   var action2 = mixer.clipAction(clip2);
      //   action2.loop = THREE.LoopOnce; //不循环播放
      //   action2.clampWhenFinished = true; //暂停在最后一帧播放的状态
      //   action2.play();

      //   var clock = new THREE.Clock();
      //   scene.clock = clock;
      // }
    }
  };
  this.moveScene = () => {
    // let { camera, controls } = assets;
    let times = [0, 2.5];
    let local = [-817.76, 260.6, 450, -350.747, 52.76, 120.22];

    let posTrack = new THREE.KeyframeTrack("camera.position", times, local);
    let clip = new THREE.AnimationClip("moveScenea", 2.5, [posTrack]);
    let mixer = new THREE.AnimationMixer(camera);

    let AnimationAction = mixer.clipAction(clip);
    AnimationAction.loop = THREE.LoopOnce; //不循环播放
    AnimationAction.clampWhenFinished = true; //暂停在最后一帧播放的状态
    AnimationAction.play(); //开始播放

    let clock = new THREE.Clock();
    animate();
    function animate() {
      if (mixer.time > 2.5) return;
      window.requestAnimationFrame(animate);
      mixer.update(clock.getDelta());
      camera.lookAt(0, 0, 0);
      //   controls.target.set(-9.78, -27, -5);
      controls.target.set(0, 0, 0);
    }
  };
  this.addBackground = () => {
    var textureLoader = new THREE.TextureLoader();
    var geometry = new THREE.SphereBufferGeometry(2000, 10, 10);
    var materialClouds = new THREE.MeshBasicMaterial({
      map: textureLoader.load(
        "https://test-1303915342.cos.ap-nanjing.myqcloud.com/nengyuan/scene_img.jpg"
      ),
      side: THREE.DoubleSide,
    });
    var meshPlanet = new THREE.Mesh(geometry, materialClouds);
    scene.add(meshPlanet);
    // scene.fog.far = 4000;
    /*let { camera, controls, scene } = assets;
    // var scene = new THREE.Scene();
    // 创建一个纹理图片加载器加载图片
    let text = new THREE.TextureLoader();
    // 加载背景图片
    var texture = text.load(
      "https://test-1303915342.cos.ap-nanjing.myqcloud.com/nengyuan/scene_img.jpg"
    );
    // 纹理对象Texture赋值给场景对象的背景属性.background
    scene.background = texture;*/
  };
  this.showSprite = (event) => {
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    scene.traverse((i) => {
      if (
        i.name.indexOf("jidianxiang1") != -1 ||
        i.name.indexOf("Park") != -1
      ) {
        jidianxiangSprite_list.push(i);
      } else if (i.name.indexOf("zhuzi") != -1) {
        zhuzi_list.push(i);
      }
    });
    var intersects = raycaster.intersectObjects(jidianxiangSprite_list, true);
    if (!intersects[0]) return;
    if (intersects[0]?.object.name == "dianxiang01") {
      showkanban = !showkanban;
      var box1 = scene.getObjectByName("Box1");
      if (showkanban) box1.visible = true;
      else box1.visible = false;
      zhuzi_list.forEach((i, index) => {
        if (showkanban) i.visible = true;
        else i.visible = false;
      });
    } else {
      if (intersects[0]?.object.name == "Park") {
        showkanban = !showkanban;
        var park2 = scene.getObjectByName("Box2");
        park2.visible = showkanban;
      }
    }
  };
  this.addSprite1 = async () => {
    scene.traverse((i) => {
      if (i.name.indexOf("Box1") != -1) {
        box.push(i);
      }
    });
    let text = new THREE.TextureLoader();
    var png = await text.load(
      "https://test-1303915342.cos.ap-nanjing.myqcloud.com/nengyuan/UI01.png"
    );
    // console.log(jidianxiangSprite_list, "++++++++");
    box.forEach((i, index) => {
      var name = i.name;
      //加载图片
      var nameIndex = name.replace(/[^0-9]/gi, "") - 0; //转数字
      var spriteMaterial = new THREE.SpriteMaterial({
        color: "rgb(51,102,153)",
        map: png, //设置精灵纹理贴图
      });
      var sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(1.5, 1.2, 1.8);
      sprite.name = "左侧";
      sprite.material.opacity = 1;
      i.add(sprite);
      sprite.position.set(2, 0.5, 1.5);
    });
  };
  this.addSprite2 = async () => {
    scene.traverse((i) => {
      if (i.name.indexOf("Box1") != -1) {
        box.push(i);
      }
    });
    let text = new THREE.TextureLoader();
    var png = await text.load(
      "https://test-1303915342.cos.ap-nanjing.myqcloud.com/nengyuan/UI02.png"
    );
    box.forEach((i, index) => {
      var name = i.name;
      //加载图片
      var nameIndex = name.replace(/[^0-9]/gi, "") - 0; //转数字
      var spriteMaterial = new THREE.SpriteMaterial({
        color: "rgb(51,102,153)",
        map: png, //设置精灵纹理贴图
      });
      var sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(2, 0.8, 1.8);
      sprite.name = "上方";
      sprite.material.opacity = 1;
      i.add(sprite);
      sprite.position.set(2, 1.5, 0);
    });
  };
  this.addSprite3 = async () => {
    scene.traverse((i) => {
      if (i.name.indexOf("Box1") != -1) {
        box.push(i);
      }
    });
    let text = new THREE.TextureLoader();
    var png = await text.load(
      "https://test-1303915342.cos.ap-nanjing.myqcloud.com/nengyuan/UI03.png"
    );
    box.forEach((i, index) => {
      var name = i.name;
      //加载图片
      var nameIndex = name.replace(/[^0-9]/gi, "") - 0; //转数字
      var spriteMaterial = new THREE.SpriteMaterial({
        color: "rgb(51,102,153)",
        map: png, //设置精灵纹理贴图
      });
      var sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(1.2, 1, 1.8);
      sprite.name = "右侧";
      sprite.material.opacity = 1;
      i.add(sprite);
      sprite.position.set(2, 0.5, -1.5);
    });
  };
  this.addSheXiangTo = async () => {
    scene.traverse((i) => {
      if (i.name.indexOf("shexiangtou") != -1) {
        sheXiangTo.push(i);
      }
    });
    let text = new THREE.TextureLoader();
    var png = await text.load(
      "https://test-1303915342.cos.ap-nanjing.myqcloud.com/nengyuan/shexiangto.png"
    );
    sheXiangTo.forEach((i, index) => {
      var name = i.name;
      //加载图片
      var nameIndex = name.replace(/[^0-9]/gi, "") - 0; //转数字
      var spriteMaterial = new THREE.SpriteMaterial({
        color: "red",
        map: png, //设置精灵纹理贴图
      });
      var sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(1.5, 1.2, 1.8);
      sprite.name = "左侧";
      sprite.material.opacity = 1;
      i.add(sprite);
      sprite.position.set(2, 0, -5);
    });
  };
  this.addParkSprite1 = async () => {
    scene.traverse((i) => {
      if (i.name.indexOf("pPlane1First") != -1) {
        ParkSprite1.push(i);
      }
    });
    let text = new THREE.TextureLoader();
    var png = await text.load(
      "https://test-1303915342.cos.ap-nanjing.myqcloud.com/nengyuan/park1.png"
    );
    ParkSprite1.forEach((i, index) => {
      var name = i.name;
      //加载图片
      var nameIndex = name.replace(/[^0-9]/gi, "") - 0; //转数字
      var spriteMaterial = new THREE.SpriteMaterial({
        //color: "rgb(255,255,255)",
        map: png, //设置精灵纹理贴图
      });
      var sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(50, 180, 10.8);
      sprite.name = "Park";
      console.log(sprite);
      sprite.material.transparent = false;
      sprite.material.opacity = 1;
      i.add(sprite);
      sprite.position.set(-30, 10, -20);
    });
  };
  this.addParkSprite2 = async () => {
    scene.traverse((i) => {
      if (i.name.indexOf("Box2") != -1) {
        box2.push(i);
      }
    });
    let text = new THREE.TextureLoader();
    var png = await text.load(
      "https://test-1303915342.cos.ap-nanjing.myqcloud.com/nengyuan/park2.png"
    );
    box2.forEach((i, index) => {
      var name = i.name;
      //加载图片
      var nameIndex = name.replace(/[^0-9]/gi, "") - 0; //转数字
      var spriteMaterial = new THREE.SpriteMaterial({
        color: "rgb(51,102,153)",
        map: png, //设置精灵纹理贴图
      });
      var sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(30, 10, 8);
      sprite.name = "Park2";
      sprite.material.opacity = 1;
      i.add(sprite);
      sprite.position.set(-30, 10, 10);
    });
  };
  this.factoryTwoTests = () => {
    var focusBox = document.querySelector("#focusBox");
    var left = document.querySelector(".factory_left");
    var right = document.querySelector(".factory_right");
    focusBox.addEventListener("click", () => {
      left.style.display = "none";
      right.style.display = "none";
    });
  };
  this.returnScene = () => {
    let { camera, controls } = assets;
    var back = document.querySelectorAll(".controller_son>ul>li");
    back[3].addEventListener("click", function() {
      // 摄像机初始视角
      camera.position0 = controls.target;
      var vector3_lookat_origin = new THREE.Vector3(
        camera.position0.x,
        camera.position0.y,
        camera.position0.z
      );
      var posTrack1 = new THREE.KeyframeTrack(
        "controls.object.position",
        [0, 1],
        [
          camera.position.x,
          camera.position.y,
          camera.position.z,
          -350.747,
          52.76,
          120.22,
        ]
      );
      var posTrack2 = new THREE.KeyframeTrack(
        "camera.position0",
        [0, 1],
        [
          vector3_lookat_origin.x,
          vector3_lookat_origin.y,
          vector3_lookat_origin.z,
          0,
          0,
          0,
        ]
      );

      // 创建一个剪辑clip对象，命名"default"，持续时间4
      let clip1 = new THREE.AnimationClip("chanpinyundong2", 2, [posTrack1]);
      let clip2 = new THREE.AnimationClip("chanpinyundong3", 2, [posTrack2]);
      var mixer = new THREE.AnimationMixer(camera);
      scene.mixer = mixer;

      var action = mixer.clipAction(clip1);

      action.loop = THREE.LoopOnce; //不循环播放
      action.clampWhenFinished = true; //暂停在最后一帧播放的状态
      action.play();

      var action2 = mixer.clipAction(clip2);
      action2.loop = THREE.LoopOnce; //不循环播放
      action2.clampWhenFinished = true; //暂停在最后一帧播放的状态
      action2.play();

      var clock = new THREE.Clock();
      scene.clock = clock;
      animate();
      function animate() {
        if (mixer.time > 2.5) return;
        window.requestAnimationFrame(animate);
        mixer.update(clock.getDelta());
      }
    });
  };
  this.showFactoryBothSides = () => {
    let { camera, controls } = assets;
    var back = document.querySelectorAll(".controller_son>ul>li");
    var left = document.querySelector(".factory_left");
    var right = document.querySelector(".factory_right");
    back[2].addEventListener("click", function() {
      left.style.display = "block";
      right.style.display = "block";
    });
  };
  this.changeTabModel = (index) => {
    console.log(camera.position, controls.target);
    let qing = scene.getObjectByName("qing");
    let yin = scene.getObjectByName("yin");
    let yewan = scene.getObjectByName("ye");
    let tingdian = scene.getObjectByName("ting");
    let list = [qing, yin, yewan, tingdian];
    list.forEach((i, indexa) => {
      if (index === indexa) {
        i.visible = true;
        console.log("cahng");
      } else {
        i.visible = false;
      }
    });
  };
};
