var APP = {
  Player: function() {
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    var renderer2 = new CSS3DRenderer();
    renderer2.setSize(window.innerWidth, window.innerHeight);
    renderer2.domElement.style.position = "absolute";
    renderer2.domElement.style.top = 0;
    document.querySelector(".introduce").appendChild(renderer2.domElement);

    var scene2 = new THREE.Scene();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;

    var loader = new THREE.ObjectLoader();
    var camera, scene, controls;

    var vrButton = VRButton.createButton(renderer);

    var events = {};

    var div = document.querySelector(".introduce");
    div.appendChild(renderer.domElement);

    this.div = div;

    this.width = 500;
    this.height = 500;

    this.load = function(json) {
      var project = json.project;

      if (project.vr !== undefined) renderer.xr.enabled = project.vr;
      if (project.shadows !== undefined)
        renderer.shadowMap.enabled = project.shadows;
      if (project.shadowType !== undefined)
        renderer.shadowMap.type = project.shadowType;
      if (project.toneMapping !== undefined)
        renderer.toneMapping = project.toneMapping;
      if (project.toneMappingExposure !== undefined)
        renderer.toneMappingExposure = project.toneMappingExposure;
      if (project.physicallyCorrectLights !== undefined)
        renderer.physicallyCorrectLights = project.physicallyCorrectLights;

      this.setScene(loader.parse(json.scene));
      this.setCamera(loader.parse(json.camera));
      /*controls = new window.OrbitControls(camera, renderer.domElement);

      controls.enableDamping = false; // an animation loop is required when either damping or auto-rotation are enabled
      //controls.dampingFactor = 0.05;

      controls.screenSpacePanning = false;

      controls.minDistance = 1;
      controls.maxDistance = 5000;

      controls.maxPolarAngle = Math.PI / 2;*/

      controls = new OrbitControls(camera, renderer2.domElement);
      controls.minZoom = 0.5;
      controls.maxZoom = 2;

      events = {
        init: [],
        start: [],
        stop: [],
        keydown: [],
        keyup: [],
        mousedown: [],
        mouseup: [],
        mousemove: [],
        touchstart: [],
        touchend: [],
        touchmove: [],
        update: []
      };
      console.log(controls.target);
      var scriptWrapParams = "player,renderer,scene,camera";
      var scriptWrapResultObj = {};

      for (var eventKey in events) {
        scriptWrapParams += "," + eventKey;
        scriptWrapResultObj[eventKey] = eventKey;
      }

      var scriptWrapResult = JSON.stringify(scriptWrapResultObj).replace(
        /\"/g,
        ""
      );

      for (var uuid in json.scripts) {
        var object = scene.getObjectByProperty("uuid", uuid, true);

        if (object === undefined) {
          console.warn("APP.Player: Script without object.", uuid);
          continue;
        }

        var scripts = json.scripts[uuid];

        for (var i = 0; i < scripts.length; i++) {
          var script = scripts[i];

          var functions = new Function(
            scriptWrapParams,
            script.source + "\nreturn " + scriptWrapResult + ";"
          ).bind(object)(this, renderer, scene, camera);

          for (var name in functions) {
            if (functions[name] === undefined) continue;

            if (events[name] === undefined) {
              console.warn("APP.Player: Event type not supported (", name, ")");
              continue;
            }

            events[name].push(functions[name].bind(object));
          }
        }
      }

      dispatch(events.init, arguments);
      this.beginPlay();
    };

    this.setCamera = function(value) {
      camera = value;
      camera.aspect = this.width / this.height;
      camera.updateProjectionMatrix();
    };

    this.setScene = function(value) {
      scene = value;
    };

    this.setSize = function(width, height) {
      this.width = width;
      this.height = height;

      if (camera) {
        camera.aspect = this.width / this.height;
        camera.updateProjectionMatrix();
      }

      if (renderer && renderer2) {
        renderer.setSize(width, height);
        renderer2.setSize(width, height);
      }
    };

    function dispatch(array, event) {
      for (var i = 0, l = array.length; i < l; i++) {
        array[i](event);
      }
    }

    var time, prevTime;

    function animate() {
      requestAnimationFrame(animate);

      try {
        dispatch(events.update, { time: time, delta: time - prevTime });
      } catch (e) {
        console.error(e.message || e, e.stack || "");
      }
      if (controls) controls.update();

      renderer.render(scene, camera);
      renderer2.render(scene2, camera);
      prevTime = time;
    }

    this.play = function() {
      if (renderer.xr && renderer.xr.enabled) dom.append(vrButton);

      prevTime = performance.now();
      document.addEventListener("keydown", onDocumentKeyDown);
      document.addEventListener("keyup", onDocumentKeyUp);
      document.addEventListener("mousedown", onDocumentMouseDown);
      document.addEventListener("mouseup", onDocumentMouseUp);
      document.addEventListener("mousemove", onDocumentMouseMove);
      document.addEventListener("touchstart", onDocumentTouchStart);
      document.addEventListener("touchend", onDocumentTouchEnd);
      document.addEventListener("touchmove", onDocumentTouchMove);

      dispatch(events.start, arguments);

      animate();
    };

    this.stop = function() {
      if (renderer.xr && renderer.xr.enabled) vrButton.remove();

      document.removeEventListener("keydown", onDocumentKeyDown);
      document.removeEventListener("keyup", onDocumentKeyUp);
      document.removeEventListener("mousedown", onDocumentMouseDown);
      document.removeEventListener("mouseup", onDocumentMouseUp);
      document.removeEventListener("mousemove", onDocumentMouseMove);
      document.removeEventListener("touchstart", onDocumentTouchStart);
      document.removeEventListener("touchend", onDocumentTouchEnd);
      document.removeEventListener("touchmove", onDocumentTouchMove);

      dispatch(events.stop, arguments);

      renderer.setAnimationLoop(null);
    };

    this.dispose = function() {
      renderer.dispose();
      renderer2.dispose();
      camera = undefined;
      scene = undefined;
      scene2 = undefined;
    };

    // 传出我们所需要的scene、camera、controls
    this.assets = () => {
      return {
        scene: scene,
        camera: camera,
        controls: controls
      };
    };
    //资源文件scene/camera/controls
    this.staticAssets = {};

    function onDocumentKeyDown(event) {
      dispatch(events.keydown, event);
    }

    function onDocumentKeyUp(event) {
      dispatch(events.keyup, event);
    }

    function onDocumentMouseDown(event) {
      console.log("beginMouseDown");

      dispatch(events.mousedown, event);
    }

    function onDocumentMouseUp(event) {
      dispatch(events.mouseup, event);
    }

    function onDocumentMouseMove(event) {
      dispatch(events.mousemove, event);
    }

    function onDocumentTouchStart(event) {
      dispatch(events.touchstart, event);
    }

    function onDocumentTouchEnd(event) {
      dispatch(events.touchend, event);
    }

    function onDocumentTouchMove(event) {
      dispatch(events.touchmove, event);
    }

    // *****************************************************myjsBeginPlay***********************************************************************************
    this.beginPlay = function() {
      console.log("调用beginPlay");
      //雾
      initboom();
      //scene.getObjectByProperty
    };

    function initboom() {
      // 去除箭头
      //爆炸中心
      var modelCenter = new THREE.Vector3(-7, 78, 0);

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
    }

    this.scalarBoom = scalar => {
      console.log(scalar);
      scene.traverse(function(value) {
        if (!value.isMesh || !value.worldDir) return;
        value.position.copy(
          new THREE.Vector3()
            .copy(value.userData.oldPs)
            .add(
              new THREE.Vector3().copy(value.worldDir).multiplyScalar(scalar)
            )
        );
      });
    };

    this.removeArrow = () => {
      let removeList = [];
      scene.traverse(value => {
        if (value.name.length > 0) {
          if (value.name.indexOf("jiantou") != -1) {
            removeList.push(value);
          }
        }
      });
      removeList.forEach((i, index) => {
        i.visible = false;
      });
      return removeList;
    };

    // *****************************************************myjsEnd***********************************************************************************

    this.add = () => {
      window.addEventListener("click", onClick);
    };
    this.add();

    function onClick(event) {
      console.log("beginclick");
    }
    function onMouseDown(event) {}
  }
};

export { APP };
