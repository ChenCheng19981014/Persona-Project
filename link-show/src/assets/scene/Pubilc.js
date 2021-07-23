/**
  需要传入资源文件
  * @param assets 包含以下对象的总资源对象
  * @param camera 相机对象
  * @param controls 控制器对象
  * @param scene 场景对象
*/
export default class Public {
  constructor(assets) {
    let { camera, controls, scene } = assets;
    this.camera = camera;
    this.controls = controls;
    this.scene = scene;
  }
  /**
  作用：初始化最佳视角。
  参数：
  * @param  position camera需要去到的位置
  * @param  target controls的target跟camera的lookAT看的位置
  * @param  time 动画时间，默认2.5
  依赖：THREE
  */
  initCameraPosition = (position, target, time = 2.5) => {
    // 摄像机初始视角
    let camera = this.camera;
    let controls = this.controls;
    let scene = this.scene;
    camera.position0 = controls.target;

    var vector3_lookat_origin = new THREE.Vector3(
      camera.position0.x,
      camera.position0.y,
      camera.position0.z
    );
    var posTrack1 = new THREE.KeyframeTrack(
      "controls.object.position",
      [0, 1],
      [camera.position.x, camera.position.y, camera.position.z, ...position]
    );
    var posTrack2 = new THREE.KeyframeTrack(
      "camera.position0",
      [0, 1],
      [
        vector3_lookat_origin.x,
        vector3_lookat_origin.y,
        vector3_lookat_origin.z,
        ...target
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
      if (mixer.time > time) return;
      window.requestAnimationFrame(animate);
      mixer.update(clock.getDelta());
    }
  };
  /**
   * 作用：给scene添加背景图片
   * 参数： @param imgUrl 图片链接
   * 依赖：THREE
   */
  addBackground = imgUrl => {
    // var renderer = new THREE.WebGLRenderer();
    // renderer.setClearColor("rgb(255,255,255)", 1.0);
    var textureLoader = new THREE.TextureLoader();
    var geometry = new THREE.SphereBufferGeometry(5200, 10, 10);
    var materialClouds = new THREE.MeshBasicMaterial({
      map: textureLoader.load(imgUrl),
      side: THREE.DoubleSide
    });
    var meshPlanet = new THREE.Mesh(geometry, materialClouds);
    scene.add(meshPlanet);
  };
  /**
   *参数：
   * @param  event 事件对象，拿到点击位置的模型
   * @param  animateObjectName 需要位置到的模型的名字。
   * @param  position camera需要去到的位置
   * @param  target controls的target跟camera的lookAT看的位置
   * @param  time 动画时间，默认2.5
   *
   *
   */
  transformAnimate = (
    event,
    animateObjectName,
    position,
    target,
    time = 2.5
  ) => {
    var posTrack1, posTrack2;
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // var zhensuo = scene.getObjectByName("口腔科001");
    // 测试点击物体 检查对象
    var intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects[0].object.name.indexOf(animateObjectName) !== -1) {
      // 摄像机初始视角
      camera.position0 = controls.target;

      var vector3_lookat_origin = new THREE.Vector3(
        camera.position0.x,
        camera.position0.y,
        camera.position0.z
      );
      posTrack1 = new THREE.KeyframeTrack(
        "controls.object.position",
        [0, 1],
        [camera.position.x, camera.position.y, camera.position.z, ...position]
      );
      posTrack2 = new THREE.KeyframeTrack(
        "camera.position0",
        [0, 1],
        [
          vector3_lookat_origin.x,
          vector3_lookat_origin.y,
          vector3_lookat_origin.z,
          ...target
        ]
      );
      // 创建一个剪辑clip对象，命名"default"，持续时间4
      let clip1 = new THREE.AnimationClip("first", time, [posTrack1]);
      let clip2 = new THREE.AnimationClip("second", time, [posTrack2]);

      var mixer = new THREE.AnimationMixer(camera);
      scene.mixer = mixer;

      var action1 = mixer.clipAction(clip1);
      action1.loop = THREE.LoopOnce; //不循环播放
      action1.clampWhenFinished = true; //暂停在最后一帧播放的状态
      action1.play();

      var action2 = mixer.clipAction(clip2);
      action2.loop = THREE.LoopOnce; //不循环播放
      action2.clampWhenFinished = true; //暂停在最后一帧播放的状态
      action2.play();

      var clock = new THREE.Clock();
      scene.clock = clock;
      animate();
      function animate() {
        if (mixer.time > time) return;
        window.requestAnimationFrame(animate);
        mixer.update(clock.getDelta());
        camera.lookAt(...target);
        // camera.position.set(-172, 172, 520);
      }
    }
  };
}
