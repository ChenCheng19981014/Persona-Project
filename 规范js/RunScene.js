import * as THREE from "./node_modules/three";
import Player, { Bus, Gb } from "./util";
function RunScene(sceneUrl, dom) {
  let scene, camera, controls, renderer, renderer2;
  this.pb = undefined;
  this.player = undefined;
  this.assets = undefined;
  this.bus = new Bus();
  this.run = () => {
    return new Promise((s) => [
      new THREE.FileLoader().load(sceneUrl, (json) => {
        this.player = new Player(dom).run(JSON.parse(json));
        this.assets = this.player.getAssets();
        this.pb = new Gb(Object.assign(this.assets, { THREE }));
        s(this.player);
      }),
    ]);
  };
  this.init = (assets) => {
    scene = assets.scene;
    camera = assets.camera;
    controls = assets.controls;
    renderer = assets.renderer;
    renderer2 = assets.renderer2;
    this.test();
  };
  this.test = () => {
    console.log("运行了吗？");
    let end = this.getCameraAnimaBaseData(false, 7, 198, 83, 10, 135, -3);
    this.startCloseMap.foucsXieDai = this.cameraAnima(true, end, 1.5);
  };
}

export default RunScene;
