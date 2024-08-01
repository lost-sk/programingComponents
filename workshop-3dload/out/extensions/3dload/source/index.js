import React, { Component } from 'react'
import * as THREE from './three'

//全局样式设置
var css = document.createElement('style')
css.innerHTML = `
    .htDivFlex .model-container canvas:focus-visible{
        outline: none !important;
    }
}`
document.getElementsByTagName('head')[0].appendChild(css)

class CustomComp extends Component {
  constructor(props) {
    super(props)
    this.mount = React.createRef() //获取元素
    const config = props?.data?._attrObject.data || {}
    this.state = {
      environmentUrl: config?.environmentUrl?.value || null, //环境贴图链接
      environmentExposure: config?.environmentExposure?.value || 1, //环境曝光度
      fileType: config?.fileType?.value || 'gltf', //文件类型
      modelUrl: config?.modelUrl?.value || null, //模型链接
      materialUrl: config?.materialUrl?.value || null, //材质链接
      zoomRatio: config?.zoomRatio?.value || 1, //缩放比例
      positionX: config?.positionX?.value || 0, //模型位置X轴
      positionY: config?.positionY?.value || 0, //模型位置Y轴
      positionZ: config?.positionZ?.value || 0, //模型位置Z轴
      ratioX: config?.ratioX?.value || 0, //模型角度X轴
      ratioY: config?.ratioY?.value || 0, //模型角度Y轴
      ratioZ: config?.ratioZ?.value || 0, //模型角度Z轴
      isControl: config?.isControl?.value || false, //是否可控
      isAnimation: config?.isAnimation?.value || false, //动画效果
      animationSpeedX: config?.animationSpeedX?.value || 0, //X轴动画速度
      animationSpeedY: config?.animationSpeedY?.value || 0, //Y轴动画速度
      animationSpeedZ: config?.animationSpeedZ?.value || 0, //Z轴动画速度
      enableZoom: config?.enableZoom?.value || false, //禁止缩放
      enableKeys: config?.enableKeys?.value || false, //禁止键盘事件
      dampingFactor: config?.dampingFactor?.value || false, //阻尼系数
      enableDamping: config?.enableDamping?.value || false, //启用阻尼
      lightStyle: config?.lightStyle?.value || 'style1', //光照风格
      luminance: config?.luminance?.value || 0.7, //光照亮度
      isLoading: true, //是否加载中
    }
    this.mtlLoader = new THREE.MTLLoader()
    this.scene = new THREE.Scene()
    this.controls = null //控制器
    this.model = null //模型
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    this.material = null //材质
    this.mixer = null
    this.frameId = null
    this.camera = null
  }

  componentDidMount() {
    this.initThree()
    this.loadModel()
    this.setupControls()
    this.startAnimation()
  }

  componentDidUpdate(prevProps) {
    if (this.props != prevProps) {
      const newInput = this.props.data._attrObject.data
      // 检查newInput的属性是否在oldInput中，并且值是否相同
      const configData = this.diffObject(this.state, newInput)
      if (Object.keys(configData).length > 0) {
        console.log(configData)
        //根据props的变化来更新state
        this.setState(
          (prevState) => configData,
          () => {
            // 这个回调函数会在setState完成后执行
            for (const key in configData) {
              //根据key值修改参数
              if (key == 'environmentUrl') {
                this.loadEnvironment()
                // 重新渲染场景
                this.renderer.render(this.scene, this.camera)
              }
              if (key == 'environmentExposure') {
                this.setEnvironmentExposure()
                // 重新渲染场景
                this.renderer.render(this.scene, this.camera)
              }
              if (key == 'modelUrl' || key == 'materialUrl') {
                // 清除旧模型
                if (this.model) {
                  this.scene.remove(this.model)
                }
                this.loadModel()
              }
              if (key == 'lightStyle' || key == 'luminance') {
                this.updateLight()
              }
              if (
                key == 'isControl' ||
                key == 'enableZoom' ||
                key == 'enableKeys' ||
                key == 'dampingFactor' ||
                key == 'enableDamping'
              ) {
                // 设置轨道控制器的选项
                this.setupControls()
                // 重新渲染场景
                this.renderer.render(this.scene, this.camera)
              }
              if (key == 'zoomRatio') {
                this.setModelSize() // 缩放比例
                // 重新渲染场景
                this.renderer.render(this.scene, this.camera)
              }
              if (key == 'positionX' || key == 'positionY' || key == 'positionZ') {
                this.setModelPosition() // 模型位置X轴
                // 重新渲染场景
                this.renderer.render(this.scene, this.camera)
              }
              if (key == 'ratioX' || key == 'ratioY' || key == 'ratioZ') {
                this.setModelRatio() // 模型角度
                // 重新渲染场景
                this.renderer.render(this.scene, this.camera)
              }
              if (
                key == 'isAnimation' ||
                key == 'animationSpeedX' ||
                key == 'animationSpeedY' ||
                key == 'animationSpeedZ'
              ) {
                cancelAnimationFrame(this.frameId)
                this.startAnimation() // 动画效果
              }
            }
          }
        )
      }
    }
  }

