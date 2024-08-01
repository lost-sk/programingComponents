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
			基础3D建模及展示组件
			模型数据结构（在模型数据中输入）：
        // 可通过第4位来设置颜色，默认通过高度自动获取
        [1,"1-195",12,"#409EFF"]
        [4,"1-195",12]
        [5,"30-40",12]
        // 这是东边墙（允许使用//注释）
        [1,"205-250",12]
        [4,"205-250",12]
      点位信息使用服务获取，数据结构：
        // 可通过color来设置颜色，默认通过高度自动获取
        {
          list:[ 
                 { name:'位置1', position:[ 10,10,5] },
                 { name:'位置2', position:[ 20,30,15],color:"#409EFF"} 
               ]
        }
		`,
  },
]
