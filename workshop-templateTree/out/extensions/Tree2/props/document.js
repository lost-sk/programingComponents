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
			通用树组件
		`,
  },
  {
    functionName: 'setDataSet',
    description: '以list数据设置树结构',
    code: `
    const list = [
      { id: '1', name: '父级1', parentId: null },
      { id: '1-1', name: '子级1', parentId: '1' },
      { id: '1-1-1', name: '子级1-1', parentId: '1-1' },
      { id: '2', name: '父级2', parentId: null },
      { id: '2-1', name: '子级2', parentId: '2' },
    ]
      scriptUtil.getRegisterReactDom('组件id').setDataSet(list,{value:'id',text:'name',parent:'parentId'});
		`,
  },
  {
    functionName: 'setDataTree',
    description: '以tree数据设置树结构',
    code: `
      const tree =  [{
        value: 'zhejiang',
        label: '浙江',
        children: [{
          value: 'hangzhou',
          label: '杭州',
          children: [{
            value: 'xihu',
            label: '西湖'
          }]
        }]
      }];
      scriptUtil.getRegisterReactDom('组件id').setDataTree(tree,{value:'id',text:'name',children:'children'});
		`,
  },
  {
    functionName: 'getSelectedKeys',
    description: '获取点击选中的树节点keys',
    code: `
      const ctrl = scriptUtil.getRegisterReactDom('组件id')
      const keys = ctrl.getSelectedKeys();
		`,
  },
  {
    functionName: 'setSelectedKeys',
    description: '设置点击选中的树节点keys',
    code: `
      const ctrl = scriptUtil.getRegisterReactDom('组件id')
      ctrl.setSelectedKeys([]);// 清除选中
		`,
  },
  {
    functionName: 'getCheckedKeys',
    description: '获取勾选的树节点keys',
    code: `
      const ctrl = scriptUtil.getRegisterReactDom('组件id')
      const keys = ctrl.getCheckedKeys();
		`,
  },
  {
    functionName: 'setCheckedKeys',
    description: '设置勾选的树节点keys',
    code: `
      const ctrl = scriptUtil.getRegisterReactDom('组件id')
      ctrl.setCheckedKeys([]);// 清除checked keys
		`,
  },
  {
    functionName: 'events',
    description: '组件事件',
    code: `
      // 支持内容加载、节点删除、节点选中事件
      // 以节点删除事件为例
      // params: 删除节点的参数 
      console.log('on click params:',params)
		`,
  },
]
