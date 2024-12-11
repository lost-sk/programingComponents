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
    functionName: 'getInputValue',
    description: '获取输入参数',
    code: `
			var inputValue = this.getInputValue();
			console.log(inputValue)
		`,
  },
  {
    functionName: 'setInputValue',
    description: '设置输入参数',
    code: `
    const params = {
			"name": "Ball",
			"model": "PerfectMixing",
			"params": {
				"diameter": 5.5, 
				"length": 8.5, 
				"speed": 11.2, 
				"jt": 0.25, 
				"db": 100, 
				"jb": 0.1, 
				"rhoB": 7.8, 
				"wi": 11.2, 
				"rate": [[1, 3], [2, 1], [3, 1], [4, 3]]
			}
		}
			this.setInputValue(params);
		`,
  },
  {
    functionName: 'setOutputValue',
    description: '设置输出参数',
    code: `
    const params = {
			"power": 320.01940563705534,
			"product": {
				"dist": [
					0,
					0.5566232079608417,
					0.5639964704851527,
					0.7757341026224694,
				],
				"flowRate": 248.14814814814815,
				"ore": 400,
				"percent": 0.8,
				"rhoP": 2.014925373134328,
				"water": 100
			}
		}
			this.setOutputValue(outputParams);
		`,
  },
]
