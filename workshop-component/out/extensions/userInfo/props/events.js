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
      formList: !_.isEmpty(props.getInfo('events')) ? props.getInfo('events') : [],
      eventList: [
        { name: '内容加载', value: 'componentDidMount' },
        { name: '内容改变', value: 'onChange' },
      ],
    }
  }
  addItem = () => {
    const list = this.state.formList
    list.push({
      id: new Date().valueOf(),
      content: '',
      detail: '',
    })
    this.setState({
      formList: list,
    })
    this.props.edit(list)
  }
  deleteItem = (index) => {
    const list = this.state.formList
    list.splice(index, 1)
    this.setState({
      formList: list,
    })
    this.props.edit(list)
  }

  handleOk = (e) => {
    const list = this.state.formList
    list[this.state.index].detail = this.state.detail
    this.setState({
      visible: false,
      formList: list,
    })
    this.props.edit(list)
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    })
  }

  handChange = (e, index) => {
    const list = this.state.formList
    list[e].content = index
    this.setState({
      formList: list,
    })
    this.props.edit(list)
  }
  showModal = (e, index) => {
    const data = this.state.formList[e].detail
    this.setState({
      detail: data,
      index: e,
      visible: true,
    })
  }
  textChange = (e) => {
    this.setState({
      detail: e.target.value,
    })
  }

  render() {
    const { visible, detail, formList, eventList } = this.state
    return (
      <div style={{ width: '250px', padding: '5px', marginTop: '20px' }}>
        {formList.map((item, index) => {
          return (
            <div
              key={item.id}
              style={{
                marginBottom: '20px',
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
