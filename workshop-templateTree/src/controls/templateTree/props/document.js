import React, { Component } from 'react'
import { Button, Modal, Collapse } from 'antd'
const { Panel } = Collapse

var css = document.createElement('style')

css.innerHTML = `
	.ant-collapse-content > .ant-collapse-content-box {
		padding-top: 0
	}
`

document.getElementsByTagName('head')[0].appendChild(css)

class CustomComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }
  showModal = () => {
    this.setState({ visible: true })
  }
  closeModal = () => {
    this.setState({ visible: false })
  }

  render() {
    return (
      <div
        style={{ width: '250px', padding: '5px', display: 'flex', justifyContent: 'flex-end' }}
        size="small"
      >
        <Button type="dashed" onClick={this.showModal}>
          使用说明
        </Button>
        <Modal
          title="使用说明"
          visible={this.state.visible}
          onOk={this.closeModal}
          onCancel={this.closeModal}
          width={600}
          footer={null}
        >
          <div style={{ height: '50vh', overflow: 'auto', padding: '5px 0' }}>
            <Collapse>
              {docList.map((item) => (
                <Panel
                  header={`${item.functionName}   ${item.description}`}
                  key={item.functionName}
                >
                  <code style={{ whiteSpace: 'pre-line' }}>{item.code}</code>
                </Panel>
              ))}
            </Collapse>
          </div>
        </Modal>
      </div>
    )
  }
}

export default CustomComp

const docList = [
  {
    functionName: '',
    description: '基础说明',
    code: `
			模版树组件
			可通过配置模版别名默认过滤（移除）组件，若相应的父组件被过滤则其下的子孙模版都将被移除。
      input示例: 'Template_name1,Template_name2'
		`,
  },
  {
    functionName: 'getSelectedValue',
    description: '获取勾选的模版',
    code: `
      var data = scriptUtil.getRegisterReactDom('组件id').getSelectedValue();
      console.log(data)
		`,
  },
]
