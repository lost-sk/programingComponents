import React, { Component } from 'react'
import { Input, InputNumber, Table, Form, Button } from 'antd'
//import _ from 'lodash'
import './index.css'

//const scriptUtil = { registerReactDom: () => {}, executeScriptService: () => {} }

const EditableContext = React.createContext()

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />
    }
    return <Input />
  }

  renderCell = ({ getFieldDecorator }) => {
    const { editing, dataIndex, title, inputType, record, index, children, ...restProps } =
      this.props
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `请输入 ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    )
  }

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
  }
}
class CustomComp extends Component {
  constructor(props) {
    super(props)
    const config = props?.data?._attrObject.data || {}
    console.log('simu props config', config)
    this.state = {
      granularityParams: { arrParams: [] },
      granularityOutputParams: {},
      editingKey: '',
      selectedRowKeys: [],
    }
    this.granularity_list = [
      { valueName: '粒级', valueKey: 'particleSize', valueType: 'json' },
      { valueName: '粒度分布', valueKey: 'distribution', valueType: 'json' },
      { valueName: '最大粒径', valueKey: 'maxSize', valueType: 'number' },
      { valueName: '粒度分布', valueKey: 'stdDist', valueType: 'json', disabled: true },
      { valueName: '粒级', valueKey: 'stdPs', valueType: 'json', disabled: true },
    ]
  }
  componentDidMount() {
    scriptUtil.registerReactDom(this, this.props)
  }

  isEditing = (record) => record.key === this.state.editingKey

  cancel = () => {
    this.setState({ editingKey: '' })
  }

  handleSave(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return
      }

      const newData = this.state.granularityParams.arrParams.map((v, i) => ({ ...v, key: i }))
      const index = newData.findIndex((item) => key === item.key)
      console.log('save key row index', key, row, index)
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row,
        })
        this.setState({
          granularityParams: { ...this.state.granularityParams, arrParams: newData },
          editingKey: '',
        })
      } else {
        newData.push(row)
        this.setState({ ...this.state.granularityParams, arrParams: newData, editingKey: '' })
      }
    })
  }

  handleEdit(key) {
    this.setState({ editingKey: key })
  }

  handleAdd = () => {
    //点击新增 插入一行空数据
    const { granularityParams } = this.state
    const newParams = { particleSize: null, distribution: null }

    granularityParams.arrParams.push(newParams)
    this.setState({ granularityParams })
  }

  handleDelete = () => {
    const { selectedRowKeys, granularityParams } = this.state
    const newData = granularityParams.arrParams.map((v, i) => ({ ...v, key: i }))
    const filterData = newData.filter((obj) => !selectedRowKeys.includes(obj.key))
    console.log('handle delete', newData, filterData)
    this.setState({
      granularityParams: { ...granularityParams, arrParams: filterData },
      selectedRowKeys: [],
    })
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  getGranularityInputValue = () => {
    return this.state.granularityParams
  }

  setGranularityInputValue = (value) => {
    const { granularityParams } = this.state
    //this.setState({ granularityParams: { ...granularityParams, ...value } })
    this.setState({ granularityParams: value })
  }

  setGranularityOutputValue = (value) => {
    this.setState({ granularityOutputParams: value })
  }

  renderGranularityHtml = () => {
    const { granularityParams, selectedRowKeys } = this.state
    const model_columns = [
      {
        title: '粒级',
        dataIndex: 'particleSize',
        editable: true,
      },
      {
        title: '粒度分布',
        dataIndex: 'distribution',
        editable: true,
      },
    ]
    model_columns.push({
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editingKey } = this.state
        const editable = this.isEditing(record)
        return editable ? (
          <span>
            <EditableContext.Consumer>
              {(form) => (
                <a onClick={() => this.handleSave(form, record.key)} style={{ marginRight: 8 }}>
                  确定
                </a>
              )}
            </EditableContext.Consumer>

            <a onClick={() => this.cancel(record.key)}>取消</a>
          </span>
        ) : (
          <a disabled={editingKey !== ''} onClick={() => this.handleEdit(record.key)}>
            编辑
          </a>
        )
      },
    })

    const components = {
      body: {
        cell: EditableCell,
      },
    }

    const columns = model_columns.map((col) => {
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: 'number',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      }
    })

    const dataSource = granularityParams.arrParams
      ? granularityParams.arrParams.map((v, i) => ({ ...v, key: i }))
      : []

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    return (
      <div>
        <div className="inputDiv">
          <span className="inputSpan">最大粒径</span>
          <InputNumber
            value={granularityParams.maxSize}
            onChange={(value) =>
              this.setState({
                granularityParams: {
                  ...granularityParams,
                  maxSize: value ? value : null,
                },
              })
            }
          ></InputNumber>
        </div>
        <EditableContext.Provider value={this.props.form}>
          <Button
            onClick={this.handleAdd}
            type="primary"
            icon="plus"
            style={{ marginBottom: 6, marginRight: 10 }}
          >
            新增
          </Button>
          <Button
            type="danger"
            onClick={this.handleDelete}
            style={{ marginBottom: 6 }}
            icon="delete"
            disabled={selectedRowKeys.length === 0}
          >
            删除
          </Button>
          <Table
            components={components}
            bordered
            dataSource={dataSource}
            columns={columns}
            rowSelection={rowSelection}
            rowClassName="editable-row"
            pagination={false}
          />
        </EditableContext.Provider>
      </div>
    )
  }

  renderHtml = () => {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <h3>粒度参数设置</h3>
        {this.renderGranularityHtml()}
      </div>
    )
  }
  render() {
    return <div className="processContent">{this.renderHtml()}</div>
  }
}

const EditableFormTable = Form.create()(CustomComp)
export default EditableFormTable
