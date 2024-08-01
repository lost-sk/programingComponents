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
      自定义卡片数据结构，通过解析HTML自动生成单张数据卡片，适合做员工名片、工艺卡片等。
			在交互脚本中，可通过_this获取当前可编程组件实例
      卡片内容：输入html字符串，模型服务中的返回的内容可通过\${propName}的方式动态替换
      服务返回数据格式：{ title:'titleName',prop1:''...} 其中title必须，prop1...等用于卡片内容html动态变量替换
      例如编写服务getData，返回数据结构如下：
      {'title':'人员信息','name':'zhangsan','age':'22'}
      再在"编辑HTML"中写入
      <ul style='position:relatvie'>
          <li>姓名：</li><li style='color:red;font-weight:bold;position:absolute;top:70px;right:10px'>${name}</li>
          <li>年龄：</li><li style='position:absolute;top:90px;right:10px'>${age}</li>
      </ul>
      <div style='text-align:center'>人员编号:100023</div>
      点击预览后，微调DOM的样式。
		`,
  },
  {
    functionName: 'getHtml',
    description: '获取html',
    code: `
			var str = thisInstance.getHtml();
		`,
  },
  {
    functionName: 'setHtml',
    description: '设置html',
    code: `
      thisInstance.setHtml('<span>hello world</span>');
		`,
  },
]
