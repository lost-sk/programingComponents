import React, { Component } from 'react'
import { Input, InputNumber, Switch, Table, Form, Button } from 'antd'
//import _ from 'lodash'
import './index.css'

const modelInput_single = []
const modelInput_multiple = []
const modelOutput_single = []
const modelOutput_multiple = []

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
      model: config?.model?.value || 'cyclone',
      inputParams: {
        description: '',
        arrParams: [],
      },
      outputParams: {},
      editingKey: '',
      selectedRowKeys: [],
      getServiceReady: false,
    }
  }
  componentDidMount() {
    scriptUtil.registerReactDom(this, this.props)
    const { model } = this.state
    if (modelInput_single.length === 0) {
      this.getServiceData(model)
    }
  }

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}
  //根据模型类型获取模型参数定义
  getServiceData = (model) => {
    scriptUtil.executeScriptService({
      objName: 'os_simulation.simulation_model', // 模板 或者 实例
      serviceName: 'os_simulation.get_simulation_model', // 服务的命名空间+服务别名
      // 入参
      params: {
        alias: model,
      },
      version: 'V2',
      // 回调函数 获取input参数和output参数
      cb: (res) => {
        const datalist = res.data.list

        datalist.forEach((obj) => {
          const objTemp = {
            valueName: obj['os_simulation.simulation_model.value_name'],
            valueKey: obj['os_simulation.simulation_model.value_key'],
            valueType: obj['os_simulation.simulation_model.value_type'],
          }
          if (obj['os_simulation.simulation_model.type'] === 'input') {
            if (obj['os_simulation.simulation_model.value_isArray']) {
              modelInput_multiple.push(objTemp)
            } else {
              modelInput_single.push(objTemp)
            }
          }
          if (obj['os_simulation.simulation_model.type'] === 'output') {
            if (obj['os_simulation.simulation_model.value_isArray']) {
              modelOutput_multiple.push(objTemp)
            } else {
              modelOutput_single.push(objTemp)
            }
          }
        })

        this.setState({ getServiceReady: true })
        console.log(
          'callback res',
          modelInput_single,
          modelInput_multiple,
          modelOutput_single,
          modelOutput_multiple
        )
      },
    })
  }

  isEditing = (record) => record.key === this.state.editingKey

  cancel = () => {
    this.setState({ editingKey: '' })
  }
  //处理表格数据保存逻辑
  handleSave(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return
      }

      const newData = this.state.inputParams.arrParams.map((v, i) => ({ ...v, key: i }))
      const index = newData.findIndex((item) => key === item.key)
      console.log('save key row index', key, row, index)
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row,
        })
        this.setState({
          inputParams: { ...this.state.inputParams, arrParams: newData },
          editingKey: '',
        })
      } else {
        newData.push(row)
        this.setState({ ...this.state.inputParams, arrParams: newData, editingKey: '' })
      }
    })
  }

  handleEdit(key) {
    this.setState({ editingKey: key })
  }
  //处理表格数据新增逻辑
  handleAdd = () => {
    //点击新增 插入一行空数据
    const { model, inputParams } = this.state
    const newParams = {}
    modelInput_multiple.forEach((obj) => {
      newParams[obj.valueKey] = null
    })
    inputParams.arrParams.push(newParams)
    this.setState({ inputParams })
  }

  handleDelete = () => {
    const { selectedRowKeys, inputParams } = this.state
    const newData = inputParams.arrParams.map((v, i) => ({ ...v, key: i }))
    const filterData = newData.filter((obj) => !selectedRowKeys.includes(obj.key))
    console.log('handle delete', newData, filterData)
    this.setState({ inputParams: { ...inputParams, arrParams: filterData }, selectedRowKeys: [] })
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }
  //外部调用该方法获取输入参数数据
  getInputValue = () => {
    return this.state.inputParams
  }
  //外部调用该方法设置输入参数数据（用于写入历史参数）
  setInputValue = (value) => {
    this.setState({ inputParams: value })
  }
  //外部调用该方法设置输出参数数据（用于写入历史参数）
  setOutputValue = (value) => {
    this.setState({ outputParams: value })
  }

  renderInputHtml = (list) => {
    const { inputParams } = this.state

    return (
      <div className="renderDiv">
        <span className="inputSpan">{list.valueName}</span>
        {list.valueType === 'number' && (
          <InputNumber
            value={inputParams[list.valueKey]}
            onChange={(value) =>
              this.setState({ inputParams: { ...inputParams, [list.valueKey]: value } })
            }
          ></InputNumber>
        )}
        {list.valueType === 'string' && (
          <Input
            value={inputParams[list.valueKey]}
            onChange={(event) =>
              this.setState({
                inputParams: { ...inputParams, [list.valueKey]: event.target.value },
              })
            }
          ></Input>
        )}
        {list.valueType === 'switch' && (
          <Switch
            checked={inputParams.fishhook}
            onChange={(checked) =>
              this.setState({ inputParams: { ...inputParams, fishhook: checked } })
            }
          ></Switch>
        )}
      </div>
    )
  }
  renderOutputHtml = (list) => {
    const { outputParams } = this.state

    return (
      <div className="renderDiv">
        <span className="outputSpan">{list.valueName}</span>
        <span className="paramOutput">&nbsp;{outputParams[list.valueKey]}</span>
      </div>
    )
  }

  cycloneHtml = () => {
    const { inputParams, outputParams, selectedRowKeys, getServiceReady } = this.state

    const model_columns = modelInput_multiple.map((obj) => ({
      title: obj.valueName,
      dataIndex: obj.valueKey,
      editable: true,
    }))
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

    const dataSource = inputParams.arrParams.map((v, i) => ({ ...v, key: i })) || []

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }

    return (
      <div>
        <h3>输入参数</h3>
        <div style={{ marginBottom: '12px' }}>
          <div className="inputDiv">
            <div className="renderDiv">
              <span className="inputSpan">计算描述</span>
              <Input
                value={inputParams.description}
                onChange={(event) =>
                  this.setState({
                    inputParams: { ...inputParams, description: event.target.value },
                  })
                }
              ></Input>
            </div>

            {modelInput_single.map((mos) => {
              return this.renderInputHtml(mos)
            })}
          </div>
          {modelInput_multiple.length > 0 && (
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
          )}
        </div>
        <h3>输出参数</h3>
        <div className="inputDiv">
          {modelOutput_single.map((mos) => this.renderOutputHtml(mos))}
        </div>
      </div>
    )
  }

  render() {
    const { getServiceReady } = this.state
    return <div className="modelContent">{getServiceReady && this.cycloneHtml()}</div>
  }
}

const EditableFormTable = Form.create()(CustomComp)
export default EditableFormTable
