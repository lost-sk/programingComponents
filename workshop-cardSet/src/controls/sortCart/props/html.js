import React, { Component } from 'react'
import { Button, Modal, Input } from 'antd'
const { TextArea } = Input

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
          <TextArea value={htmlDetail || ''} onChange={this.textChange} rows={25} />
        </Modal>
      </div>
    )
  }
}

export default CustomComp
