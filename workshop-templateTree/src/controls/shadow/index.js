import React, { Component } from 'react'

class CustomComp extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    scriptUtil.registerReactDom(this, this.props)
  }

  render() {
    const config = this.props?.data?._attrObject.data || {}
    const offsetX = config?.offsetX?.value || '3px'
    const offsetY = config?.offsetX?.value || '4px'
    const radius = config?.radius?.value || '6px'
    const shadowColor = config?.shadowColor?.color || '#AEAEAE'
    const background = config?.background?.color || '#fff'
    return (
      <div
        ref={this.domRef}
        style={{
          position: 'relative',
          height: '100%',
          width: '100%',
          background,
          zIndex: 0,
          boxShadow: `${offsetX} ${offsetY} ${radius} ${shadowColor}`,
        }}
      ></div>
    )
  }
}

export default CustomComp
