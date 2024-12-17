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
    code: ``,
  },
  {
    functionName: 'getGranularityInputValue',
    description: '获取矿石粒度参数',
    code: `
			var inputValue = this.getGranularityInputValue();
			console.log(inputValue)
		`,
  },
  {
    functionName: 'setGranularityInputValue',
    description: '设置矿石粒度参数',
    code: `
      const params = {
        type: 'particleSize',
        particleSize: [2, 1, 0.1],
        distribution: [0.8, 0.6, 0.3],
        maxSize: 4,
      }
			this.setGranularityInputValue(params);
		`,
  },
  {
    functionName: 'setGranularityOutputValue',
    description: '设置矿石粒度输出',
    code: `
      const params = {
        stdDist: [], //粒度分布 用于给feed1的dist
        stdPs: [], //粒级
      },
			this.setGranularityOutputValue(params);
		`,
  },
  {
    functionName: 'getProcessInputValue',
    description: '获取仿真参数',
    code: `
			var inputValue = this.getProcessInputValue();
			console.log(inputValue)
		`,
  },
  {
    functionName: 'setProcessInputValue',
    description: '设置仿真参数',
    code: `
      const params = {
        rho: 2.7, 
        maxSize: 4, 
        feed1: {
          ore: 400, 
          water: 10, 
          dist: [],
        },
        feed2: {
          ore: 0,
          water: 0,
          dist: [],
        },
        feed3: {
          ore: 0,
          water: 0,
          dist: [],
        },
        water1: 90, 
        water2: 0, 
        water3: 0, 
      }
			this.setProcessInputValue(params);
		`,
  },
]
