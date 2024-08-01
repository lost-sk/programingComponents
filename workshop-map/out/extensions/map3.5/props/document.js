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
      中国地图
			可通过服务获取点位信息
      服务返回格式：{ list: [ { name:'杭州',lng: 120.15, lat: 30.265,status:'normal',...attrs} ]} 
      必填属性：lng:经度；lat:纬度；
      选填属性：status:状态 'normal','warn' 'error' 默认为'normal';...attrs 其他点位信息(可用于自定义HTML)
      使用自定义HTML时，只能点击触发
		`,
  },
  {
    functionName: '',
    description: '编辑html',
    code: `
    当我们绑定服务后(服务可以扩展属性)，会在地图上自动显示图标，"触发详情"选择点击，然后我们点击图标会弹出窗口显示该节点的服务数据，
    如果对自带弹出窗口样式不满意，我们可以通过编辑html来自定义弹窗的样式和内容，例如可以使用<a href=''>\${name}</a>
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
