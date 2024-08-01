/**
 * @author Lorenzo Cadamuro / http://lorenzocadamuro.com
 */

export default (regl, src, path = false) => {
  const texture = regl.texture()

  const image = new Image()
  if (path) {
    image.src = require(`~assets/${src}`)
  } else image.src = src

  image.onload = function () {
    texture({
      data: image,
      flipY: true,
      //min: 'mipmap',
    })
  }

  return texture
}