  //主程序
  initThree = () => {
    this.loadEnvironment()

    const width = this.mount.current.clientWidth
    const height = this.mount.current.clientHeight
    // Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    this.camera.position.z = 5

    // Renderer
    this.renderer.setSize(width, height)
    // 设置渲染器的清除颜色为具有透明度的黑色
    this.renderer.setClearColor(0x000000, 0) // 第二个参数是透明度，0表示完全透明
    //解决加载gltf格式模型纹理贴图和原图不一样问题
    this.renderer.outputEncoding = THREE.sRGBEncoding
    // 设置渲染器是否使用物理光照模型
    this.renderer.physicallyCorrectLights = true
    this.mount.current.appendChild(this.renderer.domElement)

    this.updateLight()
    // 调整窗口大小时调整相机和渲染器
    this.observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const width = entry.contentRect.width
        const height = entry.contentRect.height
        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(width, height)
        this.renderer.render(this.scene, this.camera)
      })
    })

    if (this.mount.current) {
      this.observer.observe(this.mount.current)
    }
  }
  //加载环境贴图
  loadEnvironment = () => {
    const {
      environmentUrl, //环境贴图链接
      environmentExposure, //环境整体曝光
    } = this.state
    // 判断环境贴图链接是否存在
    if (environmentUrl) {
      this.scene.environment = null
      const rgbeLoader = new THREE.RGBELoader()
      // 加载环境贴图
      rgbeLoader.load(environmentUrl, (envMap) => {
        envMap.mapping = THREE.EquirectangularReflectionMapping
        // 将环境贴图应用于场景
        // this.scene.environment = envMap;
        // 创建一个PMREMGenerator实例
        const pmremGenerator = new THREE.PMREMGenerator(this.renderer)

        // 将HDR图像转换为立方体贴图
        const hdrCubeRenderTarget = pmremGenerator.fromEquirectangular(envMap)

        // 清理PMREMGenerator实例
        pmremGenerator.dispose()

        // 将HDR环境贴图应用到场景中的环境光
        // this.scene.background = hdrCubeRenderTarget.texture;
        this.scene.environment = hdrCubeRenderTarget.texture
      })
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping
      this.renderer.toneMappingExposure = Number(environmentExposure)
    } else {
      this.scene.environment = null
    }
  }
  //设置环境曝光度
  setEnvironmentExposure = () => {
    const {
      environmentExposure, //环境整体曝光
    } = this.state
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = Number(environmentExposure)
  }
  //模型加载
  loadModel = () => {
    const appId = this.props.appId
    // 清除旧模型
    if (this.model) {
      this.scene.remove(this.model)
    }
    const {
      fileType, //文件类型
      modelUrl, //模型链接
      materialUrl, //材质链接
    } = this.state
    //判断模型链接是否存在
    if (modelUrl) {
      if (fileType == 'gltf') {
        const dracoLoader = new THREE.DRACOLoader()
        dracoLoader.setDecoderPath(`/resource/${appId}/libs/`) // 设置libs下的解码路径，注意最后面的/
        dracoLoader.setDecoderConfig({ type: 'js' }) //使用兼容性强的draco_decoder.js解码器
        dracoLoader.preload()
        const gltfLoader = new THREE.GLTFLoader()
        console.log(dracoLoader)
        gltfLoader.setDRACOLoader(dracoLoader)
        gltfLoader.load(
          modelUrl,
          (gltf) => {
            this.model = gltf.scene
            // 遍历模型中的网格
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
            this.setModelSize()
            this.setModelPosition()
            this.setModelRatio()
            this.scene.add(this.model)
            // 检查是否有动画
            if (gltf.animations && gltf.animations.length) {
              // 创建动画混合器
              this.mixer = new THREE.AnimationMixer(model)
              // 获取所有动画剪辑
              var clips = gltf.animations
              // 播放第一个动画剪辑
              var clip = clips[0]
              var action = this.mixer.clipAction(clip)
              action.play()
            }
          },
          onProgress,
          onError
        )
      } else {
        const objLoader = new THREE.OBJLoader()
        if (materialUrl?.length > 1) {
          this.mtlLoader.load(materialUrl, (materials) => {
            materials.preload()
            // 设置OBJ加载器的材质
            objLoader.setMaterials(materials)
          })
        }
        objLoader.load(
          modelUrl,
          (object) => {
            this.model = object
            this.setModelSize()
            this.setModelPosition()
            this.scene.add(this.model) // 将模型添加到场景中
          },
          onProgress,
          onError
        )
      }
    } else {
      //创建一个金属立方体并添加到场景作为无模型时显示
      const geometry = new THREE.BoxGeometry(1, 1, 1)
      const material = new THREE.MeshBasicMaterial({
        color: 0xdddddd,
        metalness: 1.0, // 金属度
        roughness: 0.5, // 粗糙度
      })
      // 创建网格
      this.model = new THREE.Mesh(geometry, material)
      // 将网格添加到场景中
      this.setModelSize()
      this.setModelPosition()
      this.scene.add(this.model)
    }
    // 定义进度和错误处理函数
    function onProgress(xhr) {
      if (xhr.lengthComputable) {
        var percentComplete = (xhr.loaded / xhr.total) * 100
        console.log(Math.round(percentComplete, 2) + '% downloaded')
      }
    }
    function onError(xhr) {
      console.error('An error happened')
      console.error(xhr)
    }
  }
  //控制器加载
  setupControls = () => {
    // 清理控制器
    if (this.controls) {
      this.controls.dispose()
    }
    const {
      isControl, //是否可控
      enableZoom, //禁止缩放
      enableKeys, //禁止键盘事件
      dampingFactor, //阻尼系数
      enableDamping, //启用阻尼
    } = this.state
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
    // 设置轨道控制器的选项
    this.controls.enableDamping = enableDamping // 启用阻尼
    this.controls.dampingFactor = Number(dampingFactor) // 阻尼系数
    this.controls.enableZoom = enableZoom // 缩放
    this.controls.enableKeys = enableKeys // 键盘事件
    this.controls.enabled = isControl // 启用控制器
  }
  //模型大小
  setModelSize = () => {
    const {
      zoomRatio, //缩放比例
    } = this.state
    // 设置模型的位置
    this.model.scale.set(Number(zoomRatio), Number(zoomRatio), Number(zoomRatio))
  }
  //模型位置
  setModelPosition = () => {
    const {
      positionX, //x轴位置
      positionY, //y轴位置
      positionZ, //z轴位置
    } = this.state
    // 设置模型的位置
    this.model.position.set(Number(positionX), Number(positionY), Number(positionZ))
  }
  //模型角度
  setModelRatio = () => {
    const {
      ratioX, //x轴位置
      ratioY, //y轴位置
      ratioZ, //z轴位置
    } = this.state
    // 设置模型的位置
    this.model.rotation.set(Number(ratioX), Number(ratioY), Number(ratioZ))
  }
  //动画启动器
  startAnimation = () => {
    this.frameId = requestAnimationFrame(this.animate)
  }
  animate = () => {
    const { animationSpeedX, animationSpeedY, animationSpeedZ, isAnimation } = this.state
    if (this.mixer) {
      this.mixer.update()
    }
    if (this.controls) {
      this.controls.update()
    }
    if (isAnimation && this.model) {
      // 对模型进行旋转
      this.model.rotation.x += Number(animationSpeedX)
      this.model.rotation.y += Number(animationSpeedY)
      this.model.rotation.z += Number(animationSpeedZ)
    }
    this.renderer.render(this.scene, this.camera)
    this.frameId = requestAnimationFrame(this.animate)
  }

  //更新灯光方法
  updateLight = () => {
    const {
      lightStyle, //光照风格
      luminance, //光照亮度
    } = this.state
    // 删除现有灯光
    this.scene.children.forEach((child) => {
      if (child.type != 'Group') {
        this.scene.remove(child)
      }
    })
    //添加新的灯光
    const luminanceNum = Number(luminance)
    if (lightStyle == 'style1') {
      this.highlightLight()
    } else if (lightStyle == 'style2') {
      this.productLight()
    } else {
      const ambientLight = new THREE.AmbientLight(0xdddddd, luminanceNum) // 柔和的白光
      this.scene.add(ambientLight)
    }
  }
  //高亮光-style1
  highlightLight = () => {
    const {
      luminance, //光照亮度
    } = this.state
    const luminanceNum = Number(luminance)
    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, luminanceNum) // 柔和的白光
    this.scene.add(ambientLight)

    // 创建定向光
    var directionalLight = new THREE.DirectionalLight(0x999999, luminanceNum)
    directionalLight.position.set(-6, 2, 0) // 设置为从左照射
    this.scene.add(directionalLight)

    // 创建定向光
    var directionalLight2 = new THREE.DirectionalLight(0x999999, luminanceNum)
    directionalLight2.position.set(6, 2, 0) // 设置为从右照射
    this.scene.add(directionalLight2)

    // 创建点光源
    var pointLight = new THREE.PointLight(0x999999, luminanceNum)
    pointLight.position.set(0, 0, 8) // 设置为从特定位置照射
    this.scene.add(pointLight)

    // 创建聚光灯
    var spotLight = new THREE.SpotLight(0xffffff, luminanceNum)
    spotLight.position.set(0, 10, 0) // 设置为从上方照射
    spotLight.target.position.set(0, 0, 0) // 设置目标点
    this.scene.add(spotLight)

    // 创建聚光灯
    var spotLight2 = new THREE.SpotLight(0xffffff, luminanceNum)
    spotLight2.position.set(0, -10, 0) // 设置为从上方照射
    spotLight2.target.position.set(0, 0, 0) // 设置目标点
    this.scene.add(spotLight2)
  }
  //产品展示光-style2
  productLight = () => {
    const {
      luminance, //光照亮度
    } = this.state
    const luminanceNum = Number(luminance)
    // 创建主光源（Key Light）
    const keyLight = new THREE.DirectionalLight(0xffffff, luminanceNum)
    keyLight.position.set(-5, 5, 5)
    this.scene.add(keyLight)

    // 创建辅助光源（Fill Light）
    const fillLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.5)
    fillLight.position.set(0, 5, 0)
    this.scene.add(fillLight)

    // 创建背光（Backlight）
    const backLight = new THREE.SpotLight(0xffffff, luminanceNum)
    backLight.position.set(5, 5, -5)
    backLight.target.position.set(0, 0, 0)
    backLight.angle = Math.PI / 3
    backLight.penumbra = 0.2
    backLight.castShadow = true
    this.scene.add(backLight)
  }

  //object差异对比
  diffObject = (obj1, obj2) => {
    const diff = {}
    // 检查obj1的属性是否在obj2中，并且值是否相同
    for (const key in obj2) {
      if (obj2.hasOwnProperty(key) && obj1[key] !== obj2[key].value) {
        diff[key] = obj2[key].value
      }
    }
    return diff
  }

  componentWillUnmount() {
    // 清理动画和事件监听器
    cancelAnimationFrame(this.frameId)
    this.controls.dispose()
    if (this.mount.current) {
      this.observer.unobserve(this.mount.current)
    }
    this.observer.disconnect()
  }

  render() {
    return (
      <div
        className="model-container"
        ref={this.mount}
        style={{ width: '100%', height: '100%' }}
      ></div>
    )
  }
}

export default CustomComp
