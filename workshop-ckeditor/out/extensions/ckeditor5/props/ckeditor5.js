import React, { Component } from 'react'
import { Button, Modal } from 'antd'
// import CkEditorReact from '../extensions/ckeditor5/props/ckeditor5-react.js'
// import ClassicEditor from '../extensions/ckeditor5/props/ckeditor5-build-classic.js'
//const { CKEditor } = CkEditorReact
let CkEditorReact, ClassicEditor
//console.log('CkEditorReact', CkEditorReact)
import(
  'https://eco-p5um.beta010.devcloud.supos.net/resource/App_91b1ad3b4b728cfd00ab8e3432eb19e6/extensions/ckeditor5/props/ckeditor5-react.js'
).then((module) => {
  CkEditorReact = module
})
import(
  'https://eco-p5um.beta010.devcloud.supos.net/resource/App_91b1ad3b4b728cfd00ab8e3432eb19e6/extensions/ckeditor5/props/ckeditor5-build-classic.js'
).then((module) => {
  ClassicEditor = module
})

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
            console.log('ClassicEditor', CkEditorReact, ClassicEditor)
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
          123
          {/* <CKEditor
            editor={ClassicEditor}
            data="<p>Hello from CKEditor&nbsp;5!</p>"
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor)
            }}
            onChange={(event) => {
              console.log(event)
            }}
            onBlur={(event, editor) => {
              console.log('Blur.', editor)
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor)
            }}
          /> */}
        </Modal>
      </div>
    )
  }
}

export default CustomComp
