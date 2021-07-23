import THREE from "three";

// 声明类
export class ChangeInterface {
  fn: any;
  constructor(assets) {
    this.fn = new ChangeFn(assets);
  }
  change() {}
  add() {
    this.fn.addBackground();
    // 判断尺寸，调用手机或者电脑的最佳视角
    if (document.body.clientWidth <= 768) {
      this.fn.photoBestPosition();
    } else {
      this.fn.initCameraPosition();
    }
  }
}
// 声明构造函数
var ChangeFn = function(assets) {
  let { camera, controls, scene } = assets;
  this.addBackground = () => {
    var textureLoader = new THREE.TextureLoader();
    var geometry = new THREE.SphereBufferGeometry(2000, 10, 10);
    var materialClouds = new THREE.MeshBasicMaterial({
      map: textureLoader.load(
        "https://test-1303915342.cos.ap-nanjing.myqcloud.com/link-show/shinei02.jpg"
      ),
      side: THREE.DoubleSide
    });
    var meshPlanet = new THREE.Mesh(geometry, materialClouds);
    scene.add(meshPlanet);
    // scene.fog.far = 4000;
  };
  this.initCameraPosition = (
    position = [-327, 232, -448],
    target = [-16.65, 74.88, 38.65]
  ) => {
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
      if (mixer.time > 2.5) return;
      window.requestAnimationFrame(animate);
      mixer.update(clock.getDelta());
    }
  };
  this.photoBestPosition = _ => {
    let vct3 = [-469, 173, -734];
    let target = [-16.65, 74.88, -38.65];
    this.initCameraPosition(vct3, target);
  };
};
class Public {}
