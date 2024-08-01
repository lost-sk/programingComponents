import React, { Component } from 'react'
import { Button } from 'antd'
// import _ from 'lodash'
// const scriptUtil = {
//   registerReactDom: () => {},
//   executeScriptService: () => {},
// }

class PipContent extends Component {
  constructor(props) {
    super(props)
    this.targetContainer = null
    this.state = {
      config: props.data?._attrObject?.data,
    }
  }
  componentDidMount() {
    scriptUtil.registerReactDom(this, this.props)
  }

  enterPiP = async (targetDomId) => {
    if (!'documentPictureInPicture' in window) {
      alert('您的浏览器不支持画中画模式！')
      return
    }
    const target = document.querySelector(targetDomId)
    this.targetContainer = target.parentNode

    const pipOptions = {
      width: target.clientWidth,
      height: target.clientHeight,
    }

    const pipWindow = await documentPictureInPicture.requestWindow(pipOptions)

    // 从初始文档中复制样式表，以使播放器外观相同。
    const allCSS = [...document.styleSheets]
      .map((styleSheet) => {
        try {
          return [...styleSheet.cssRules].map((r) => r.cssText).join('')
        } catch (e) {
          const link = document.createElement('link')
          link.rel = 'stylesheet'
          link.type = styleSheet.type
          link.media = styleSheet.media
          link.href = styleSheet.href
          pipWindow.document.head.appendChild(link)
        }
      })
      .filter(Boolean)
      .join('\n')
    const style = document.createElement('style')
    style.textContent = allCSS
    pipWindow.document.head.appendChild(style)

    // 将目标添加到PiP窗口
    pipWindow.document.body.append(target)

    // 监听PiP结束事件，将目标放回原位
    pipWindow.addEventListener(
      'unload',
      (event) => this.onLeavePiP(pipWindow, targetDomId, event),
      {
        once: true,
      }
    )
  }

  onLeavePiP = (pipWindow, targetDomId, event) => {
    console.log('unload envent', event)
    // 将目标添加回目标窗口
    const target = pipWindow.document.querySelector(targetDomId)
    if (this.targetContainer) {
      this.targetContainer.append(target)
    }

    pipWindow.close()

    pipWindow = null
    this.targetContainer = null
  }

  render() {
    return <div>yoyo</div>
  }
}

export default PipContent
