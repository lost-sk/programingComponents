import React, { Component } from 'react'
import { Button, Modal, Collapse } from 'antd'
import 'text.css'
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
      <div style={{ width: '100%', padding: '2px 0' }} size="small">
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
			导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。
			一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。

			在其他组件内容加载事件中，不能通过scriptUtil.getRegisterReactDom来获取可编程组件的实例，其他事件中则不受此影响
		`,
  },

  {
    functionName: '',
    description: '数据源结构',
    code: `
		{
			"list": [
				{
					"title": "Navigation One",
					"ItemGroup": [
						{
							"title": "item1",
							"items": [
								{
									"itemText": "Option1",
									"itemValue": 1
								},
								{
									"itemText": "Option2",
									"itemValue": 2
								},
								{
									"itemText": "Option3",
									"itemValue": 3
								}
							]
						}]
				},
				{
					"title": "Navigation Two",
					"items": [
						{
							"itemText": "Option7",
							"itemValue": 7
						},
						{
							"itemText": "Option8",
							"itemValue": 8
						}
					]
				}
			]
		}
		`,
  },
  {
    functionName: '',
    description: '模拟数据服务',
    code: `
		var ArrayList = Java.type('java.util.ArrayList')
		var result = {
			list: new ArrayList([
				{
					title: "Navigation One",
					ItemGroup: new ArrayList([
						{
							title: "item1",
							items: new ArrayList([
								{ itemText: "Option1", itemValue: 1 },
								{ itemText: "Option2", itemValue: 2 },
								{ itemText: "Option3", itemValue: 3 },
							])
						},
						{
							title: "item2",
							items: new ArrayList([
								{ itemText: "Option4", itemValue: 4 },
								{ itemText: "Option5", itemValue: 5 },
								{ itemText: "Option6", itemValue: 6 },
							])
						},
					])
				},
				{
					title: "Navigation Two",
					items: new ArrayList([
						{ itemText: "Option7", itemValue: 7 },
						{ itemText: "Option8", itemValue: 8 },
					])
				}
			])
		}
		result
		`,
  },
  {
    functionName: 'events',
    description: '组件事件',
    code: `
		  // 支持内容加载、节点选中事件
		  // 以节点选中事件为例
		  // params: 选中节点的参数 
		  console.log('on click params:',params)
			`,
  },
]
