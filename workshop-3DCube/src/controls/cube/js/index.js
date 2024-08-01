/**
 * @author Lorenzo Cadamuro / http://lorenzocadamuro.com
 */
import Regl from 'regl'
import { mat4 } from 'gl-matrix'
import Texture from '~js/helpers/Texture'
import cube, {
  Types as CubeTypes,
  Faces as CubeFaces,
  Masks as CubeMasks,
} from '~js/components/cube'
import {
  positions as cubePositions,
  centers as cubeCenters,
  uv as cubeUv,
  elements as cubeElements,
  colors as cubeColors,
} from '~js/components/cube/config'
import cubeFrag from '~js/components/cube/shader.frag'
import cubeVert from '~js/components/cube/shader.vert'

import content, { Types as ContentTypes } from '~js/components/content'

const CONFIG = {
  cameraX: 0,
  cameraY: 0,
  cameraZ: 5.7,
  rotation: 4.8,
  rotateX: 1,
  rotateY: 1,
  rotateZ: 1,
  velocity: 0.009,
}

const cubeCONFIG = {
  translateX: 0,
  translateY: 0,
  translateZ: 0,
  rotation: 0,
  rotateX: 1,
  rotateY: 1,
  rotateZ: 1,
  scale: 1.2,
  borderWidth: 0.008,
  displacementLength: 0.028,
  reflectionOpacity: 0.3,
  scene: 3,
}

const camera_CONFIG = {
  fov: 45,
  near: 0.01,
  far: 1000,
}

