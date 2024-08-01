import React, { Component } from 'react'
import { Switch } from 'antd'

var css = document.createElement('style')

css.innerHTML = `
	.ant-tree li span.ant-tree-switcher.ant-tree-switcher-noop {
		display: none
	}
	.ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {
		background-color: rgba(0,0,0,0)
	}
	.ant-tree li .ant-tree-node-content-wrapper:hover {
		background-color: rgba(0,0,0,0)
	}
  .ant-tree li span[draggable], .ant-tree li span[draggable="true"] {
    width: 100%;
  }
`

document.getElementsByTagName('head')[0].appendChild(css)

class AddButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.getInfo().value || { save: true, reset: true },
      reRenderFunctionName: '',
    }
  }

  componentDidMount() {
    console.log('componentDidMount props state', this.props, this.state)

    // let url = `/resource/${this.props.appId}/extensions/${
    //   this.props.editComponent.props.data.getAttrObject().componentName
    // }/index.json`
    // if (this.props.editComponent?.commonPath?.includes('fileName=resources/plugin')) {
    //   url = `${this.props.editComponent.commonPath}/index.json`
    // }
    // fetch(url)
    //   .then((item) => {
    //     return item.json()
    //   })
    //   .then((data) => {
    //     const r = data.find((element) => {
    //       return (
    //         element.resource === 'addButton.js' &&
    //         element.name === this._reactInternalFiber.return.key
    //       )
    //     })
    //     this.setState({
    //       reRenderFunctionName: r.reRenderFunctionName,
    //     })
    //   })
  }

  componentDidUpdate(prevProps, prevState) {}

  handleSwitchChange = (key, checked) => {
    const { value } = this.state
    this.setState({ value: { ...value, [key]: checked } }, () => {
      this.props.edit({ value: { ...value, [key]: checked } })
      this.storageCurrentProps()
    })
  }

  storageCurrentProps = (key, val) => {
    // this.props.editComponent.setCustomProps(key, val);
    setTimeout(() => {
      // console.log(this.props.data, this.props.editComponent.getCtrlId());
      const htId = this.props.editComponent.getCtrlId().value
      // supOS4.2之前的可编程组件实例
      if (window.dynamicImportWidget) {
        window.dynamicImportWidget[htId].forceUpdate()
      }
      // supOS4.2及之后的可编程组件实例
      if (window.COMPVIEW && window.COMPVIEW.dynamicImportWidget) {
        const { reRenderFunctionName } = this.state
        if (reRenderFunctionName) {
          window.COMPVIEW.dynamicImportWidget[htId][reRenderFunctionName]()
        } else {
          window.COMPVIEW.dynamicImportWidget[htId].forceUpdate()
        }
      }
    }, 0)
  }

  render() {
    const { value } = this.state

    return (
      <>
        <div style={{ display: 'flex', fontSize: '13px', width: '100%' }}>
          <div style={{ minWidth: 60, lineHeight: '24px' }}>功能按钮</div>
          <div style={{ flex: 1, width: 'calc(100% - 60px)' }}>
            <div>
              保存：
              <Switch
                checked={value.save}
                onChange={(checked) => this.handleSwitchChange('save', checked)}
              />
            </div>
            <div>
              重置：
              <Switch
                checked={value.reset}
                onChange={(checked) => this.handleSwitchChange('reset', checked)}
              />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default AddButton
