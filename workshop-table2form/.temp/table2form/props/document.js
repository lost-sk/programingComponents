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
        style={{ width: '100%', padding: '5px', display: 'flex', justifyContent: 'flex-end' }}
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
    description: '基本介绍',
    code: `
		一个根据所选表单模版字段自动渲染成相应Form填报的组件
		`,
  },
  {
    functionName: '',
    description: '下拉框数据格式',
    code: `
			// 绑定的服务也必须返回如下格式的数据，optionText和optionValue为固定字段，不可变更

			[
				{optionText: '男',optionValue: '1'},
				{optionText: '女',optionValue: '2'}
			]
		`,
  },
  {
    functionName: '',
    description: '级联选择器数据格式',
    code: `
		// 绑定的服务也必须返回如下格式的数据,value、label、children为固定字段，不可变更， 
		// 数据中不能含有 / ，否则会导致表格展示数据错误
				var data = [
					{
							value:'1',
							label:'父级1',
							children:[
									{
											value:'1-1',
											label:'子级1'
									}
							]
					},
					{
							value:'2',
							label:'父级2',
							children:[
									{
											value:'2-1',
											label:'子级2'
									}
							]
					}
			]

		var ArrayList = Java.type("java.util.ArrayList");
		function replaceFields(data) {
			return new ArrayList(data.map(function(item) {
				return {
					value: item.value,
					label: item.label,
					children: item.children ? new ArrayList(replaceFields(item.children)) : null
				};
			}));
		}

		var newData = replaceFields(data);
		newData
		`,
  },
  {
    functionName: '',
    description: '表头单元格自定义渲染',
    code: `
			// text表示当前单元格的值，record表示当前行数据，index表示索引
		
			console.log(text, record, index)
			return "<span>" + text + "</span>"
		`,
  },
  {
    functionName: 'getFormData',
    description: '获取当前表单数据',
    code: `
			var data = scriptUtil.getRegisterReactDom('组件id').getFormData();
			console.log(data)
		`,
  },
  {
    functionName: 'setFormData',
    description: '设置表单数据',
    code: `
      //可先通过getFormData获取当前表单字段结构
			var from = scriptUtil.getRegisterReactDom('组件id')
      from.setFormData({'attr1':value1,'attr12':value2});
		`,
  },
]