const ReglInit = (containerRef, dataList, color = [0, 0, 0, 0]) => {
  const regl = Regl({
    container: containerRef,
    attributes: {
      antialias: true,
      alpha: false,
    },
  })
  /**
   * Fbos
   */
  const displacementFbo = regl.framebuffer()
  const maskFbo = regl.framebuffer()
  const contentFbo = regl.framebuffer()
  const reflectionFbo = regl.framebufferCube(1024)

  const emptyTexture = regl.texture()
  const emptyCube = regl.cube()
  /**
   * Textures
   */
  const text = (str) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 128 // 宽度
    canvas.height = 128 // 高度

    ctx.font = '400 24px 微软雅黑'
    //ctx.fillStyle = 'white'
    ctx.fillText(str, 26, 82)

    const texture = regl.texture({
      data: canvas,
      flipY: true,
      min: 'linear',
      mag: 'linear',
    })
    return texture
  }

  const textures1 = dataList.map((d, index) => {
    if (d.url) {
      return {
        texture: Texture(regl, d.url),
        typeId: 1,
        maskId: index + 1,
      }
    }
    if (d.text) {
      return {
        texture: text(d.text),
        typeId: 1,
        maskId: index + 1,
      }
    }
    return {
      texture: emptyTexture,
      typeId: 1,
      maskId: index + 1,
    }
  })

  const texturesOrigin = [
    {
      texture: Texture(regl, 'CJSB002.png', true),
      typeId: ContentTypes.RAINBOW,
      maskId: CubeMasks.M1,
    },
    {
      texture: Texture(regl, 'CJSB002.png', true),
      typeId: ContentTypes.BLUE,
      maskId: CubeMasks.M2,
    },
    {
      texture: Texture(regl, 'CJSB002.png', true),
      typeId: ContentTypes.RED,
      maskId: CubeMasks.M3,
    },
    {
      texture: Texture(regl, 'CJSB002.png', true),
      typeId: ContentTypes.BLUE,
      maskId: CubeMasks.M4,
    },
    {
      texture: Texture(regl, 'CJSB002.png', true),
      typeId: ContentTypes.RED,
      maskId: CubeMasks.M5,
    },
  ]

  const texturesFinal = textures1.length !== 5 ? texturesOrigin : textures1

  const newCube = regl({
    frag: cubeFrag,
    vert: cubeVert,
    context: {
      world: (context, { matrix }) => {
        const { translateX, translateY, translateZ, rotation, rotateX, rotateY, rotateZ, scale } =
          cubeCONFIG

        const world = mat4.create()

        mat4.translate(world, world, [translateX, translateY, translateZ])
        mat4.rotate(world, world, rotation, [rotateX, rotateY, rotateZ])
        mat4.scale(world, world, [scale, scale, scale])

        if (matrix) {
          mat4.multiply(world, world, matrix)
        }

        return world
      },
      face: (context, { cullFace }) => {
        return cullFace === CubeFaces.FRONT ? -1 : 1
      },
      texture: (context, { texture }) => {
        return texture || emptyTexture
      },
      reflection: (context, { reflection }) => {
        return reflection || emptyCube
      },
      textureMatrix: (context, { textureMatrix }) => {
        return textureMatrix
      },
      borderWidth: () => {
        const { borderWidth } = cubeCONFIG

        return borderWidth
      },
      displacementLength: () => {
        const { displacementLength } = cubeCONFIG

        return displacementLength
      },
      reflectionOpacity: () => {
        const { reflectionOpacity } = cubeCONFIG

        return reflectionOpacity
      },
      scene: () => {
        const { scene } = cubeCONFIG

        return parseFloat(scene)
      },
    },
    attributes: {
      a_position: cubePositions,
      a_center: cubeCenters,
      a_uv: cubeUv,
      a_color: cubeColors,
    },
    uniforms: {
      u_world: regl.context('world'),
      u_face: regl.context('face'),
      u_typeId: regl.prop('typeId'),
      u_texture: regl.context('texture'),
      u_reflection: regl.context('reflection'),
      u_tick: regl.context('tick'),
      u_borderWidth: regl.context('borderWidth'),
      u_displacementLength: regl.context('displacementLength'),
      u_reflectionOpacity: regl.context('reflectionOpacity'),
      u_scene: regl.context('scene'),
    },
    cull: {
      enable: true,
      face: regl.prop('cullFace'),
    },
    depth: {
      enable: true,
      mask: false,
      func: 'less',
    },
    blend: {
      enable: true,
      func: {
        srcRGB: 'src alpha',
        srcAlpha: 1,
        dstRGB: 'one minus src alpha',
        dstAlpha: 1,
      },
      equation: {
        rgb: 'add',
        alpha: 'add',
      },
      //color: [0, 0, 0, 0],
    },
    elements: cubeElements,
    count: 36,
    framebuffer: regl.prop('fbo'),
  })

  const cameraConfig = {
    eye: [CONFIG.cameraX, CONFIG.cameraY, CONFIG.cameraZ],
    target: [0, 0, 0],
  }
  const cameraConfig2 = {
    eye: [0, 0, 6],
    target: [0, 0, 0],
    up: [0, 1, 0],
  }

  const camera = regl({
    context: {
      projection: ({ viewportWidth, viewportHeight }) => {
        const { fov, near, far } = camera_CONFIG
        const fovy = (fov * Math.PI) / 180
        const aspect = viewportWidth / viewportHeight

        return mat4.perspective([], fovy, aspect, near, far)
      },

      view: (context, props) => {
        const config = Object.assign({}, cameraConfig2, props)

        const { eye, target, up } = config

        return mat4.lookAt([], eye, target, up)
      },

      fov: () => {
        const { fov } = camera_CONFIG

        return fov
      },
    },

    uniforms: {
      u_projection: regl.context('projection'),
      u_view: regl.context('view'),
      u_cameraPosition: regl.context('eye'),
      u_resolution: ({ viewportWidth, viewportHeight }) => {
        return [viewportWidth, viewportHeight]
      },
    },
  })

  const animate = ({ viewportWidth, viewportHeight, tick }) => {
    const { rotation, rotateX, rotateY, rotateZ, velocity } = CONFIG

    /**
     * Resize Fbos
     */
    displacementFbo.resize(viewportWidth, viewportHeight)
    maskFbo.resize(viewportWidth, viewportHeight)
    contentFbo.resize(viewportWidth, viewportHeight)

    /**
     * Rotation Matrix
     */
    const factor = tick * velocity
    const rotationMatrix = mat4.create()

    mat4.rotate(rotationMatrix, rotationMatrix, rotation, [rotateX, rotateY, rotateZ])
    mat4.rotate(rotationMatrix, rotationMatrix, factor, [Math.cos(factor), Math.sin(factor), 0.5])

    regl.clear({
      color,
      depth: 1,
    })

    camera(cameraConfig, () => {
      newCube([
        {
          fbo: displacementFbo,
          cullFace: CubeFaces.BACK,
          typeId: CubeTypes.DISPLACEMENT,
          matrix: rotationMatrix,
        },
        {
          fbo: maskFbo,
          cullFace: CubeFaces.BACK,
          typeId: CubeTypes.MASK,
          matrix: rotationMatrix,
        },
      ])
      contentFbo.use(() => {
        content(regl, {
          textures: texturesFinal,
          displacement: displacementFbo,
          mask: maskFbo,
        })
      })
    })

    camera(cameraConfig, () => {
      newCube([
        {
          cullFace: CubeFaces.FRONT,
          typeId: CubeTypes.FINAL,
          reflection: reflectionFbo,
          matrix: rotationMatrix,
        },
        {
          cullFace: CubeFaces.BACK,
          typeId: CubeTypes.FINAL,
          texture: contentFbo,
          matrix: rotationMatrix,
        },
      ])
    })
  }

  regl.frame(animate)
  return regl
}

export default ReglInit
