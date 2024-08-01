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
    根据服务返回的初始城市和目标城市，地图控件会自动连接，实现城市流向效果。

    菜单栏“显示城市"中，选择所有城市时，地图放大后，会显示出所有的地级市，当不需要显示所有地级市，只需要显示省会城市和连线城市时，请选择连线城市
		`,
  },
  {
    functionName: '',
    description: '飞线图数据说明',
    code: `
    飞线图数据用于展示地图飞线
    服务返回格式：{ list: [ { from:'杭州',to:'洛阳'},{ from:'武汉',to:'洛阳'} ]}
    请正确输入城市名称，可输入杭州市或杭州、黔东南苗族自治州或黔东南
		`,
  },
]
