// 声明类
export class ChangeInterface {
  constructor(assets) {
    this.fn = new ChangeFn(assets);
    this.bshow = false;
    this.isshow = false;
    this.animateId = null;
  }
  change() {
    this.fn.initboom();
  }
  add() {
    // this.fn.test();
    this.fn.addBackground();
    this.fn.boom();
    this.fn.initCameraPosition();
    this.fn.initFan();
  }
}
// 声明构造函数
var ChangeFn = function(assets) {
  var fan = [];
  let { camera, controls, scene } = assets;
  this.initFan = () => {
    scene.traverse((i, index) => {
      if (i.name == "asd2") {
        fan.push(i);
      } else if (i.name == "asd3") {
        fan.push(i);
      }
    });
    var time = setInterval(() => {
      fan[0].rotation.z++;
      fan[1].rotation.z++;
    }, 5);
  };
  this.initCameraPosition = () => {
    document
      .querySelector(".equipment_right>ul")
      .addEventListener("click", initCamera);
    function initCamera() {
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
          31.44,
          32.296,
          40,
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
    }
  };
  this.initboom = () => {
    // scene.background = "RGB(15,20,54)";
    // 去除箭头
    //爆炸中心
    var modelCenter = new THREE.Vector3(0, 5, 0);
    scene.traverse(function(value) {
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
  };
  // 爆炸的范围距离
  this.scalarBoom = (scalar) => {
    scene.traverse(function(value) {
      if (!value.isMesh || !value.worldDir) return;
      value.position.copy(
        new THREE.Vector3()
          .copy(value.userData.oldPs)
          .add(new THREE.Vector3().copy(value.worldDir).multiplyScalar(scalar))
      );
    });
  };
  //点击触发功能 1-2-3-4
  this.boom = () => {
    var num = 0;
    let timer = "";
    var showline = true;
    var ul = document.querySelector(".equipment_right>ul");
    var p = document.querySelectorAll(".equipment_right>ul>li>p");

    p.forEach((i, index) => {
      i.addEventListener("click", (e) => {
        if (i.innerHTML == "产品展示") {
          this.bshow = true;
          clearInterval(timer);
          timer = setInterval(() => {
            if (num <= 0) return clearInterval(timer);
            this.scalarBoom(--num);
          }, 17);
          this.showRule(
            !this.bshow,
            "|<---    3500mm    --->|",
            new THREE.Vector3(-7.7, 0, 15),
            new THREE.Vector3((Math.PI * 3) / 2, 0, 0),
            1.27,
            0.01,
            "text1"
          );
          this.showRule(
            !this.bshow,
            "|<--      -->|",
            new THREE.Vector3(-10, 0, 14),
            new THREE.Vector3(0, (Math.PI * 1) / 4, (Math.PI * 1) / 2),
            1.27,
            0.01,
            "text2"
          );
          this.showRule(
            !this.bshow,
            "1500mm",
            new THREE.Vector3(-12.5, 3, 16.5),
            new THREE.Vector3(0, (Math.PI * 1) / 4, 0),
            1.27,
            0.01,
            "text2"
          );
          this.showRule(
            !this.bshow,
            "|<---              6500mm              --->|",
            new THREE.Vector3(10, 0, 12.3),
            new THREE.Vector3((Math.PI * 3) / 2, 0, (Math.PI * 1) / 2),
            1.27,
            0.01,
            "text3"
          );
        } else if (i.innerHTML == "产品尺寸") {
          i.className = "right";
          this.bshow = false;
          this.showRule(
            !this.bshow,
            "|<---    3500mm    --->|",
            new THREE.Vector3(-7.7, 0, 15),
            new THREE.Vector3((Math.PI * 3) / 2, 0, 0),
            1.27,
            0.01,
            "text1"
          );
          this.showRule(
            !this.bshow,
            "|<--      -->|",
            new THREE.Vector3(-10, 0, 14),
            new THREE.Vector3(0, (Math.PI * 1) / 4, (Math.PI * 1) / 2),
            1.27,
            0.01,
            "text2"
          );
          this.showRule(
            !this.bshow,
            "1500mm",
            new THREE.Vector3(-12.5, 3, 16.5),
            new THREE.Vector3(0, (Math.PI * 1) / 4, 0),
            1.27,
            0.01,
            "text2"
          );
          this.showRule(
            !this.bshow,
            "|<---              6500mm              --->|",
            new THREE.Vector3(10, 0, 12.3),
            new THREE.Vector3((Math.PI * 3) / 2, 0, (Math.PI * 1) / 2),
            1.27,
            0.01,
            "text3"
          );
          timer = setInterval(() => {
            if (num <= 0) return clearInterval(timer);
            this.scalarBoom(--num);
          }, 17);
        } else if (i.innerHTML == "部件介绍") {
          // i.style = "color:rgb(18,227,242)";
        } else if (i.innerHTML == "结构拆解") {
          // i.style = "color:rgb(18,227,242)";
          this.bshow = true;
          clearInterval(timer);
          timer = setInterval(() => {
            if (num > 15) return clearInterval(timer);
            this.scalarBoom(++num);
          }, 17);
          this.showRule(
            !this.bshow,
            "|<---    3500mm    --->|",
            new THREE.Vector3(-7.7, 0, 15),
            new THREE.Vector3((Math.PI * 3) / 2, 0, 0),
            1.27,
            0.01,
            "text1"
          );
          this.showRule(
            !this.bshow,
            "|<--      -->|",
            new THREE.Vector3(-10, 0, 14),
            new THREE.Vector3(0, (Math.PI * 1) / 4, (Math.PI * 1) / 2),
            1.27,
            0.01,
            "text2"
          );
          this.showRule(
            !this.bshow,
            "1500mm",
            new THREE.Vector3(-12.5, 3, 16.5),
            new THREE.Vector3(0, (Math.PI * 1) / 4, 0),
            1.27,
            0.01,
            "text2"
          );
          this.showRule(
            !this.bshow,
            "|<---              6500mm              --->|",
            new THREE.Vector3(10, 0, 12.3),
            new THREE.Vector3((Math.PI * 3) / 2, 0, (Math.PI * 1) / 2),
            1.27,
            0.01,
            "text3"
          );
        }
      });
    });

    // ul.addEventListener("click", (e) => {
    //   let index = e.target.dataset.index;
    //   console.log(index, "index");
    //   if (index === "3") {
    //     this.bshow = true;
    //     clearInterval(timer);
    //     timer = setInterval(() => {
    //       if (num > 15) return clearInterval(timer);
    //       this.scalarBoom(++num);
    //     }, 17);
    //     this.showRule(
    //       !this.bshow,
    //       "|<---    3500mm    --->|",
    //       new THREE.Vector3(-7.7, 0, 15),
    //       new THREE.Vector3((Math.PI * 3) / 2, 0, 0),
    //       1.27,
    //       0.01,
    //       "text1"
    //     );
    //     this.showRule(
    //       !this.bshow,
    //       "|<--      -->|",
    //       new THREE.Vector3(-10, 0, 14),
    //       new THREE.Vector3(0, (Math.PI * 1) / 4, (Math.PI * 1) / 2),
    //       1.27,
    //       0.01,
    //       "text2"
    //     );
    //     this.showRule(
    //       !this.bshow,
    //       "1500mm",
    //       new THREE.Vector3(-12.5, 3, 16.5),
    //       new THREE.Vector3(0, (Math.PI * 1) / 4, 0),
    //       1.27,
    //       0.01,
    //       "text2"
    //     );
    //     this.showRule(
    //       !this.bshow,
    //       "|<---              6500mm              --->|",
    //       new THREE.Vector3(10, 0, 12.3),
    //       new THREE.Vector3((Math.PI * 3) / 2, 0, (Math.PI * 1) / 2),
    //       1.27,
    //       0.01,
    //       "text3"
    //     );
    //     console.log(this.bshow, "4444");
    //   } else if (index === "0") {
    //     this.bshow = true;
    //     clearInterval(timer);
    //     timer = setInterval(() => {
    //       if (num <= 0) return clearInterval(timer);
    //       this.scalarBoom(--num);
    //     }, 17);
    //     this.showRule(
    //       !this.bshow,
    //       "|<---    3500mm    --->|",
    //       new THREE.Vector3(-7.7, 0, 15),
    //       new THREE.Vector3((Math.PI * 3) / 2, 0, 0),
    //       1.27,
    //       0.01,
    //       "text1"
    //     );
    //     this.showRule(
    //       !this.bshow,
    //       "|<--      -->|",
    //       new THREE.Vector3(-10, 0, 14),
    //       new THREE.Vector3(0, (Math.PI * 1) / 4, (Math.PI * 1) / 2),
    //       1.27,
    //       0.01,
    //       "text2"
    //     );
    //     this.showRule(
    //       !this.bshow,
    //       "1500mm",
    //       new THREE.Vector3(-12.5, 3, 16.5),
    //       new THREE.Vector3(0, (Math.PI * 1) / 4, 0),
    //       1.27,
    //       0.01,
    //       "text2"
    //     );
    //     this.showRule(
    //       !this.bshow,
    //       "|<---              6500mm              --->|",
    //       new THREE.Vector3(10, 0, 12.3),
    //       new THREE.Vector3((Math.PI * 3) / 2, 0, (Math.PI * 1) / 2),
    //       1.27,
    //       0.01,
    //       "text3"
    //     );
    //   } else if (index === "1") {
    //     this.bshow = false;
    //     this.showRule(
    //       !this.bshow,
    //       "|<---    3500mm    --->|",
    //       new THREE.Vector3(-7.7, 0, 15),
    //       new THREE.Vector3((Math.PI * 3) / 2, 0, 0),
    //       1.27,
    //       0.01,
    //       "text1"
    //     );
    //     this.showRule(
    //       !this.bshow,
    //       "|<--      -->|",
    //       new THREE.Vector3(-10, 0, 14),
    //       new THREE.Vector3(0, (Math.PI * 1) / 4, (Math.PI * 1) / 2),
    //       1.27,
    //       0.01,
    //       "text2"
    //     );
    //     this.showRule(
    //       !this.bshow,
    //       "1500mm",
    //       new THREE.Vector3(-12.5, 3, 16.5),
    //       new THREE.Vector3(0, (Math.PI * 1) / 4, 0),
    //       1.27,
    //       0.01,
    //       "text2"
    //     );
    //     this.showRule(
    //       !this.bshow,
    //       "|<---              6500mm              --->|",
    //       new THREE.Vector3(10, 0, 12.3),
    //       new THREE.Vector3((Math.PI * 3) / 2, 0, (Math.PI * 1) / 2),
    //       1.27,
    //       0.01,
    //       "text3"
    //     );
    //     timer = setInterval(() => {
    //       if (num <= 0) return clearInterval(timer);
    //       this.scalarBoom(--num);
    //     }, 17);
    //   } else if (index === "2") {
    //   }
    // });
  };
  this.showRule = (bshow, text, position, rotation, size, bevelSize, name) => {
    loadFont(bshow, text, position, rotation, size, bevelSize, name);
  };
  function loadFont(bshow, text, position, rotation, size, bevelSize, name) {
    var loader = new THREE.FontLoader();
    loader.load(
      "https://test-1303915342.cos.ap-nanjing.myqcloud.com/gentilis_regular.typeface.json",
      function(response) {
        createText(
          bshow,
          text,
          position,
          rotation,
          response,
          size,
          bevelSize,
          name
        );
      }
    );
  }
  function createText(
    bshow,
    text,
    position,
    rotation,
    font,
    size,
    bevelSize,
    name
  ) {
    if (bshow == false) {
      var object = scene.getObjectByName("text1");
      if (object) scene.remove(object);
      object = scene.getObjectByName("text2");
      if (object) scene.remove(object);
      object = scene.getObjectByName("text3");
      if (object) scene.remove(object);
      return;
    }
    var height = 0,
      curveSegments = 4,
      bevelThickness = 0,
      bevelEnabled = true,
      textGeo = new THREE.TextGeometry(text, {
        font: font,
        size: size,
        height: height,
        curveSegments: curveSegments,
        bevelThickness: bevelThickness,
        bevelSize: bevelSize,
        bevelEnabled: bevelEnabled,
      });
    textGeo.computeBoundingBox();
    textGeo.computeVertexNormals();
    var triangle = new THREE.Triangle();
    // "fix" side normals by removing z-component of normals for side faces
    // (this doesn't work well for beveled geometry as then we lose nice curvature around z-axis)
    if (!bevelEnabled) {
      var triangleAreaHeuristics = 0.1 * (height * size);
      for (var i = 0; i < textGeo.faces.length; i++) {
        var face = textGeo.faces[i];
        if (face.materialIndex == 1) {
          for (var j = 0; j < face.vertexNormals.length; j++) {
            face.vertexNormals[j].z = 0;
            face.vertexNormals[j].normalize();
          }
          var va = textGeo.vertices[face.a];
          var vb = textGeo.vertices[face.b];
          var vc = textGeo.vertices[face.c];
          var s = triangle.set(va, vb, vc).getArea();
          if (s > triangleAreaHeuristics) {
            for (var j = 0; j < face.vertexNormals.length; j++) {
              face.vertexNormals[j].copy(face.normal);
            }
          }
        }
      }
    }
    var meshMaterial = new THREE.MeshBasicMaterial({ color: 0xff4500 });
    var textMesh1 = new THREE.Mesh(textGeo, meshMaterial);
    textMesh1.name = name;
    textMesh1.position.x = position.x;
    textMesh1.position.y = position.y;
    textMesh1.position.z = position.z;
    textMesh1.rotation.x = rotation.x;
    textMesh1.rotation.y = rotation.y;
    textMesh1.rotation.z = rotation.z;
    scene.add(textMesh1);
  }
  this.addBackground = () => {
    var textureLoader = new THREE.TextureLoader();
    var geometry = new THREE.SphereBufferGeometry(100, 10, 10);
    var materialClouds = new THREE.MeshBasicMaterial({
      map: textureLoader.load(
        "https://test-1303915342.cos.ap-nanjing.myqcloud.com/link-show/shinei02.jpg"
      ),
      side: THREE.DoubleSide,
    });
    var meshPlanet = new THREE.Mesh(geometry, materialClouds);
    scene.add(meshPlanet);
    // scene.fog.far = 4000;
  };
};
export { ChangeFn };
