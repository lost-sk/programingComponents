import React, { Component } from 'react'
import { Button, Modal, Input } from 'antd'
const { TextArea } = Input

const placeholder = `//示例（含动态插值）
//tips: 若不是用自定义html,须完全清空面板。
<div style='padding:6px;background:rgba(255,255,255,0.3);width:80px;height:60px;'>
  <h3>
    <a href=\${url} target='_blank'>\${title}</a>
  </h3>
  <ul>
    <li>姓名：\${name}</li>
    <li>年龄：\${age}</li>
    <li>住址：\${addr}</li>
  </ul>
</div>
`
class CustomComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      htmlDetail: !_.isEmpty(props.getInfo('htmlDetail')) ? props.getInfo('htmlDetail') : '',
    }
  }

  handleOk = () => {
    const { htmlDetail } = this.state
    this.setState({
      visible: false,
    })
    this.props.edit(htmlDetail)
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  textChange = (e) => {
    this.setState({
      htmlDetail: e.target.value,
    })
  }

  render() {
    const { visible, htmlDetail } = this.state
    return (
      <div
        style={{
          padding: '5px',
          marginTop: '10px',
        }}
      >
        <Button
          type="primary"
          style={{ width: '100%' }}
          onClick={() => {
            this.setState({ visible: true })
          }}
        >
          编辑html
        </Button>

        <Modal
          title="HTML编辑"
          visible={visible}
          maskClosable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <TextArea
            value={htmlDetail || ''}
            onChange={this.textChange}
            rows={25}
            placeholder={placeholder}
          />
        </Modal>
      </div>
    )
  }
}

export default CustomComp
