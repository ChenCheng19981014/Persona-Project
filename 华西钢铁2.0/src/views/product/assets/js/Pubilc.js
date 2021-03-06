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
   * 作用：给scene添加背景图片
   * 参数： @param imgUrl 图片链接
   * 依赖：THREE
   */
  addBackground = (imgUrl) => {
    let camera = this.camera;
    let controls = this.controls;
    let scene = this.scene;
    // var renderer = new THREE.WebGLRenderer();
    // renderer.setClearColor("rgb(255,255,255)", 1.0);
    var textureLoader = new THREE.TextureLoader();
    var geometry = new THREE.SphereBufferGeometry(5200, 10, 10);
    var materialClouds = new THREE.MeshBasicMaterial({
      map: textureLoader.load(imgUrl),
      side: THREE.DoubleSide,
    });
    var meshPlanet = new THREE.Mesh(geometry, materialClouds);
    scene.add(meshPlanet);
  };
  /**
   *作用：位移到对应的模型位置
   *参数：
   * @param  event 事件对象，拿到点击位置的模型
   * @param  animateObjectName 需要位置到的模型的名字。
   * @param  position camera需要去到的位置
   * @param  target controls的target跟camera的lookAT看的位置
   * @param  time 动画时间，默认2.5
   */
  transformAnimate = (
    event,
    animateObjectName,
    position,
    target,
    time = 2.5
  ) => {
    let camera = this.camera;
    let controls = this.controls;
    let scene = this.scene;

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
      this.CameraAnimate(position, target, time);
    }
  };
  /**
   *作用：给camera controls做动画
   *参数：
   * @param  position camera需要去到的位置 number[]
   * @param  target controls的target跟camera的lookAT看的位置 number[]
   * @param  time 动画时间，默认2.5 number
   */
  CameraAnimate = (position, target, time = 2.5) => {
    let camera = this.camera;
    let controls = this.controls;
    let scene = this.scene;
    var posTrack1, posTrack2;

    var mixer = new THREE.AnimationMixer(camera);
    scene.mixer = mixer;
    //1. position
    posTrack1 = new THREE.KeyframeTrack(
      "camera.position",
      [0, time],
      [camera.position.x, camera.position.y, camera.position.z, ...position]
    );
    let clip1 = new THREE.AnimationClip("first", time, [posTrack1]);

    var action1 = mixer.clipAction(clip1);
    action1.loop = THREE.LoopOnce; //不循环播放
    action1.clampWhenFinished = true; //暂停在最后一帧播放的状态
    action1.play();

    // 2 target
    if (target) {
      // 摄像机的视角的移动
      camera.position0 = controls.target;
      posTrack2 = new THREE.KeyframeTrack(
        "camera.position0",
        [0, time],
        [camera.position0.x, camera.position0.y, camera.position0.z, ...target]
      );
      // 创建一个剪辑clip对象，命名"default"，持续时间4
      let clip2 = new THREE.AnimationClip("second", time, [posTrack2]);
      var action2 = mixer.clipAction(clip2);
      action2.loop = THREE.LoopOnce; //不循环播放
      action2.clampWhenFinished = true; //暂停在最后一帧播放的状态
      action2.play();
    }
    // 摄像机初始视角
    var clock = new THREE.Clock();
    scene.clock = clock;
    anima();
    function anima() {
      if (mixer.time > time) return;
      window.requestAnimationFrame(anima);
      mixer.update(clock.getDelta());
      // if (target) {
      //   camera.lookAt(...target);
      // }
      // camera.position.set(-172, 172, 520);
    }
  };
  /**
   * 作用：添加模型到父模型
   * 参数
   * @param fatherName 需要添加到的父亲名字
   * @param imgUrl 图片的链接
   * @param position {x，y，z}位置
   * @param spriteName 模型名字
   * @param opacity 透明度
   * @param visible 是否显示
   * @param color 颜色
   * @param scale 缩放比例
   */
  addSprite = async (
    fatherObject,
    imgUrl,
    position,
    spriteName,
    opacity = 1,
    color = "rgb(211,227,238)",
    visible = true,
    scale = [100, 100, 100]
  ) => {
    fatherObject = this.scene.getObjectByName(fatherObject);
    let text = new THREE.TextureLoader();
    var png = await text.load(imgUrl);
    var spriteMaterial = new THREE.SpriteMaterial({
      color: color,
      map: png, //设置精灵纹理贴图
    });
    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.set(position.x, position.y, position.z);
    sprite.scale.set(scale[0], scale[1], scale[2]);
    sprite.name = spriteName;
    sprite.material.opacity = opacity;
    console.log(fatherObject);
    fatherObject.add(sprite);
    console.log(fatherObject);
    sprite.visible = visible;
  };
  // ModelTransform = (modelName, position, target, time = 2) => {
  //   let camera = this.camera;
  //   let controls = this.controls;
  //   let scene = this.scene;
  //   let model = scene.getObjectByName(modelName);
  // };
  animate = (modelName, position, target, posTrackName, time = 2) => {
    let camera = this.camera;
    let controls = this.controls;
    let scene = this.scene;

    var mixer = new THREE.AnimationMixer(scene.getObjectByName(modelName));
    scene.traverse((i) => {
      console.log(i);
    });
    //1. position
    let posTrack = new THREE.KeyframeTrack(
      posTrackName,
      [0, time],
      [...position, ...target]
    );
    let clip = new THREE.AnimationClip("first", time, [posTrack]);
    var action = mixer.clipAction(clip);
    action.loop = THREE.LoopOnce; //不循环播放
    action.clampWhenFinished = true; //暂停在最后一帧播放的状态
    action.play();
    var clock = new THREE.Clock();
    scene.clock = clock;
    anima();
    function anima() {
      if (mixer.time > time) return;
      window.requestAnimationFrame(anima);
      mixer.update(clock.getDelta());
    }
  };
}
