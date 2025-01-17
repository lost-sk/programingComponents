import React, { Component } from 'react'
import { Select, Icon, Button, Modal, Input } from 'antd'
const { TextArea } = Input

class CustomComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      detail: '',
      index: '0',
      formList: !_.isEmpty(props.getInfo()) ? props.getInfo() : [],
      eventList: [
        { name: '内容加载', value: 'componentDidMount' },
        { name: '选中事件', value: 'onSelect' },
      ],
    }
  }

  // 新增交互事件
  addItem = () => {
    const list = [...this.state.formList, { id: new Date().valueOf(), content: '', detail: '' }]
    this.setState({ formList: list })
    this.props.edit(list)
  }
  // 删除事件
  deleteItem = (index) => {
    const list = this.state.formList
    list.splice(index, 1)
    this.setState({ formList: list })
    this.props.edit(list)
  }
  // 编辑事件脚本确认
  handleOk = (e) => {
    const list = this.state.formList
    list[this.state.index].detail = this.state.detail
    this.setState({ visible: false, formList: list })
    this.props.edit(list)
  }
  // 关闭编辑脚本弹窗
  handleCancel = (e) => {
    this.setState({ visible: false })
  }
  // 选择事件类型
  handChange = (e, index) => {
    const list = this.state.formList
    list[e].content = index
    this.setState({ formList: list })
    this.props.edit(list)
  }
  // 打开脚本编辑弹窗
  showModal = (e, index) => {
    const data = this.state.formList[e].detail
    this.setState({ detail: data, index: e, visible: true })
  }

  // 脚本内容改变
  textChange = (e) => {
    this.setState({ detail: e.target.value })
  }

  render() {
    const { visible, detail, formList, eventList } = this.state
    return (
      <div style={{ width: '100%', padding: '5px 0' }}>
        {formList.map((item, index) => {
          return (
            <div
              key={item.id}
              style={{
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Select
                defaultValue={item.content}
                style={{ width: '55%' }}
                onChange={this.handChange.bind(this, index)}
                size="small"
              >
                {eventList.map((it) => (
                  <Option key={it.name} value={it.value}>
                    {it.name}
                  </Option>
                ))}
              </Select>
              <Button
                type="primary"
                style={{ width: '20%' }}
                size="small"
                onClick={this.showModal.bind(this, index)}
              >
                设置
              </Button>
              <Button
                style={{ width: '20%' }}
                size="small"
                onClick={this.deleteItem.bind(this, index)}
              >
                删除
              </Button>
            </div>
          )
        })}

        <div>
          <Button type="dashed" style={{ width: '100%' }} onClick={this.addItem}>
            <Icon type="plus" /> 新增交互事件
          </Button>
        </div>

        <Modal
          title="事件编辑"
          visible={visible}
          maskClosable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <TextArea value={detail || ''} onChange={this.textChange} rows={25} />
        </Modal>
      </div>
    )
  }
}

export default CustomComp
