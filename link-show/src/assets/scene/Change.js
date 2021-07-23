import Public from "./Pubilc";
// 声明类
export class ChangeInterface {
  constructor(assets) {
    this.fn = new ChangeFn(assets);
  }
  change() {}
  add() {
    this.fn.addBackground();
    this.fn.initRule();
    // 判断尺寸，调用手机或者电脑的最佳视角
    if (document.body.clientWidth <= 768) {
      this.fn.photoBestPosition();
    } else {
      this.fn.windowBestPosition();
    }
  }
}
// 声明构造函数
var ChangeFn = function(assets) {
  let { camera, controls, scene } = assets;
  let pubilc = new Public(assets);
  this.customGroups = [];
  this.customLines = [];
  this.customDots = [];
  this.customTexts = [];
  this.customPlanes = [];
  this.interval = null;
  this.state = false;
  this.addBackground = () => {
    var textureLoader = new THREE.TextureLoader();
    var geometry = new THREE.SphereBufferGeometry(2000, 10, 10);
    var materialClouds = new THREE.MeshBasicMaterial({
      map: textureLoader.load(
        "http://192.168.1.100:3004/linkShow/shinei02.jpg"
      ),
      side: THREE.DoubleSide
    });
    var meshPlanet = new THREE.Mesh(geometry, materialClouds);
    meshPlanet.name = "background-image";
    scene.add(meshPlanet);
    // scene.fog.far = 4000;
  };
  this.photoBestPosition = _ => {
    let vct3 = [-469, 173, -734],
      target = [-16.65, 74.88, -38.65];
    pubilc.initCameraPosition(vct3, target);
  };
  this.windowBestPosition = _ => {
    let position = [-327, 232, -448],
      target = [-16.65, 74.88, 38.65];
    pubilc.initCameraPosition(position, target);
  };
  this.showRule = () => {
    // return;
    if (this.state == true) return;
    else clearInterval(this.interval);
    var factor = 0.0;
    for (let i = 0; i < this.customDots.length; i++) {
      this.customDots[i].material.opacity = 1.0;
    }
    this.state = true;
    this.interval = setInterval(() => {
      for (let i = 0; i < this.customLines.length; i++) {
        this.customLines[i].scale.x = this.customLines[i].x0 * factor;
      }
      for (let i = 0; i < this.customPlanes.length; i++) {
        this.customPlanes[i].scale.x = this.customPlanes[i].x0 * factor;
        this.customPlanes[i].scale.y = this.customPlanes[i].y0 * factor;
      }
      for (let i = 0; i < this.customTexts.length; i++) {
        this.customTexts[i].visible = true;
        this.customTexts[i].material.opacity = factor;
      }
      if (factor == 1.0) {
        clearInterval(this.interval);
        this.interval = null;
      }
      factor += 0.02;
      if (factor > 1.0) factor = 1.0;
    }, 1);
  };
  this.hideRule = () => {
    //return;
    if (this.state == false) return;
    else clearInterval(this.interval);
    var factor = 0.0;
    this.state = false;
    this.interval = setInterval(() => {
      for (let i = 0; i < this.customLines.length; i++) {
        this.customLines[i].scale.x = this.customLines[i].x0 * (1 - factor);
      }
      for (let i = 0; i < this.customPlanes.length; i++) {
        this.customPlanes[i].scale.x = this.customPlanes[i].x0 * (1 - factor);
        this.customPlanes[i].scale.y = this.customPlanes[i].y0 * (1 - factor);
      }
      for (let i = 0; i < this.customTexts.length; i++) {
        this.customTexts[i].material.opacity = 1 - factor;
      }
      if (factor == 1.0) {
        for (let i = 0; i < this.customDots.length; i++) {
          this.customDots[i].material.opacity = 0.0;
        }
        clearInterval(this.interval);
        this.interval = null;
        for (let i = 0; i < this.customTexts.length; i++) {
          this.customTexts[i].visible = false;
        }
      }

      factor += 0.02;
      if (factor > 1.0) factor = 1.0;
    }, 1);
  };
  this.initRule = () => {
    //return;
    for (let i = 0; i < scene.children.length; i++) {
      let obj = scene.children[i];
      if (obj.name == "customGroup") {
        this.customGroups.push(obj);
        for (let j = 0; j < obj.children.length; j++) {
          let subobj = obj.children[j];
          if (subobj == null || subobj.name == null) continue;
          if (subobj.name == "customLine") this.customLines.push(subobj);
          else if (subobj.name == "customDot") this.customDots.push(subobj);
          else if (subobj.name == "customText") this.customTexts.push(subobj);
          else if (subobj.name == "customPlane") this.customPlanes.push(subobj);
        }
      }
    }

    for (let i = 0; i < this.customGroups.length; i++) {
      this.customGroups[i].visible = true;
    }
    for (let i = 0; i < this.customDots.length; i++) {
      this.customDots[i].material.opacity = 0;
    }
    for (let i = 0; i < this.customLines.length; i++) {
      this.customLines[i].x0 = this.customLines[i].scale.x;
      this.customLines[i].scale.x = 0;
    }
    for (let i = 0; i < this.customTexts.length; i++) {
      this.customTexts[i].visible = false;
      this.customTexts[i].material.transparent = true;
      this.customTexts[i].material.opacity = 0;
    }
    for (let i = 0; i < this.customPlanes.length; i++) {
      this.customPlanes[i].x0 = this.customPlanes[i].scale.x;
      this.customPlanes[i].y0 = this.customPlanes[i].scale.y;
      this.customPlanes[i].scale.x = 0;
      this.customPlanes[i].scale.y = 0;
    }
  };
};
