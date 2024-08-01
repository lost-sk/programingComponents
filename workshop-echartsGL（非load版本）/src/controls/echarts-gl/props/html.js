import React, { Component } from 'react'
import { Button, Modal, Input } from 'antd'
const { TextArea } = Input

const defaultDataString = `//数据示例
//做好区域位置注释，便捷后续运维工作
//若模型位置不清晰，可以提高/降低柱子高度查看墙体位置
//西面外围墙([1, '1-195',12]表示X从1的位置开始，Y轴1到195的位置是柱子，12表示柱子高度)
[1, '1-195', 12]
[4, '1-195', 12]
[1, '205-250', 12]
[4, '205-250', 12] 
//西面贴墙柜子
[5, '30-40', 10] 
//南边外围墙(['1-30', 1, 12]Y轴从1的位置开始，X轴1到30是柱子)
['1-30', 1, 12]
['40-150', 1, 12] 
//第一办公区域内部墙
[30, '1-70', 12]
['4-30', 70, 12]
[40, '1-70', 12]
['40-150', 70, 12]
['95-150', 60, 12]
[95, '40-60', 12]
['60-95', 40, 12]
[60, '1-20', 12]
[60, '30-39', 12]
[60, '50-70', 12] 
//第一区域操作台及柜子，X轴从103到140，Y轴50到54都是高度5的矮柱子
['103-140', '50-54', 5, '#FFFF00']
['60-100', '2-4', 8] 
//东外围墙
[150, '1-20', 12]
[150, '25-60', 12]
[150, '70-85', 12]
[150, '90-100', 12]
[150, '110-150', 12]
[150, '160-180', 12]
[150, '200-220', 12]
[150, '225-250', 12] 
//北外围墙
['1-80', 250, 12]
['90-100', 250, 12]
['120-140', 250, 12]
['145-150', 250, 12] 
//第二办公区域
['1-60', 95, 12]
['70-100', 95, 12]
['110-150', 95, 12]
[30, '80-95', 12]
[59, '80-95', 12]
[100, '70-85', 12]
[110, '70-85', 12]
['100-103', 85, 12]
['107-110', 85, 12]
['1-150', 147, 12]
['1-70', 212, 12]
['1-70', 213, 12]
['1-70', 214, 12]
[52, '147-195', 12]
[30, '108-133', 12]
//第三办公区域及操作台
['110-140', '162-165', 5]
['70-100', '162-165', 5]
['70-75', 170, 2]
['90-95', 170, 2]
['120-125', 170, 2]
['130-135', 170, 2]
['30-60', 108, 12]
['80-120', 108, 12]
['30-120', 133, 12]
['90-150', '212-214', 12]
[90, '212-220', 12]
[90, '230-250', 12]
[70, '212-220', 12]
[70, '230-250', 12]
[120, '108-122', 12]
[120, '130-133', 12]
`

class CustomComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      htmlDetail: props.getInfo()?.value || defaultDataString,
    }
  }

  componentDidMount() {
    if (_.isEmpty(this.props.getInfo()?.value)) {
      this.props.edit({ value: defaultDataString })
    }
  }

  handleOk = () => {
    const { htmlDetail } = this.state
    this.setState({
      visible: false,
    })
    this.props.edit({ value: htmlDetail })
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
            this.setState({ visible: true })
          }}
        >
          编辑模型数据
        </Button>

        <Modal
          title="模型数据"
          visible={visible}
          maskClosable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <TextArea value={htmlDetail} onChange={this.textChange} rows={25} />
        </Modal>
      </div>
    )
  }
}

export default CustomComp
