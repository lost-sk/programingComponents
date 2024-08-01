"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var THREE = _interopRequireWildcard(require("./three"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

//全局样式设置
var css = document.createElement('style');
css.innerHTML = "\n    .htDivFlex .model-container canvas:focus-visible{\n        outline: none !important;\n    }\n}";
document.getElementsByTagName('head')[0].appendChild(css);

var CustomComp = /*#__PURE__*/function (_Component) {
  _inherits(CustomComp, _Component);

  var _super = _createSuper(CustomComp);

  function CustomComp(props) {
    var _this;

    _classCallCheck(this, CustomComp);

    _this = _super.call(this, props);

    _this.initThree = function () {
      _this.loadEnvironment();

      var width = _this.mount.current.clientWidth;
      var height = _this.mount.current.clientHeight; // Camera

      _this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      _this.camera.position.z = 5; // Renderer

      _this.renderer.setSize(width, height); // 设置渲染器的清除颜色为具有透明度的黑色


      _this.renderer.setClearColor(0x000000, 0); // 第二个参数是透明度，0表示完全透明
      //解决加载gltf格式模型纹理贴图和原图不一样问题


      _this.renderer.outputEncoding = THREE.sRGBEncoding; // 设置渲染器是否使用物理光照模型

      _this.renderer.physicallyCorrectLights = true;

      _this.mount.current.appendChild(_this.renderer.domElement);

      _this.updateLight(); // 调整窗口大小时调整相机和渲染器


      _this.observer = new ResizeObserver(function (entries) {
        entries.forEach(function (entry) {
          var width = entry.contentRect.width;
          var height = entry.contentRect.height;
          _this.camera.aspect = width / height;

          _this.camera.updateProjectionMatrix();

          _this.renderer.setSize(width, height);

          _this.renderer.render(_this.scene, _this.camera);
        });
      });

      if (_this.mount.current) {
        _this.observer.observe(_this.mount.current);
      }
    };

    _this.loadEnvironment = function () {
      var _this$state = _this.state,
          environmentUrl = _this$state.environmentUrl,
          environmentExposure = _this$state.environmentExposure; // 判断环境贴图链接是否存在

      if (environmentUrl) {
        _this.scene.environment = null;
        var rgbeLoader = new THREE.RGBELoader(); // 加载环境贴图

        rgbeLoader.load(environmentUrl, function (envMap) {
          envMap.mapping = THREE.EquirectangularReflectionMapping; // 将环境贴图应用于场景
          // this.scene.environment = envMap;
          // 创建一个PMREMGenerator实例

          var pmremGenerator = new THREE.PMREMGenerator(_this.renderer); // 将HDR图像转换为立方体贴图

          var hdrCubeRenderTarget = pmremGenerator.fromEquirectangular(envMap); // 清理PMREMGenerator实例

          pmremGenerator.dispose(); // 将HDR环境贴图应用到场景中的环境光
          // this.scene.background = hdrCubeRenderTarget.texture;

          _this.scene.environment = hdrCubeRenderTarget.texture;
        });
        _this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        _this.renderer.toneMappingExposure = Number(environmentExposure);
      } else {
        _this.scene.environment = null;
      }
    };

    _this.setEnvironmentExposure = function () {
      var environmentExposure = _this.state.environmentExposure;
      _this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      _this.renderer.toneMappingExposure = Number(environmentExposure);
    };

    _this.loadModel = function () {
      var appId = _this.props.appId; // 清除旧模型

      if (_this.model) {
        _this.scene.remove(_this.model);
      }

      var _this$state2 = _this.state,
          fileType = _this$state2.fileType,
          modelUrl = _this$state2.modelUrl,
          materialUrl = _this$state2.materialUrl; //判断模型链接是否存在

      if (modelUrl) {
        if (fileType == 'gltf') {
          var dracoLoader = new THREE.DRACOLoader();
          dracoLoader.setDecoderPath("/resource/".concat(appId, "/libs/")); // 设置libs下的解码路径，注意最后面的/

          dracoLoader.setDecoderConfig({
            type: 'js'
          }); //使用兼容性强的draco_decoder.js解码器

          dracoLoader.preload();
          var gltfLoader = new THREE.GLTFLoader();
          console.log(dracoLoader);
          gltfLoader.setDRACOLoader(dracoLoader);
          gltfLoader.load(modelUrl, function (gltf) {
            _this.model = gltf.scene; // 遍历模型中的网格
            // this.model.traverse((child) => {
            //     if (child.isMesh) {
            //         // child.geometry.center();
            //         // const material = child.material;
            //         child.castShadow = true;
            //         // child.material.emissive = material.color;
            //         // child.material.emissiveMap = material.map;
            //         // child.material.roughness = material.roughness
            //     }
            // });

            _this.setModelSize();

            _this.setModelPosition();

            _this.setModelRatio();

            _this.scene.add(_this.model); // 检查是否有动画


            if (gltf.animations && gltf.animations.length) {
              // 创建动画混合器
              _this.mixer = new THREE.AnimationMixer(model); // 获取所有动画剪辑

              var clips = gltf.animations; // 播放第一个动画剪辑

              var clip = clips[0];

              var action = _this.mixer.clipAction(clip);

              action.play();
            }
          }, onProgress, onError);
        } else {
          var objLoader = new THREE.OBJLoader();

          if (materialUrl?.length > 1) {
            _this.mtlLoader.load(materialUrl, function (materials) {
              materials.preload(); // 设置OBJ加载器的材质

              objLoader.setMaterials(materials);
            });
          }

          objLoader.load(modelUrl, function (object) {
            _this.model = object;

            _this.setModelSize();

            _this.setModelPosition();

            _this.scene.add(_this.model); // 将模型添加到场景中

          }, onProgress, onError);
        }
      } else {
        //创建一个金属立方体并添加到场景作为无模型时显示
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({
          color: 0xdddddd,
          metalness: 1.0,
          // 金属度
          roughness: 0.5 // 粗糙度

        }); // 创建网格

        _this.model = new THREE.Mesh(geometry, material); // 将网格添加到场景中

        _this.setModelSize();

        _this.setModelPosition();

        _this.scene.add(_this.model);
      } // 定义进度和错误处理函数


      function onProgress(xhr) {
        if (xhr.lengthComputable) {
          var percentComplete = xhr.loaded / xhr.total * 100;
          console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
      }

      function onError(xhr) {
        console.error('An error happened');
        console.error(xhr);
      }
    };

    _this.setupControls = function () {
      // 清理控制器
      if (_this.controls) {
        _this.controls.dispose();
      }

      var _this$state3 = _this.state,
          isControl = _this$state3.isControl,
          enableZoom = _this$state3.enableZoom,
          enableKeys = _this$state3.enableKeys,
          dampingFactor = _this$state3.dampingFactor,
          enableDamping = _this$state3.enableDamping;
      _this.controls = new THREE.OrbitControls(_this.camera, _this.renderer.domElement); // 设置轨道控制器的选项

      _this.controls.enableDamping = enableDamping; // 启用阻尼

      _this.controls.dampingFactor = Number(dampingFactor); // 阻尼系数

      _this.controls.enableZoom = enableZoom; // 缩放

      _this.controls.enableKeys = enableKeys; // 键盘事件

      _this.controls.enabled = isControl; // 启用控制器
    };

    _this.setModelSize = function () {
      var zoomRatio = _this.state.zoomRatio; // 设置模型的位置

      _this.model.scale.set(Number(zoomRatio), Number(zoomRatio), Number(zoomRatio));
    };

    _this.setModelPosition = function () {
      var _this$state4 = _this.state,
          positionX = _this$state4.positionX,
          positionY = _this$state4.positionY,
          positionZ = _this$state4.positionZ; // 设置模型的位置

      _this.model.position.set(Number(positionX), Number(positionY), Number(positionZ));
    };

    _this.setModelRatio = function () {
      var _this$state5 = _this.state,
          ratioX = _this$state5.ratioX,
          ratioY = _this$state5.ratioY,
          ratioZ = _this$state5.ratioZ; // 设置模型的位置

      _this.model.rotation.set(Number(ratioX), Number(ratioY), Number(ratioZ));
    };

    _this.startAnimation = function () {
      _this.frameId = requestAnimationFrame(_this.animate);
    };

    _this.animate = function () {
      var _this$state6 = _this.state,
          animationSpeedX = _this$state6.animationSpeedX,
          animationSpeedY = _this$state6.animationSpeedY,
          animationSpeedZ = _this$state6.animationSpeedZ,
          isAnimation = _this$state6.isAnimation;

      if (_this.mixer) {
        _this.mixer.update();
      }

      if (_this.controls) {
        _this.controls.update();
      }

      if (isAnimation && _this.model) {
        // 对模型进行旋转
        _this.model.rotation.x += Number(animationSpeedX);
        _this.model.rotation.y += Number(animationSpeedY);
        _this.model.rotation.z += Number(animationSpeedZ);
      }

      _this.renderer.render(_this.scene, _this.camera);

      _this.frameId = requestAnimationFrame(_this.animate);
    };

    _this.updateLight = function () {
      var _this$state7 = _this.state,
          lightStyle = _this$state7.lightStyle,
          luminance = _this$state7.luminance; // 删除现有灯光

      _this.scene.children.forEach(function (child) {
        if (child.type != 'Group') {
          _this.scene.remove(child);
        }
      }); //添加新的灯光


      var luminanceNum = Number(luminance);

      if (lightStyle == 'style1') {
        _this.highlightLight();
      } else if (lightStyle == 'style2') {
        _this.productLight();
      } else {
        var ambientLight = new THREE.AmbientLight(0xdddddd, luminanceNum); // 柔和的白光

        _this.scene.add(ambientLight);
      }
    };

    _this.highlightLight = function () {
      var luminance = _this.state.luminance;
      var luminanceNum = Number(luminance); // Lights

      var ambientLight = new THREE.AmbientLight(0x404040, luminanceNum); // 柔和的白光

      _this.scene.add(ambientLight); // 创建定向光


      var directionalLight = new THREE.DirectionalLight(0x999999, luminanceNum);
      directionalLight.position.set(-6, 2, 0); // 设置为从左照射

      _this.scene.add(directionalLight); // 创建定向光


      var directionalLight2 = new THREE.DirectionalLight(0x999999, luminanceNum);
      directionalLight2.position.set(6, 2, 0); // 设置为从右照射

      _this.scene.add(directionalLight2); // 创建点光源


      var pointLight = new THREE.PointLight(0x999999, luminanceNum);
      pointLight.position.set(0, 0, 8); // 设置为从特定位置照射

      _this.scene.add(pointLight); // 创建聚光灯


      var spotLight = new THREE.SpotLight(0xffffff, luminanceNum);
      spotLight.position.set(0, 10, 0); // 设置为从上方照射

      spotLight.target.position.set(0, 0, 0); // 设置目标点

      _this.scene.add(spotLight); // 创建聚光灯


      var spotLight2 = new THREE.SpotLight(0xffffff, luminanceNum);
      spotLight2.position.set(0, -10, 0); // 设置为从上方照射

      spotLight2.target.position.set(0, 0, 0); // 设置目标点

      _this.scene.add(spotLight2);
    };

    _this.productLight = function () {
      var luminance = _this.state.luminance;
      var luminanceNum = Number(luminance); // 创建主光源（Key Light）

      var keyLight = new THREE.DirectionalLight(0xffffff, luminanceNum);
      keyLight.position.set(-5, 5, 5);

      _this.scene.add(keyLight); // 创建辅助光源（Fill Light）


      var fillLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.5);
      fillLight.position.set(0, 5, 0);

      _this.scene.add(fillLight); // 创建背光（Backlight）


      var backLight = new THREE.SpotLight(0xffffff, luminanceNum);
      backLight.position.set(5, 5, -5);
      backLight.target.position.set(0, 0, 0);
      backLight.angle = Math.PI / 3;
      backLight.penumbra = 0.2;
      backLight.castShadow = true;

      _this.scene.add(backLight);
    };

    _this.diffObject = function (obj1, obj2) {
      var diff = {}; // 检查obj1的属性是否在obj2中，并且值是否相同

      for (var key in obj2) {
        if (obj2.hasOwnProperty(key) && obj1[key] !== obj2[key].value) {
          diff[key] = obj2[key].value;
        }
      }

      return diff;
    };

    _this.mount = /*#__PURE__*/_react.default.createRef(); //获取元素

    var config = props?.data?._attrObject.data || {};
    _this.state = {
      environmentUrl: config?.environmentUrl?.value || null,
      //环境贴图链接
      environmentExposure: config?.environmentExposure?.value || 1,
      //环境曝光度
      fileType: config?.fileType?.value || 'gltf',
      //文件类型
      modelUrl: config?.modelUrl?.value || null,
      //模型链接
      materialUrl: config?.materialUrl?.value || null,
      //材质链接
      zoomRatio: config?.zoomRatio?.value || 1,
      //缩放比例
      positionX: config?.positionX?.value || 0,
      //模型位置X轴
      positionY: config?.positionY?.value || 0,
      //模型位置Y轴
      positionZ: config?.positionZ?.value || 0,
      //模型位置Z轴
      ratioX: config?.ratioX?.value || 0,
      //模型角度X轴
      ratioY: config?.ratioY?.value || 0,
      //模型角度Y轴
      ratioZ: config?.ratioZ?.value || 0,
      //模型角度Z轴
      isControl: config?.isControl?.value || false,
      //是否可控
      isAnimation: config?.isAnimation?.value || false,
      //动画效果
      animationSpeedX: config?.animationSpeedX?.value || 0,
      //X轴动画速度
      animationSpeedY: config?.animationSpeedY?.value || 0,
      //Y轴动画速度
      animationSpeedZ: config?.animationSpeedZ?.value || 0,
      //Z轴动画速度
      enableZoom: config?.enableZoom?.value || false,
      //禁止缩放
      enableKeys: config?.enableKeys?.value || false,
      //禁止键盘事件
      dampingFactor: config?.dampingFactor?.value || false,
      //阻尼系数
      enableDamping: config?.enableDamping?.value || false,
      //启用阻尼
      lightStyle: config?.lightStyle?.value || 'style1',
      //光照风格
      luminance: config?.luminance?.value || 0.7,
      //光照亮度
      isLoading: true //是否加载中

    };
    _this.mtlLoader = new THREE.MTLLoader();
    _this.scene = new THREE.Scene();
    _this.controls = null; //控制器

    _this.model = null; //模型

    _this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    _this.material = null; //材质

    _this.mixer = null;
    _this.frameId = null;
    _this.camera = null;
    return _this;
  }

  _createClass(CustomComp, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.initThree();
      this.loadModel();
      this.setupControls();
      this.startAnimation();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      if (this.props != prevProps) {
        var newInput = this.props.data._attrObject.data; // 检查newInput的属性是否在oldInput中，并且值是否相同

        var configData = this.diffObject(this.state, newInput);

        if (Object.keys(configData).length > 0) {
          console.log(configData); //根据props的变化来更新state

          this.setState(function (prevState) {
            return configData;
          }, function () {
            // 这个回调函数会在setState完成后执行
            for (var key in configData) {
              //根据key值修改参数
              if (key == 'environmentUrl') {
                _this2.loadEnvironment(); // 重新渲染场景


                _this2.renderer.render(_this2.scene, _this2.camera);
              }

              if (key == 'environmentExposure') {
                _this2.setEnvironmentExposure(); // 重新渲染场景


                _this2.renderer.render(_this2.scene, _this2.camera);
              }

              if (key == 'modelUrl' || key == 'materialUrl') {
                // 清除旧模型
                if (_this2.model) {
                  _this2.scene.remove(_this2.model);
                }

                _this2.loadModel();
              }

              if (key == 'lightStyle' || key == 'luminance') {
                _this2.updateLight();
              }

              if (key == 'isControl' || key == 'enableZoom' || key == 'enableKeys' || key == 'dampingFactor' || key == 'enableDamping') {
                // 设置轨道控制器的选项
                _this2.setupControls(); // 重新渲染场景


                _this2.renderer.render(_this2.scene, _this2.camera);
              }

              if (key == 'zoomRatio') {
                _this2.setModelSize(); // 缩放比例
                // 重新渲染场景


                _this2.renderer.render(_this2.scene, _this2.camera);
              }

              if (key == 'positionX' || key == 'positionY' || key == 'positionZ') {
                _this2.setModelPosition(); // 模型位置X轴
                // 重新渲染场景


                _this2.renderer.render(_this2.scene, _this2.camera);
              }

              if (key == 'ratioX' || key == 'ratioY' || key == 'ratioZ') {
                _this2.setModelRatio(); // 模型角度
                // 重新渲染场景


                _this2.renderer.render(_this2.scene, _this2.camera);
              }

              if (key == 'isAnimation' || key == 'animationSpeedX' || key == 'animationSpeedY' || key == 'animationSpeedZ') {
                cancelAnimationFrame(_this2.frameId);

                _this2.startAnimation(); // 动画效果

              }
            }
          });
        }
      }
    } //主程序

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // 清理动画和事件监听器
      cancelAnimationFrame(this.frameId);
      this.controls.dispose();

      if (this.mount.current) {
        this.observer.unobserve(this.mount.current);
      }

      this.observer.disconnect();
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "model-container",
        ref: this.mount,
        style: {
          width: '100%',
          height: '100%'
        }
      });
    }
  }]);

  return CustomComp;
}(_react.Component);

var _default = CustomComp;
exports.default = _default;